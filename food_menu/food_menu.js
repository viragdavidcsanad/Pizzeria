import { linkArray } from "../main.js";

let $foodMenuHeadings;
let $foodMenuHeadingsArray;

linkArray.map((link) =>
  fetch(link)
    .then((rawData) => rawData.json())
    .then((jsonData) => {
      toTextAndRenderHeadingButtons(jsonData);
      clickEffect();
    })
);

const toTextAndRenderHeadingButtons = (jsonData) => {
  jsonData
    .filter((jsonFile) => jsonFile.category)
    .map(({ category }) => {
      document.querySelector(
        ".js_food_menu_headings"
      ).innerHTML += `<button class="food-menu-heading ${category} js_food_menu_heading">${category}</button>`;
    });
};

const clickEffect = () => {
  document
    .querySelector(".js_food_menu_headings")
    .addEventListener("click", foodMenuTurner);
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
  let previousSelectedHeading = document.querySelector(".selected-heading");
  if (previousSelectedHeading) {
    previousSelectedHeading.classList.remove("selected-heading");
  }
  Event.target.classList.add("selected-heading");
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
  foodMenuHeight();
};

const foodMenuHeight = () => {
  let menuHeight = document.querySelector(".js_active_menu_page").clientHeight;
  document
    .querySelector(".js_food_menu_pages")
    .setAttribute("style", `height: ${menuHeight + 60}px`);
};

// foodMenuHeight();

const resizeEffect = () => window.addEventListener("resize", foodMenuHeight);

resizeEffect();
