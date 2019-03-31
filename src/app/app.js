import React from 'react';
import * as Sentry from '@sentry/browser';
import 'antd/dist/antd.css';

import './app.scss';
import Routes from './routes';

Sentry.init({
  dsn: 'https://6eee2574919644e1bdbdf7bb93dd6444@sentry.io/1408911'
});

class App extends React.PureComponent {
  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    return <Routes />;
  }
}

export default App;
