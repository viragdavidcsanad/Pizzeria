const dataLinks = [
  "./data/Preferences.json",
  "./data/Appetizer.json",
  "./data/Soup.json",
  "./data/Pizza.json",
  "./data/Pasta.json",
  "./data/Salad.json",
  "./data/Dessert.json",
  "./data/Drink.json",
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
