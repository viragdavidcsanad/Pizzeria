import allData from "../get_data/get_data.js";
const currency = allData.currency;
const foodCategories = allData.categories;
const filteredCategories = foodCategories.filter(
  (category) => allData[category].products
);

const $pricingHolder = document.querySelector(".js_pricing_tables");

const selectProduct = (Event) => {
  const $selectedProducts = () => [
    ...document.querySelectorAll(".js_selected_product"),
  ];
  if ($selectedProducts()) {
    $selectedProducts().map((selectedProduct) =>
      selectedProduct.classList.remove("js_selected_product")
    );
  }
  Event.currentTarget.classList.add("js_selected_product");
};

const pricingClickEvent = () => {
  const $pricingLinks = [...document.querySelectorAll(".js_pricing_link")];
  $pricingLinks.map((link) => link.addEventListener("click", selectProduct));
};

const portionAndPriceRow = (product, productCategory) => {
  const portionsCentralObject = productCategory.portions;
  const portionsProductObject = product.portions;
  const portionsObject = () => {
    if (portionsProductObject === undefined) {
      return portionsCentralObject;
    } else {
      return portionsProductObject;
    }
  };
  let portionAndPriceRows = "";
  for (let portion in product.prices) {
    portionAndPriceRows += `<div class="portion-and-price-row">
                              <span class="portion">${portion}</span>
                              <span class="portion-content">
                                ${portionsObject()[portion]}
                              </span>
                              <span class="price">
                                ${currency}${product.prices[portion]}
                              </span>
                            </div>`;
  }
  return portionAndPriceRows;
};

const pricingTableMaker = (product, productCategory) => {
  let pricingTable = "";
  pricingTable += `<div class="pricing-table">
                          <a href="./index.html#product-page" class="pricing-link js_pricing_link"  data-id="${product.id}">
                            <div class="pricing-content">
                              <h4 class="pricing-heading">${product.name}</h4>
                              <div class="pricing-image-box">
                                <img src="${
                                  product.image_link
                                }" alt="pizza picture" class="pricing-image" />
                              </div>
                              <p class="pricing-table-text">
                                ${product.ingredients}
                              </p>
                              <h4 class="pricing-sub-heading">Prices</h4>
                              <div class="portion-and-price">
                                ${portionAndPriceRow(
                                  product,
                                  productCategory
                                )}    
                              </div>
                              <div class="pricing-table-number">
                                № ${product.number}
                              </div>
                            </div>
                          </a>
                        </div>`;
  return pricingTable;
};

const renderPricing = (pricingTable) => {
  $pricingHolder.innerHTML += pricingTable;
};

const specialOffers = () => {
  filteredCategories.map((filteredCategory) =>
    allData[filteredCategory].products.map((product) => {
      if (product.pricing_table) {
        const productCategory = allData[filteredCategory];
        const pricingTable = pricingTableMaker(product, productCategory);
        renderPricing(pricingTable);
      }
    })
  );
  pricingClickEvent();
};

specialOffers();
