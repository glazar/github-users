import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { GithubUser } from './api/github/api';
import { rootReducer } from './reducers/rootReducer';

export interface UserListState {
  isFetching?: boolean;
  userList?: GithubUser[];
  canFetchMore?: boolean;
}

export interface UserState {
  isFetching?: boolean;
  user?: GithubUser;
}

export interface State {
  userListState: UserListState;
  userState: UserState;
}

export const configureStore = (preloadedState: State = { userListState: {}, userState: {} }): Store<State> => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));
};
