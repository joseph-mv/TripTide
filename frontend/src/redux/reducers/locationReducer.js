
const initialState = {
    destination: {},
    startingPoint: {},
    midPoint:{}
  };
  
  
  const SET_DESTINATION = 'SET_DESTINATION';
  const SET_STARTING_POINT = 'SET_STARTING_POINT';
  const MID_POINT='MID_POINT'
  
  
 
  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_DESTINATION:
        return {
          ...state,
          destination: action.payload
        };
      case SET_STARTING_POINT:
        return {
          ...state,
          startingPoint: action.payload
        };
        case MID_POINT:
        return {
          ...state,
          midPoint: action.payload
        };
      default:
        return state;
    }
  };

  export default locationReducer
  
 