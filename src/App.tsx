import './style/App.css';
import AppRouter from "./router/AppRouter";
import {isMobile} from 'react-device-detect';
import { isMobileNavigator } from './lib/helpers';
import { useEffect, useRef, useState } from 'react';

function App() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
  // if (isMobile && (width < 1000) && isMobileNavigator()) {
    return (
      <>
        <AppRouter />
      </>
    )
  // }  

  return <>please use mobile</>
}

export default App;
