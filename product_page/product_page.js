import allData from "../get_data/get_data.js";

const $productPage = document.querySelector(".js_product_page");
const $body = document.querySelector("body");

const closeProductPage = () => {
  $productPage.classList.remove(
    "js_active_product_page",
    "active-product-page"
  );
  $body.removeEventListener("wheel", noScroll);
};

const closeClickEvent = () => {
  const $productPageCloser = document.querySelector(".close-product-page");
  $productPageCloser.addEventListener("click", closeProductPage);
};

function noScroll(Event) {
  Event.preventDefault();
}

const productPageActivator = () => {
  $productPage.classList.add("js_active_product_page", "active-product-page");
  $body.addEventListener("wheel", noScroll, {passive: false});
  closeClickEvent();
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
                               <h2>${productData.name}</h2>
                               <img class="product-page-image" src="${productData.image_link}" alt="image of ${productData.name}">
                               <p>${productData.ingredients}</p>
                               <p class="close-product-page">BEZÁRÁS</p>
                            </section>`;
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
    ...document.querySelectorAll(".js_product_page_link")
  ];
  $linksToProductPage.map((link) =>
    link.addEventListener("click", selectProduct)
  );
};

clickEvent();
