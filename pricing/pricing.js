import allData from "../get_data/get_data.js";
const currency = allData.currency;
const foodCategories = allData.categories;
const filteredCategory = foodCategories.filter(
  (category) => allData[category].products
);
const offeredProducts = () => {
  const oProducts = [];
  filteredCategory.map((category) =>
    allData[category].products.map((product) => {
      if (product.pricing_table) {
        oProducts.push(product);
      }
    })
  );
  return oProducts;
};

console.log(offeredProducts());

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

const dataAttributes = (title) => {
  const productData = "";
};

const portionAndPriceRow = (title) => {
  const portionsCentralObject = allData.filter(
    (data) => data.portions
  ).portions;
  const portionsProductObject = title.portions;
  const portionsObject = () => {
    if (portionsProductObject === undefined) {
      return portionsCentralObject;
    } else {
      return portionsProductObject;
    }
  };
  let portionAndPriceRows = "";
  for (let portion in title.prices) {
    portionAndPriceRows += `<div class="portion-and-price-row">
                              <span class="portion">${portion}</span>
                              <span class="portion-content">
                                ${portionsObject()[portion]}
                              </span>
                              <span class="price">
                                ${currency}${title.prices[portion]}
                              </span>
                            </div>`;
  }
  return portionAndPriceRows;
};

const pricingTableMaker = () => {
  let pricingTables = "";
  offeredProducts().map(
    (title) =>
      (pricingTables += `<div class="pricing-table">
                          <a href="./index.html#product-page" class="pricing-link js_pricing_link" id="${
                            title.id
                          }" ${dataAttributes(title)}
                          }>
                            <div class="pricing-content">
                              <h4 class="pricing-heading">${title.name}</h4>
                              <div class="pricing-image-box">
                                <img src="${
                                  title.image_link
                                }" alt="pizza picture" class="pricing-image" />
                              </div>
                              <p class="pricing-table-text">
                                ${title.ingredients}
                              </p>
                              <h4 class="pricing-sub-heading">Prices</h4>
                              <div class="portion-and-price">
                                ${portionAndPriceRow(title)}    
                              </div>
                              <div class="pricing-table-number">
                                № ${title.number}
                              </div>
                            </div>
                          </a>
                        </div>`)
  );
  return pricingTables;
};

const renderPricing = (pricingTables) => {
  $pricingHolder.innerHTML += pricingTables;
};

const specialOffers = () => {
  const pricingTables = pricingTableMaker();
  renderPricing(pricingTables);
  pricingClickEvent();
};

specialOffers();
