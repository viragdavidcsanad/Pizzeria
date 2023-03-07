import { linkArray } from "../main.js";

let $foodMenuHeadingsArray;
const $foodMenuSelector = document.querySelector(".js_menu_selector");
const $headingsContainer = document.querySelector(".js_food_menu_headings");
const $pagesContainer = document.querySelector(".js_food_menu_pages");

const foodFilter = () => {
  const $productTablesArray = [
    ...document.querySelectorAll(".js_food_menu_product_tables"),
  ];
  const $subCategoryTablesArray = [...document.querySelectorAll(".js_food_menu_sub_category_tables")];
  if ($foodMenuSelector === "seafood") {
    const $notSeaFoodArray = $productTablesArray.filter(
      (table) => !table.classList.contains("seafood")
    );
    $notSeaFoodArray.map((table) => table.classList.add("invisible"));
    const $notSeaFoodSubCategoryArray = $subCategoryTablesArray.filter((table) => !table.classList.contains("seafood"));
    $notSeaFoodSubCategoryArray.map((table) => table.classList.add("invisible"));
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
  // const data = vegetarianOrVeganFilter(jsonData);
  const subCategoryProducts = jsonData.products.filter(
    (product) => product.product_sub_category === subCategory
  );
  subCategoryProducts.map((product) => {
    foodMenuProducts += `<div class="food-menu-product-table ${product.seafood} ${product.vegetarian} ${product.vegan} js_food_menu_product_tables">
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
      subCategories += `<div class="food-menu-sub-category-table js_food_menu_sub_category_table">
                          <h4 class="food-menu-sub-category">${subCategory}</h4>
                          ${renderFoodMenuProducts(jsonData, subCategory)}
                        </div>`;
    }
  });
  return subCategories;
};

const renderHeadingsAndPages = (jsonData, index) => {
  const category = jsonData[0].category;
  if (renderSubCategories(jsonData) === "") {
    return;
  } else {
    if (index === 0) {
      $headingsContainer.innerHTML = "";
      $pagesContainer.innerHTML = "";
    }
    $headingsContainer.innerHTML += `<button class="food-menu-heading ${category} js_food_menu_heading">${category}</button>`;
    $pagesContainer.innerHTML += `<div class="food-menu-page ${category} js_food_menu_page">
                                    <h3 class="food-menu-category">${category}</h3>
                                    ${renderSubCategories(jsonData)}
                                  </div>`;
  }
  foodMenuHeight();
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
  const $pagesArray = [...$pagesContainer.children];
  const $activePage = document.querySelector(".js_active_menu_page");
  const menuHeight = () => {
    if ($activePage === null) {
      return $pagesArray.reduce(
        (accumulator, element) => accumulator + element.offsetHeight,
        0
      );
    } else return $activePage.offsetHeight;
  };
  return $pagesContainer.setAttribute(
    "style",
    `height: ${menuHeight() + 60}px`
  );
};

const foodMenuTurner = (Event) => {
  if (Event.target === document.querySelector(".js_food_menu_headings")) {
    return;
  }
  $foodMenuHeadingsArray = [
    ...document.querySelectorAll(".js_food_menu_heading"),
  ];
  const $foodMenuPagesArray = [
    ...document.querySelectorAll(".js_food_menu_page"),
  ];
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

const foodMenuChangingEffect = (jsonData, index) => {
  $foodMenuSelector.addEventListener("change", () => {
    renderHeadingsAndPages(jsonData, index);
  });
};

linkArray.map((link, index) =>
  fetch(link)
    .then((rawData) => rawData.json())
    .then((jsonData) => {
      renderHeadingsAndPages(jsonData);
      clickEffect();
      foodMenuChangingEffect(jsonData, index);
    })
);

const resizeEffect = () => window.addEventListener("resize", foodMenuHeight);

resizeEffect();
