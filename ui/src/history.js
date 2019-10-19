import { createHashHistory, createMemoryHistory } from 'history';

let history = createMemoryHistory();

if (process.env.NODE_ENV !== 'test') {
  history = createHashHistory();
}

export default history;
