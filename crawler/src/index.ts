import { DomainCrawler } from "./DomainCrawler";
import { MerchantCrawler } from "./MerchantCrawler";

const domains = [
  "https://www.weirdfish.co.uk/",
  "https://www.quorn.co.uk/",
  "https://nudefood.co.uk/",
  "https://www.naturli-foods.com/",
  "https://www.brewdog.com/",
  "https://www.decathlon.co.uk/",
  "https://uk.oneill.com/",
  "https://www.homebase.co.uk/",
  "https://www.diy.com/",
  "https://www.wickes.co.uk/",
  "https://www.fjallraven.com/",
  "https://uk.huel.com/",
  "https://www.myprotein.com/",
  "https://www.thehut.com",
  "https://www.majestic.co.uk/",
  "https://birdandwild.co.uk/",
  "https://www.gozney.com/",
  "https://www.weber.com/GB/en/home/",
  "https://www.lilyskitchen.co.uk/",
  "https://uk.pedigree.com/",
  "https://www.iams.co.uk",
  "https://www.petsathome.com/",
  "https://www.bighams.com",
  // "https://www.abelandcole.co.uk/", -- CDN injects an invalid header which node now just rejects outright with no workaround.
  "https://www.oddbox.co.uk/",
  "https://www.seasaltcornwall.co.uk/",
  "https://www.fatface.com/",
  "https://www.clarks.co.uk/",
  "https://www.nike.com/gb/",
  // "https://www.adidas.co.uk/", -- Same agin
  "https://www.next.co.uk/",
  "https://www.drmartens.com/",
  "https://www.thenorthface.co.uk/",
]
  .map((d) => new URL(d))
  .map((domain) => new MerchantCrawler(domain, '', '', { recurse: true }))
  .map(crawler => crawler.queue({ uri: crawler.domain.href }).then(_ => crawler.waitFor()));
