import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { fetchUser, GithubUser } from './../api/github/api';
import { State } from './../store';

export const GET_USER_REQUEST = 'getUserRequest';
export const GET_USER_SUCCESS = 'getUserSuccess';
export const GET_USER_FAILURE = 'getUserFailure';

export const CLEAR_USER = 'clearUser';

export type GetUserRequestAction = Action<typeof GET_USER_REQUEST> & { login: string };
export type GetUserSuccessAction = Action<typeof GET_USER_SUCCESS> & { user: GithubUser };
export type GetUserFailureAction = Action<typeof GET_USER_FAILURE>;

export type ClearUserAction = Action<typeof CLEAR_USER>;

export const getUserRequest = (login: string): GetUserRequestAction => ({
  type: GET_USER_REQUEST,
  login
});

export const getUserSuccess = (user: GithubUser): GetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  user
});

export const getUserFailure = (): GetUserFailureAction => ({
  type: GET_USER_FAILURE
});

export type GetUserActions = GetUserRequestAction | GetUserSuccessAction | GetUserFailureAction;

export const getUser = (login: string) => (dispatch: ThunkDispatch<State, any, GetUserActions>): void => {
  dispatch(getUserRequest(login));

  fetchUser(login).then(user => dispatch(getUserSuccess(user)), () => dispatch(getUserFailure()));
};

export const clearUser = (): ClearUserAction => ({
  type: CLEAR_USER
});
