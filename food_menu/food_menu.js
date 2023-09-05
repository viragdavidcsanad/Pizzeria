import allData from "../get_data/get_data.js";
const selectors = allData.Selector;
const filteredCategories = allData.Category.filter(
  (category) => allData[category].products
);

let $foodMenuHeadingsArray;
const $headingsContainer = document.querySelector(".js_food_menu_headings");
const $pagesContainer = document.querySelector(".js_food_menu_pages");
const $foodMenuSelectorHolder = document.querySelector(
  ".js_food_menu_selector_holder"
);
const $foodMenuSelector = document.querySelector(
  ".js_invisible_food_menu_selector"
);

const portionsAndPrices = () => {};

const renderFoodMenuProducts = (currentCategory, subcategory) => {
  let foodMenuProducts = "";
  const subcategoryProducts = currentCategory.products.filter(
    (product) => product.product_subcategory === subcategory
  );
  subcategoryProducts.map((product) => {
    foodMenuProducts += `<div 
                         class="food-menu-product-table js_food_menu_product_table js_product_page_link" 
                         data-id="${product.id}" 
                         data-category="${currentCategory.category}">
                            <div class="food-menu-product-number">№ ${
                              product.number
                            }</div>
                            <h4 class="food-menu-product-heading">${
                              product.name
                            }</h4>
                            <div class="food-menu-product-image-box">
                              <img class="food-menu-product-image" src="${
                                product.image_link
                              }" />
                            </div>
                            <div class="food-menu-product-table-ingredients">
                              ${product.ingredients}
                            </div>
                            <div class="food-menu-portions-and-prices">
                              ${portionsAndPrices(product, currentCategory)}
                            </div>
                         </div>`;
  });
  return foodMenuProducts;
};

const renderSubcategories = (currentCategory) => {
  const subcategoryArray = currentCategory.subcategory;
  let subcategories = "";
  subcategoryArray.map((subcategory) => {
    if (renderFoodMenuProducts(currentCategory, subcategory) === "") {
      return;
    } else {
      subcategories += `<div class="food-menu-subcategory-table js_food_menu_subcategory_table" 
                        data-name="${subcategory}">
                          <h4 class="food-menu-subcategory-heading">${subcategory}</h4>
                          ${renderFoodMenuProducts(
                            currentCategory,
                            subcategory
                          )}
                        </div>`;
    }
  });
  return subcategories;
};

const renderHeadingsAndPages = (currentCategory, index) => {
  const category = currentCategory.category;
  if (index === 0) {
    $headingsContainer.innerHTML = "";
    $pagesContainer.innerHTML = "";
  }
  if (renderSubcategories(currentCategory) === "") {
    return;
  } else {
    $headingsContainer.innerHTML += `<button class="food-menu-heading js_food_menu_heading" 
                                     data-name="${category}">
                                       ${category}
                                     </button>`;
    $pagesContainer.innerHTML += `<div class="food-menu-page js_food_menu_page" 
                                  data-name="${category}">
                                    <h3 class="food-menu-category">${category}</h3>
                                    ${renderSubcategories(currentCategory)}
                                  </div>`;
  }
  foodMenuHeight();
};

const offFoodMenuTurner = () => {
  const $selectedHeading = document.querySelector(".selected-heading");
  if ($selectedHeading) {
    $selectedHeading.classList.remove("selected-heading");
  }
  const foodMenuPages = [...document.querySelectorAll(".js_food_menu_page")];
  foodMenuPages.map((menuPage) =>
    menuPage.classList.remove(
      "js_active_menu_page",
      "active-menu-page",
      "after-menu-page",
      "before-menu-page"
    )
  );
};

const categoryFilter = (filteredFood) => {
  const filteredCategories = filteredFood.map(
    (filtered) => filtered.product_category
  );
  const filteredCategoriesSet = new Set(filteredCategories);
  const filteredCategoriesArray = Array.from(filteredCategoriesSet);
  const filteredCategoryHtmlElements = filteredCategoriesArray.map((category) =>
    document.querySelector(`.js_food_menu_page[data-name="${category}"]`)
  );
  filteredCategoryHtmlElements.map((categoryHtml) =>
    categoryHtml.classList.add("filtered-menu-page")
  );
};

