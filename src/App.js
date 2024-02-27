import React from 'react';
import './App.scss';
import './data/iconFonts/iconFonts.css';
import backIcon from './data/icon/arrow.png';

import Main from './Components/main/Main';
import { useSelector, useDispatch } from 'react-redux';
import {setActivePage, tggleDarkTheme} from './features/counter/counterSlice'; 

function App() {
  const dispatch = useDispatch(); 
  const {darcTheme} = useSelector(state => state.stamina); 
  const infoActivPage = useSelector(state => state.stamina.activePage); 
  let activeStringForPage = () => {
    if(infoActivPage.pageLessons === true) {
      return 'pageGrup'
    } else if (infoActivPage.pageLesson === true) {
      return 'pageLessons'
    }else {
      return 'pageGrup'
    }
  }

  const darkClass = darcTheme ? 'dark' : ''; 

  return (
    <div className={`App ${darkClass}`}>
      <div className="wrapper">
        <div className="header">
          <div className="header__back">
            <button className={`${darkClass}`} onClick={() => dispatch(setActivePage(activeStringForPage()))} src={backIcon}>
               <div className="icon-chevron-left"></div>
                Back
            </button>
            <div className={`header__back_theme ${darkClass}`}>
              <div onClick={() => dispatch(tggleDarkTheme()) } className={`icon-moon-fill`}></div>
              <div onClick={() => dispatch(tggleDarkTheme()) } className={`icon-sun-fill`}></div>
            </div>
            
          </div>
          <div className="header__logo logo">
            <div className="logo__title">STAMINA</div>
            <div className="logo__descr">for a programmer</div>
          </div>
        </div>
      </div>
        <Main/>
      
    </div>
  );
}

export default App;
