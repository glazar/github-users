import { combineReducers, Reducer } from 'redux';

import { State } from '../store';
import { userListReducer as userListState } from './userListReducer';
import { userReducer as userState } from './userReducer';

export const rootReducer: Reducer<State> = combineReducers<State>({
  userListState,
  userState
});
