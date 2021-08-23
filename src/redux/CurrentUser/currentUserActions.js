import {
  getCurrentUserMutation,
  logInMutation,
  logOutMutation,
  setErrorMutation,
  toggleIsEditingMutation,
  updateUserMutation,
} from "./currentUserMutations";
import {
  authUser,
  deleteCurrentUserAcc,
  fetchCurrentUser,
  updateCurrentUser,
  uploadAvatarPhoto,
} from "../../services/currentUserService";
import { deleteUserMutation } from "../Users/usersMutations";
import { updateUsers } from "../Users/usersActions";
import { toggleSnackbar } from "../Snackbar/snackbarActions";

export const getCurrentUser = () => {
  return (dispatch) => {
    fetchCurrentUser()
      .then((res) => {
        dispatch(getCurrentUserMutation(res));
        localStorage.setItem("id", res._id);
      })
      .catch((e) => console.error(e));
  };
};

export const deleteCurrentUser = (id) => {
  return (dispatch) => {
    deleteCurrentUserAcc(id)
      .then(() => {
        dispatch(deleteUserMutation(id));
        dispatch(logOutMutation());
        localStorage.clear();
      })
      .catch((e) => console.error(e));
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(logOutMutation());
  };
};
export const logIn = (data, history) => {
  return (dispatch) => {
    authUser(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
        dispatch(logInMutation());
        dispatch(getCurrentUser());
        history.push("/profile");
      })
      .catch((e) => {
        dispatch(setError(e));
        console.error("Login error: ", e);
      });
  };
};

export const setError = (error) => {
  return (dispatch) => {
    dispatch(setErrorMutation(error));
  };
};

export const updateUser = (id, data) => {
  return (dispatch) => {
    updateCurrentUser(id, data)
      .then((res) => {
        dispatch(updateUserMutation(res));
        dispatch(updateUsers(res));
        dispatch(toggleSnackbar("Profile saved successfully"));
      })
      .catch((e) => {
        console.error("Update error: ", e);
        dispatch(setError(e));
      });
  };
};

export const updateAvatar = (id, data) => {
  return (dispatch) => {
    uploadAvatarPhoto(id, data)
      .then((res) => {
        dispatch(updateUserMutation(res));
        dispatch(updateUsers(res));
        dispatch(toggleSnackbar("New avatar saved successfully"));
      })
      .catch((e) => {
        console.error("Avatar update error: ", e);
        dispatch(setError(e));
      });
  };
};

export const toggleIsEditing = () => {
  return (dispatch) => {
    dispatch(toggleIsEditingMutation());
  };
};
