import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import ProfileCard from "./components/ProfileCard";
import Footer from "./components/Footer";
 
function App() {
  return (
<div>
<Header />
<LoginForm />
<ProfileCard name="ABHISHEK" branch="BCA" cgpa="7.86" />
<Footer />
</div>
  );
}
 
export default App;