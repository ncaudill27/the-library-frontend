import { combineReducers } from 'redux';
import clubsReducer from './clubsReducer';
import usersReducer from './userReducer';
import threadsReducer from './threadsReducer';
import commentsReducer from './commentsReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
  clubs: clubsReducer,
  users: usersReducer,
  threads: threadsReducer,
  comments: commentsReducer,
  messages: messagesReducer
});

export default rootReducer;