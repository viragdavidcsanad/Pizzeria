const foodLinks = [
  "./data/pizza.json",
  "./data/pasta.json",
  "./data/salad.json",
  "./data/drink.json",
];

const selectorLink = "./data/selector.json"

let $foodMenuHeadingsArray;
const $headingsContainer = document.querySelector(".js_food_menu_headings");
const $pagesContainer = document.querySelector(".js_food_menu_pages");
const $foodMenuSelectorHolder = document.querySelector(
  ".js_food_menu_selector_holder"
);
const $foodMenuSelector = document.querySelector(
  ".js_invisible_food_menu_selector"
);

const foodFilter = (jsonData) => {
  let filteredFood = [];
  const products = jsonData.filter((data) => data.products)[0].products;
  const selectorValue = $foodMenuSelector.value;
  const drink = products.filter(
    (product) => product.product_category === "Drink"
  );
  if (drink.length > 0) {
    filteredFood = drink;
  } else if (selectorValue === "menu") {
    filteredFood = products;
  } else
    filteredFood = products.filter(
      (product) => product[selectorValue] === selectorValue
    );
  return filteredFood;
};

const renderFoodMenuProducts = (jsonData, subcategory) => {
  let foodMenuProducts = "";
  const filteredFood = foodFilter(jsonData);
  const subcategoryProducts = filteredFood.filter(
    (product) => product.product_subcategory === subcategory
  );
  subcategoryProducts.map((product) => {
    foodMenuProducts += `<div class="food-menu-product-table js_food_menu_product_table">
                           <a href="./product_page/product_page.html" id="${product.id}">
                              <div class="food-menu-product-number">№ ${product.number}</div>
                              <h4 class="food-menu-product-heading">${product.name}</h4>
                              <div class="food-menu-product-image-box">
                                <img class="food-menu-product-image" src="${product.image_link}">
                              </div>
                              <div class="food-menu-table-ingredients">
                              ${product.ingredients}
                              </div>
                           </a>
                         </div>`;
  });
  return foodMenuProducts;
};

const renderSubcategories = (jsonData) => {
  const subcategoryArray = jsonData.filter((data) => data.subcategory)[0]
    .subcategory;
  let subcategories = "";
  subcategoryArray.map((subcategory) => {
    if (renderFoodMenuProducts(jsonData, subcategory) === "") {
      return;
    } else {
      subcategories += `<div class="food-menu-subcategory-table js_food_menu_subcategory_table">
                          <h4 class="food-menu-subcategory">${subcategory}</h4>
                          ${renderFoodMenuProducts(jsonData, subcategory)}
                        </div>`;
    }
  });
  return subcategories;
};

const renderHeadingsAndPages = (jsonData, index) => {
  const category = jsonData.filter((data) => data.category)[0].category;
  if (index === 0) {
    $headingsContainer.innerHTML = "";
    $pagesContainer.innerHTML = "";
  }
  if (renderSubcategories(jsonData) === "") {
    return;
  } else {
    $headingsContainer.innerHTML += `<button class="food-menu-heading ${category} js_food_menu_heading">${category}</button>`;
    $pagesContainer.innerHTML += `<div class="food-menu-page ${category} js_food_menu_page">
                                    <h3 class="food-menu-category">${category}</h3>
                                    ${renderSubcategories(jsonData)}
                                  </div>`;
  }
  foodMenuHeight();
};

const selectedHeadingStyle = (Event) => {
  let previousSelectedHeading = document.querySelector(".selected-heading");
  if (previousSelectedHeading) {
    previousSelectedHeading.classList.remove("selected-heading");
  }
  Event.target.classList.add("selected-heading");
};

const foodMenuTurner = (Event) => {
  if (Event.target === document.querySelector(".js_food_menu_headings")) {
    return;
  }
  $foodMenuHeadingsArray = [
    ...document.querySelectorAll(".js_food_menu_heading"),
  ];
  const $foodMenuPagesArray = [
    ...document.querySelectorAll(".js_food_menu_page"),
  ];
  let $foodMenuPagesClasses = [];
  $foodMenuPagesArray.map((menuPage) =>
    $foodMenuPagesClasses.push(menuPage.classList)
  );
  const eventTargetIndex = $foodMenuHeadingsArray.indexOf(Event.target);
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
  selectedHeadingStyle(Event);
  foodMenuHeight();
};

const foodMenuChangeEvent = (jsonData, index) => {
  $foodMenuSelector.addEventListener("change", () => {
    renderHeadingsAndPages(jsonData, index);
  });
};

