// import { dailyItinerary } from "../../utils/dailyItinerary";
// import { getNextDate } from "../../utils/nextDate";

// const intialState={}

// const CREATE_NEW_ITINERARY="CRETE_NEW_ITINERARY"
// const ADD_NEW_DAY="ADD_NEW_DAY"

// const itineraryReducer=(state=intialState,action)=>{
//     switch(action.type){
//         case CREATE_NEW_ITINERARY:{
//             let newItinerary={}
//             let date = action.payload.date
//             for (let i = 0; i < action.payload.noOfDays; i++) {
//                   newItinerary["Day" + (i + 1)] = dailyItinerary(i, date);
//                   date = getNextDate(date);
//                 }

//                 return newItinerary
//         }
//         case ADD_NEW_DAY:
//             return{...state,itinerary:[...state.itinerary,action.payload]}
//         default:
//             return state
//     }
// }


// export default itineraryReducer;