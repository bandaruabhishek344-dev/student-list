function TaskStats({ tasks }) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;

  return (
    <div className="stats">
      <h3>Total : {total}</h3>
      <h3>Completed : {completed}</h3>
      <h3>Pending : {pending}</h3>
    </div>
  );
}

export default TaskStats;