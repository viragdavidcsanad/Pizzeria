const dataLinks = [
  "../data/currency.json",
  "../data/appetizer.json",
  "../data/soup.json",
  "../data/pizza.json",
  "../data/pasta.json",
  "../data/salad.json",
  "../data/dessert.json",
  "../data/drink.json",
];

async function getData(dataLinks) {
  const dataArray = [];
  for (let link of dataLinks) {
    await fetch(link)
      .then((data) => data.json())
      .then((jsonData) => dataArray.push(jsonData))
      .catch((error) => console.table("COUGHT ERROR:", error));
  }
  return dataArray;
}

export default await getData(dataLinks);