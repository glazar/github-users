import * as React from 'react';
import { CSSProperties, SFC } from 'react';

import { GithubUser } from '../api/github/api';

const style: CSSProperties = { height: '160px', width: 'auto' };

export const UserThumbnail: SFC<{ user: GithubUser }> = ({ user, children }) => (
  <div className="thumbnail rounded bg-light p-2">
    <img src={user.avatar_url} className="img-fluid rounded-circle" style={style} />
    <div className="caption">
      <h3>{user.login}</h3>
      {children}
    </div>
  </div>
);
