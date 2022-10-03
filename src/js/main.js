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
function getRecipes() {
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            !ingredients.includes(ingredient.ingredient) ? ingredients.push(ingredient.ingredient) : null;
        });
        !appliances.includes(recipe.appliance) ? appliances.push(recipe.appliance) : null;
        recipe.ustensils.forEach(ustensil => {
            !ustensils.includes(ustensil) ? ustensils.push(ustensil) : null;
        });
    });
    return recipes;
}
function displayRecipesCards(recipesFilters = null) {
    const recipes = getRecipes();
    const recipesToDisplay = [];
    clearRecipesCard();
    /* filter recipes if filters fund */
    if (recipesFilters) {
        for (const [key, value] of Object.entries(recipesFilters[0])) {
            if ("search" == key) {
                recipesToDisplay.push(recipes.filter(recipe => {
                    if (
                    /* if search value is in recipe name*/
                    recipe.name.toLowerCase().includes(value.toLowerCase())
                        /* or if search value is contains in recipe description */
                        || recipe.description.toLowerCase().includes(value.toLowerCase())
                        /* or if search value is contains in recpide ringredeints list */
                        || recipe.ingredients.map(ingr => ingr.ingredient.toLowerCase().includes(value.toLowerCase())).includes(true)) {
                        return recipe;
                    }
                }));
            }
        }
    }
    else {
        recipesToDisplay.push(recipes);
    }
    if (recipesToDisplay[0].length <= 0) {
        const noResultDiv = document.createElement("div");
        noResultDiv.innerHTML = '« Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc';
        recipesSection === null || recipesSection === void 0 ? void 0 : recipesSection.appendChild(noResultDiv);
    }
    /*
        Display recipes cards
    */
    recipesToDisplay[0].forEach((recipe) => {
        const recipeCard = new RecipeCard(recipe).getDOMElement();
        recipesSection === null || recipesSection === void 0 ? void 0 : recipesSection.appendChild(recipeCard);
    });
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
    if (searchValue.length > 2) {
        displayRecipesCards([{
                'search': searchValue,
                'search2': searchValue
            }]);
    }
    else {
        displayRecipesCards();
    }
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
        const pillButtonElement = new KeyFilterPill(type, value).getDOMElement();
        filtersResultsSections === null || filtersResultsSections === void 0 ? void 0 : filtersResultsSections.appendChild(pillButtonElement);
    }
}
