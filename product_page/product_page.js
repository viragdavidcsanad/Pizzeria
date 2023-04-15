const productLinks = [
  "../data/pizza.json",
  "../data/pasta.json",
  "../data/salad.json",
  "../data/drink.json",
];

const $productPage = document.querySelector(".js_product_page");
const focusEvent = () => $productPage.addEventListener("focus", fillProductData)

const productPageFetch = () => {
  productLinks.map((link) =>
    fetch(link)
      .then((data) => data.json())
      .then((jsonData) => {
        jsonData.products.filter(
          (product) => product.id === productPageEvent.currentTarget.id
        );
      })
  );
};



// console.log($pricingLinks());
