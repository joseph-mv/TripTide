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
    case "DESTINATION_SUGGESTION":
      return { ...state, destination: action.payload?.full_address };
    case "STARTING_SUGGESTION":
      return { ...state, startingPoint: action.payload?.full_address };
    case 'SWAP_PLACES':
       const destination=state.destination  
       const startingPoint=state.startingPoint
       return {...state,destination:startingPoint,startingPoint:destination}
    case 'SET_FORM':
      return action.payload ;
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export default formReducer;
