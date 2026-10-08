import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="signup-box">

        <div className="left-section">
          <h1>Sign up</h1>

          <form>
            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <input
              type="password"
              placeholder="Repeat Password"
            />

            <div className="checkbox">
              <input type="checkbox" id="agree" />
              <label htmlFor="agree">
                I agree all statements in Terms of Service
              </label>
            </div>

            <button type="submit">
              Register
            </button>
          </form>
        </div>

        <div className="right-section">
          <img
            src="https://images.unsplash.com/photo-1629893250923-eff7863b6e7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwdGFibGV8ZW58MHx8MHx8fDA%3D"
            alt="signup"
          />

          <p>I am already member</p>
        </div>

      </div>
    </div>
  );
}

export default App;