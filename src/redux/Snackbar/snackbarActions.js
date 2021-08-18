import { toggleSnackbarMutation } from "./snackbarMutations";

export const toggleSnackbar = (message) => {
  return (dispatch) => {
    dispatch(toggleSnackbarMutation(message));
  };
};
