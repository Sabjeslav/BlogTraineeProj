import { TOGGLE_SNACKBAR } from "./snackbarTypes";

export const toggleSnackbarMutation = (message) => {
  return {
    type: TOGGLE_SNACKBAR,
    message,
  };
};
