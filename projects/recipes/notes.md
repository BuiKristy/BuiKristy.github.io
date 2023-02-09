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
- Type of Cuisine
- Dietary Category (Seafood, Beef, Pork, Vegetarian)

# What should the JSON look like? 
{
    "recipeName": "blah",
    "image": "img/blah.jpg",
    "source": "blah",
    "ingredients": [{"tomato sauce": ["a", "b", "c"]}, "b", "c"],
    "servings": 4,
    "prepTime": 30,
    "cookTime": 30,
    "instructions": ["step 1", "step 2", "step 3..."]
}