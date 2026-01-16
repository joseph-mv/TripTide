import React from 'react'
import { convertTo12HourFormat } from '../../../../utils/convertTo12HourFormat';

function Todo({index,item,setItinerary,day}) {

    const handleCheckBox = (e) => {
        let index = parseInt(e.target.id);
    
        setItinerary((prev) => ({
          ...prev,
          [day]: {
            ...prev[day],
            todo: [
              ...prev[day].todo.map((task, i) => {
                return i === index ? { ...task, isChecked: !task.isChecked } : task;
              }),
            ],
          },
        }));
      };

    const deleteItem = (index) => {
        alert(index)
        const newTodo = item.todo.filter((_, i) => i !== index);
        setItinerary((prev) => ({
          ...prev,
          [day]: { ...prev[day], todo: newTodo },
        }));
      };
  return (
    <li key={index}>
    <div className="todo-item">
      <div className="check">
        <input
          id={index}
          type="checkbox"
          checked={item.isChecked}
          onChange={handleCheckBox}
        />
        <span>{index + 1}</span>
      </div>
      <span>{convertTo12HourFormat(item.time)}</span>

      <span>{item.activity}</span>

      <button onClick={() => deleteItem(index)}>X</button>
    </div>
  </li>
  )
}

export default Todo