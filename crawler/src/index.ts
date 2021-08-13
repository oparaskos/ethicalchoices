import { DomainCrawler } from "./DomainCrawler";
import { MerchantCrawler } from "./MerchantCrawler";

const domains = [
  /// Food & Drink
  // "https://www.brewdog.com/",
  // "https://www.majestic.co.uk/",
  // "https://www.quorn.co.uk/",
  // "https://birdandwild.co.uk/",
  // "https://nudefood.co.uk/",
  // "https://www.naturli-foods.com/",
  // "https://www.bighams.com",
  // "https://www.oddbox.co.uk/",
  // "https://www.thehut.com",
  // "https://www.myprotein.com/",
  // "https://uk.huel.com/",
  // "https://www.decathlon.co.uk/",
  
  /// Home Furnishings & DIY
  // "https://www.wickes.co.uk/",
  // "https://www.gozney.com/",
  // "https://www.weber.com/GB/en/home/",
  // "https://www.homebase.co.uk/",
  // "https://www.diy.com/",
  
  /// Pets
  // "https://www.lilyskitchen.co.uk/",
  // "https://uk.pedigree.com/",
  // "https://www.iams.co.uk",
  // "https://www.petsathome.com/",
  
  /// Fashion
  // "https://www.weirdfish.co.uk/",
  // "https://uk.oneill.com/",
  // "https://www.fjallraven.com/",
  // "https://www.seasaltcornwall.co.uk/",
  // "https://www.fatface.com/",
  // "https://www.clarks.co.uk/",
  // "https://www.nike.com/gb/",
  // "https://www.next.co.uk/",
  // "https://www.drmartens.com/",
  // "https://www.thenorthface.co.uk/",
  // "https://www.beyondretro.com/",
  // "https://www.komodo.co.uk/",
  // "https://www.peopletree.co.uk/",
  // "https://www.wearethought.com/",
  // "https://kuyichi.com/",
  // "https://www.nomadsclothing.com/",
  // "https://finisterre.com/",
  // "https://birdsong.london/",
  // "https://ninetypercent.com/",
  // "https://www.nudiejeans.com/",
  // "https://www.outsiderfashion.com/",
  // "https://rapanuiclothing.com/",


  
  // "https://www.abelandcole.co.uk/", -- CDN injects an invalid header which node now just rejects outright with no workaround.
  // "https://www.adidas.co.uk/", -- Same agin
]
  .map((d) => new URL(d))
  .map((domain) => new MerchantCrawler(domain, '', '', { recurse: true }))
  .map(crawler => crawler.start().then(_ => crawler.waitFor()));
