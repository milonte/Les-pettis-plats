// Import our custom CSS
import '../scss/main.scss';
// Import all of Bootstrap's JS
import 'bootstrap';
import { recipes } from '../../data/recipes';
import KeyFilter from './components/KeyFilterButton';
import KeyFilterPill from './components/KeyFilterPill';
import RecipeCard from './components/RecipeCard';
const filtersResultsSections = document.getElementById("filters-results");
const filtersButtonsSections = document.getElementById("filters-buttons");
const recipesSection = document.getElementById("recipes-container");
const recipeSearch = document.getElementById("recipe-search");
const ingredients = [];
const appliances = [];
const ustensils = [];
const filters = {
    'search': '',
    'ingredients': [],
    'appliances': [],
    'ustensils': []
};
function addRecipeFilter(key, value) {
    const beforeFilters = filters;
    if ('search' == key) {
        filters['search'] = value;
    }
    else {
        if (filters[key] && !filters[key].includes(value)) {
            filters[key].push(value);
        }
    }
    if (beforeFilters == filters) {
        displayRecipesCards();
    }
}
function removeRecipeFilter(key, value) {
    const beforeFilters = filters;
    if (filters[key].includes(value)) {
        filters[key].splice(filters[key].indexOf(value), 1);
    }
    if (beforeFilters == filters) {
        displayRecipesCards();
    }
}
function getRecipes() {
    const recipesToDisplay = recipes.filter((recipe) => {
        // search bar filter 
        if (filters['search'].length > 2 && !recipe.name.toLowerCase().includes(filters['search'].toLowerCase())) {
            return false;
        }
        // ingredients filter
        if (filters['ingredients'].length > 0) {
            for (const filterIngredient of filters['ingredients']) {
                let recipeHaveIngredient = false;
                for (const recipeIngredient of recipe.ingredients) {
                    if (recipeIngredient.ingredient.toLowerCase() == filterIngredient.toLowerCase()) {
                        recipeHaveIngredient = true;
                    }
                }
                if (!recipeHaveIngredient) {
                    return false;
                }
            }
        }
        if (filters['ustensils'].length > 0) {
            for (const filterUstensils of filters['ustensils']) {
                let recipeHaveUstensil = false;
                for (const recipeUstensil of recipe.ustensils) {
                    if (recipeUstensil.toLowerCase() == filterUstensils.toLowerCase()) {
                        recipeHaveUstensil = true;
                    }
                }
                if (!recipeHaveUstensil) {
                    return false;
                }
            }
        }
        if (filters['appliances'].length > 0) {
            for (const filterAppliance of filters['appliances']) {
                if (recipe.appliance.toLowerCase() !== filterAppliance.toLowerCase()) {
                    return false;
                }
            }
        }
        return recipe;
    });
    /* update filters buttons */
    recipesToDisplay.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if (!ingredients.includes(ingredient.ingredient)) {
                ingredients.push(ingredient.ingredient);
            }
        });
        !appliances.includes(recipe.appliance) ? appliances.push(recipe.appliance) : null;
        recipe.ustensils.forEach(ustensil => {
            !ustensils.includes(ustensil) ? ustensils.push(ustensil) : null;
        });
    });
    return recipesToDisplay;
}
function displayRecipesCards() {
    const recipes = getRecipes();
    clearRecipesCard();
    if (recipes.length <= 0) {
        const noResultDiv = document.createElement("div");
        noResultDiv.innerHTML = '« Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc';
        recipesSection === null || recipesSection === void 0 ? void 0 : recipesSection.appendChild(noResultDiv);
    }
    else {
        recipes.forEach((recipe) => {
            const recipeCard = new RecipeCard(recipe).getDOMElement();
            recipesSection === null || recipesSection === void 0 ? void 0 : recipesSection.appendChild(recipeCard);
        });
    }
}
function clearRecipesCard() {
    if (recipesSection) {
        recipesSection.innerHTML = "";
    }
}
displayRecipesCards();
/*
    Search
*/
recipeSearch === null || recipeSearch === void 0 ? void 0 : recipeSearch.addEventListener('input', (e) => {
    const searchValue = e.target.value;
    addRecipeFilter('search', searchValue);
    displayRecipesCards();
});
/*
    Filters Buttons
*/
const ingredientsFilter = new KeyFilter("ingredients", ingredients, drawPillCallback).getDOMElement();
const appliancesFilter = new KeyFilter("appliances", appliances, drawPillCallback).getDOMElement();
const ustensilsFilter = new KeyFilter("ustensils", ustensils, drawPillCallback).getDOMElement();
filtersButtonsSections === null || filtersButtonsSections === void 0 ? void 0 : filtersButtonsSections.appendChild(ingredientsFilter);
filtersButtonsSections === null || filtersButtonsSections === void 0 ? void 0 : filtersButtonsSections.appendChild(appliancesFilter);
filtersButtonsSections === null || filtersButtonsSections === void 0 ? void 0 : filtersButtonsSections.appendChild(ustensilsFilter);
/*
    Filters Pills
*/
function drawPillCallback(type, value) {
    const pillArleadyDrawn = document.querySelector(`.${type}-filter-pill[data-value="${value}"]`);
    if (pillArleadyDrawn) {
        return;
    }
    else {
        const pillButtonElement = new KeyFilterPill(type, value, removeRecipeFilter).getDOMElement();
        filtersResultsSections === null || filtersResultsSections === void 0 ? void 0 : filtersResultsSections.appendChild(pillButtonElement);
        addRecipeFilter(type, value);
        console.log(filters);
    }
}
