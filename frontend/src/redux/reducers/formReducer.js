const initialState = {
  destination: "",
  startDate: "",
  endDate: "",
  budget: "",
  currency: "INR",
  transportation: "",
  activities: {
    sightseeing: false,
    adventure: false,
    shopping: false,
    relaxation: false,
    cultural: false,
    others: false,
  },
  notes: "",
  numPeople: "",
  startingPoint: "",
};

const formReducer = (state = initialState, action) => {
// console.log(action.payload)
  switch (action.type) {
    case "UPDATE":
      const { name, value, type, checked } = action?.payload;

      if (type === "checkbox") {
        return {
          ...state,
          activities: { ...state.activities, [name]: checked },
        };
      }
      return {
        ...state,
        [name]: value,
      };
    case "DESTINATION_SUGGETION":
      return { ...state, destination: action.payload?.full_address };
    case "STARTING_SUGGETION":
      return { ...state, startingPoint: action.payload?.full_address };
    case 'SET_FORM':
      return action.payload ;
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export default formReducer;
