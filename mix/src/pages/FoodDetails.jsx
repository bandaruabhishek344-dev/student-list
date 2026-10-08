import {
  useEffect,
  useState,
  useCallback,
  useContext
} from "react";

import {
  useParams
} from "react-router-dom";


import {
  getFoodById
} from "../services/foodService";


import Loader from "../components/Loader";


import {
  CartContext
} from "../context/CartContext";


import {
  WishlistContext
} from "../context/WishlistContext";


function FoodDetails() {


  const {
    id
  } = useParams();

  const [food,setFood] =
    useState(null);

  const [error,setError] =
    useState("");

  const {
    dispatch
  } =
    useContext(CartContext);

  const {
    wishlistDispatch
  }
  =
    useContext(WishlistContext);

  useEffect(()=>{


    let mounted = true;



    async function fetchFood(){


      try{


        setError("");



        const data =
          await getFoodById(id);



        if(mounted){

          setFood(data);

        }



      }
      catch(error){


        setError(
          "Unable to load food details"
        );


      }


    }

    fetchFood();

    return ()=>{


      mounted=false;


    };


  },[id]);

  const handleAddToCart =
    useCallback(()=>{


      dispatch({

        type:"ADD_TO_CART",

        payload:food

      });



    },[
      dispatch,
      food
    ]);


  const handleWishlist =
    useCallback(()=>{


      wishlistDispatch({

        type:"ADD_TO_WISHLIST",

        payload:food

      });


    },[
      wishlistDispatch,
      food
    ]);


  if(error){


    return (

      <div className="error-container">


        <h2>
          ⚠️ {error}
        </h2>


      </div>

    );


  }

  if(!food){


    return <Loader/>;


  }

  return (


    <div className="details">

      <img

        src={food.image}

        alt={food.name}

      />

      <h1>
        {food.name}
      </h1>

      <h3>
        🍴 {food.cuisine}
      </h3>


      <p>
        ⭐ Rating :
        {food.rating}
      </p>

      <p>
        Difficulty :
        {food.difficulty}
      </p>

      <p>
        Calories :
        {food.caloriesPerServing}
      </p>

      <p>
        Preparation Time :
        {food.prepTimeMinutes} mins
      </p>

      <p>
        Cook Time :
        {food.cookTimeMinutes} mins
      </p>

      <p>
        Servings :
        {food.servings}
      </p>

      <div className="card-buttons">


        <button

          onClick={
            handleAddToCart
          }

        >

          🛒 Add To Cart

        </button>

        <button

          onClick={
            handleWishlist
          }

        >

          ❤️ Wishlist

        </button>

      </div>

    </div>


  );


}

export default FoodDetails;