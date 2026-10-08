function FoodCard({ food }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ddd",
      }}
    >
      <img
        src={food.thumbnailUrl}
        alt={food.title}
        width="120"
      />

      <div>
        <h3>{food.title}</h3>
        <p>ID : {food.id}</p>
      </div>
    </div>
  );
}

export default FoodCard;