import React from 'react';
import { convertTo12HourFormat } from '../../../../utils/convertTo12HourFormat';
import { ToDoItem, Itinerary } from '../../../../types';

interface TodoProps {
  index: number;
  item: ToDoItem;
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary>>;
  day: string;
}

function Todo({ index, item, setItinerary, day }: TodoProps) {
    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const idx = parseInt(e.target.id || "0", 10);
        setItinerary((prev) => ({
          ...prev,
          [day]: {
            ...prev[day],
            todo: [
              ...prev[day].todo.map((task, i) => {
                return i === idx ? { ...task, isChecked: !task.isChecked } : task;
              }),
            ],
          },
        }));
      };

    const deleteItem = (idx: number) => {
        alert(String(idx));
        setItinerary((prev) => {
          const dayData = prev[day];
          if (!dayData) return prev;
          const newTodo = dayData.todo.filter((_, i) => i !== idx);
          return {
            ...prev,
            [day]: { ...dayData, todo: newTodo },
          };
        });
      };
  return (
    <li key={index}>
    <div className="todo-item">
      <div className="check">
        <input
          id={String(index)}
          type="checkbox"
          checked={item.isChecked}
          onChange={handleCheckBox}
        />
        <span>{index + 1}</span>
      </div>
      <span>{convertTo12HourFormat(item.time)}</span>

      <span>{item.activity}</span>

      <button type="button" onClick={() => deleteItem(index)}>X</button>
    </div>
  </li>
  )
}

export default Todo