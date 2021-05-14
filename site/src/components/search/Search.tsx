import { GAINSBORO_GREY, TROPICAL_RAINFOREST_GREEN, TextColours } from '../../styles/local-color-palette';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Container } from '../shared/layout/container'
import { FONT_FACE } from '@tryflux/pixels-typography';
import { History } from 'history';
import SearchResult from './SearchResult';
import { css } from '@emotion/css';

const searchInputStyle = css`
  width: 100%;
  height: 3rem;
  padding: 0.2rem 1rem;
  outline: none;
  border: 1px solid ${GAINSBORO_GREY.value};
  font-size: 1.5rem;
  border-radius: 0.5rem;
  background-position: calc(100% - 1rem) center;
  background-size: 2rem 2rem;
  background-repeat: no-repeat;
  box-sizing: border-box;
`;

const headerStyle = css`
  background: ${TROPICAL_RAINFOREST_GREEN.value};
  
  margin: 0;
  overflow: hidden;
  padding: 1rem;

  h1 {
    font-size: 5rem;
    text-align: center;
    color: ${TextColours.TEXT_WHITE.value};
    margin: 8rem 0;
  }
`;

const resultsSummaryStyle = css`
  color: ${TextColours.TEXT_WHITE.value};
  font-family: ${FONT_FACE.SANS_REGULAR};
  text-align: right;
  margin-top: 1rem;
`;

let debounceInterval: NodeJS.Timeout;
function changeQueryString(query: URLSearchParams, documentTitle: string, history: History<unknown>) {
  if (debounceInterval) clearTimeout(debounceInterval);
  debounceInterval = setTimeout(() => {
    documentTitle = typeof documentTitle !== 'undefined' ? documentTitle : document.title;
    history.push(window.location.pathname + '?' + query.toString());
  }, 1500);
}

