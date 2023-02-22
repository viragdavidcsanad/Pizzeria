import { linkArray } from "../main.js";

let $foodMenuHeadings;
let $foodMenuHeadingsArray;

linkArray.map((link) =>
  fetch(link)
    .then((rawData) => rawData.json())
    .then((jsonData) => {
      toTextAndRenderHeadingButtons(jsonData);
      $foodMenuHeadings = document.querySelectorAll(".js_food_menu_heading");
      $foodMenuHeadingsArray = [...$foodMenuHeadings];
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
  $foodMenuHeadingsArray.map((heading) =>
    heading.addEventListener("click", foodMenuTurner)
  );
};

const foodMenuTurner = (Event) => {
  const $foodMenuPages = document.querySelectorAll(".js_food_menu_page");
  const $foodMenuPagesArray = [...$foodMenuPages];
  let $foodMenuPagesClasses = [];
  $foodMenuPagesArray.map((menuPage) =>
    $foodMenuPagesClasses.push(menuPage.classList)
  );
  let eventTargetIndex = $foodMenuHeadingsArray.indexOf(Event.target);
  let previousSelected = document.querySelector(".selected-food-menu-heading");
  if (previousSelected) {
    previousSelected.classList.remove("selected-food-menu-heading");
  }
  Event.target.classList.add("selected-food-menu-heading");
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

foodMenuHeight();

const resizeEffect = () => window.addEventListener("resize", foodMenuHeight);

resizeEffect();
