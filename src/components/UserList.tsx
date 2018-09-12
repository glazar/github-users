import { PureComponent } from 'react';
import { SFC } from 'react';
import * as React from 'react';
import { Alert, Button, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { ThunkDispatch } from 'redux-thunk';

import { getNextUserList, getUserList, GetUserListActions } from '../actions/userListActions';
import { GithubUser } from '../api/github/api';
import { State, UserListState } from '../store';
import { Loader } from './Spinner';
import { UserThumbnail } from './UserThumbnail';

interface UserListDispatchProps {
  onReloadUserList?: () => void;
  onLoadUserList?: () => void;
}

const mapStateToProps = (state: State): UserListState => {
  return {
    userList: state.userListState.userList,
    isFetching: state.userListState.isFetching,
    canFetchMore: state.userListState.canFetchMore
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<State, any, GetUserListActions>): UserListDispatchProps => {
  return {
    onReloadUserList() {
      dispatch(getUserList());
    },
    onLoadUserList() {
      dispatch(getNextUserList());
    }
  };
};

type UserListProps = UserListState & UserListDispatchProps;

export class UserList extends PureComponent<UserListProps, {}> {
  public componentDidMount(): void {
    if (!this.props.userList) {
      this.handleReloadUserList();
    }
  }

  public render(): JSX.Element {
    const { userList, isFetching, canFetchMore } = this.props;

    return (
      <div>
        <PageHeader>User List</PageHeader>
        {!userList && !isFetching && <Alert bsStyle="warning">No Data Available</Alert>}

        {userList && (
          <>
            {!isFetching && (
              <Button bsStyle="primary" className="m-2" bsSize="large" onClick={this.handleReloadUserList}>
                Reload Users
              </Button>
            )}
            <UserCardList userList={userList} />
          </>
        )}
        {isFetching && <Loader />}
        {canFetchMore &&
          !isFetching && (
            <Button bsStyle="primary" className="m-2" bsSize="large" onClick={this.handleLoadUserList}>
              Load More Users
            </Button>
          )}
      </div>
    );
  }

  private handleReloadUserList = (): void => {
    this.props.onReloadUserList!();
  };

  private handleLoadUserList = (): void => {
    this.props.onLoadUserList!();
  };
}

export const UserCardList: SFC<{ userList: GithubUser[] }> = ({ userList }) => (
  <ListGroup className="border-0">
    {userList.map(user => (
      <ListGroupItem key={user.id} className="border-0">
        <UserCard user={user} />
      </ListGroupItem>
    ))}
  </ListGroup>
);

const UserCard: SFC<{ user: GithubUser }> = ({ user }) => (
  <UserThumbnail user={user}>
    <p>
      <LinkContainer to={`/user/${user.login}`}>
        <Button bsStyle="info" bsSize="large">
          Details
        </Button>
      </LinkContainer>
    </p>
  </UserThumbnail>
);

export const ConnectedUserList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

export default ConnectedUserList;
