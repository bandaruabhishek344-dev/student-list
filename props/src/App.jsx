import ProfileCard from "./Profile";
 
function App() {

  return (
<div>
<h1>Student Portal</h1>
 
      <ProfileCard

        name="Abhishek"

        branch="ECE"

        cgpa="7.86"

        age="22"

      />
 
      <ProfileCard

        name="Jayanth"

        branch="CSE"

        cgpa="8.50"

        age="24"

      />
</div>

  );

}
 
export default App;
 