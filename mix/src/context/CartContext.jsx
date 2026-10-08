import {
  createContext,
  useReducer,
  useEffect,
} from "react";



export const CartContext =
  createContext();



const initialState = {

  cart: []

};





function cartReducer(
  state,
  action
) {


  switch(action.type){



    case "ADD_TO_CART": {


      const existingItem =
        state.cart.find(
          food =>
            food.id === action.payload.id
        );



      if(existingItem){


        return {

          ...state,


          cart:
          state.cart.map(food=>

            food.id === action.payload.id

            ?

            {

              ...food,

              quantity:
              food.quantity + 1

            }


            :

            food

          )

        };


      }



      return {


        ...state,


        cart:[

          ...state.cart,


          {

            ...action.payload,

            quantity:1

          }

        ]


      };


    }







    case "DECREASE": {


      return {


        ...state,


        cart:

        state.cart.map(food=>


          food.id === action.payload

          ?

          {

            ...food,

            quantity:
            food.quantity > 1

            ?

            food.quantity - 1

            :

            1

          }


          :

          food


        )


      };


    }

    case "REMOVE": {


      return {

        ...state,

        cart:

        state.cart.filter(
          food =>
          food.id !== action.payload
        )


      };


    }







    case "CLEAR_CART":


      return {


        ...state,


        cart:[]


      };







    default:


      return state;


  }


}









export function CartProvider({
  children
}) {



  const [state,dispatch] =

    useReducer(

      cartReducer,


      undefined,


      ()=>{


        const savedCart =

          localStorage.getItem(
            "cart"
          );



        return {


          cart:

          savedCart

          ?

          JSON.parse(savedCart)

          :

          []


        };


      }


    );









  /*
     Save cart data
     whenever cart changes
  */


  useEffect(()=>{


    localStorage.setItem(

      "cart",

      JSON.stringify(
        state.cart
      )

    );


  },[
    state.cart
  ]);









  return (



    <CartContext.Provider

      value={{

        cart:state.cart,

        dispatch


      }}


    >


      {children}



    </CartContext.Provider>



  );


}