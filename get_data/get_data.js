const dataLinks = [
  "./data/currency.json",
  "./data/categories.json",
  "./data/appetizer.json",
  "./data/soup.json",
  "./data/pizza.json",
  "./data/pasta.json",
  "./data/salad.json",
  "./data/dessert.json",
  "./data/drink.json",
];

async function getData(dataLinks) {
  let dataObject = {};
  for (let link of dataLinks) {
    await fetch(link)
      .then((data) => data.json())
      .then((jsonData) => {
        dataObject = { ...dataObject, ...jsonData };
      })
      .catch((error) => console.table("COUGHT ERROR:", error));
  }
  return dataObject;
}

export default await getData(dataLinks);
