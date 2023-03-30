import { productId } from "../pricing/pricing.js";

console.log(productId);

const linkArray = [
  "../data/pizza.json",
  "../data/pasta.json",
  "../data/salad.json",
  "../data/drink.json",
];

const productPageFetch = () => {
  linkArray.map((link) =>
    fetch(link)
      .then((data) => data.json())
      .then((jsonData) => {})
  );
};
