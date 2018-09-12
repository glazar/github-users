import {
  CLEAR_USER,
  ClearUserAction,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GetUserFailureAction,
  GetUserRequestAction,
  GetUserSuccessAction,
} from './../../actions/userActions';
import { GithubUser } from './../../api/github/api';
import { UserState } from './../../store';
import { userReducer } from './../userReducer';

describe('userReducer', () => {
  it('should update fetching status on request', () => {
    const beforeState: UserState = {};

    const action: GetUserRequestAction = {
      type: GET_USER_REQUEST,
      login: 'glazar'
    };

    const afterState = userReducer(beforeState, action);

    const expectedState: UserState = {
      isFetching: true
    };

    expect(afterState).toEqual(expectedState);
  });

  it('should update fetching status and user on success', () => {
    const beforeState: UserState = {
      isFetching: true
    };

    const user: GithubUser = {
      id: 1,
      avatar_url: 'https://avatars3.githubusercontent.com/u/4364303?v=4',
      login: 'glazar',
      html_url: 'https://github.com/glazar'
    };

    const action: GetUserSuccessAction = {
      type: GET_USER_SUCCESS,
      user
    };

    const afterState = userReducer(beforeState, action);

    const expectedState: UserState = {
      isFetching: false,
      user
    };

    expect(afterState).toEqual(expectedState);
  });

  it('should clear data on clear', () => {
    const user: GithubUser = {
      id: 1,
      avatar_url: 'https://avatars3.githubusercontent.com/u/4364303?v=4',
      login: 'glazar',
      html_url: 'https://github.com/glazar'
    };

    const beforeState: UserState = {
      isFetching: false,
      user
    };

    const action: ClearUserAction = {
      type: CLEAR_USER
    };

    const afterState = userReducer(beforeState, action);

    expect(afterState).toEqual({});
  });

  it('should clear data on failure', () => {
    const beforeState: UserState = {
      isFetching: true
    };

    const action: GetUserFailureAction = {
      type: GET_USER_FAILURE
    };

    const afterState = userReducer(beforeState, action);

    expect(afterState).toEqual({});
  });
});
