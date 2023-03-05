import { linkArray } from "../main.js";

let $foodMenuHeadings;
let $foodMenuHeadingsArray;

linkArray.map((link) =>
  fetch(link)
    .then((rawData) => rawData.json())
    .then((jsonData) => {
      renderHeadingsAndPages(jsonData);
      clickEffect();
    })
);

const subCategories = (jsonData, index) => {
  const subCategoryObject = jsonData.filter(
    (jsonFile) => jsonFile.sub_category
  );
  const subCategoryArray = subCategoryObject[index].sub_category;
  let renderSubCategories = "";
  subCategoryArray.map(
    (subCategory) =>
      (renderSubCategories += `<div class="sub-categories">
                                 <h4>${subCategory}</h4>
                               </div>`)
  );
  return renderSubCategories;
};

const renderHeadingsAndPages = (jsonData) => {
  jsonData
    .filter((jsonFile) => jsonFile.category)
    .map(({ category }, index) => {
      document.querySelector(
        ".js_food_menu_headings"
      ).innerHTML += `<button class="food-menu-heading ${category} js_food_menu_heading">${category}</button>`;
      document.querySelector(
        ".js_food_menu_pages"
      ).innerHTML += `<div class="food-menu-page ${category} js_food_menu_page">
                        <h3>${category}</h3>
                        ${subCategories(jsonData, index)}
                      </div>`;
    });
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

// foodMenuHeight();

const resizeEffect = () => window.addEventListener("resize", foodMenuHeight);

resizeEffect();
