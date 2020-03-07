import React from 'react';
import { withRouter } from 'react-router-dom'

import Main from './component/shared/Main'

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default withRouter(App);
