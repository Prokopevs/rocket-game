import './style/App.css';
import AppRouter from "./router/AppRouter";
import {isMobile} from 'react-device-detect';
import { useNavigate } from "react-router-dom"

function App() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
  if (isMobile && (width < 800)) {
    return (
      <>
        <AppRouter />
      </>
    )
  }  

  return (
  <div className='dontMobile'> 
    <p className='dontMobile_text'>Please use mobile</p>
  </div>
)
}
// isMobileNavigator()
export default App;