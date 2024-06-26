export const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        { id: state.length + 1, title: action.payload, status: "todo" },
      ];
    case "MARK_AS_DONE":
      return state.map((task) =>
        task.id === action.payload ? { ...task, status: "done" } : task
      );
    case "UNDO_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, status: "todo" } : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};
