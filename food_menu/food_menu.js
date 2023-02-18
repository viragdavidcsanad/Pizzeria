let $foodMenuButtons = document.querySelectorAll(".js_menu_button");
let $foodMenuPages = document.querySelectorAll(".js_menu_page");
let $foodMenuPagesClasses = [];
$foodMenuButtons = [...$foodMenuButtons];
$foodMenuPages = [...$foodMenuPages];
$foodMenuPages.map((menuPage) =>
  $foodMenuPagesClasses.push(menuPage.classList)
);

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
      $foodMenuPagesClasses[pageIndex].add(
        "js_active_menu_page",
        "active-menu-page"
      );
    }
  }
  foodMenuHeight();
}

$foodMenuButtons.map((button) =>
  button.addEventListener("click", foodMenuTurner)
);

window.addEventListener("resize", foodMenuHeight);

