import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { fetchUserList, GithubUser } from './../api/github/api';
import { State } from './../store';

export const GET_USER_LIST_REQUEST = 'getUserListRequest';
export const GET_USER_LIST_SUCCESS = 'getUserListSuccess';
export const GET_USER_LIST_FAILURE = 'getUserListFailure';

export type GetUserListRequestAction = Action<typeof GET_USER_LIST_REQUEST> & { since?: number };
export type GetUserListSuccessAction = Action<typeof GET_USER_LIST_SUCCESS> & { userList: GithubUser[] };
export type GetUserListFailureAction = Action<typeof GET_USER_LIST_FAILURE>;

export const getUserListRequest = (since?: number): GetUserListRequestAction => ({
  type: GET_USER_LIST_REQUEST,
  since
});

export const getUserListSuccess = (userList: GithubUser[]): GetUserListSuccessAction => ({
  type: GET_USER_LIST_SUCCESS,
  userList
});

export const getUserListFailure = (): GetUserListFailureAction => ({
  type: GET_USER_LIST_FAILURE
});

export type GetUserListActions = GetUserListRequestAction | GetUserListSuccessAction | GetUserListFailureAction;

export const getUserList = (since?: number) => (dispatch: ThunkDispatch<State, any, GetUserListActions>): void => {
  dispatch(getUserListRequest(since));

  fetchUserList(since).then(userList => dispatch(getUserListSuccess(userList)), () => dispatch(getUserListFailure()));
};

export const getNextUserList = () => (
  dispatch: ThunkDispatch<State, any, GetUserListActions>,
  getState: () => State
): void => {
  const userList = getState().userListState.userList!;
  const { id: since } = userList[userList.length - 1];

  dispatch(getUserList(since));
};
