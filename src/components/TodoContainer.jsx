import React, { createRef, Component } from "react";
import Swal from "sweetalert2";
import NewTask from "./NewTask-input/NewTask";
import TaskTodo from "./TasksTodo/TasksTodo";
import DoneTasks from "./TasksDone/TasksDone";
import { Reducer } from "../reducer/Reducer";

class TodosContainer extends Component {
  constructor(props) {
    super(props);
    this.taskTodoRef = createRef();
    this.state = {
      tasks: [],
      doneTasks: [],
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const tasks = await response.json();
      this.setState({
        tasks: tasks,
        doneTasks: tasks.filter((task) => task.done),
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  addTask = async (newTask) => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask,
          done: false,
        }),
      });
      const task = await response.json();
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, task],
      }));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your task has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  dispatch = (action) => {
    this.setState((prevState) => {
      const newTasks = Reducer(prevState.tasks, action);
      return {
        tasks: newTasks,
        doneTasks: newTasks.filter((task) => task.done),
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "DELETE",
          });
          this.dispatch({ type: "DELETE_TASK", payload: taskId });
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }
    });
  };

  render() {
    return (
      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 mt-5 mx-auto bg-bgContainer rounded-2xl p-4 md:p-8">
        <NewTask addTask={this.addTask} />
        <TaskTodo
          ref={this.taskTodoRef}
          tasks={this.state.tasks.filter((task) => !task.done)}
          markAsDone={(taskId) =>
            this.dispatch({ type: "MARK_AS_DONE", payload: taskId })
          }
          deleteTask={this.handleDelete}
        />
        <DoneTasks
          doneTasks={this.state.tasks.filter((task) => task.done)}
          undoTask={(taskId) =>
            this.dispatch({ type: "UNDO_TASK", payload: taskId })
          }
        />
      </div>
    );
  }
}

export default TodosContainer;
