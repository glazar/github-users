declare interface Window {
  // from Redux dev tools extensions: https://github.com/zalmoxisus/redux-devtools-extension#implementation
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}

// augment the already existing Body interface definition
interface Body {
  json<T>(): Promise<T>;
}

