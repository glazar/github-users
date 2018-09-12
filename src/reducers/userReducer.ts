import {
  CLEAR_USER,
  ClearUserAction,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GetUserFailureAction,
  GetUserRequestAction,
  GetUserSuccessAction,
} from './../actions/userActions';
import { UserState } from './../store';

type UserActions = GetUserRequestAction | GetUserSuccessAction | GetUserFailureAction | ClearUserAction;

export const userReducer = (state: UserState = {}, action: UserActions): UserState => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        isFetching: true
      };

    case GET_USER_SUCCESS:
      return {
        isFetching: false,
        user: action.user
      };

    case GET_USER_FAILURE:
    case CLEAR_USER:
      return {};

    default:
      // @ts-ignore
      const exhaustiveCheck: never = action;
      return state;
  }
};
