import { createStore, combineReducers } from "redux";
import root from "../store/reducers/root";

const rootReducer = combineReducers({
  addToCart: root
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
