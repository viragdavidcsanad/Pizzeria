// PRICING TABLES

const $pricingHtml = document.querySelector

function pricingTableMaker(pricingTitles) {
  let pricingTables = pricingTitles.map((title) => ``).join("");
  return pricingTables;
}

function tablesOnTheSite(pricingTables) {
  let target = document.querySelector(".js_pricing_tables");
  target.innerHTML += pricingTables;
}

fetch("./data.json")
  .then((data) => data.json())
  .then((dataArray) => {
    let pricingTitles = dataArray.filter(
      (title) => title.pricing_table === true
    );
    let pricingTables = pricingTableMaker(pricingTitles);
    tablesOnTheSite(pricingTables);
  });
