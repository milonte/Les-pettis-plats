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
const ingredients = [];
const appliances = [];
const ustensils = [];
recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
        !ingredients.includes(ingredient.ingredient) ? ingredients.push(ingredient.ingredient) : null;
    });
    !appliances.includes(recipe.appliance) ? appliances.push(recipe.appliance) : null;
    recipe.ustensils.forEach(ustensil => {
        !ustensils.includes(ustensil) ? ustensils.push(ustensil) : null;
    });
});
recipes.forEach(recipe => {
    const recipeCard = new RecipeCard(recipe).getDOMElement();
    recipesSection === null || recipesSection === void 0 ? void 0 : recipesSection.appendChild(recipeCard);
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
