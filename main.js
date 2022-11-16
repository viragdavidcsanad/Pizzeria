const $logo = document.querySelector(".js_logo");
let $logoClasses = $logo.classList;
const $hamburgerMenu = document.querySelector(".js_hamburger_menu");
let $hamburgerMenuClasses = $hamburgerMenu.classList;
const $menuShifter = document.querySelector(".js_menu_shifter");
let $navItem = document.querySelectorAll(".js_nav_item");
$navItem = [...$navItem];
let $navItemClasses = [];
for (let i in $navItem) {
  $navItemClasses.push($navItem[i].classList);
};

window.onscroll = function () {
  scrolledHeader();
};

function scrolledHeader() {
  if (
    document.body.scrollTop > 130 ||
    document.documentElement.scrollTop > 130
  ) {
    $logoClasses.add("js_scrolled_logo");
    $hamburgerMenuClasses.add("js_scrolled_hamburger_menu");
    for (let j in $navItemClasses) {
      $navItemClasses[j].add("js_scrolled_nav_item");
    }
  } else {
    $logoClasses.remove("js_scrolled_logo");
    $hamburgerMenuClasses.remove("js_scrolled_hamburger_menu");
    for (let k in $navItemClasses) {
      $navItemClasses[k].remove("js_scrolled_nav_item");
    }
  }
}
