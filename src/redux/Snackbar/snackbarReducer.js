import { TOGGLE_SNACKBAR } from "./snackbarTypes";

const snackbarInitialState = {
  isOpened: false,
  message: "Success",
};

function snackbarReducer(state = snackbarInitialState, action) {
  switch (action.type) {
    case TOGGLE_SNACKBAR: {
      return { ...state, isOpened: !state.isOpened, message: action.message };
    }
    default:
      return state;
  }
}

export default snackbarReducer;
