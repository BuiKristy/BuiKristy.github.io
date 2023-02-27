# Stages of the Project
I want to build a webpage for compiled recipes that I enjoy making, with an easy way to find the recipe I want. 

- Build UI for
    - the main recipe database, 
    - viewing a specific recipe,
    - adding a new recipe.
    - searching for recipes
- Set up and connect database
- 


# What does a recipe consist of?
- Name of recipe
- Source of Recipe
- Image
- Ingredients
- Servings
- Prep time and cook time
- Instructions
- Barcode for scanning the recipe ingredients into Macrofactor

# How do I want to be able to find a recipe?
- Name of Recipe 
- Type of Cuisine (Asian, Italian, Mexican, Southern ...)
- Dietary Category (Seafood, Beef, Pork, Vegetarian, Chicken, )
- Course (Main Dish, Dessert, Side Dish, Drink, Snack, Soup, Appetizer)


# What should the JSON look like? 
{
    "recipeName": "Oyster Motoyaki",
    "image": "/food/oyster-motoyaki.jpg",
    "source": ["Epicurious", "https://www.epicurious.com/recipes/member/views/big-johns-oyster-motoyaki-50031984"],
    "cuisine": "Asian Fusion",
    "diet": "Seafood",
    "course": "Appetizer", 
    "ingredients": [
        {
            "unit": "6",
            "product": "large oysters"
        },
    ],
    "servings": 6,
    "prepTime": ["20", "minutes"],
    "cookTime": ["25", "minutes"],
    "instructions": []
}


icon: <a href="https://www.flaticon.com/free-icons/kitchen" title="kitchen icons">Kitchen icons created by Freepik - Flaticon</a>