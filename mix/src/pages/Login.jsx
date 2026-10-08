import React, {
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import {
  AuthContext,
} from "../context/AuthContext";

import "../styles/Login.css";

function Login(){

const navigate =
useNavigate();

const {
 login,
}=useContext(AuthContext);

const [email,setEmail]=
useState("");

const [password,setPassword]=
useState("");

const [showPassword,setShowPassword]=
useState(false);


const [remember,setRemember]=
useState(false);


const [loading,setLoading]=
useState(false);

const passwordStrength =
password.length < 4
?
"Weak"
:
password.length < 8
?
"Medium"
:
"Strong";


const handleSubmit=(e)=>{

e.preventDefault();

if(!email || !password){

toast.error(
"Please fill all fields"
);

return;

}

setLoading(true);

setTimeout(()=>{

setLoading(false);

if(
email==="admin@gmail.com" &&
password==="123456"
){

login(
email,
"admin"
);

toast.success(
"Admin Login Successful"
);

navigate(
"/admin"
);

return;

}

if(
email==="user@gmail.com" &&
password==="123456"
){


login(
email,
"user"
);



toast.success(
"Login Successful"
);

navigate("/");


return;


}

toast.error(
"Invalid Credentials"
);


},1500);


};

return(

<div className="advanced-login">

<div className="background-blur"></div>

<form

className="advanced-card"

onSubmit={handleSubmit}

>

<div className="logo">

🍔

</div>


<h1>

Food Explorer

</h1>


<p>

Welcome back! Login to continue

</p>

<div className="input-box">


<input

type="email"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

required

/>


<label>

Email Address

</label>


</div>

<div className="input-box">


<input


type={
showPassword
?
"text"
:
"password"
}


value={password}


onChange={(e)=>
setPassword(e.target.value)
}


required

/>


<label>

Password

</label>


<span

className="eye"

onClick={()=>
setShowPassword(!showPassword)
}

>

{
showPassword
?
"🙈"
:
"👁"
}


</span>



</div>

{
password &&

<div className={`strength ${passwordStrength}`}>

Password Strength:
{" "}
{passwordStrength}

</div>

}

<div className="options">


<label>


<input

type="checkbox"

checked={remember}

onChange={()=>
setRemember(!remember)
}

/>


Remember me


</label>




<a href="#">

Forgot Password?

</a>



</div>

<button

className="submit-btn"

disabled={loading}

>


{

loading

?

"Logging in..."

:

"🔐 Login"

}



</button>

<div className="divider">

<span>

OR

</span>

</div>

<div className="social-buttons">
<button

type="button"

>

🌐 Google

</button>


<button

type="button"

>

📘 Facebook

</button>


</div>
</form>


</div>


);


}

export default Login;