import React from "react";
import { Reducer } from "../../reducer/Reducer";

const DoneTasks = ({ doneTasks, undoTask }) => {
  return (
    <div className="w-full md:w-[90%] mt-12 mb-5 pl-4 md:pl-8 pr-4 md:pr-7 mx-auto">
      <h2 className="text-white font-normal font-inter text-base">
        Done - {doneTasks.length}{" "}
      </h2>
      <ul className="flex flex-col gap-4 mt-7">
        {doneTasks.map((t) => (
          <li
            className="bg-bgLi cursor-pointer p-4 md:p-6 rounded-lg text-green-400 flex justify-between font-inter line-through"
            key={t.id}
          >
            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {t.title}
            </div>
            <span className="space-x-3">
              <i
                className="pi pi-undo hover:scale-125 transition-all"
                onClick={() => undoTask(t.id)}
              ></i>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoneTasks;
