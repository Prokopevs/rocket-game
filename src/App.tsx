import './style/App.css';
import AppRouter from "./router/AppRouter";
import {isMobile} from 'react-device-detect';
import { getUserData, getGame } from "./http/getUserData"
import { parceString } from "./helpers/parceString"
import React from 'react';
import { getReferralsReq } from './http/getPricesReq';

declare global {
  interface Window {
    Telegram: any;
  }
}
function App() {
  React.useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }
  }, [])

  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const [userData, setUserData] = React.useState({id:0, firstname: "", username: ""})
  const [game, setGame] = React.useState({ownerId: 0, score: 0, gasStorage: 0, gasMining: 0, protection: 0})
  const [prices, setPrices] = React.useState({"1": 0, "2": 0, "3": 0, "4": 0, "5": 0})
  React.useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    const strObj = parceString(window.location.href)
    const response: any = await getUserData(strObj.startapp, strObj.header)
    setUserData(() => ({
      ...response?.data
    }));
    if (response?.data.id) {
        const game: any = await getGame(response?.data.id)
        setGame(() => ({
          ...game?.data
        }));

        const res: any = await getReferralsReq()
          setPrices(() => ({
          ...res?.data.Data
        }))
    }
  }

  if ((isMobile && (width < 800)) && (userData.id) && (game.ownerId)) {
    return (
      <>
        <AppRouter userData={userData} game={game} setGame={setGame} prices={prices}/>
      </>
    )
  }  

  return (
  <div className='dontMobile'> 
    {(isMobile && (width < 800)) ? 
      <p className='dontMobile_text'>Loading...</p> : 
      <p className='dontMobile_text'>Please use mobile</p>
    }
  </div>
)
}

// setGame(prevGame => ({
//   ...prevGame,
//   gasStorage: prevGame.gasStorage + 1
// }));
export default App;
