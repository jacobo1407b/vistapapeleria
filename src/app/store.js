import { createStore } from "redux";
const initialState = {
  numero: 0,
  monografia: 0,
  biografia: 0,
};

function updateState(state = initialState, action) {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        numero: action.payload + 1,
      };
    case "MONO":
      return {
        ...state,
        monografia: action.payload + 1,
      };
    case "BIO":
      return {
        ...state,
        biografia: action.payload + 1,
      };
    default:
      return state;
  }
}

const store = createStore(
  updateState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
