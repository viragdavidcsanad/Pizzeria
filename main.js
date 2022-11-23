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
    $hamburgerMenu.classList.add("js_scrolled_hamburger_menu");
    for (i in $navItemsClasses) {
      $navItemsClasses[i].add("js_scrolled_nav_item");
    }
  } else {
    $logo.classList.remove("js_scrolled_logo");
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

function foodMenuTurner(Event) {
  for (let onePageClasses of $foodMenuPagesClasses) {
    onePageClasses.remove("js_active_menu_page");
  }
  let eventTargetIndex = $foodMenuButtons.indexOf(Event.target);
  $foodMenuPagesClasses[eventTargetIndex].add("js_active_menu_page");
}

for (let button of $foodMenuButtons) {
  button.addEventListener("click", foodMenuTurner);
}

