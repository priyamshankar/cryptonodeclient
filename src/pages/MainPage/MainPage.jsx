import React from 'react';
import CoinLists from './CoinLists/CoinLists';
import "./Style/MainPage.css"

const MainPage = () => {
  return (
    <div className='mainpage-container'>
        <CoinLists/>
    </div>
  )
}

export default MainPage