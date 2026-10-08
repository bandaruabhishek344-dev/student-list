import React, {
  useContext,
  useState,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  toast,
} from "react-toastify";

import {
  CartContext,
} from "../context/CartContext";

import "../styles/Checkout.css";


function Checkout(){

const {
  cart,
  dispatch
}=useContext(CartContext);



const {

 register,

 handleSubmit,

 formState:{
   errors
 }

}=useForm();



const [loading,setLoading]=useState(false);

const [orderSuccess,setOrderSuccess]=useState(false);



/*
=========================
 PRICE CALCULATION
=========================
*/


const subtotal =
cart.reduce(
(total,item)=>
total + item.price * item.quantity,
0
);



const delivery =
subtotal > 500 ? 0 : 50;



const total =
subtotal + delivery;



/*
=========================
 SUBMIT ORDER
=========================
*/


const placeOrder=(data)=>{


setLoading(true);



setTimeout(()=>{


console.log(
"Order Data",
data
);



toast.success(
"Order placed successfully!"
);



setOrderSuccess(true);



dispatch({
type:"CLEAR_CART"
});



setLoading(false);



},1500);



};





return(

<div className="checkout-page">


<div className="checkout-wrapper">



{/* LEFT FORM */}

<div className="checkout-left">


<h2>
Delivery Details
</h2>



<form

className="checkout-form"

onSubmit={
handleSubmit(placeOrder)
}

>



<input

placeholder="Full Name"

{...register(
"name",
{
required:
"Name is required"
}
)}

/>


{
errors.name &&
<p className="error">
{errors.name.message}
</p>
}





<input

placeholder="Email"

{...register(

"email",

{

required:
"Email is required",

pattern:{
value:
/^\S+@\S+$/i,

message:
"Invalid email"
}

}

)

}

/>


{
errors.email &&
<p className="error">
{errors.email.message}
</p>
}






<input

placeholder="Phone Number"

{...register(

"phone",

{

required:
"Phone number required",

minLength:{
value:10,

message:
"Enter valid phone number"
}

}

)

}

/>


{
errors.phone &&
<p className="error">
{errors.phone.message}
</p>
}





<textarea

placeholder="Delivery Address"

{...register(

"address",

{

required:
"Address required",

minLength:{
value:10,

message:
"Address too short"
}

}

)

}

/>



{
errors.address &&
<p className="error">
{errors.address.message}
</p>
}




<select

{...register(
"payment",
{
required:
"Select payment method"
}
)

}

>


<option value="">
Select Payment
</option>


<option>
Cash On Delivery
</option>


<option>
UPI
</option>


<option>
Card
</option>


</select>



{
errors.payment &&
<p className="error">
{errors.payment.message}
</p>
}





<button

className="place-order-btn"

disabled={loading}

>


{

loading

?

"Placing Order..."

:

"Place Order"

}



</button>



</form>



</div>







{/* RIGHT SUMMARY */}


<div className="checkout-right">


<div className="summary-card">


<h2>
Order Summary
</h2>



<div className="price-row">

<span>
Subtotal
</span>

<span>
${subtotal}
</span>

</div>





<div className="price-row">

<span>
Delivery
</span>

<span>

{
delivery===0

?

"FREE"

:

`$${delivery}`

}

</span>


</div>





<div className="price-row total">


<span>
Total
</span>


<span>
${total}
</span>


</div>



</div>



</div>



</div>





{

orderSuccess &&


<div className="success-popup">


<h2>
🎉 Order Confirmed
</h2>


<p>
Your food will arrive soon.
</p>


</div>


}



</div>


)


}


export default Checkout;