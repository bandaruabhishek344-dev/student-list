import "./LoginForm.css";
 
function LoginForm() {
  return (
<div className="login-container">
<h2>Student Portal Login</h2>
 
      <input type="email" placeholder="Enter Email" />
<br /><br />
 
      <input type="password" placeholder="Enter Password" />
<br /><br />
 
      <button>Login</button>
</div>
  );
}
 
export default LoginForm;