const linksOfProducts = [
  "./data/pizza.json",
  "./data/pasta.json",
  "./data/salad.json",
  "./data/drink.json",
];

const currencyLink = "./data/currency.json";

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
                              <span class="portion-content">${portionsObject()[portion]}</span>
                              <span class="price">${currency}${title.prices[portion]}</span>
                            </div>`;
  }
  return portionAndPriceRows;
};

const pricingTableMaker = (pricingTitles, dataArray, currency) => {
  let pricingTables = pricingTitles
    .map(
      (title) => `<div class="pricing-table">
                    <a href="./product_page/product_page.html" class="pricing-link">
                      <div class="pricing-content">
                        <h4 class="pricing-heading">${title.name}</h4>
                        <div class="pricing-image-box">
                          <img src="${
                            title.image_link
                          }" alt="pizza picture" class="pricing-image" />
                        </div>
                        <p class="pricing-table-text">${title.ingredients}</p>
                        <h4 class="pricing-sub-heading">Prices</h4>
                        <div class="portion-and-price">
                        ${portionAndPriceRow(title, dataArray, currency)}    
                        </div>
                      </div>
                    </a>
                  </div>`
    )
    .join("");
  return pricingTables;
};

const renderPricing = (pricingTables) => {
  let target = document.querySelector(".js_pricing_tables");
  target.innerHTML += pricingTables;
};

const fetchAndRenderProducts = (currency) => {
  linksOfProducts.map((link) =>
    fetch(link)
      .then((data) => data.json())
      .then((dataArray) => {
        const pricingTitles = dataArray
          .filter((data) => data.products)[0]
          .products.filter((title) => title.pricing_table === true);
        let pricingTables = pricingTableMaker(
          pricingTitles,
          dataArray,
          currency
        );
        renderPricing(pricingTables);
      })
  );
};

const fetchCurrency = async () => {
  const data = await fetch(currencyLink);
  const jsonData = await data.json();
  fetchAndRenderProducts(jsonData.currency);
};

fetchCurrency();
