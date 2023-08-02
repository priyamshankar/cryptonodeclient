import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChartComp from './Chart/ChartComp';
import "./style/coinpage.css";

const CoinPage = () => {
    const param = useParams();
    const [coinId, setCoinId] = useState(param.coinid);

    
   
    return (
    <div>
    <ChartComp coinId = {coinId}/>
    </div>
  )
}

export default CoinPage