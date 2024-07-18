import formReducer from "./reducers/formReducer";
import { combineReducers, createStore } from 'redux';
import locationReducer from "./reducers/locationReducer";

const rootReducer=combineReducers({
    form:formReducer,
    location:locationReducer
})
const store=createStore(rootReducer)
export default store