const turnerClickEvent = () => {
  document
    .querySelector(".js_food_menu_headings")
    .addEventListener("click", foodMenuTurner);
};

const blurSelector = ($visibleSelector, $optionsArray) => {
  $foodMenuSelectorHolder.blur();
  $visibleSelector.classList.remove("focus");
  $optionsArray.map((option) => option.classList.remove("focus"));
};

const selectorBlurEvent = ($visibleSelector, $optionsArray) => {
  $foodMenuSelectorHolder.addEventListener("blur", () =>
    blurSelector($visibleSelector, $optionsArray)
  );
};

const toggleFocusSelector = ($visibleSelector, $optionsArray) => {
  $visibleSelector.classList.toggle("focus");
  $optionsArray.map((option) => option.classList.toggle("focus"));
};

const eventChange = new Event("change");

const addValueToSelect = (Event, $visibleSelector, $optionsArray) => {
  const $invisibleOptionsArray = [
    ...document.querySelectorAll(".js_food_menu_invisible_selector_option"),
  ];
  const index = $optionsArray.indexOf(Event.target);
  if (
    Event.target === $visibleSelector ||
    Event.target === $foodMenuSelectorHolder
  ) {
    toggleFocusSelector($visibleSelector, $optionsArray);
  } else {
    toggleFocusSelector($visibleSelector, $optionsArray);
    $foodMenuSelector.value = $invisibleOptionsArray[index].value;
    $invisibleOptionsArray.map((option) => (option.selected = false));
    $invisibleOptionsArray[index].selected = true;
    $visibleSelector.innerText = $invisibleOptionsArray[index].innerText;
    blurSelector($visibleSelector, $optionsArray);
    $foodMenuSelector.dispatchEvent(eventChange);
  }
};

const selectorClickEvent = ($visibleSelector, $optionsArray) => {
  $foodMenuSelectorHolder.addEventListener("click", (Event) =>
    addValueToSelect(Event, $visibleSelector, $optionsArray)
  );
};

const fetchFoodMenu = () => {
  foodLinks.map((link, index) =>
    fetch(link)
      .then((rawData) => rawData.json())
      .then((jsonData) => {
          renderHeadingsAndPages(jsonData);
          turnerClickEvent();
          foodMenuChangeEvent(jsonData, index);
      })
  );
};

const renderFoodMenuSelector = async () => {
  const rawData = await fetch(selectorLink);
  const jsonData = await rawData.json();
  const selectors = jsonData.filter((data) => data.selectors)[0].selectors;
  for (let selector in selectors) {
    $foodMenuSelector.innerHTML += `<option value="${selector}" class="food-menu-invisible-selector-option js_food_menu_invisible_selector_option">
                                      ${selectors[selector]}
                                    </option>`;
  }
  $foodMenuSelectorHolder.innerHTML += `<div class="food-menu-visible-selector js_food_menu_visible_selector">
                                          ${$foodMenuSelector.firstChild.innerText}
                                        </div>`;
  $foodMenuSelectorHolder.innerHTML += `<div class="food-menu-selector-options-field js_food_menu_selector_options_field"></div>`;
  const $visibleOptionsField = document.querySelector(
    ".js_food_menu_selector_options_field"
  );
  for (let selector in selectors) {
    $visibleOptionsField.innerHTML += `<div value="${selector}" class="food-menu-visible-selector-option js_food_menu_visible_selector_option">
                                         ${selectors[selector]}
                                       </div>`;
  }
  $foodMenuSelector.value = document.querySelector(
    ".js_food_menu_invisible_selector_option"
  ).value;
  const $visibleSelector = document.querySelector(
    ".js_food_menu_visible_selector"
  );
  const $optionsArray = [
    ...document.querySelectorAll(".js_food_menu_visible_selector_option"),
  ];
  fetchFoodMenu();
  selectorClickEvent($visibleSelector, $optionsArray);
  selectorBlurEvent($visibleSelector, $optionsArray);
};

renderFoodMenuSelector();

const foodMenuHeight = () => {
  const $pagesArray = [...$pagesContainer.children];
  const $activePage = document.querySelector(".js_active_menu_page");
  const menuHeight = () => {
    if ($activePage === null) {
      return $pagesArray.reduce(
        (accumulator, element) => accumulator + element.offsetHeight,
        0
      );
    } else return $activePage.offsetHeight;
  };
  return $pagesContainer.setAttribute(
    "style",
    `height: ${menuHeight() / 10 + 6}rem`
  );
};

const resizeEvent = () => window.addEventListener("resize", foodMenuHeight);

resizeEvent();
