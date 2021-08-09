import { createStore } from 'redux';
import currentUserReducer from '../reducers/currentUser.reducer';

const currentUserStore = createStore(currentUserReducer);

export default currentUserStore;