function Search() {
  const location = useLocation()
  const history = useHistory()
  const query = new URLSearchParams(location.search);
  const numResults = '100';
  const timeTaken = ' 0.1005ms';
  const [searchString, setSearch] = useState(query.get('q') || '')

  const results = [
    {"@context":"https://schema.org/","@type":"Product","name":"Vegan & Vegetarian Frozen Food","description":"Stay cool! Discover our full range of Quorn vegan & vegetarian frozen food. From classics like Fillets and Mince to favourites like Vegan Nuggets, see them all he...","image":["https://images.ctfassets.net/uexfe9h31g3m/4HtyuL7NvOC6u6I06QUKg2/1cbe5353b0b92ddb6b00f3b52c1809b4/PadThai_1024x768.jpg"],"pageUri":"https://www.quorn.co.uk/products/frozen-food","category":["grocery"],"modernSlaveryAct":"https://www.quorn.co.uk/modern-slavery-act","genderPayGap":"https://www.quorn.co.uk/gender-pay-gap-reporting","modernSlaveryActStatement":"https://www.quorn.co.uk/modern-slavery-act","isOrganic":false,"sustainabilityPolicy":"https://www.quorn.co.uk/company/sustainability","isVegan":true,"isVegetarian":true},
    {"@context":"http://schema.org/","@type":"Product","name":"Yoga New Collection","description":"Welcome to Decathlon, we stock a wide range of Yoga New Collection. Enjoy low prices every day. Get what you need now!","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.4","reviewCount":"5760"},"pageUri":"https://www.decathlon.co.uk/browse/c0-sports/c1-yoga/c2-yoga-new-collection/_/N-1jgdmv2","category":["grocery"],"modernSlaveryAct":"/landing/modern-slavery-act/_/R-a-modernslavery","modernSlaveryActStatement":"/landing/modern-slavery-act/_/R-a-modernslavery","isOrganic":true,"isVegan":false,"isVegetarian":false},
    {"@context":"https://schema.org/","@type":"Product","name":"Dead Pony Club 4 x Can","description":"Dead Pony Club is a low amplitude, high voltage hop hit. Alive with flavour it’s hopped to the Pacific shores and back. Dive in to aromas of citrus, lemon-grass and lime zest. The toasted malt base ebbs to a huge hop hit, washing tropical fruit, floral garlands and spicy undertones all over your palate. Dead Pony Club - California dreaming for the craft beer generation.","image":["https://www.brewdog.com/media/catalog/product/cache/cbc558a17895be22f962d1dc5e92c9b4/b/r/brewdog_multi-dpc.png"],"pageUri":"https://www.brewdog.com/uk/dead-pony-club-4-x-can","category":["grocery"],"carbonFootprint":"By purchasing this you are helping us offset 1.24kg CO2","modernSlaveryAct":"/responsibility/tackling-modern-slavery","modernSlaveryActStatement":"/responsibility/tackling-modern-slavery","isOrganic":false,"sustainabilityPolicy":"/uk/responsibility/","isVegan":true,"isVegetarian":true},
    {"@context":"https://schema.org/","@type":"Product","name":"Vegetarian Food","description":"Find a range of Vegetarian food products from Quorn, including nuggets, sausages and more. A delicious and simple way to prepare healthier meals. Discover now.","image":["https://images.ctfassets.net/uexfe9h31g3m/i66gQ8A0mImKIcakAW0uW/07e556439baba41881ee6dd9c5c90ba0/MincePieces_1024x768-3.jpg"],"pageUri":"https://www.quorn.co.uk/products/vegetarian-food","category":["grocery"],"modernSlaveryAct":"https://www.quorn.co.uk/modern-slavery-act","genderPayGap":"https://www.quorn.co.uk/gender-pay-gap-reporting","modernSlaveryActStatement":"https://www.quorn.co.uk/modern-slavery-act","isOrganic":false,"sustainabilityPolicy":"https://www.quorn.co.uk/company/sustainability","isVegan":true,"isVegetarian":true},
    {"@context":"https://schema.org/","@type":"Product","name":"Vegan Food","description":"Discover Quorn's wide range of vegan food products, such as our deliciously healthy Vegan Pieces to make Nachos or our Vegan Nuggets. Discover more here.","image":["https://images.ctfassets.net/uexfe9h31g3m/4esjwG8j4kSYaGMU6Y8OSe/5c147a980a6eb4946f3ac3bc77775bdc/MakesAmazing_1024x768.jpg"],"pageUri":"https://www.quorn.co.uk/products/vegan-food","category":["grocery"],"modernSlaveryAct":"https://www.quorn.co.uk/modern-slavery-act","genderPayGap":"https://www.quorn.co.uk/gender-pay-gap-reporting","modernSlaveryActStatement":"https://www.quorn.co.uk/modern-slavery-act","isOrganic":false,"sustainabilityPolicy":"https://www.quorn.co.uk/company/sustainability","isVegan":true,"isVegetarian":true},
    {"@context":"https://schema.org/","@type":"Product","name":"Gluten Free Products from Quorn","description":"Quorn is the perfect ingredient for a range of delicious gluten-free meals that will really hit the spot. Click here to discover our range of products here.","image":["https://images.ctfassets.net/uexfe9h31g3m/5F3GlBSYvKakkqoM6qQCwY/b7bd36e8e464c51acbb240bce5b425fa/Chilli_1024x768.jpg"],"pageUri":"https://www.quorn.co.uk/products/gluten-free","category":["grocery"],"modernSlaveryAct":"https://www.quorn.co.uk/modern-slavery-act","genderPayGap":"https://www.quorn.co.uk/gender-pay-gap-reporting","modernSlaveryActStatement":"https://www.quorn.co.uk/modern-slavery-act","isOrganic":false,"sustainabilityPolicy":"https://www.quorn.co.uk/company/sustainability","isVegan":true,"isVegetarian":true},

    {"@context":"https://schema.org/","@type":"Product","name":"Nanny State","description":"If you think low alcohol equals low taste, think again. We made a hardcore beer and left the alcohol out. Nanny State breaks the curfew and slips under the radar. A brigade of speciality malts and North American hops sends bitterness to the brink and back. Squeezing this many hops in, and the alcohol out, is a testament to our craft. Nanny State - no compromise, no surrender, no alcohol.","image":["https://www.brewdog.com/media/catalog/product/cache/cbc558a17895be22f962d1dc5e92c9b4/m/u/multi_brewdog-nannystate_4.png"],"pageUri":"https://www.brewdog.com/uk/nanny-state-4-x-cans","category":[],"carbonFootprint":"By purchasing this you are helping us offset 1.24kg CO2","modernSlaveryAct":"/responsibility/tackling-modern-slavery","modernSlaveryActStatement":"/responsibility/tackling-modern-slavery","isOrganic":false,"sustainabilityPolicy":"/uk/responsibility/","isVegan":true,"isVegetarian":true},
    {"@context":"http://schema.org/","@type":"Product","name":"Janus Printed Bamboo Polo Pagoda Blue","url":"https://www.weirdfish.co.uk/p/men/i/janus-printed-bamboo-polo-pagoda-blue-18674","image":["https://wf-img.global.ssl.fastly.net/700/61453.jpg","https://wf-img.global.ssl.fastly.net/700/61550.jpg","https://wf-img.global.ssl.fastly.net/700/61454.jpg","https://wf-img.global.ssl.fastly.net/700/61552.jpg"],"description":"This Bamboo Polo Shirt features a fun fish print to make you look and feel like summer has finally arrived!","brand":"Weird Fish","mpn":"10046","sku":"18674","color":"Pagoda Blue","productID":"18674","itemCondition":"NewCondition","offers":[{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:17.4894143+01:00","availability":"InStock","itemOffered":{"description":"Size: 2XL"},"url":"https://www.weirdfish.co.uk/p/men/i/janus-printed-bamboo-polo-pagoda-blue-18674?c=174&s=7"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:17.4894143+01:00","availability":"InStock","itemOffered":{"description":"Size: 3XL"},"url":"https://www.weirdfish.co.uk/p/men/i/janus-printed-bamboo-polo-pagoda-blue-18674?c=174&s=8"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:17.4894143+01:00","availability":"InStock","itemOffered":{"description":"Size: 4XL"},"url":"https://www.weirdfish.co.uk/p/men/i/janus-printed-bamboo-polo-pagoda-blue-18674?c=174&s=9"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:17.4894143+01:00","availability":"InStock","itemOffered":{"description":"Size: 5XL"},"url":"https://www.weirdfish.co.uk/p/men/i/janus-printed-bamboo-polo-pagoda-blue-18674?c=174&s=10"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:17.4894143+01:00","availability":"InStock","itemOffered":{"description":"Size: L"},"url":"https://www.weirdfish.co.uk/p/men/i/janus-printed-bamboo-polo-pagoda-blue-18674?c=174&s=5"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:17.4894143+01:00","availability":"InStock","itemOffered":{"description":"Size: M"},"url":"https://www.weirdfish.co.uk/p/men/i/janus-printed-bamboo-polo-pagoda-blue-18674?c=174&s=4"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:17.4894143+01:00","availability":"InStock","itemOffered":{"description":"Size: S"},"url":"https://www.weirdfish.co.uk/p/men/i/janus-printed-bamboo-polo-pagoda-blue-18674?c=174&s=3"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:17.4894143+01:00","availability":"InStock","itemOffered":{"description":"Size: XL"},"url":"https://www.weirdfish.co.uk/p/men/i/janus-printed-bamboo-polo-pagoda-blue-18674?c=174&s=6"}],"pageUri":"https://www.weirdfish.co.uk/p/new-arrivals/mens/i/janus-printed-bamboo-polo-pagoda-blue-18674","category":["grocery"],"composition":"67% Bamboo, 28% Cotton, 5 % Spandex","isOrganic":true,"isVegan":false,"isVegetarian":false},
    {"@context":"http://schema.org/","@type":"Product","name":"Paros Printed Bamboo T-Shirt Limestone","url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-limestone-18756","image":["https://wf-img.global.ssl.fastly.net/700/61464.jpg","https://wf-img.global.ssl.fastly.net/700/61566.jpg","https://wf-img.global.ssl.fastly.net/700/61465.jpg","https://wf-img.global.ssl.fastly.net/700/61568.jpg"],"description":"This bamboo men's t-shirt is the perfect graphic tee bringing together the mountains, the oceans and our urban world.","brand":"Weird Fish","mpn":"10048","sku":"18756","color":"Limestone","productID":"18756","itemCondition":"NewCondition","offers":[{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:19.7911249+01:00","availability":"InStock","itemOffered":{"description":"Size: 2XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-limestone-18756?c=286&s=7"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:19.7911249+01:00","availability":"InStock","itemOffered":{"description":"Size: 3XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-limestone-18756?c=286&s=8"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:19.7911249+01:00","availability":"InStock","itemOffered":{"description":"Size: 4XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-limestone-18756?c=286&s=9"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:19.7911249+01:00","availability":"InStock","itemOffered":{"description":"Size: 5XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-limestone-18756?c=286&s=10"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:19.7911249+01:00","availability":"InStock","itemOffered":{"description":"Size: L"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-limestone-18756?c=286&s=5"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:19.7911249+01:00","availability":"InStock","itemOffered":{"description":"Size: M"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-limestone-18756?c=286&s=4"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:19.7911249+01:00","availability":"InStock","itemOffered":{"description":"Size: S"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-limestone-18756?c=286&s=3"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:19.7911249+01:00","availability":"InStock","itemOffered":{"description":"Size: XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-limestone-18756?c=286&s=6"}],"pageUri":"https://www.weirdfish.co.uk/p/new-arrivals/mens/i/paros-printed-bamboo-t-shirt-limestone-18756","category":[],"composition":"60 % bamboo, 36 % cotton, 4 % elastane","isOrganic":false,"isVegan":false,"isVegetarian":false},
    {"@context":"http://schema.org/","@type":"Product","name":"Pan Bamboo Full Zip Hoodie Navy","url":"https://www.weirdfish.co.uk/p/men/i/pan-bamboo-full-zip-hoodie-navy-18535","image":["https://wf-img.global.ssl.fastly.net/700/50624.jpg","https://wf-img.global.ssl.fastly.net/700/51543.jpg","https://wf-img.global.ssl.fastly.net/700/50625.jpg","https://wf-img.global.ssl.fastly.net/700/50627.jpg"],"description":"Smooth, soft and great for temperature regulating, the Pan bamboo hoodie for men is made of a sustainable bamboo rich fabric, with the benefits of its natural ability for moisture wicking, antimicrobial properties and UV protection. Throw over your workout gear as an extra layer to help keep you warm on cool mornings, and cool during a workout.","brand":"Weird Fish","mpn":"9439","sku":"18535","color":"Navy","productID":"18535","itemCondition":"NewCondition","aggregateRating":{"@type":"AggregateRating","ratingValue":4.35294117647059,"reviewCount":17},"offers":[{"@type":"Offer","price":50,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.1619689+01:00","availability":"InStock","itemOffered":{"description":"Size: 2XL"},"url":"https://www.weirdfish.co.uk/p/men/i/pan-bamboo-full-zip-hoodie-navy-18535?c=72&s=7"},{"@type":"Offer","price":50,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.1619689+01:00","availability":"InStock","itemOffered":{"description":"Size: 3XL"},"url":"https://www.weirdfish.co.uk/p/men/i/pan-bamboo-full-zip-hoodie-navy-18535?c=72&s=8"},{"@type":"Offer","price":50,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.1619689+01:00","availability":"InStock","itemOffered":{"description":"Size: 4XL"},"url":"https://www.weirdfish.co.uk/p/men/i/pan-bamboo-full-zip-hoodie-navy-18535?c=72&s=9"},{"@type":"Offer","price":50,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.1619689+01:00","availability":"InStock","itemOffered":{"description":"Size: 5XL"},"url":"https://www.weirdfish.co.uk/p/men/i/pan-bamboo-full-zip-hoodie-navy-18535?c=72&s=10"},{"@type":"Offer","price":50,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.1619689+01:00","availability":"InStock","itemOffered":{"description":"Size: L"},"url":"https://www.weirdfish.co.uk/p/men/i/pan-bamboo-full-zip-hoodie-navy-18535?c=72&s=5"},{"@type":"Offer","price":50,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.1619689+01:00","availability":"InStock","itemOffered":{"description":"Size: M"},"url":"https://www.weirdfish.co.uk/p/men/i/pan-bamboo-full-zip-hoodie-navy-18535?c=72&s=4"},{"@type":"Offer","price":50,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.1619689+01:00","availability":"InStock","itemOffered":{"description":"Size: S"},"url":"https://www.weirdfish.co.uk/p/men/i/pan-bamboo-full-zip-hoodie-navy-18535?c=72&s=3"},{"@type":"Offer","price":50,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.1619689+01:00","availability":"InStock","itemOffered":{"description":"Size: XL"},"url":"https://www.weirdfish.co.uk/p/men/i/pan-bamboo-full-zip-hoodie-navy-18535?c=72&s=6"}],"pageUri":"https://www.weirdfish.co.uk/p/new-arrivals/mens/i/pan-bamboo-full-zip-hoodie-navy-18535","category":[],"isOrganic":false,"isVegan":false,"isVegetarian":false},
    {"@context":"http://schema.org/","@type":"Product","name":"Ares Bamboo Popover Graphic Hoodie Pagoda Blue","url":"https://www.weirdfish.co.uk/p/men/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675","image":["https://wf-img.global.ssl.fastly.net/700/61460.jpg","https://wf-img.global.ssl.fastly.net/700/61562.jpg","https://wf-img.global.ssl.fastly.net/700/61461.jpg","https://wf-img.global.ssl.fastly.net/700/61564.jpg"],"description":"An eco-friendly bamboo hoodie that is the definition of the perfect piece of casual clothing, our Ares fish print hoodie is a classic pullover hoodie.","brand":"Weird Fish","mpn":"10047","sku":"18675","color":"Pagoda Blue","productID":"18675","itemCondition":"NewCondition","offers":[{"@type":"Offer","price":55,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.5564092+01:00","availability":"InStock","itemOffered":{"description":"Size: 2XL"},"url":"https://www.weirdfish.co.uk/p/men/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675?c=174&s=7"},{"@type":"Offer","price":55,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.5564092+01:00","availability":"InStock","itemOffered":{"description":"Size: 3XL"},"url":"https://www.weirdfish.co.uk/p/men/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675?c=174&s=8"},{"@type":"Offer","price":55,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.5564092+01:00","availability":"InStock","itemOffered":{"description":"Size: 4XL"},"url":"https://www.weirdfish.co.uk/p/men/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675?c=174&s=9"},{"@type":"Offer","price":55,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.5564092+01:00","availability":"InStock","itemOffered":{"description":"Size: 5XL"},"url":"https://www.weirdfish.co.uk/p/men/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675?c=174&s=10"},{"@type":"Offer","price":55,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.5564092+01:00","availability":"InStock","itemOffered":{"description":"Size: L"},"url":"https://www.weirdfish.co.uk/p/men/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675?c=174&s=5"},{"@type":"Offer","price":55,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.5564092+01:00","availability":"InStock","itemOffered":{"description":"Size: M"},"url":"https://www.weirdfish.co.uk/p/men/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675?c=174&s=4"},{"@type":"Offer","price":55,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.5564092+01:00","availability":"InStock","itemOffered":{"description":"Size: S"},"url":"https://www.weirdfish.co.uk/p/men/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675?c=174&s=3"},{"@type":"Offer","price":55,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:20.5564092+01:00","availability":"InStock","itemOffered":{"description":"Size: XL"},"url":"https://www.weirdfish.co.uk/p/men/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675?c=174&s=6"}],"pageUri":"https://www.weirdfish.co.uk/p/new-arrivals/mens/i/ares-bamboo-popover-graphic-hoodie-pagoda-blue-18675","category":["grocery"],"composition":"67% Bamboo, 28% Cotton, 5% Spandex","isOrganic":false,"isVegan":false,"isVegetarian":false},
    {"@context":"http://schema.org/","@type":"Product","name":"Hermes Bamboo Joggers Dark Olive","url":"https://www.weirdfish.co.uk/p/men/i/hermes-bamboo-joggers-dark-olive-18533","image":["https://wf-img.global.ssl.fastly.net/700/56273.jpg","https://wf-img.global.ssl.fastly.net/700/56274.jpg","https://wf-img.global.ssl.fastly.net/700/56275.jpg","https://wf-img.global.ssl.fastly.net/700/56277.jpg"],"description":"Once you put on these Hermes bamboo joggers you aren't going to want to take them off! They are so soft and comfortable, they make great trousers to lounge around the house in, but thanks to bamboo's natural moisture wicking properties, they are also great for exercise. With a comfortable, elasticated waistband and draw cord, slightly tapered legs with a cuff, and hand slip pockets, these joggers will be great pitch side or sofa side. whatever you are up to.","brand":"Weird Fish","mpn":"9744","sku":"18533","color":"Dark Olive","productID":"18533","itemCondition":"NewCondition","aggregateRating":{"@type":"AggregateRating","ratingValue":4.48780487804878,"reviewCount":41},"offers":[{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:23.1591528+01:00","availability":"InStock","itemOffered":{"description":"Size: 30"},"url":"https://www.weirdfish.co.uk/p/men/i/hermes-bamboo-joggers-dark-olive-18533?c=611&s=26"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:23.1591528+01:00","availability":"InStock","itemOffered":{"description":"Size: 32"},"url":"https://www.weirdfish.co.uk/p/men/i/hermes-bamboo-joggers-dark-olive-18533?c=611&s=27"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:23.1591528+01:00","availability":"InStock","itemOffered":{"description":"Size: 34"},"url":"https://www.weirdfish.co.uk/p/men/i/hermes-bamboo-joggers-dark-olive-18533?c=611&s=28"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:23.1591528+01:00","availability":"InStock","itemOffered":{"description":"Size: 36"},"url":"https://www.weirdfish.co.uk/p/men/i/hermes-bamboo-joggers-dark-olive-18533?c=611&s=29"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:23.1591528+01:00","availability":"InStock","itemOffered":{"description":"Size: 38"},"url":"https://www.weirdfish.co.uk/p/men/i/hermes-bamboo-joggers-dark-olive-18533?c=611&s=30"},{"@type":"Offer","price":40,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:23.1591528+01:00","availability":"InStock","itemOffered":{"description":"Size: 40"},"url":"https://www.weirdfish.co.uk/p/men/i/hermes-bamboo-joggers-dark-olive-18533?c=611&s=31"}],"pageUri":"https://www.weirdfish.co.uk/p/new-arrivals/mens/i/hermes-bamboo-joggers-dark-olive-18533","category":["wellness"],"isOrganic":false,"isVegan":false,"isVegetarian":false},
    {"@context":"http://schema.org/","@type":"Product","name":"Paros Printed Bamboo T-Shirt Turmeric","url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-turmeric-18756","image":["https://wf-img.global.ssl.fastly.net/700/61577.jpg","https://wf-img.global.ssl.fastly.net/700/61471.jpg","https://wf-img.global.ssl.fastly.net/700/61578.jpg","https://wf-img.global.ssl.fastly.net/700/61580.jpg"],"description":"This bamboo men's t-shirt is the perfect graphic tee bringing together the mountains, the oceans and our urban world.","brand":"Weird Fish","mpn":"10049","sku":"18756","color":"Tumeric","productID":"18756","itemCondition":"NewCondition","offers":[{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:24.0740918+01:00","availability":"InStock","itemOffered":{"description":"Size: 2XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-turmeric-18756?c=753&s=7"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:24.0740918+01:00","availability":"InStock","itemOffered":{"description":"Size: 3XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-turmeric-18756?c=753&s=8"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:24.0740918+01:00","availability":"InStock","itemOffered":{"description":"Size: 4XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-turmeric-18756?c=753&s=9"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:24.0740918+01:00","availability":"InStock","itemOffered":{"description":"Size: 5XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-turmeric-18756?c=753&s=10"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:24.0740918+01:00","availability":"InStock","itemOffered":{"description":"Size: L"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-turmeric-18756?c=753&s=5"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:24.0740918+01:00","availability":"InStock","itemOffered":{"description":"Size: M"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-turmeric-18756?c=753&s=4"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:24.0740918+01:00","availability":"InStock","itemOffered":{"description":"Size: S"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-turmeric-18756?c=753&s=3"},{"@type":"Offer","price":25,"priceCurrency":"GBP","priceValidUntil":"2022-05-12T15:11:24.0740918+01:00","availability":"InStock","itemOffered":{"description":"Size: XL"},"url":"https://www.weirdfish.co.uk/p/men/i/paros-printed-bamboo-t-shirt-turmeric-18756?c=753&s=6"}],"pageUri":"https://www.weirdfish.co.uk/p/new-arrivals/mens/i/paros-printed-bamboo-t-shirt-turmeric-18756","category":[],"composition":"60 % bamboo, 36 % cotton, 4 % elastane","isOrganic":false,"isVegan":false,"isVegetarian":false},
  ];
  
  return (
    <>
      <header className={headerStyle}>
        <Container>
          <input className={searchInputStyle} placeholder="Type a product name to begin" value={searchString} onChange={e => {
              query.set('q', e.target.value);
              changeQueryString(query, 'Product Search', history);
              setSearch(e.target.value)
            }
          } />
          <div className={resultsSummaryStyle}>Got {numResults} Results in {timeTaken}</div>
        </Container>
      </header>
      <main>
        <Container>
          { results.map(result => <SearchResult key={result.pageUri} result={result} />) }
        </Container>
      </main>
    </>
  );
}

export default Search;
