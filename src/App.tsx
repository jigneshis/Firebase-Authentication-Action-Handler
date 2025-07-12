import React from 'react';
import AuthHandler from './components/AuthHandler';
import AuthDemo from './components/AuthDemo';

function App() {
  // Check if we're on the auth action page
  const urlParams = new URLSearchParams(window.location.search);
  const isAuthAction = urlParams.get('mode') && urlParams.get('oobCode');

  if (isAuthAction) {
    return <AuthHandler />;
  }

  return <AuthDemo />;
}

export default App;