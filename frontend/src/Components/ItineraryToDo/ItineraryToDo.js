// src/ItineraryToDo.js
import React, { useState } from "react";
import "./ItineraryToDo.css";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

const ItineraryToDo = ({ day, item, setItinerary }) => {
  // console.log((item.todo))
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");

  var coordinates = useSelector((state) => state.location);
  const places = coordinates.sortedSelectedPlaces;
  // console.log((coordinates))
  const handleDestination = (e) => {
    setItinerary((prev) => ({
      ...prev,
      [day]: { ...prev[day], endPoint: e.target.value },
    }));

    // next day starting Point
    if (item.day <= coordinates.noOfDays) {
      setItinerary((prev) => ({
        ...prev,
        ["Day" + (item.day + 1)]: {
          ...prev["Day" + (item.day + 1)],
          startingPoint: e.target.value,
        },
      }));
    }
  };
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
  const addItem = (e) => {
    e.preventDefault();
    if (time && activity) {
      // console.log(day)
      setTime("");
      setActivity("");
      setItinerary((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          todo: [...prev[day].todo, { time, activity, isChecked: false }],
        },
      }));
    }
  };

  const deleteItem = (index) => {
    const newTodo = item.todo.filter((_, i) => i !== index);
    setItinerary((prev) => ({
      ...prev,
      [day]: { ...prev[day], todo: newTodo },
    }));
  };
  const handleNotes = (e) => {
    setItinerary((prev) => ({
      ...prev,
      [day]: { ...prev[day], notes: e.target.value },
    }));
  };

  return (
    <div className="toDoContainer">
      <header className="header">
        <div className="left">Day {item.day} </div>
        <div className="right">{item.date.split("-").reverse().join("-")}</div>
      </header>
      <main className="main">
        <div className="places">
          <div className="startPlace">{item.startingPoint}</div>
          <div className="arrowImg"></div>

          <div className="endPlace">{item.endPoint}</div>
        </div>

        <div className="toDoList">
          <div className="destination">
            <input
              onChange={handleDestination}
              list="destinations"
              id="destination"
              name="destination"
              placeholder="Enter destination"
            />

            <datalist id="destinations">
              {places.map((place, index) => (
                <option key={index} value={place.place.siteLabel} />
              ))}
            </datalist>
          </div>
          <h2>To-Do List</h2>
          <form onSubmit={addItem}>
            <div className="input-container">
              <div>
                <FontAwesomeIcon icon={faClock} />:
                <input
                  type="time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  placeholder="Time"
                  required
                />
              </div>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="Activity"
                required
              />

              <button type="submit">+</button>
            </div>
          </form>
          <ul>
            {item.todo.map((item, index) => (
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
            ))}
          </ul>
        </div>
        <textarea
          id="notes"
          name="notes"
          value={item.notes}
          onChange={handleNotes}
          placeholder="Share your thoughts, reflections, or any additional details you'd like to remember about this day..."
        />
      </main>
    </div>
  );
};

export default ItineraryToDo;
