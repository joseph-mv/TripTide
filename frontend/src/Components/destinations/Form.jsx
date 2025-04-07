
const INPUT = {
  DISTANCE: "distance",
  TYPE: "type",
  ACTIVITIES: "activities",
};

const types = [
  "Tourist Attraction",
  "Tourist Destination",
  "Natural Park",
  "Waterfall",
  "Nature Reserve",
  "Dam",
  "Lake",
  "Hiking",
  "Caves",
  "Amusement Park",
  "Campsite",
  "City",
  "Beach",
  "Resort",
  "Historical monument",
  "Museum",
  "Zoo",
  "Desert",
];

const activities = [
  "sightseeing",
  "adventure",
  "shopping",
  "relaxation",
  "cultural",
];
const Form = ({form, handleChange,activeInput,setActiveInput}) => {

  const handleSymbolClick = (inputName) => {
    setActiveInput(activeInput === inputName ? null : inputName);
  };
  return (
    <div className="form-component">
      {/* Distance input */}
      <div className="symbol-container">
        {activeInput === INPUT.DISTANCE && (
          <input
            type="number"
            min="0"
            name={INPUT.DISTANCE}
            value={form.distance}
            onChange={handleChange}
            placeholder="Distance in km..."
            className="input-field"
            autoFocus
          />
        )}
        <div
          className={`symbol  ${activeInput === INPUT.DISTANCE && "clicked"}`}
          onClick={() => handleSymbolClick(INPUT.DISTANCE)}
        >
          📏
        </div>
      </div>

      {/* type input */}
      <div className="symbol-container">
        {activeInput === INPUT.TYPE && (
          <div className="checkbox-group">
            {types.map((type, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  value={type}
                  name={INPUT.TYPE}
                  checked={form.type[type]}
                />{" "}
                {type}
              </label>
            ))}
          </div>
        )}
        <div
          className={`symbol  ${activeInput === INPUT.TYPE && "clicked"}`}
          onClick={() => handleSymbolClick(INPUT.TYPE)}
        >
          🌐
        </div>
      </div>

      {/* Activities input */}
      <div className="symbol-container">
        {activeInput === INPUT.ACTIVITIES && (
          <div className="checkbox-group">
            {activities.map((activity, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  value={activity}
                  name={INPUT.ACTIVITIES}
                  checked={form.activities[activity]}
                />{" "}
                {activity.charAt(0).toUpperCase()+activity.slice(1) }
              </label>
            ))}
          </div>
        )}
        <div
          className={`symbol  ${activeInput === INPUT.ACTIVITIES && "clicked"}`}
          onClick={() => handleSymbolClick(INPUT.ACTIVITIES)}
        >
          🏃
        </div>
      </div>
    </div>
  );
};

export default Form;
