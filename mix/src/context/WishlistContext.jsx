import {
  createContext,
  useReducer,
  useEffect,
} from "react";



export const WishlistContext =
  createContext();





const initialState = {

  wishlist: []

};







function wishlistReducer(
  state,
  action
) {


  switch(action.type){



    case "ADD_TO_WISHLIST": {


      const alreadyExists =

        state.wishlist.some(

          item =>
          item.id === action.payload.id

        );



      if(alreadyExists){


        return state;


      }




      return {


        ...state,


        wishlist:[

          ...state.wishlist,

          action.payload

        ]

      };


    }








    case "REMOVE_FROM_WISHLIST": {


      return {


        ...state,


        wishlist:

        state.wishlist.filter(

          item =>

          item.id !== action.payload

        )


      };


    }








    case "CLEAR_WISHLIST":


      return {


        ...state,


        wishlist:[]


      };







    default:

      return state;


  }


}









export function WishlistProvider({
  children
}) {



  const [
    state,
    wishlistDispatch
  ] = useReducer(


    wishlistReducer,


    undefined,


    ()=>{


      const savedWishlist =

        localStorage.getItem(
          "wishlist"
        );



      return {


        wishlist:

        savedWishlist

        ?

        JSON.parse(savedWishlist)

        :

        []


      };


    }


  );









  useEffect(()=>{


    localStorage.setItem(

      "wishlist",


      JSON.stringify(
        state.wishlist
      )

    );


  },[
    state.wishlist
  ]);









  return (



    <WishlistContext.Provider


      value={{


        wishlist:
        state.wishlist,


        wishlistDispatch


      }}



    >


      {children}



    </WishlistContext.Provider>



  );


}