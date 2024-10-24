const CompletedTasks = ({ completedCount }) => {
  return (
    <div className="bg-green-200 p-2 rounded-md">
      Completed: {completedCount.current}
    </div>
  );
};

export default CompletedTasks;
