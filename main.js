const $logo = document.querySelector(".js_logo");
const $navBar = document.querySelector(".js_nav_bar");
const $hamburgerMenu = document.querySelector(".js_hamburger_menu");
const $bar1 = document.querySelector(".js_bar1");
const $bar2 = document.querySelector(".js_bar2");
const $bar3 = document.querySelector(".js_bar3");

let $navItems = document.querySelectorAll(".js_nav_item");
let $navItemsClasses = [];
let $foodMenuButtons = document.querySelectorAll(".js_menu_button");
let $foodMenuPages = document.querySelectorAll(".js_menu_page");
let $foodMenuPagesClasses = [];

// ITERATORS
let i;

// ARRAYS AND CLASSLISTS
$navItems = [...$navItems];
for (i in $navItems) {
  $navItemsClasses.push($navItems[i].classList);
}

$foodMenuButtons = [...$foodMenuButtons];

$foodMenuPages = [...$foodMenuPages];
for (let menuPage in $foodMenuPages) {
  $foodMenuPagesClasses.push($foodMenuPages[menuPage].classList);
}

// FUNCTIONS AND EVENTS

function scrolledHeader() {
  if (
    document.body.scrollTop > 130 ||
    document.documentElement.scrollTop > 130
  ) {
    $logo.classList.add("js_scrolled_logo");
    $navBar.classList.add("js_scrolled_nav_bar");
    $hamburgerMenu.classList.add("js_scrolled_hamburger_menu");
    for (i in $navItemsClasses) {
      $navItemsClasses[i].add("js_scrolled_nav_item");
    }
  } else {
    $logo.classList.remove("js_scrolled_logo");
    $navBar.classList.remove("js_scrolled_nav_bar");
    $hamburgerMenu.classList.remove("js_scrolled_hamburger_menu");
    for (i in $navItemsClasses) {
      $navItemsClasses[i].remove("js_scrolled_nav_item");
    }
    $navBar.classList.remove("js_shifted_nav_bar");
    $hamburgerMenu.classList.remove("js_shifted_hamburger_menu");
    $bar1.classList.remove("js_shifted_bar1");
    $bar2.classList.remove("js_shifted_bar2");
    $bar3.classList.remove("js_shifted_bar3");
    for (i in $navItemsClasses) {
      $navItemsClasses[i].remove("js_shifted_nav_item");
    }
  }
}

window.onscroll = function () {
  scrolledHeader();
};

function menuShifter() {
  $navBar.classList.toggle("js_shifted_nav_bar");
  $hamburgerMenu.classList.toggle("js_shifted_hamburger_menu");
  $bar1.classList.toggle("js_shifted_bar1");
  $bar2.classList.toggle("js_shifted_bar2");
  $bar3.classList.toggle("js_shifted_bar3");
  for (i in $navItemsClasses) {
    $navItemsClasses[i].toggle("js_shifted_nav_item");
  }
}

$hamburgerMenu.onclick = function () {
  menuShifter();
};

function foodMenuHeight() {
  let menuHeight = document.querySelector(".js_active_menu_page").clientHeight;
  document
    .querySelector(".js_menu_pages")
    .setAttribute("style", `height: ${menuHeight + 60}px`);
}

foodMenuHeight();

function foodMenuTurner(Event) {
  let eventTargetIndex = $foodMenuButtons.indexOf(Event.target);
  for (let pageIndex in $foodMenuPagesClasses) {
    $foodMenuPagesClasses[pageIndex].remove(
      "js_active_menu_page",
      "js_after_menu_page",
      "js_before_menu_page"
    );
    if (pageIndex < eventTargetIndex) {
      $foodMenuPagesClasses[pageIndex].add("js_before_menu_page");
    } else if (pageIndex > eventTargetIndex) {
      $foodMenuPagesClasses[pageIndex].add("js_after_menu_page");
    } else {
      $foodMenuPagesClasses[pageIndex].add("js_active_menu_page");
    }
  }
  foodMenuHeight();
}

for (let button of $foodMenuButtons) {
  button.addEventListener("click", foodMenuTurner);
}

// PRICING TABLES

function pricingTableMaker(pricingTitles) {
  pricingTitles.map(`
  `);
}

fetch("./data.json")
  .then((data) => data.json())
  .then((dataObject) => {
    let dataArray = Object.values(dataObject);
    let pricingTitles = dataArray.filter(
      (menuItem) => menuItem.pricing_table === true
    );
    pricingTableMaker(pricingTitles);
  });
