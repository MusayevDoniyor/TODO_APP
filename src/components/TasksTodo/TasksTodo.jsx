import React, { Component } from "react";

class TaskTodo extends Component {
  render() {
    const tasksToDisplay = this.props.tasks || [];

    return (
      <div className="w-full md:w-[90%] mt-12 pl-4 md:pl-8 pr-4 md:pr-7 mx-auto">
        <h2 className="text-white font-normal font-inter text-base">
          Task to do - {tasksToDisplay.length}
        </h2>
        <ul className="flex flex-col gap-4 mt-7">
          {tasksToDisplay.map((t) => (
            <li
              className="bg-bgLi cursor-pointer p-4 md:p-6 rounded-lg text-purple-500 flex justify-between font-inter"
              key={t.id}
            >
              <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {t.title}
              </div>
              <span className="space-x-3">
                <i
                  className="pi pi-check hover:text-green-600 hover:scale-125 transition-all"
                  onClick={() => this.props.markAsDone(t.id)}
                ></i>
                <i
                  className="pi pi-trash hover:text-blue-700 hover:scale-125 transition-all"
                  onClick={() => this.props.deleteTask(t.id)}
                ></i>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TaskTodo;
