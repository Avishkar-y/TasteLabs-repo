import React, { useContext } from 'react'
import { AppContext } from '../context/App_Context'

// Profile component shows user info and their added recipes
const Profile = () => {
  // Extract user details and their recipes from context
  const { user, userRecipe } = useContext(AppContext);

  return (
    <>
      {/* Welcome section */}
      <div className="container text-center my-3">
        <h1>Welcom, {user.name}</h1>
        <h2>{user.gmail}</h2>
      </div>

      {/* Recipe listing section */}
      <div className="container">
        <div className="text-center mx-auto" style={{ width: "1200px" }}>
          <div className="row d-flex justify-content-center align-items-center">
            {/* Loop through user's recipes and display each */}
            {userRecipe?.map((data) => (
              <div key={data._id} className="col-md-3 my-3">
                {/* Recipe image */}
                <div className="d-flex justify-content-center align-items-center p-3">
                  <img
                    src={data.imgurl}
                    className="card-img-top"
                    alt="..."
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </div>
                {/* Recipe title */}
                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
