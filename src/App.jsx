import React from "react";
import "primeicons/primeicons.css";
import TodosContainer from "./components/TodoContainer";

function App() {
  return (
    <div className="w-full min-h-screen bg-bgMain items-center flex justify-center">
      <TodosContainer />
    </div>
  );
}

export default App;
