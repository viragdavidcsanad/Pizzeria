import allData from "../get_data/get_data.js";

const $productPage = document.querySelector(".js_product_page");
const renderProductData = () => {
  const $selectedProduct = document.querySelector(".js_selected_product");
  const productID = $selectedProduct.dataset.id;
  const productCategory = $selectedProduct.dataset.category;
  const categoryData = allData[productCategory];
  const productData = categoryData.products.filter(
    (product) => product.id === productID
  )[0];
  $productPage.innerHTML += `<form class="product-page-form">
                               <h2>${productData.name}</h2>
                               <img class="product-page-image" src="${productData.image_link}" alt="image of ${productData.name}">
                               <p>${productData.ingredients}</p>
                               
                             </form>`;
};

const focusEvent = () =>
  $productPage.addEventListener("focus", renderProductData);

focusEvent();
