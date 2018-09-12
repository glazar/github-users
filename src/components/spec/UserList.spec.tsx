import { shallow } from 'enzyme';
import * as React from 'react';

import { GithubUser } from '../../api/github/api';
import { UserCardList, UserList } from '../UserList';

it('UserCardList renders user data properly', () => {
  const userList: GithubUser[] = [
    {
      id: 1,
      avatar_url: 'https://avatars3.githubusercontent.com/u/4364303?v=4',
      login: 'glazar',
      html_url: 'https://github.com/glazar'
    }
  ];
  const wrapper = shallow(<UserCardList userList={userList} />);
  expect(wrapper).toMatchSnapshot();
});

it('UserList component should call to reload user list if no user list provided', () => {
  const mockHandleReloadUserList = jest.fn();

  shallow(<UserList onReloadUserList={mockHandleReloadUserList} />);
  expect(mockHandleReloadUserList).toHaveBeenCalledTimes(1);
});

it('UserList component should not call to reload user list if user list provided', () => {
  const mockHandleReloadUserList = jest.fn();

  const userList: GithubUser[] = [
    {
      id: 1,
      avatar_url: 'https://avatars3.githubusercontent.com/u/4364303?v=4',
      login: 'glazar',
      html_url: 'https://github.com/glazar'
    }
  ];

  shallow(<UserList userList={userList} onReloadUserList={mockHandleReloadUserList} />);
  expect(mockHandleReloadUserList).not.toHaveBeenCalled();
});
