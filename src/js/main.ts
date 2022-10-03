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

function displayRecipesCards(recipesFilters: Array<any> | null = null) {

    const recipes = getRecipes();
    const recipesToDisplay: Array<any> = [];

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
                        || recipe.ingredients.map(ingr => ingr.ingredient.toLowerCase().includes(value.toLowerCase())).includes(true)
                    ) {
                        
                        return recipe;
                    }
                }));
            }
        }
    } else {
        recipesToDisplay.push(recipes);
    }

    if (recipesToDisplay[0].length <= 0) {
        const noResultDiv = document.createElement("div");
        noResultDiv.innerHTML = '« Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc';
        
        recipesSection?.appendChild(noResultDiv);
   }
    /* 
        Display recipes cards
    */
    recipesToDisplay[0].forEach((recipe: RecipeModel) => { 
        const recipeCard = new RecipeCard(recipe).getDOMElement();
    
        recipesSection?.appendChild(recipeCard);
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
recipeSearch?.addEventListener('input', (e : any) => {
    const searchValue: string = e.target.value;

    if (searchValue.length > 2) {
        displayRecipesCards([{
            'search': searchValue,
            'search2': searchValue
        }]);
    } else { 
        displayRecipesCards();
    }

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

        const pillButtonElement = new KeyFilterPill(type, value).getDOMElement();

        filtersResultsSections?.appendChild(pillButtonElement);
    }
}
