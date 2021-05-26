import Crawler, { CrawlerRequestOptions, CrawlerRequestResponse, CreateCrawlerOptions } from "crawler";
import { Handler, Result } from "htmlmetaparser";

import { Parser } from "htmlparser2";
import { Robots } from "./robots-txt-parser/robots";
import seenreq from 'seenreq';

export abstract class DomainCrawler {
    private seen;
    private initialised: boolean = false;
    private crawler?: Crawler;
    private robots?: Robots;
    public domain: URL;
    private crawlerOptions: CreateCrawlerOptions;

    constructor(domain: URL, crawlerOptions: CreateCrawlerOptions) {
        this.seen = new seenreq();
        this.domain = domain;
        this.crawlerOptions = crawlerOptions;
    }
    
    public async queue(options: CrawlerRequestOptions): Promise<DomainCrawler> {
        await this.initialise()
        if (!options.uri) return this;
        const [wasSeen, canCrawl] = await Promise.all([
            this.seen.exists(options.uri),
            this.robots?.canCrawl(new URL(options.uri))
        ]);
        if (!wasSeen && canCrawl) {
            // console.log(options.uri)
            this.crawler?.queue(options);
        }
        return this;
    }

    public async waitFor() {
        return new Promise((resolve, _) => {
            return this.crawler?.on('drain', () => resolve(null));
        });
    }

    abstract onPage(response: CrawlerRequestResponse, result: Result): Promise<unknown>;

    private async initialise() {
        if (this.initialised) return;
        this.robots = await new Robots().useRobotsFor(this.domain);
        const rateLimit = await this.robots.getCrawlDelay() || 10;
        const maxConnections = 10;
        this.crawler = new Crawler({
            maxConnections,
            rateLimit: maxConnections * rateLimit,
            ...this.crawlerOptions,
            callback: (error, res, done) => this.handleResponse(error, res).then(done, done)
        });
        this.initialised = true;
        await this.seen.initialize();
    }

    private async parsePage(response: CrawlerRequestResponse): Promise<Result> {
        return new Promise((resolve, reject) => {
            const handler = new Handler((error: Error | null, result: Result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            }, { url: response.request.uri.href });
            const parser = new Parser(handler, { decodeEntities: true });
            parser.parseComplete(response.body.toString());
        });
    }
    
    private async handleResponse(error: Error, response: CrawlerRequestResponse) {
        if (error) {
            console.error(error);
            return;
        }
        const result = await this.parsePage(response);
        await this.handleResult(response, result);
    }

    private async handleResult(response: CrawlerRequestResponse, result: Result) {
        const work: Array<Promise<any>> = []
        work.push(this.onPage(response, result));
        if (response.options.recurse && result.links) {
            const links = result.links
                .filter((it) => new URL(it.href).hostname === response.request.uri.hostname);
            for (const link of links) {
                work.push(this.queue({ uri: link.href }));
            }
        }
        return Promise.all(work);
    }
}
