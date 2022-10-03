// Import our custom CSS
import '../scss/main.scss';

// Import all of Bootstrap's JS
import 'bootstrap';
import { recipes } from '../../data/recipes';
import KeyFilter from './components/KeyFilterButton';
import KeyFilterPill from './components/KeyFilterPill';
import RecipeCard from './components/RecipeCard';
import { RecipeModel } from './model/RecipeModel';

const filtersResultsSections: HTMLElement | null = document.getElementById("filters-results");
const filtersButtonsSections: HTMLElement | null = document.getElementById("filters-buttons");
const recipesSection: HTMLElement | null = document.getElementById("recipes-container");

const recipeSearch: HTMLElement | null = document.getElementById("recipe-search");

const ingredients : Array<string> = [];
const appliances : Array<string> = [];
const ustensils: Array<string> = [];

const filters = {
    'search': '',
    'ingredients': [],
    'appliances': [],
    'ustensils': []
};

function addRecipeFilter(key: string, value: string) {
    const beforeFilters = filters;
    if ('search' == key) {
        filters['search'] = value;
    } else {
        if (filters[key] && !filters[key].includes(value)) {
            filters[key].push(value);
        }
    }

    if (beforeFilters == filters) {
        displayRecipesCards();
    }
}

function removeRecipeFilter(key: string, value: string) {
    const beforeFilters = filters;
    if (filters[key].includes(value)) {
        filters[key].splice(filters[key].indexOf(value), 1);
    }

    if (beforeFilters == filters) {
        displayRecipesCards();
    }
}

function getRecipes() {
    
    const recipesToDisplay = recipes.filter((recipe: RecipeModel) => {

        // search bar filter 
        if (filters['search'].length > 2 && !recipe.name.toLowerCase().includes(filters['search'].toLowerCase()) ) {
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
        
        recipesSection?.appendChild(noResultDiv);
    } else {
        recipes.forEach((recipe: RecipeModel) => { 
            const recipeCard = new RecipeCard(recipe).getDOMElement();
        
            recipesSection?.appendChild(recipeCard);
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
recipeSearch?.addEventListener('input', (e : any) => {
    const searchValue: string = e.target.value;

    addRecipeFilter('search', searchValue);

    displayRecipesCards();

});

/*
    Filters Buttons
*/
const ingredientsFilter = new KeyFilter("ingredients", ingredients, drawPillCallback).getDOMElement();
const appliancesFilter = new KeyFilter("appliances", appliances, drawPillCallback).getDOMElement();
const ustensilsFilter = new KeyFilter("ustensils", ustensils, drawPillCallback).getDOMElement();

filtersButtonsSections?.appendChild(ingredientsFilter);
filtersButtonsSections?.appendChild(appliancesFilter);
filtersButtonsSections?.appendChild(ustensilsFilter);


/* 
    Filters Pills
*/
function drawPillCallback(type: string, value: string) {
        const pillArleadyDrawn = document.querySelector(`.${type}-filter-pill[data-value="${value}"]`);

        if (pillArleadyDrawn) {
            return;
        } else {

        const pillButtonElement = new KeyFilterPill(type, value, removeRecipeFilter).getDOMElement();
            filtersResultsSections?.appendChild(pillButtonElement);
            
            addRecipeFilter(type, value);
            console.log(filters)
        }
    
}
    
