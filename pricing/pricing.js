function pricingTableMaker(pricingTitles) {
  let pricingTables = pricingTitles
    .map(
      (title) => `<div class="pricing-table">
    <a href="#" class="pricing-link">
      <div class="pricing-content">
        <h4 class="pricing-heading">${title.name}</h4>
        <div class="pricing-image-box">
          <img src="${title.image_link}" alt="pizza picture" class="pricing-image" />
        </div>
        <p class="pricing-table-text">${title.ingredients}</p>
        <h4 class="pricing-sub-heading">Size and Price</h4>
        <div class="size-and-price">
          <div class="small size-and-price-row">
            <span class="small-size size">9"</span>
                <span class="small-price price">${title.small_price}</span>
          </div>
          <div class="large size-and-price-row">
            <span class="large-size size">14"</span>
                <span class="large-price price">${title.large_price}</span>
          </div>
          <div class="xlarge size-and-price-row">
            <span class="xlarge-size xlarge-size size">18"</span>
                <span class="xlarge-price xlarge-price price">${title.x_large_price}</span>
          </div>
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

fetch("./data/pizza.json")
  .then((data) => data.json())
  .then((dataArray) => {
    let pricingTitles = dataArray.filter(
      (title) => title.pricing_table
    );
    let pricingTables = pricingTableMaker(pricingTitles);
    pricingRender(pricingTables);
  });
