import { shallow } from 'enzyme';
import * as React from 'react';

import { GithubUser } from '../../api/github/api';
import { User, UserCard } from '../User';

it('UserCard component renders user data properly', () => {
  const user: GithubUser = {
    id: 1,
    avatar_url: 'https://avatars3.githubusercontent.com/u/4364303?v=4',
    login: 'glazar',
    html_url: 'https://github.com/glazar'
  };
  const wrapper = shallow(<UserCard user={user} />);
  expect(wrapper).toMatchSnapshot();
});

it('User component should call to load user if no user provided', () => {
  const mockHandleLoadUser = jest.fn();
  shallow(<User onLoadUser={mockHandleLoadUser} />);
  expect(mockHandleLoadUser).toHaveBeenCalledTimes(1);
});

it('User component should not call to load user if user provided', () => {
  const mockHandleLoadUser = jest.fn();
  const user: GithubUser = {
    id: 1,
    avatar_url: 'https://avatars3.githubusercontent.com/u/4364303?v=4',
    login: 'glazar',
    html_url: 'https://github.com/glazar'
  };
  shallow(<User user={user} onLoadUser={mockHandleLoadUser} />);
  expect(mockHandleLoadUser).not.toHaveBeenCalled();
});
