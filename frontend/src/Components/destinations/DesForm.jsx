import { activities, INPUT, types } from "../../config/desFormConfig";

/**
 * 
 * @param {Object} props - Component props
 * @param {Object} props.form - form of inputs.
 * @param {Function} props.handleChange - Function to update inputs.
 * @param {string} props.activeInput - string to identify active input.
 * @param {Function} props.setActiveInput- Function to update active input.
 */
const DesForm = ({form, handleChange,activeInput,setActiveInput}) => {

  //only show active input in the map
  const handleActiveInput = (inputName) => {
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
          onClick={() => handleActiveInput(INPUT.DISTANCE)}
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
          onClick={() => handleActiveInput(INPUT.TYPE)}
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
          onClick={() => handleActiveInput(INPUT.ACTIVITIES)}
        >
          🏃
        </div>
      </div>
    </div>
  );
};

export default DesForm;
