import allData from "../get_data/get_data.js";
const selectors = allData.Selector;
const currency = allData.Currency;
const unitOfWeight = allData.Unit_Of_Weight;
const unitOfLength = allData.Unit_Of_Length;
const unitOfDrink = allData.Unit_Of_Drink;
let $foodMenuHeadingsArray;
const $headingsContainer = document.querySelector(".js_food_menu_headings");
const $pagesContainer = document.querySelector(".js_food_menu_pages");
const $foodMenuSelectorHolder = document.querySelector(
  ".js_food_menu_selector_holder"
);
const $foodMenuSelector = document.querySelector(
  ".js_invisible_food_menu_selector"
);
const categoryObject = allData.Category;
const foodCategories = Object.keys(categoryObject);
const foodMenuCategories = foodCategories.filter(
  (category) => allData[category].products
);

const withSizeOrNot = (currentCategory, portion) => {
  if (currentCategory.sizes) {
    return `<span class="food-menu-diameter">
              ${currentCategory.sizes[portion]}${unitOfLength}
            </span>`;
  } else return "";
};

const foodOrDrinkUnit = (product) => {
  if (product.product_category === "Drink") {
    return unitOfDrink;
  } else return unitOfWeight;
};

const portionUnit = (product) => {
  return `<span class="food-menu-unit">
            ${foodOrDrinkUnit(product)}
          </span>`;
};

const portionsAndPrices = (product, currentCategory) => {
  let portionAndPriceRows = "";
  const portions = () => {
    if (product.portions) {
      return product.portions;
    } else return currentCategory.portions;
  };
  for (let portion in portions()) {
    portionAndPriceRows += `<div class="food-menu-portion-and-price-row">
                              <span class="food-menu-portion">${portion}</span>             
                              <div class="food-menu-portion-size-quantity-and-unit">
                                ${withSizeOrNot(currentCategory, portion)}
                                <div class="food-menu-portion-quantity-and-unit>  
                                  <span class="food-menu-portion-quantity">
                                    ${portions()[portion]}
                                  </span>
                                  ${portionUnit(
                                    product,
                                    currentCategory,
                                    portion
                                  )}
                                </div>
                              </div>
                              <span class="food-menu-price">
                                ${currency}${product.prices[portion]}
                              </span>
                            </div>`;
  }
  return portionAndPriceRows;
};

