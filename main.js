const $logo = document.querySelector(".js_logo");
const $navBar = document.querySelector(".js_nav_bar");
const $hamburgerMenu = document.querySelector(".js_hamburger_menu");
const $bar1 = document.querySelector(".js_bar1");
const $bar2 = document.querySelector(".js_bar2");
const $bar3 = document.querySelector(".js_bar3");
const $navLinks = document.querySelectorAll(".js_nav_link");

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

// HEADER SCROLL EFFECT

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

// HAMBURGER MENU SHIFT

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

// FOOD MENU

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
  let pricingTables = pricingTitles
    .map(
      (title) => `<div class="pricing-table">
        <a href="#" class="pricing-link">
          <div class="pricing-content">
            <h4 class="pricing-heading">${title.name}</h4>

            <div class="pricing-image-box">
                <img src="${title.image_link}" alt="pizza picture"
                  class="pricing-image" />
            </div>

            <p class="pricing-table-text">${title.ingredients}</p>

            <h4 class="pricing-sub-heading">Size and Price</h4>

            <div class="size-and-price">
              <div class="small size-and-price-row">
                <span class="small-size size">9"<span>
                    <span class="small-price price">${title.small_price}<span>
              </div>

              <div class="large size-and-price-row">
                <span class="large-size size">14"<span>
                    <span class="large-price price">${title.large_price}<span>
              </div>

              <div class="xlarge-first xlarge size-and-price-row">
                <span class="xlarge-size-one xlarge-size size">18"<span>
                    <span class="xlarge-price-one xlarge-price price">${title.x_large_price}<span>
              </div>
            </div>
          </div>
        </a>
      </div>`
    )
    .join("");
  return pricingTables;
}

function tablesOnTheSite(pricingTables) {
  let target = document.querySelector(".js_pricing_tables");
  target.innerHTML += pricingTables;
}

fetch("./data.json")
  .then((data) => data.json())
  .then((dataArray) => {
    let pricingTitles = dataArray.filter(
      (title) => title.pricing_table === true
    );
    let pricingTables = pricingTableMaker(pricingTitles);
    tablesOnTheSite(pricingTables);
  });
