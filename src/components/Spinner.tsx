import * as React from 'react';
import { CSSProperties } from 'react';

import spinner from '../images/spinner.svg';

const style: CSSProperties = { height: '80px' };

export const Loader = () => <img src={spinner} style={style} className="m-3" alt="loader" />;
