import { linkArray } from "../main.js";

let $foodMenuHeadingsArray;
const $headingsContainer = document.querySelector(".js_food_menu_headings");
const $pagesContainer = document.querySelector(".js_food_menu_pages");
const $foodMenuSelector = document.querySelector(".js_food_menu_selector");

const foodFilter = (jsonData) => {
  let filteredFood = [];
  const products = jsonData.filter((data) => data.products)[0].products;
  const value = $foodMenuSelector.value;
  const drink = products.filter(
    (product) => product.product_category === "drink"
  );
  if (drink.length > 0) {
    filteredFood = drink;
  } else if (value === "menu") {
    filteredFood = products;
  } else if (value === "seafood") {
    const seafoodFilteredData = products.filter((product) => product.seafood);
    filteredFood = seafoodFilteredData;
  } else if (value === "vegetarian") {
    const vegetarianFilteredData = products.filter(
      (product) => product.vegetarian || product.vegan
    );
    filteredFood = vegetarianFilteredData;
  } else if (value === "vegan") {
    const veganFilteredData = products.filter((product) => product.vegan);
    filteredFood = veganFilteredData;
  }
  return filteredFood;
};

const renderFoodMenuProducts = (jsonData, subcategory) => {
  let foodMenuProducts = "";
  const filteredFood = foodFilter(jsonData);
  const subcategoryProducts = filteredFood.filter(
    (product) => product.product_subcategory === subcategory
  );
  subcategoryProducts.map((product) => {
    foodMenuProducts += `<div class="food-menu-product-table js_food_menu_product_tables">
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

const renderSubcategories = (jsonData) => {
  const subcategoryArray = jsonData.filter((data) => data.subcategory)[0]
    .subcategory;
  let subcategories = "";
  subcategoryArray.map((subcategory) => {
    if (subcategory === "meat") {
      subcategories += `${renderFoodMenuProducts(jsonData, subcategory)}`;
    } else if (renderFoodMenuProducts(jsonData, subcategory) === "") {
      return;
    } else {
      subcategories += `<div class="food-menu-subcategory-table js_food_menu_subcategory_table">
                          <h4 class="food-menu-subcategory">${subcategory}</h4>
                          ${renderFoodMenuProducts(jsonData, subcategory)}
                        </div>`;
    }
  });
  return subcategories;
};

const renderHeadingsAndPages = (jsonData, index) => {
  const category = jsonData.filter((data) => data.category)[0].category;
  if (index === 0) {
    $headingsContainer.innerHTML = "";
    $pagesContainer.innerHTML = "";
  }
  if (renderSubcategories(jsonData) === "") {
    return;
  } else {
    $headingsContainer.innerHTML += `<button class="food-menu-heading ${category} js_food_menu_heading">${category}</button>`;
    $pagesContainer.innerHTML += `<div class="food-menu-page ${category} js_food_menu_page">
                                    <h3 class="food-menu-category">${category}</h3>
                                    ${renderSubcategories(jsonData)}
                                  </div>`;
  }
  foodMenuHeight();
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

const clickEffect = () => {
  document
    .querySelector(".js_food_menu_headings")
    .addEventListener("click", foodMenuTurner);
};

const renderFoodMenuSelector = (jsonData) => {
  const selectors = jsonData.filter((data) => data.selectors)[0].selectors;
  for (let selector in selectors) {
    if (selector === "menu") {
      $foodMenuSelector.innerHTML += `<option value="${selector}" class="food-menu-selector-option">${selectors[selector]}</option>`;
    } else
      $foodMenuSelector.innerHTML += `<option value="${selector}" class="food-menu-selector-option">${selectors[selector]} menu</option>`;
  }
};

const fetchFoodMenu = () => {
  linkArray.map((link, index) =>
    fetch(link)
      .then((rawData) => rawData.json())
      .then((jsonData) => {
        if (jsonData.filter((data) => data.selectors).length > 0) {
          renderFoodMenuSelector(jsonData);
        } else {
          renderHeadingsAndPages(jsonData);
          clickEffect();
          foodMenuChangingEffect(jsonData, index);
        }
      })
  );
};

fetchFoodMenu();

const resizeEffect = () => window.addEventListener("resize", foodMenuHeight);

resizeEffect();
