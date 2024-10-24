const RemainingTasks = ({ remainingCount }) => {
  return (
    <div className="bg-yellow-200 p-2 rounded-md">
      Remaining: {remainingCount.current}
    </div>
  );
};

export default RemainingTasks;
