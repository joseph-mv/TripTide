const initialState = {
  destination: {},
  startingPoint: {},
  // midPoint:{},
  coordinates: [],
  distance: "",
  routeGeometry: [],
  selectedPlaces: {},
  destinations: [],
  noOfDays: "",
  sortedSelectedPlaces: []
};

const SET_DESTINATION = "SET_DESTINATION";
const SET_STARTING_POINT = "SET_STARTING_POINT";
// const MID_POINT='MID_POINT'
const COORDINATES = "COORDINATES";
const DISTANCE = "DISTANCE";
const ROUTE_GEOMETRY = "ROUTE_GEOMETRY";
const RESET_STATE = "RESET_ LOCATION";
const DELETE_PLACE = "DELETE_PLACE";
const ADD_PLACE = "ADD_PLACE";
const RESET_PLACE = "RESET_ PLACE";
const ADD_DESTINATIONS = "ADD_DESTINATIONS";
const REMOVE_DESTINATIONS = "REMOVE_DESTINATIONS";
const NOOFDAYS='NOOFDAYS';
const SET_SORTED= "SET_SORTED";


const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DESTINATION:
      return {
        ...state,
        destination: action.payload,
      };
    case SET_STARTING_POINT:
      return {
        ...state,
        startingPoint: action.payload,
      };

    case COORDINATES:
      return {
        ...state,
        coordinates: action.payload,
      };
    case DISTANCE:
      return {
        ...state,
        distance: action.payload,
      };
    case ROUTE_GEOMETRY:
      return {
        ...state,
        routeGeometry: action.payload,
      };
      case NOOFDAYS:
        return {
         ...state,
          noOfDays: action.payload
        }

    case DELETE_PLACE:
      const { [action.payload]: _, ...remainingPlaces } = state.selectedPlaces;
      return {
        ...state,
        selectedPlaces: remainingPlaces,
      };
    case ADD_PLACE:
      return {
        ...state,
        selectedPlaces: {
          ...state.selectedPlaces,
          [action.id]: action.payload,
        },
      };
    case RESET_PLACE:
      return {
        ...state,
        selectedPlaces: {},
      };
    case ADD_DESTINATIONS:
      return {
        ...state,
        destinations: action.payload,
      };
    case REMOVE_DESTINATIONS:
      return {
        ...state,
        destinations: [],
      };
      case SET_SORTED:
      return {
        ...state,  
        sortedSelectedPlaces:action.payload
      };
   

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default locationReducer;
