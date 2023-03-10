import { linkArray } from "../main.js";

function portionAndPriceRow(title, dataArray) {
  const currency = dataArray.filter((data) => data.currency)[0].currency;
  const portionsObject = dataArray.filter((data) => data.portions)[0].portions;
  let portionAndPriceRows = [];
  for (let portion in title.prices) {
    portionAndPriceRows.push(
      `<div class="portion-and-price-row">
        <span class="portion">${portion}</span>
        <span class="portion-content">${portionsObject[portion]}</span>
        <span class="price">${currency}${title.prices[portion]}</span>
    </div>`
    );
  }
  return portionAndPriceRows.join("");
}

function pricingTableMaker(pricingTitles, dataArray) {
  let pricingTables = pricingTitles
    .map(
      (title) => `<div class="pricing-table">
    <a href="#" class="pricing-link">
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
        ${portionAndPriceRow(title, dataArray)}    
        </div>
      </div>
    </a>
  </div>`
    )
    .join("");
  return pricingTables;
}

function pricingRender(pricingTables) {
  let target = document.querySelector(".js_pricing_tables");
  target.innerHTML += pricingTables;
}

linkArray.map((link) =>
  fetch(link)
    .then((data) => data.json())
    .then((dataArray) => {
      if (dataArray.filter((data) => data.selectors).length > 0) {
      } else {
        const pricingTitles = dataArray
          .filter((data) => data.products)[0]
          .products.filter((title) => title.pricing_table === true);
        let pricingTables = pricingTableMaker(pricingTitles, dataArray);
        pricingRender(pricingTables);
      }
    })
);
