import { linkArray } from "../main.js";

function dozeAndPriceRow(title) {
  let dozeAndPriceRows = [];
  for (doze in title.doze_and_price) {
    dozeAndPriceRows.push(
   `<div class="doze-and-price-row">
        <span class="doze">${doze}</span>
        <span class="price">${title.doze_and_price[doze]}</span>
    </div>`);
  }
  return dozeAndPriceRows.join("");
}

function pricingTableMaker(pricingTitles) {
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
        <h4 class="pricing-sub-heading">${title.doze_type} and Price</h4>
        <div class="doze-and-price">
        ${dozeAndPriceRow(title)}    
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
      let pricingTitles = dataArray.filter(
        (title) => title.pricing_table === true
      );
      let pricingTables = pricingTableMaker(pricingTitles);
      pricingRender(pricingTables);
    })
);
