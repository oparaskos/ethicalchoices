import * as util from './util';

import { BotGroup, RobotsMeta, RobotsUAs, parser } from './parser';

import fetch from 'node-fetch';

export interface RobotsOpts {
  userAgent?: string;
  allowOnNeutral?: boolean,
  timeout?: number;
}

export class Robots {
  private active: string | undefined;
  private robotsCache: {[key: string]: RobotsMeta & RobotsUAs} = {};
  private opts = {
    userAgent: '*',
    allowOnNeutral: true,
    timeout: 10000
  };

  constructor(opts: RobotsOpts = {}) {
    this.robotsCache = {};
    Object.assign(this.opts, opts);
  }

  public getRecordsForAgent() {
    const key = this.active;
    const domainBots = this.robotsCache[key as string] || {};
    const ourBotInBots = this.opts.userAgent in domainBots;
    const otherBots = '*' in domainBots;
    if (ourBotInBots) {
      return domainBots[this.opts.userAgent.toLowerCase()];
    } else if (otherBots) {
      return domainBots['*'];
    }
    return false;
  };

  public canVisit(url: URL, botGroup: BotGroup) {
    const allow = util.applyRecords(url.pathname, botGroup.allow);
    const disallow = util.applyRecords(url.pathname, botGroup.disallow);
    const noAllows = allow.numApply === 0 && disallow.numApply > 0;
    const noDisallows = allow.numApply > 0 && disallow.numApply === 0;

    // No rules for allow or disallow apply, therefore full allow.
    if (noAllows && noDisallows) {
      return true;
    }

    if (noDisallows || (allow.maxSpecificity > disallow.maxSpecificity)) {
      return true;
    } else if (noAllows || (allow.maxSpecificity < disallow.maxSpecificity)) {
      return false;
    }
    return this.opts.allowOnNeutral;
  };

  public parseRobots(url: URL, robotsTxtContent: string) {
    this.robotsCache[url.hostname] = parser(robotsTxtContent);
    this.active = url.hostname;
  };

  public async fetch(url: URL) {
    if (url.hostname in this.robotsCache) {
      this.active = url.hostname;
      return this.robotsCache[url.hostname];
    }

    const robotsLink = new URL('/robots.txt', url);
    const response = await fetch(robotsLink, {
      timeout: this.opts.timeout,
      insecureHTTPParser: true
    } as any)
    this.robotsCache[url.hostname] = parser(await response.textConverted());
    this.active = url.hostname;
    console.log('Successfully got ' + robotsLink.href, url.hostname in this.robotsCache);
    return this.robotsCache[url.hostname];
  };

  public isCached(url: URL) {
    return url.hostname in this.robotsCache;
  };

  public async useRobotsFor(url: URL) {
    await this.fetch(url);
    this.active = url.hostname;
    return this;
  };

  public async canCrawl(url: URL) {
    await this.useRobotsFor(url);
    // Get the parsed robotsCache.txt for this domain.
    const botGroup = this.getRecordsForAgent();
    // Conditional allow, our bot or the * user agent is in the robotsCache.txt
    if (botGroup) {
      return this.canVisit(url, botGroup);
    }
    // Robots txt exists doesn't have any rules for our bot or *, therefore full allow.
    return true;
  };

  public async getSitemaps() {
    const botRecords = this.robotsCache[this.active as string];
    return botRecords ? botRecords.sitemaps : [];
  };

  public async getCrawlDelay() {
    const botRecords = this.getRecordsForAgent();
    return botRecords ? botRecords.crawlDelay : 0;
  };

  /*
  * Takes an array of links and returns an array of links which are crawlable
  * for the given domain.
  */
  public async getCrawlableLinks(linkArray: URL[]) {
    const links = linkArray instanceof Array ? linkArray : [linkArray];
    const crawlableLinks = [];
    const botGroup = this.getRecordsForAgent();
    if (botGroup) {
      for (let i = 0; i < links.length; i += 1) {
        if (this.canVisit(links[i], botGroup)) {
          crawlableLinks.push(links[i]);
        }
      }
    }
    return crawlableLinks;
  };

  public getPreferredHost() {
    const botRecords = this.robotsCache[this.active as string] || {};
    return botRecords.host;
  };

  public withUserAgent(agent: string) {
    this.opts.userAgent = agent.toLowerCase();
    return this;
  };

  public withAllowOnNeutral(allow: boolean) {
    this.opts.allowOnNeutral = allow;
    return this;
  };

  public clearCache() {
    this.robotsCache = {};
    return this;
  };
}