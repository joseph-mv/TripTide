const initialState={
    
        destination: "",
        startDate: "",
        endDate: "",
        budget: "",
        transportation: "",
        activities: {
          sightseeing: false,
          adventure: false,
          shopping: false,
          dining: false,
          relaxation: false,
          cultural: false,
          others: false,
        },
        notes: "",
        numPeople: "",
        startingPoint: "",
      
}

const formReducer = (state = initialState, action) => {
    // console.log(action.payload)
    
    switch (action.type) {
      case 'UPDATE':
        const { name, value, type, checked } = action?.payload;

        if(type==='checkbox'){
         
            return{
                ...state,activities:{...state.activities,[name]:checked}
            }
        }
        return {
          ...state,
          [name]:value
        };
        case'DESTINATION_SUGGETION': return{...state,destination:action.payload?.full_address, desCoordinate:action.payload?.coordinates}
        case'STARTING_SUGGETION': return{...state,startingPoint:action.payload?.full_address,strCoordinate:action.payload?.coordinates}
     
      default:
        return state;
    }
  };
  
  export default formReducer;