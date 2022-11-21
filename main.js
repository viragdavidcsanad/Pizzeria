const $logo = document.querySelector(".js_logo");
const $navBar = document.querySelector(".js_nav_bar");
const $hamburgerMenu = document.querySelector(".js_hamburger_menu");
const $bar1 = document.querySelector(".js_bar1");
const $bar2 = document.querySelector(".js_bar2");
const $bar3 = document.querySelector(".js_bar3");
let i;
let $navItem = document.querySelectorAll(".js_nav_item");
$navItem = [...$navItem];
let $navItemClasses = [];
for (i in $navItem) {
  $navItemClasses.push($navItem[i].classList);
}

window.onscroll = function () {
  scrolledHeader();
};

function scrolledHeader() {
  if (
    document.body.scrollTop > 130 ||
    document.documentElement.scrollTop > 130
  ) {
    $logo.classList.add("js_scrolled_logo");
    $hamburgerMenu.classList.add("js_scrolled_hamburger_menu");
    for (i in $navItemClasses) {
      $navItemClasses[i].add("js_scrolled_nav_item");
    }
  } else {
    $logo.classList.remove("js_scrolled_logo");
    $hamburgerMenu.classList.remove("js_scrolled_hamburger_menu");
    for (i in $navItemClasses) {
      $navItemClasses[i].remove("js_scrolled_nav_item");
    }
    if ($navBar.classList.contains("js_shifted_nav_bar")) {
      $navBar.classList.remove("js_shifted_nav_bar");
    }
    if ($hamburgerMenu.classList.contains("js_shifted_hamburger_menu")) {
      $hamburgerMenu.classList.remove("js_shifted_hamburger_menu");
    }
    if ($bar1.classList.contains("js_shifted_bar1")) {
      $bar1.classList.remove("js_shifted_bar1");
    }
    if ($bar2.classList.contains("js_shifted_bar2")) {
      $bar2.classList.remove("js_shifted_bar2");
    }
    if ($bar3.classList.contains("js_shifted_bar3")) {
      $bar3.classList.remove("js_shifted_bar3");
    }
    for (i in $navItemClasses) {
      if ($navItemClasses[i].contains("js_shifted_nav_item")) {
        $navItemClasses[i].remove("js_shifted_nav_item");
      }
    }
  }
}

$hamburgerMenu.onclick = function () {
  menuShifter();
};

function menuShifter() {
  $navBar.classList.toggle("js_shifted_nav_bar");
  $hamburgerMenu.classList.toggle("js_shifted_hamburger_menu");
  $bar1.classList.toggle("js_shifted_bar1");
  $bar2.classList.toggle("js_shifted_bar2");
  $bar3.classList.toggle("js_shifted_bar3");
  for (i in $navItemClasses) {
    $navItemClasses[i].toggle("js_shifted_nav_item");
  }
}
