import allData from "../get_data/get_data.js";

const $productPage = document.querySelector(".js_product_page");
const fillProductData = () => console.log($productPage.dataset.id);
const focusEvent = () =>
  $productPage.addEventListener("focus", fillProductData);

// console.log($pricingLinks());
