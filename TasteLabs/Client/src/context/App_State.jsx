import React, { useEffect, useState } from "react";
import { AppContext } from "./App_Context";
import axios from "axios";

const App_State = (props) => {
  const url = "http://localhost:3000/api";

  // State variables
  const [token, setToken] = useState("");
  const [recipe, setrecipe] = useState([]);
  const [savedRecipe, setsavedRecipe] = useState([]);
  const [user, setuser] = useState([]);
  const [userId, setuserId] = useState("");
  const [userRecipe, setuserRecipe] = useState([]);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [reload, setreload] = useState(true);

  // Fetch data on mount or when token/userId/reload changes
  useEffect(() => {
    const fetchRecipe = async () => {
      const api = await axios.get(`${url}/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setrecipe(api.data.recipe);
    };

    fetchRecipe();
    getSavedRecipeById();
    profile();
    recipeByUser(userId);
  }, [token, userId, reload]);

  // Load token from localStorage on first render or reload
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }

    const tokenFromLocalStorage = localStorage.getItem("token", token);
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
      setisAuthenticated(true);
    }
  }, [token, reload]);

  // Register new user
  const register = async (name, gmail, password) => {
    const api = await axios.post(
      `${url}/register`,
      { name, gmail, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return api;
  };

  // Log in user and store token
  const login = async (gmail, password) => {
    const api = await axios.post(
      `${url}/login`,
      { gmail, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    setToken(api.data.token);
    setisAuthenticated(true);
    return api;
  };

  // Add new recipe
  const addRecipe = async (
    title,
    ist,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgurl
  ) => {
    const api = await axios.post(
      `${url}/add`,
      { title, ist, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgurl },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setreload(!reload);
    return api;
  };

  // Fetch recipe by ID
  const getRecipeById = async (id) => {
    const api = await axios.get(`${url}/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return api;
  };

  // Save a recipe by its ID
  const savedRecipeById = async (id) => {
    const api = await axios.post(
      `${url}/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setreload(!reload);
    return api;
  };

  // Fetch all saved recipes
  const getSavedRecipeById = async () => {
    const api = await axios.get(`${url}/saved`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setsavedRecipe(api.data.recipe);
  };

  // Fetch profile of logged-in user
  const profile = async () => {
    const api = await axios.get(`${url}/user`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setuserId(api.data.user._id);
    setuser(api.data.user);
  };

  // Fetch recipes created by a specific user
  const recipeByUser = async (id) => {
    const api = await axios.get(`${url}/user/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setuserRecipe(api.data.recipe);
  };

  // Log out the user
  const logOut = () => {
    localStorage.removeItem("token", token);
    setToken("");
    setisAuthenticated(false);
  };

  // Provide all states and functions to context consumers
  return (
    <AppContext.Provider
      value={{
        login,
        register,
        addRecipe,
        recipe,
        getRecipeById,
        savedRecipeById,
        savedRecipe,
        userRecipe,
        user,
        logOut,
        isAuthenticated,
        setisAuthenticated,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default App_State;
