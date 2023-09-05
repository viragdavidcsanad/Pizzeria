import allData from "../get_data/get_data.js";

const currency = allData.Currency;
const unitOfWeight = allData.Unit_Of_Weight;
const unitOfLength = allData.Unit_Of_Length;
const unitOfDrink = allData.Unit_Of_Drink;
const foodCategories = allData.Category;
const filteredCategories = foodCategories.filter(
  (category) => allData[category].products
);
const $pricingHolder = document.querySelector(".js_pricing_tables");

const drinkOrFoodUnit = (product) => {
  if (product.product_category === "Drink") {
    return unitOfDrink;
  } else return unitOfWeight;
};

const sizeOrNot = (productCategory, portion) => {
  const sizes = productCategory.sizes;
  if (productCategory.sizes) {
    return `<span class="portion-size">${sizes[portion]}${unitOfLength}</span>`;
  } else return "";
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
                                ${sizeOrNot(productCategory, portion)}
                                <span class="portion-weight">
                                  ${portionsObject()[portion]} 
                                  ${drinkOrFoodUnit(product)}
                                </span>
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
  pricingTable += `<div class="pricing-table pricing-link js_product_page_link" 
                   data-id="${product.id}" 
                   data-category="${productCategory.category}">
                    <div class="pricing-content">
                      <div class="pricing-heading-holder">
                        <p class="product-number">
                          <span class="numero">№</span>
                          ${product.number}
                        </p>
                        <h4 class="pricing-heading">${product.name}</h4>
                      </div>
                      <div class="pricing-image-box">
                        <img src="${product.image_link}" 
                        alt="pizza picture" 
                        class="pricing-image" />
                      </div>
                      <p class="pricing-table-text">
                        ${product.ingredients}
                      </p>
                      <h4 class="pricing-sub-heading">Prices</h4>
                      <div class="portion-and-price">
                        ${portionAndPriceRow(product, productCategory)}    
                      </div>
                      <p class="product-number below">
                        <span class="numero">№</span>
                        ${product.number}
                      </p>
                    </div>
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
};

specialOffers();
