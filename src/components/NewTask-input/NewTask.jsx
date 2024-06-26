import React, { useState } from "react";

const NewTask = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      addTask(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="w-[90%] text-center items-center mt-10 mx-auto space-x-2">
      <label htmlFor="newTask"></label>
      <input
        type="text"
        name="newTask"
        id="newTask"
        placeholder="Add a new task"
        className="rounded-lg border font-inter border-purple-400 pl-3 w-[75%] py-1 bg-inherit placeholder-[rgba(119, 119, 119, 1)] outline-none text-purple-500"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className="bg-purple-400 text-white px-2 py-1 rounded-lg outline-none"
        onClick={handleAddTask}
      >
        <i className="pi pi-plus"></i>
      </button>
    </div>
  );
};

export default NewTask;
