import React, { createRef, Component } from "react";
import Swal from "sweetalert2";
import NewTask from "./NewTask-input/NewTask";
import TaskTodo from "./TasksTodo/TasksTodo";
import DoneTasks from "./TasksDone/TasksDone";
import { INIT } from "./helper/tasks";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "./helper/localstorage";
import { Reducer } from "../reducer/Reducer";

class TodosContainer extends Component {
  constructor(props) {
    super(props);
    this.taskTodoRef = createRef();
    const tasksFromLocalStorage = loadTasksFromLocalStorage();
    this.state = {
      tasks: tasksFromLocalStorage.length > 0 ? tasksFromLocalStorage : INIT,
      doneTasks: tasksFromLocalStorage.filter((task) => task.status === "done"),
    };
  }

  dispatch = (action) => {
    this.setState((prevState) => {
      const newTasks = Reducer(prevState.tasks, action);
      saveTasksToLocalStorage(newTasks);
      return {
        tasks: newTasks,
        doneTasks: newTasks.filter((task) => task.status === "done"),
      };
    });
  };

  handleDelete = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.dispatch({ type: "DELETE_TASK", payload: taskId });

        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
      }
    });
  };

  render() {
    return (
      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 mt-5 mx-auto bg-bgContainer rounded-2xl p-4 md:p-8">
        <NewTask
          addTask={(newTask) => {
            this.dispatch({ type: "ADD_TASK", payload: newTask });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your task has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }}
        />
        <TaskTodo
          ref={this.taskTodoRef}
          tasks={this.state.tasks.filter((task) => task.status === "todo")}
          markAsDone={(taskId) =>
            this.dispatch({ type: "MARK_AS_DONE", payload: taskId })
          }
          deleteTask={this.handleDelete}
        />
        <DoneTasks
          doneTasks={this.state.tasks.filter((task) => task.status === "done")}
          undoTask={(taskId) =>
            this.dispatch({ type: "UNDO_TASK", payload: taskId })
          }
        />
      </div>
    );
  }
}

export default TodosContainer;
