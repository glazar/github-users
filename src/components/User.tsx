import * as React from 'react';
import { SFC } from 'react';
import { Alert, Button, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import { clearUser, ClearUserAction, getUser, GetUserActions } from '../actions/userActions';
import { GithubUser } from '../api/github/api';
import { State, UserState } from '../store';
import { Loader } from './Spinner';
import { UserThumbnail } from './UserThumbnail';

interface UserStateProps {
  user?: GithubUser;
  isFetching?: boolean;
}

interface UserDispatchProps {
  onLoadUser?: () => void;
  onClearUser?: () => void;
}

type UserOwnProps = RouteComponentProps<{ login: string }, {}>;

const mapStateToProps = (state: State, ownProps: UserOwnProps): UserStateProps => {
  return {
    user: state.userState.user
      ? state.userState.user
      : state.userListState.userList
        ? state.userListState.userList.find(user => user.login === ownProps.match.params.login)
        : state.userState.user,
    isFetching: state.userState.isFetching
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, any, GetUserActions | ClearUserAction>,
  ownProps: UserOwnProps
): UserDispatchProps => {
  return {
    onLoadUser() {
      dispatch(getUser(ownProps.match.params.login));
    },
    onClearUser() {
      dispatch(clearUser());
    }
  };
};

type UserProps = UserState & UserDispatchProps;

export class User extends React.PureComponent<UserProps, {}> {
  public componentDidMount(): void {
    if (!this.props.user) {
      this.handleLoadUser();
    }
  }

  public componentWillUnmount(): void {
    this.props.onClearUser!();
  }

  public render(): JSX.Element {
    const { user, isFetching } = this.props;

    return (
      <div>
        <LinkContainer to="/">
          <Button bsStyle="primary" className="m-2" bsSize="large">
            User List
          </Button>
        </LinkContainer>

        <PageHeader>User Details</PageHeader>

        {user && !isFetching && <UserCard user={user} />}

        {!user && !isFetching && <Alert bsStyle="warning">No Data Available</Alert>}

        {isFetching && <Loader />}

        {!isFetching && (
          <Button bsStyle="primary" className="m-2" bsSize="large" onClick={this.handleLoadUser}>
            Reload User Details
          </Button>
        )}
      </div>
    );
  }

  private handleLoadUser = (): void => {
    this.props.onLoadUser!();
  };
}

export const UserCard: SFC<{ user: GithubUser }> = ({ user }) => (
  <UserThumbnail user={user}>
    <p>
      ID: <span className="badge badge-info pl-1 pr-1">{user.id}</span>
    </p>
    <p>
      URL:
      <a className="nav-link d-inline pl-1 pr-1" target="_blank" href={user.html_url}>
        <span className="badge badge-info"> {user.html_url}</span>
      </a>
    </p>
  </UserThumbnail>
);

export const ConnectedUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default ConnectedUser;
