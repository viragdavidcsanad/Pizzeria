// import { productPageEvent } from "../pricing/pricing.js";

// await import("../pricing/pricing.js").then(({ pricingClickEvent }) =>
//   console.log(pricingClickEvent)
// );

// const linkArray = [
//   "../data/pizza.json",
//   "../data/pasta.json",
//   "../data/salad.json",
//   "../data/drink.json",
// ];

// const productPageFetch = () => {
//   linkArray.map((link) =>
//     fetch(link)
//       .then((data) => data.json())
//       .then((jsonData) => {
//         jsonData.products.filter(
//           (product) => product.id === productPageEvent.currentTarget.id
//         );
//       })
//   );
// };

const $productPage = document.querySelector(".js_product_page");

const focusEvent = $productPage.addEventListener("focus", fillProductData)


const $pricingLinks = () => {
  if (document.querySelector(".js_product_page:focus")) {
    return [...document.querySelectorAll(".js_pricing_link")];
  }
};

console.log($pricingLinks());
