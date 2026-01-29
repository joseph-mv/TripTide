import { activities, INPUT, types } from "../../config/desFormConfig";

interface DesFormProps {
  form: any; // Explicit any for now as generic form state might vary or be complex, ideally matches FormDataState
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeInput: string | null;
  setActiveInput: React.Dispatch<React.SetStateAction<string | null>>;
}


const DesForm: React.FC<DesFormProps> = ({ form, handleChange, activeInput, setActiveInput }) => {

  //only show active input in the map
  const handleActiveInput = (inputName: string) => {
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
                {activity.charAt(0).toUpperCase() + activity.slice(1)}
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
