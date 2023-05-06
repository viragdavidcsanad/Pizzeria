import allData from "../get_data/get_data.js";

console.log(allData[3]);

console.log(allData);

const linksOfProducts = [
  "./data/pizza.json",
  "./data/pasta.json",
  "./data/salad.json",
  "./data/drink.json",
];
const currencyLink = "./data/currency.json";
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

const dataAttributes = (title, currency, dataArray) => {
  const productData = "";
};

const portionAndPriceRow = (title, dataArray, currency) => {
  const portionsCentralObject = dataArray.filter((data) => data.portions)[0]
    .portions;
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

const pricingTableMaker = (pricingTitles, dataArray, currency) => {
  let pricingTables = "";
  pricingTitles.map(
    (title) =>
      (pricingTables += `<div class="pricing-table">
                          <a href="./index.html#product-page" class="pricing-link js_pricing_link" id="${
                            title.id
                          }" ${dataAttributes(title, currency, dataArray)}
                          }>
                            <div class="pricing-content">
                              <h4 class="pricing-heading">${title.name}</h4>
                              <div class="pricing-image-box">
                                <img src="${
                                  title.image_link
                                }" alt="pizza picture" class="pricing-image" />
                              </div>
                              <p class="pricing-table-text">${
                                title.ingredients
                              }</p>
                              <h4 class="pricing-sub-heading">Prices</h4>
                              <div class="portion-and-price">
                              ${portionAndPriceRow(
                                title,
                                dataArray,
                                currency
                              )}    
                              </div>
                              <div class="pricing-table-number">№ ${
                                title.number
                              }</div>
                            </div>
                          </a>
                        </div>`)
  );
  return pricingTables;
};

const renderPricing = (pricingTables) => {
  $pricingHolder.innerHTML += pricingTables;
};

const fetchAndRenderProducts = (currency) => {
  linksOfProducts.map(async (link) => {
    const data = await fetch(link);
    var dataArray = await data.json();
    const pricingTitles = dataArray
      .filter((data) => data.products)[0]
      .products.filter((title) => title.pricing_table === true);
    let pricingTables = pricingTableMaker(pricingTitles, dataArray, currency);
    renderPricing(pricingTables);
    pricingClickEvent();
  });
};

const fetchCurrency = async () => {
  try {
    const data = await fetch(currencyLink);
    const jsonData = await data.json();
    fetchAndRenderProducts(jsonData.currency);
  } catch {
    (error) => (document.innerHTML = error);
  }
};

fetchCurrency();