const subcategoryFilter = (filteredFood) => {
  const filteredSubcategories = filteredFood.map(
    (filtered) => filtered.product_subcategory
  );
  const filteredSubcategoriesSet = new Set(filteredSubcategories);
  const filteredSubcategoriesArray = Array.from(filteredSubcategoriesSet);
  const filteredSubcategoryHtmlElements = filteredSubcategoriesArray.map(
    (subcategory) =>
      document.querySelector(
        `.js_food_menu_subcategory_table[data-name="${subcategory}"]`
      )
  );
  filteredSubcategoryHtmlElements.map((subcategoryHtml) =>
    subcategoryHtml.classList.add("filtered-subcategory-table")
  );
};

const productHtmlElementFilter = (filteredFood) =>
  filteredFood.map((filtered) => {
    const $filteredHtmlElement = document.querySelector(
      `.js_food_menu_product_table[data-id="${filtered.id}"]`
    );
    $filteredHtmlElement.classList.add("filtered-food");
  });

const filterRemover = () => {
  const $filteredFoods = [...document.querySelectorAll(".filtered-food")];
  $filteredFoods.map((filteredFood) =>
    filteredFood.classList.remove("filtered-food")
  );
  const $filteredSubcategories = [
    ...document.querySelectorAll(".filtered-subcategory-table"),
  ];
  $filteredSubcategories.map((filteredSubcategory) =>
    filteredSubcategory.classList.remove("filtered-subcategory-table")
  );
  const $filteredCategories = [
    ...document.querySelectorAll(".filtered-menu-page"),
  ];
  $filteredCategories.map((filteredCategory) =>
    filteredCategory.classList.remove("filtered-menu-page")
  );
};

function foodFilter(currentCategory, index) {
  if (index === 0) {
    filterRemover();
    offFoodMenuTurner();
  }
  let filteredFood = [];
  const products = currentCategory.products;
  const selectorValue = $foodMenuSelector.value;
  if (selectorValue === "menu") {
    filteredFood = products;
  } else
    filteredFood = products.filter(
      (product) => product[selectorValue] === true
    );
  productHtmlElementFilter(filteredFood);
  subcategoryFilter(filteredFood);
  categoryFilter(filteredFood);
}

const selectedHeadingStyle = (Event) => {
  let $previousSelectedHeading = document.querySelector(".selected-heading");
  if ($previousSelectedHeading) {
    $previousSelectedHeading.classList.remove("selected-heading");
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
  const eventTargetIndex = $foodMenuHeadingsArray.indexOf(Event.target);
  $foodMenuPagesArray.map((menuPage, index) => {
    menuPage.classList.remove(
      "js_active_menu_page",
      "active-menu-page",
      "after-menu-page",
      "before-menu-page"
    );
    if (index < eventTargetIndex) {
      menuPage.classList.add("before-menu-page");
    } else if (index > eventTargetIndex) {
      menuPage.classList.add("after-menu-page");
    } else {
      menuPage.classList.add("js_active_menu_page", "active-menu-page");
    }
  });
  selectedHeadingStyle(Event);
  foodMenuHeight();
};

const turnerClickEvent = () => {
  document
    .querySelector(".js_food_menu_headings")
    .addEventListener("click", foodMenuTurner);
};

const foodMenuChangeEvent = (currentCategory, index) => {
  $foodMenuSelector.addEventListener("change", () => {
    // renderHeadingsAndPages(currentCategory, index);
    // filterRemover();
    foodFilter(currentCategory, index);
    foodMenuHeight();
  });
};

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

const renderFoodMenu = () => {
  filteredCategories.map((filteredCategory, index) => {
    const currentCategory = allData[filteredCategory];
    renderHeadingsAndPages(currentCategory, index);
    foodFilter(currentCategory, index);
    turnerClickEvent();
    foodMenuChangeEvent(currentCategory, index);
    foodMenuHeight();
  });
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

const blurSelector = ($visibleSelector, $optionsArray) => {
  $foodMenuSelectorHolder.blur();
  $visibleSelector.classList.remove("focus");
  $optionsArray.map((option) => option.classList.remove("focus"));
};

const selectorClickEvent = ($visibleSelector, $optionsArray) => {
  $foodMenuSelectorHolder.addEventListener("click", (Event) =>
    addValueToSelect(Event, $visibleSelector, $optionsArray)
  );
};

const selectorBlurEvent = ($visibleSelector, $optionsArray) => {
  $foodMenuSelectorHolder.addEventListener("blur", () =>
    blurSelector($visibleSelector, $optionsArray)
  );
};

const renderFoodMenuSelector = () => {
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
  renderFoodMenu();
  selectorClickEvent($visibleSelector, $optionsArray);
  selectorBlurEvent($visibleSelector, $optionsArray);
};

renderFoodMenuSelector();

const resizeEvent = () => window.addEventListener("resize", foodMenuHeight);

resizeEvent();
