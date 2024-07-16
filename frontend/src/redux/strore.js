import formReducer from "./reducers/formReducer";
import { combineReducers, createStore } from 'redux';

const rootReducer=combineReducers({
    form:formReducer,
    
})
const store=createStore(rootReducer)
export default store