import seenreq from 'seenreq';
import Crawler, { CrawlerRequestOptions, CrawlerRequestResponse } from "crawler";
import { Handler, Result } from "htmlmetaparser";
import { Parser } from "htmlparser2";

const seen = new seenreq();

let pageHandler = async (res: CrawlerRequestResponse, err: Error | null, result: Result) => null


export function initialize(
    domain: string,
    _pageHandler: (res: Crawler.CrawlerRequestResponse, err: Error | null, result: Result) => Promise<any>
    ): Promise<{queue: (options: CrawlerRequestOptions) => Promise<void>}> {
    pageHandler = _pageHandler
    let queue = async (options: CrawlerRequestOptions) => null;
    const crawler = new Crawler({
        maxConnections: 5,
        rateLimit: 10,
        callback: function (error, res, done) {
            (new Promise((resolve, reject) => {
                if (error) {
                    console.log(error);
                } else {
                    const handler = new Handler((err, result) => {
                        try {
                            resolve((async() => {
                                pageHandler(res, err, result)
                                if (res.options.recurse && result.links) {
                                    const links = result.links
                                        .filter((it) => new URL(it.href).hostname === res.request.uri.hostname);
                                    console.trace(`queueing links ${links.join(', ')}`);
                                    for (const link of links) {
                                        await queue({ uri: link.href });
                                    }
                                }
                            })());
    
                        } catch (e) {
                            reject(e);
                        }
                    }, { url: res.request.uri.href });
                    const parser = new Parser(handler, { decodeEntities: true });
                    parser.write(res.body.toString());
                    parser.done();
                }
            })).then(done, done);
        }
    });

    queue = async (options: CrawlerRequestOptions) => {
        return seen.exists(options.uri)
            .then((wasSeen: boolean) => {
                if(!wasSeen) {
                    console.log(options.uri)
                    crawler.queue(options)
                }
            })
    }

    return seen.initialize().then(() => ({ queue }))
}