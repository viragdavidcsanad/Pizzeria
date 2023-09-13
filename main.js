// const linksOfProducts = [
//   "./data/pizza.json",
//   "./data/pasta.json",
//   "./data/salad.json",
//   "./data/drink.json",
// ];
// const currencyLink = "./data/currency.json";

// const currency = fetch(currencyLink)
//   .then((currencyData) => currencyData.json())
//   .then((jsonData) => jsonData.currency);

const $logo = document.querySelector(".js_logo");
const $navBar = document.querySelector(".js_nav_bar");
const $hamburgerMenu = document.querySelector(".js_hamburger_menu");
const $bar1 = document.querySelector(".js_bar1");
const $bar2 = document.querySelector(".js_bar2");
const $bar3 = document.querySelector(".js_bar3");
let $navItems = [...document.querySelectorAll(".js_nav_item")];
let $navItemsClasses = [];

$navItems.map((item) => $navItemsClasses.push(item.classList));

const scrolledHeader = () => {
  if (
    document.body.scrollTop > 75 ||
    document.documentElement.scrollTop > 75
  ) {
    $logo.classList.add("scrolled-logo");
    $navBar.classList.add("scrolled-nav-bar");
    $hamburgerMenu.classList.add("scrolled-hamburger-menu");
    $navItemsClasses.map((classlist) => classlist.add("scrolled-nav-item"));
  } else {
    $logo.classList.remove("scrolled-logo");
    $navBar.classList.remove("scrolled-nav-bar");
    $hamburgerMenu.classList.remove("scrolled-hamburger-menu");
    $navItemsClasses.map((classlist) => {
      classlist.remove("scrolled-nav-item");
      classlist.remove("shifted-nav-item");
    });
    $navBar.classList.remove("shifted-nav-bar");
    $hamburgerMenu.classList.remove("shifted-hamburger-menu");
    $bar1.classList.remove("shifted-bar1");
    $bar2.classList.remove("shifted-bar2");
    $bar3.classList.remove("shifted-bar3");
  }
};

window.onscroll = scrolledHeader;

// =========================== HAMBURGER MENU SHIFT =========================

const menuShifter = () => {
  $navBar.classList.toggle("shifted-nav-bar");
  $hamburgerMenu.classList.toggle("shifted-hamburger-menu");
  $bar1.classList.toggle("shifted-bar1");
  $bar2.classList.toggle("shifted-bar2");
  $bar3.classList.toggle("shifted-bar3");
  $navItemsClasses.map((classlist) => classlist.toggle("shifted-nav-item"));
};

$hamburgerMenu.onclick = menuShifter;
