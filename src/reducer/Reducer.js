export const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "MARK_AS_DONE":
      return state.map((task) =>
        task.id === action.payload ? { ...task, done: true } : task
      );
    case "UNDO_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, done: false } : task
      );
    default:
      return state;
  }
};
