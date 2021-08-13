import Crawler, { CrawlerRequestOptions, CrawlerRequestResponse, CreateCrawlerOptions } from "crawler";
import { Handler, Result } from "htmlmetaparser";
import { Organization, WebSite } from "schema-dts";

import { Parser } from "htmlparser2";
import { Robots } from "./robots-txt-parser/robots";
import seenreq from 'seenreq';

export const DEFAULT_MAX_CONNECTIONS = 10;
export const DEFAULT_CRAWL_DELAY = 10;

export abstract class DomainCrawler {
    public seen;
    public initialised: boolean = false;
    public crawler?: Crawler;
    public robots?: Robots;
    public domain: URL;
    public crawlerOptions: CreateCrawlerOptions;
    public webSite: WebSite = { "@type": "WebSite" };
    public organization: Organization;

    constructor(domain: URL, crawlerOptions: CreateCrawlerOptions) {
        this.seen = new seenreq();
        this.domain = domain;
        this.crawlerOptions = crawlerOptions;
        this.webSite.url = domain.href;
        this.organization = { "@type": "Organization", url: this.domain.href };
    }

    public async start() {
        await this.queue({ uri: this.domain.href })
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
        if (!this.robots)
            this.robots = await new Robots().useRobotsFor(this.domain);
        const rateLimit = await this.robots.getCrawlDelay() || DEFAULT_CRAWL_DELAY;
        const maxConnections = DEFAULT_MAX_CONNECTIONS;
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
                if (response.request.uri.pathname === this.domain.pathname) {
                    this.webSite.name = result.html?.title;
                    this.webSite.description = result.html?.description;
                    this.webSite.keywords = result.html?.keywords;
                    this.webSite.sourceOrganization = this.organization;
                    this.webSite.sameAs = this.domain.href;
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
