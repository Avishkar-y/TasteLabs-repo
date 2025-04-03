import React, { useContext, useState } from "react";
import { AppContext } from "../context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useContext(AppContext);   

  // Form state to capture recipe input fields
  const [formData, setformData] = useState({
    title: "",
    ist: "",
    ing1: "",
    ing2: "",
    ing3: "",
    ing4: "",
    qty1: "",
    qty2: "",
    qty3: "",
    qty4: "",
    imgurl: "",
  });

  // Handle form field changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const {
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
      imgurl,
    } = formData;

    const result = await addRecipe(
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
    );

    // Show success toast
    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });

    // Navigate to homepage after a short delay
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <ToastContainer />
      <div
        className="container my-5 p-5"
        style={{
          width: "500px",
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-center">Add Recipe</h2>

        {/* Recipe Form */}
        <form
          onSubmit={onSubmitHandler}
          style={{ width: "400px", margin: "auto" }}
          className="my-3 p-3"
        >
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              value={formData.title}
              onChange={onChangeHandler}
              name="title"
              type="text"
              className="form-control"
            />
          </div>

          {/* Instruction */}
          <div className="mb-3">
            <label className="form-label">Instruction</label>
            <input
              value={formData.ist}
              onChange={onChangeHandler}
              name="ist"
              type="text"
              className="form-control"
            />
          </div>

          {/* Ingredients and Quantities */}
          {[1, 2, 3, 4].map((num) => (
            <div className="mb-3" key={num}>
              <label className="form-label">{`Ingredient ${num}`}</label>
              <input
                value={formData[`ing${num}`]}
                onChange={onChangeHandler}
                name={`ing${num}`}
                type="text"
                className="form-control"
              />
              <label className="form-label mt-2">{`Quantity ${num}`}</label>
              <input
                value={formData[`qty${num}`]}
                onChange={onChangeHandler}
                name={`qty${num}`}
                type="text"
                className="form-control"
              />
            </div>
          ))}

          {/* Image URL */}
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              value={formData.imgurl}
              onChange={onChangeHandler}
              name="imgurl"
              type="text"
              className="form-control"
            />
          </div>

          {/* Submit Button */}
          <div className="container d-grid col-6">
            <button type="submit" className="btn btn-primary mt-3">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
