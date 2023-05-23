import allData from "../get_data/get_data.js";

const $productPage = document.querySelector(".js_product_page");
const fillProductData = () => {
  const $selectedProduct = document.querySelector(".js_selected_product");
  console.log($selectedProduct.dataset.id);
};
const focusEvent = () =>
  $productPage.addEventListener("focus", fillProductData);

focusEvent();

// console.log($pricingLinks());
