const dataLinks = [
  "../data/currency.json",
  "../data/appetizer.json",
  "../data/soup.json",
  "../data/pizza.json",
  "../data/pasta.json",
  "../data/salad.json",
  "../dessert.json",
  "../data/drink.json",
];

const link = "../data/pizza.json";

const jsonData = async () => Promise.allSettled fetch(link)
  .then((data) => data.json())
  .catch((error) => console.table(error));

// export default await jsonData;
