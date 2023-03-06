import { linkArray } from "../main.js";

let $foodMenuHeadings;
let $foodMenuHeadingsArray;
const $foodMenuSelector = document.querySelector(".js_menu_selector");

const vegetarianOrVeganFilter = (jsonData) => {
  if ($foodMenuSelector.value === "menu") {
    return jsonData[3].products;
  } else if ($foodMenuSelector.value === "vegetarian") {
    const vegetarianFilteredData = jsonData[3].products.filter(
      (product) => product.vegetarian
    );
    return vegetarianFilteredData;
  } else if ($foodMenuSelector.value === "vegan") {
    const veganFilteredData = jsonData[3].products.filter(
      (product) => product.vegan
    );
    return veganFilteredData;
  }
};

const renderFoodMenuProducts = (jsonData, subCategory) => {
  let foodMenuProducts = "";
  const data = vegetarianOrVeganFilter(jsonData);
  const subCategoryProducts = data.filter((product) => {
    product.product_sub_category === subCategory;
  });
  subCategoryProducts.map((product) => {
    foodMenuProducts += `<div class="food-menu-product-table">
                           <h4 class="food-menu-product-heading">${product.name}</h4>
                           <div class="food-menu-product-image-box">
                             <img class="food-menu-product-image" src="${product.image_link}">
                           </div>
                           <div class="food-menu-table-ingredients">
                           ${product.ingredients}
                           </div>
                         </div>`;
  });
  return foodMenuProducts;
};

const renderSubCategories = (jsonData) => {
  const subCategoryArray = jsonData[1].sub_category;
  let subCategories = "";
  subCategoryArray.map((subCategory) => {
    if (subCategory === null) {
      subCategories += `${renderFoodMenuProducts(jsonData, subCategory)}`;
    } else if (renderFoodMenuProducts(jsonData, subCategory) === "") {
      return;
    } else {
      subCategories += `<div>
                          <h4 class="food-menu-sub-category">${subCategory}</h4>
                          ${renderFoodMenuProducts(jsonData, subCategory)}
                        </div>`;
    }
  });
  return subCategories;
};

const renderHeadingsAndPages = (jsonData) => {
  const category = jsonData[0].category;
  if (renderSubCategories(jsonData) === "") {
    return;
  } else {
    document.querySelector(
      ".js_food_menu_headings"
    ).innerHTML += `<button class="food-menu-heading ${category} js_food_menu_heading">${category}</button>`;
    document.querySelector(
      ".js_food_menu_pages"
    ).innerHTML += `<div class="food-menu-page ${category} js_food_menu_page">
                          <h3 class="food-menu-category">${category}</h3>
                          ${renderSubCategories(jsonData)}
                        </div>`;
  }
};

const clickEffect = () => {
  document
    .querySelector(".js_food_menu_headings")
    .addEventListener("click", foodMenuTurner);
};

const selectedHeadingStyle = (Event) => {
  let previousSelectedHeading = document.querySelector(".selected-heading");
  if (previousSelectedHeading) {
    previousSelectedHeading.classList.remove("selected-heading");
  }
  Event.target.classList.add("selected-heading");
};

const foodMenuHeight = () => {
  if (document.querySelector(".js_active_menu_page") === null) {
    return;
  }
  let menuHeight = document.querySelector(".js_active_menu_page").clientHeight;
  document
    .querySelector(".js_food_menu_pages")
    .setAttribute("style", `height: ${menuHeight + 60}px`);
};

const foodMenuTurner = (Event) => {
  if (Event.target === document.querySelector(".js_food_menu_headings")) {
    return;
  }
  $foodMenuHeadings = document.querySelectorAll(".js_food_menu_heading");
  $foodMenuHeadingsArray = [...$foodMenuHeadings];
  const $foodMenuPages = document.querySelectorAll(".js_food_menu_page");
  const $foodMenuPagesArray = [...$foodMenuPages];
  let $foodMenuPagesClasses = [];
  $foodMenuPagesArray.map((menuPage) =>
    $foodMenuPagesClasses.push(menuPage.classList)
  );
  let eventTargetIndex = $foodMenuHeadingsArray.indexOf(Event.target);
  for (let pageIndex in $foodMenuPagesClasses) {
    $foodMenuPagesClasses[pageIndex].remove(
      "js_active_menu_page",
      "active-menu-page",
      "after-menu-page",
      "before-menu-page"
    );
    if (pageIndex < eventTargetIndex) {
      $foodMenuPagesClasses[pageIndex].add("before-menu-page");
    } else if (pageIndex > eventTargetIndex) {
      $foodMenuPagesClasses[pageIndex].add("after-menu-page");
    } else {
      $foodMenuPagesClasses[pageIndex].add(
        "js_active_menu_page",
        "active-menu-page"
      );
    }
  }
  selectedHeadingStyle(Event);
  foodMenuHeight();
};

const foodMenuChangingEffect = (jsonData) => {
  $foodMenuSelector.addEventListener(
    "change",
    renderHeadingsAndPages(jsonData)
  );
};

linkArray.map((link) =>
  fetch(link)
    .then((rawData) => rawData.json())
    .then((jsonData) => {
      clickEffect();
      foodMenuChangingEffect(jsonData);
      renderHeadingsAndPages(jsonData);
    })
);

const resizeEffect = () => window.addEventListener("resize", foodMenuHeight);

resizeEffect();
