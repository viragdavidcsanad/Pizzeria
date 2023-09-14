import allData from "../get_data/get_data.js";

const $productPage = document.querySelector(".js_product_page");
const $body = document.querySelector("body");
const selector = ["first_option", "second_option", "third_option"];

const selectorFunction = (selector) => {
  const invisibleOptions = selector.map(
    (option) => `<option value="${option}">${option}</option>`
  );
  const invisibleSelector = `<select class="product-page-invisible-selector">
                               ${invisibleOptions}
                              </select>`;
  const visibleOptions = {};
  return invisibleSelector;
};

const renderProductPage = () => {
  const $selectedProduct = document.querySelector(".js_selected_product");
  const productID = $selectedProduct.dataset.id;
  const productCategory = $selectedProduct.dataset.category;
  const categoryData = allData[productCategory];
  const productData = categoryData.products.filter(
    (product) => product.id === productID
  )[0];
  $productPage.innerHTML = `<section class="product-page-content">
                              <figure class="product-page-name-and-image">
                                <h2 class="product-page-name">
                                  ${productData.name}
                                </h2>
                                <img class="product-page-image"
                                src="${productData.image_link}" 
                                alt="image of ${productData.name}" 
                                />
                              </figure>
                              <p product-page-ingredients>
                                ${productData.ingredients}
                              </p>
                              <p class="product-page-portions-and-prices">
                                ${selectorFunction(selector)}
                              </p>
                              <p class="product-page-close js_product_page_close">close</p>
                            </section>`;
};

const closeProductPage = () => {
  $productPage.classList.remove(
    "js_active_product_page",
    "active-product-page"
  );
  $body.removeEventListener("wheel", noScroll);
  $body.removeEventListener("touchmove", noTouch);
};

const closeClickEvent = () => {
  const $productPageCloser = document.querySelector(".js_product_page_close");
  $productPageCloser.addEventListener("click", closeProductPage);
};

const noScroll = (Event) => {
  Event.preventDefault();
};

const noTouch = (Event) => {
  Event.preventDefault();
};

const defaultAction = () => {};

const productPageActivator = () => {
  $productPage.classList.add("js_active_product_page", "active-product-page");
  $body.addEventListener("wheel", noScroll, { passive: false });
  $body.addEventListener("touchmove", noTouch, { passive: false });
  $productPage.addEventListener("wheel", defaultAction, { passive: false });
  $productPage.addEventListener("touchmove", defaultAction, { passive: false });
  closeClickEvent();
};

const selectProduct = (Event) => {
  const $selectedProducts = [
    ...document.querySelectorAll(".js_selected_product"),
  ];
  if ($selectedProducts) {
    $selectedProducts.map((selectedProduct) =>
      selectedProduct.classList.remove("js_selected_product")
    );
  }
  Event.currentTarget.classList.add("js_selected_product");
  renderProductPage();
  productPageActivator();
};

const clickEvent = () => {
  const $linksToProductPage = [
    ...document.querySelectorAll(".js_product_page_link"),
  ];
  $linksToProductPage.map((link) =>
    link.addEventListener("click", selectProduct)
  );
};

clickEvent();
