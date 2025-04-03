import React, { useContext } from "react";
import { AppContext } from "../context/App_Context";
import FetchRecipeById from "./FetchRecipeById"; // Component to fetch full recipe data by ID

// Saved component shows user's saved recipes
const Saved = () => {
  const { savedRecipe } = useContext(AppContext); // Get saved recipe references from context

  console.log(savedRecipe); // Debug: log saved recipes

  return (
    <div>
      {/* Grid layout for displaying saved recipes */}
      <div className="row container mx-auto my-3">
        {savedRecipe?.map((data) => (
          // Each saved recipe is rendered using FetchRecipeById
          <div className="col-md-3" key={data.recipe}>
            <FetchRecipeById id={data.recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
