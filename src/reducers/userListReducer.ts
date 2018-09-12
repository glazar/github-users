import { GET_USER_SUCCESS, GetUserSuccessAction } from './../actions/userActions';
import {
  GET_USER_LIST_FAILURE,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GetUserListFailureAction,
  GetUserListRequestAction,
  GetUserListSuccessAction
} from './../actions/userListActions';
import { UserListState } from './../store';

type UserListActions =
  | GetUserListRequestAction
  | GetUserListSuccessAction
  | GetUserSuccessAction
  | GetUserListFailureAction;

export const userListReducer = (state: UserListState = {}, action: UserListActions): UserListState => {
  switch (action.type) {
    case GET_USER_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        userList: action.since ? state.userList : undefined
      };

    case GET_USER_LIST_SUCCESS:
      return {
        isFetching: false,
        userList: state.userList ? [...state.userList, ...action.userList] : action.userList,
        canFetchMore: action.userList.length > 0
      };

    case GET_USER_LIST_FAILURE:
      return {
        ...state,
        isFetching: false
      };

    case GET_USER_SUCCESS:
      if (!state.userList) {
        return state;
      } else {
        return {
          ...state,
          userList: state.userList.map(user => (user.id !== action.user.id ? user : action.user))
        };
      }
      
    default:
      // @ts-ignore
      const exhaustiveCheck: never = action;
      return state;
  }
};
