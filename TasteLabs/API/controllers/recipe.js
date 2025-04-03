import { Recipe } from '../Models/Recipe.js';
import { SavedRecipe } from '../Models/SavedRecipe.js';

// Add a new recipe to the database
export const add = async (req, res) => {
    const { title, ist, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgurl } = req.body;

    try {
        const recipe = await Recipe.create({
            title,
            ist,
            ing1, ing2, ing3, ing4,
            qty1, qty2, qty3, qty4,
            imgurl,
            user: req.user,
        });

        res.json({ message: "Recipe Created Successfully..!", recipe });
    } catch (error) {
        res.json({ message: error });
    }
};

// Get all recipes
export const getAllRecipe = async (req, res) => {
    const recipe = await Recipe.find();
    res.json({ recipe });
};

// Get a recipe by its ID
export const getRecipeById = async (req, res) => {
    const id = req.params.id;

    try {
        let recipe = await Recipe.findById(id);
        if (!recipe) res.json({ message: 'recipe not exist' });

        res.json({ message: "recipe by id", recipe });
    } catch (error) {
        res.json({ message: error });
    }
};

// Get all recipes created by a specific user
export const getRecipeByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        let recipe = await Recipe.find({ user: userId });
        if (!recipe) res.json({ message: "recipe not exist" });

        res.json({ message: "recipe by userId", recipe });
    } catch (error) {
        res.json({ message: error });
    }
};

// Save a recipe by its ID if not already saved
export const savedRecipeById = async (req, res) => {
    const id = req.params.id;

    let recipe = await SavedRecipe.findOne({ recipe: id });
    if (recipe) return res.json({ message: "recipe already saved" });

    recipe = await SavedRecipe.create({ recipe: id });
    res.json({ message: "Recipe saved Successfully..!" });
};

// Get all saved recipes
export const getSavedRecipe = async (req, res) => {
    const recipe = await SavedRecipe.find();
    res.json({ recipe });
};