const renderFoodMenuProducts = (currentCategory, subcategory) => {
  let foodMenuProducts = "";
  const subcategoryProducts = currentCategory.products.filter(
    (product) => product.product_subcategory === subcategory
  );
  subcategoryProducts.map((product) => {
    foodMenuProducts += `<div 
                         class="food-menu-product-table js_food_menu_product_table js_product_page_link" 
                         data-id="${product.id}" 
                         data-category="${currentCategory.category}"
                         data-name="${product.name}">
                            <h4 class="food-menu-product-heading">
                              <span class="food-menu-product-number">
                                <span class="food-menu-numero">№</span
                                >${product.number}
                              </span>
                              ${product.name}
                            </h4>
                            <div class="food-menu-product-image-box">
                              <img 
                              class="food-menu-product-image" 
                              src="${product.image_link}" />
                            </div>
                            <div class="food-menu-product-ingredients">
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
  const subcategoriesArray = currentCategory.subcategory;
  let subcategories = "";
  subcategoriesArray.map((subcategory) => {
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
    $pagesContainer.innerHTML += `<figure 
                                  class="food-menu-category-symbol-holder js_food_menu_${category}_symbol_holder">
                                    <img
                                    src="${categoryObject[category]}"
                                    class="food-menu-category-symbol js_${category}_symbol"
                                    attribution="<a href='https://megapng.com/images/bt/pizza-icon-1.png'>Image credit</a>"
                                    alt="${category} symbol drawing"
                                    />
                                  </figure>
                                  <div 
                                  class="food-menu-page js_food_menu_page" 
                                  data-name="${category}">
                                    <h3 class="food-menu-category">
                                      ${category}
                                    </h3>
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
  const foodMenuPagesOrSymbols = [
    ...document.querySelectorAll(
      ".js_food_menu_page, .food-menu-category-symbol"
    ),
  ];
  foodMenuPagesOrSymbols.map((menuPageOrSymbol) =>
    menuPageOrSymbol.classList.remove(
      "js_active_menu_page",
      "active-menu-page",
      "after-menu-page",
      "before-menu-page"
    )
  );
};

const symbolFilter = () => {
  const eachFilteredCategoryHtmlElement = [
    ...document.querySelectorAll(".filtered-menu-page"),
  ];
  const filteredSymbolHtmlElements = eachFilteredCategoryHtmlElement.map(
    (categoryHtml) =>
      document.querySelector(`.js_${categoryHtml.dataset.name}_symbol`)
  );
  filteredSymbolHtmlElements.map((symbolHtml, index) => {
    symbolHtml.classList.add("filtered-symbol");
    if (index % 2 !== 0) {
      symbolHtml.classList.add("right-symbol");
    } else {
      symbolHtml.classList.add("left-symbol");
    }
  });
};

const categoryHtmlElementFilter = (
  foodMenuCategories,
  filteredFoods,
  index
) => {
  if (filteredFoods.length > 0) {
    const filteredCategory = filteredFoods[0].product_category;
    const filteredCategoryHtmlElement = document.querySelector(
      `.js_food_menu_page[data-name="${filteredCategory}"]`
    );
    filteredCategoryHtmlElement.classList.add("filtered-menu-page");
    if (index === foodMenuCategories.length - 1) {
      symbolFilter();
    }
  }
};

const subcategoryHtmlElementFilter = (filteredFoods) => {
  if (filteredFoods.length > 0) {
    const filteredSubcategories = filteredFoods.map(
      (filteredFood) => filteredFood.product_subcategory
    );
    const filteredSubcategoriesArray = [...new Set(filteredSubcategories)];
    const filteredSubcategoryHtmlElements = filteredSubcategoriesArray.map(
      (subcategory) =>
        document.querySelector(
          `.js_food_menu_subcategory_table[data-name="${subcategory}"]`
        )
    );
    filteredSubcategoryHtmlElements.map((subcategoryHtml) => {
      subcategoryHtml.classList.add("filtered-subcategory-table");
    });
  }
};

const productHtmlElementFilter = (filteredFoods) =>
  filteredFoods.map((filtered) => {
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
  const $filteredSymbols = [...document.querySelectorAll(".filtered-symbol")];
  $filteredSymbols.map((filteredSymbol) =>
    filteredSymbol.classList.remove(
      "filtered-symbol",
      "left-symbol",
      "right-symbol"
    )
  );
};

function foodFilter(foodMenuCategories, currentCategory, index) {
  if (index === 0) {
    filterRemover();
    offFoodMenuTurner();
  }
  let filteredFoods = [];
  const products = currentCategory.products;
  const selectorValue = $foodMenuSelector.value;
  if (selectorValue === "menu") {
    filteredFoods = products;
  } else
    filteredFoods = products.filter(
      (product) => product[selectorValue] === true
    );
  productHtmlElementFilter(filteredFoods);
  subcategoryHtmlElementFilter(filteredFoods);
  categoryHtmlElementFilter(foodMenuCategories, filteredFoods, index);
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
  const $foodMenuCategorySymbolsArray = [
    ...document.querySelectorAll(".food-menu-category-symbol"),
  ];
  const symbolsAndPages = [$foodMenuPagesArray, $foodMenuCategorySymbolsArray];
  const eventTargetIndex = $foodMenuHeadingsArray.indexOf(Event.target);
  symbolsAndPages.map((symbolsOrPages) =>
    symbolsOrPages.map((symbolOrPage, index) => {
      symbolOrPage.classList.remove(
        "js_active_menu_page",
        "active-menu-page",
        "after-menu-page",
        "before-menu-page"
      );
      if (index < eventTargetIndex) {
        symbolOrPage.classList.add("before-menu-page");
      } else if (index > eventTargetIndex) {
        symbolOrPage.classList.add("after-menu-page");
      } else {
        symbolOrPage.classList.add("js_active_menu_page", "active-menu-page");
      }
    })
  );

  selectedHeadingStyle(Event);
  foodMenuHeight();
};

const turnerClickEvent = () => {
  document
    .querySelector(".js_food_menu_headings")
    .addEventListener("click", foodMenuTurner);
};

const foodMenuChangeEvent = (foodMenuCategories, currentCategory, index) => {
  $foodMenuSelector.addEventListener("change", () => {
    foodFilter(foodMenuCategories, currentCategory, index);
    foodMenuHeight();
  });
};

const foodMenuHeight = () => {
  const $pagesArray = [...$pagesContainer.children];
  const $activePage = document.querySelector("div.js_active_menu_page");
  const menuHeight = () => {
    if ($activePage === null) {
      return $pagesArray.reduce(
        (accumulator, element) => accumulator + element.offsetHeight,
        0
      );
    } else return $activePage.offsetHeight;
  };
  return ($pagesContainer.style.height = `${menuHeight() / 10 + 6}rem`);
};

const renderFoodMenu = () => {
  foodMenuCategories.map((foodMenuCategory, index) => {
    const currentCategory = allData[foodMenuCategory];
    renderHeadingsAndPages(currentCategory, index);
    foodFilter(foodMenuCategories, currentCategory, index);
    turnerClickEvent();
    foodMenuChangeEvent(foodMenuCategories, currentCategory, index);
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
    $foodMenuSelector.innerHTML += `<option 
                                    value="${selector}" 
                                    class="food-menu-invisible-selector-option js_food_menu_invisible_selector_option">
                                      ${selectors[selector]}
                                    </option>`;
  }
  $foodMenuSelectorHolder.innerHTML += `<div 
                                        class="food-menu-visible-selector js_food_menu_visible_selector">
                                          ${$foodMenuSelector.firstChild.innerText}
                                        </div>`;
  $foodMenuSelectorHolder.innerHTML += `<div 
                                        class="food-menu-selector-options-field js_food_menu_selector_options_field"></div>`;
  const $visibleOptionsField = document.querySelector(
    ".js_food_menu_selector_options_field"
  );
  for (let selector in selectors) {
    $visibleOptionsField.innerHTML += `<div 
                                       value="${selector}" 
                                       class="food-menu-visible-selector-option js_food_menu_visible_selector_option">
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
