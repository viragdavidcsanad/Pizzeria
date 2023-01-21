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
let i;

// ==================== ARRAYS AND CLASSLISTS ========================
$navItems = [...$navItems];
for (i in $navItems) {
  $navItemsClasses.push($navItems[i].classList);
}
$foodMenuButtons = [...$foodMenuButtons];
$foodMenuPages = [...$foodMenuPages];
for (let menuPage in $foodMenuPages) {
  $foodMenuPagesClasses.push($foodMenuPages[menuPage].classList);
}
// *********************************************************************
// ======================= FUNCTIONS AND EVENTS ========================
// *********************************************************************
// ========== HEADER SCROLL EFFECT ON LOGO AND NAVIGATION ==============

function scrolledHeader() {
  if (
    document.body.scrollTop > 130 ||
    document.documentElement.scrollTop > 130
  ) {
    $logo.classList.add("scrolled-logo");
    $navBar.classList.add("scrolled-nav-bar");
    $hamburgerMenu.classList.add("scrolled-hamburger-menu");
    for (i in $navItemsClasses) {
      $navItemsClasses[i].add("scrolled-nav-item");
    }
  } else {
    $logo.classList.remove("scrolled-logo");
    $navBar.classList.remove("scrolled-nav-bar");
    $hamburgerMenu.classList.remove("scrolled-hamburger-menu");
    for (i in $navItemsClasses) {
      $navItemsClasses[i].remove("scrolled-nav-item");
    }
    $navBar.classList.remove("shifted-nav-bar");
    $hamburgerMenu.classList.remove("shifted-hamburger-menu");
    $bar1.classList.remove("shifted-bar1");
    $bar2.classList.remove("shifted-bar2");
    $bar3.classList.remove("shifted-bar3");
    for (i in $navItemsClasses) {
      $navItemsClasses[i].remove("shifted-nav-item");
    }
  }
}

window.onscroll = function () {
  scrolledHeader();
};

// =========================== HAMBURGER MENU SHIFT =========================

function menuShifter() {
  $navBar.classList.toggle("shifted-nav-bar");
  $hamburgerMenu.classList.toggle("shifted-hamburger-menu");
  $bar1.classList.toggle("shifted-bar1");
  $bar2.classList.toggle("shifted-bar2");
  $bar3.classList.toggle("shifted-bar3");
  for (i in $navItemsClasses) {
    $navItemsClasses[i].toggle("shifted-nav-item");
  }
}

$hamburgerMenu.onclick = function () {
  menuShifter();
};

// ======================== FOOD AND DRINK MENU ============================

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
      "active-menu-page",
      "after-menu-page",
      "before-menu-page"
    );
    if (pageIndex < eventTargetIndex) {
      $foodMenuPagesClasses[pageIndex].add("before-menu-page");
    } else if (pageIndex > eventTargetIndex) {
      $foodMenuPagesClasses[pageIndex].add("after-menu-page");
    } else {
      $foodMenuPagesClasses[pageIndex].add("js_active_menu_page active-menu-page");
    }
  }
  foodMenuHeight();
}

for (let button of $foodMenuButtons) {
  button.addEventListener("click", foodMenuTurner);
}
