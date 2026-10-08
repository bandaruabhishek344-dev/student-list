function ProfileCard(props) {
  return (
<div>
<h2>Student Profile</h2>
 
      <p>Name: {props.name}</p>
<p>Branch: {props.branch}</p>
<p>CGPA: {props.cgpa}</p>
</div>
  );
}
 
export default ProfileCard;