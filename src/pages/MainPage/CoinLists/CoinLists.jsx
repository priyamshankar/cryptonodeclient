import React, { useEffect, useState } from 'react';
import "./style/CoinList.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoinLists = () => {
    const navigate = useNavigate();
    const [coinList,setCoinList] = useState([
        {
          "id": "bitcoin",
          "symbol": "btc",
          "name": "Bitcoin",
          "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
          "current_price": 2409375,
          "market_cap": 46833497589061,
          "market_cap_rank": 1,
          "fully_diluted_valuation": 50577886940449,
          "total_volume": 1054203255255,
          "high_24h": 2414022,
          "low_24h": 2368995,
          "price_change_24h": 8432.53,
          "price_change_percentage_24h": 0.35122,
          "market_cap_change_24h": 131639145129,
          "market_cap_change_percentage_24h": 0.28187,
          "circulating_supply": 19445325,
          "total_supply": 21000000,
          "max_supply": 21000000,
          "ath": 5128383,
          "ath_change_percentage": -53.04199,
          "ath_date": "2021-11-10T14:24:11.849Z",
          "atl": 3993.42,
          "atl_change_percentage": 60203.87569,
          "atl_date": "2013-07-05T00:00:00.000Z",
          "roi": null,
          "last_updated": "2023-08-01T20:02:32.306Z"
        },
        {
          "id": "ethereum",
          "symbol": "eth",
          "name": "Ethereum",
          "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
          "current_price": 152404,
          "market_cap": 18460953337168,
          "market_cap_rank": 2,
          "fully_diluted_valuation": 18460953337168,
          "total_volume": 769788671459,
          "high_24h": 153326,
          "low_24h": 150111,
          "price_change_24h": -410.95467732159887,
          "price_change_percentage_24h": -0.26892,
          "market_cap_change_24h": 88939033803,
          "market_cap_change_percentage_24h": 0.4841,
          "circulating_supply": 121126397.073225,
          "total_supply": 121126397.073225,
          "max_supply": null,
          "ath": 362338,
          "ath_change_percentage": -57.95788,
          "ath_date": "2021-11-10T14:24:19.604Z",
          "atl": 28.13,
          "atl_change_percentage": 541414.59488,
          "atl_date": "2015-10-20T00:00:00.000Z",
          "roi": {
            "times": 83.5683266413745,
            "currency": "btc",
            "percentage": 8356.83266413745
          },
          "last_updated": "2023-08-01T20:02:30.255Z"
        },
        {
          "id": "tether",
          "symbol": "usdt",
          "name": "Tether",
          "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
          "current_price": 82.27,
          "market_cap": 6907689192524,
          "market_cap_rank": 3,
          "fully_diluted_valuation": 6907689192524,
          "total_volume": 1988018494996,
          "high_24h": 82.77,
          "low_24h": 82.06,
          "price_change_24h": 0.04099772,
          "price_change_percentage_24h": 0.04986,
          "market_cap_change_24h": 17428945931,
          "market_cap_change_percentage_24h": 0.25295,
          "circulating_supply": 83895492718.688,
          "total_supply": 83895492718.688,
          "max_supply": null,
          "ath": 91.22,
          "ath_change_percentage": -9.81618,
          "ath_date": "2018-07-24T00:00:00.000Z",
          "atl": 36.86,
          "atl_change_percentage": 123.1897,
          "atl_date": "2015-03-02T00:00:00.000Z",
          "roi": null,
          "last_updated": "2023-08-01T20:00:00.683Z"
        },
        {
          "id": "binancecoin",
          "symbol": "bnb",
          "name": "BNB",
          "image": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
          "current_price": 20322,
          "market_cap": 3125473559768,
          "market_cap_rank": 4,
          "fully_diluted_valuation": 4062851643912,
          "total_volume": 67292566301,
          "high_24h": 20324,
          "low_24h": 19652.6,
          "price_change_24h": 470.15,
          "price_change_percentage_24h": 2.36826,
          "market_cap_change_24h": 70146148992,
          "market_cap_change_percentage_24h": 2.29586,
          "circulating_supply": 153856150,
          "total_supply": 153856150,
          "max_supply": 200000000,
          "ath": 50351,
          "ath_change_percentage": -59.66395,
          "ath_date": "2021-05-10T07:24:17.097Z",
          "atl": 2.58,
          "atl_change_percentage": 785650.91596,
          "atl_date": "2017-10-19T00:00:00.000Z",
          "roi": null,
          "last_updated": "2023-08-01T20:02:28.065Z"
        }]);

    async function fetchCoins (){
        try{

            const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en");
            const fetchedCoin = response.data; 
            // console.log(fetchedCoin);
            setCoinList(fetchedCoin);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
      fetchCoins();
    }, [])
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function handleClick(id){
        navigate(`/coin/${id}`);
    }

  return (
    <div className='coinList-container'>
        <table>
            <thead>

            <tr className='heading-table'>
                <td></td>
                <td>Name</td>
                <td>Price</td>
                <td>24h change</td>
                <td>Market cap</td>
            </tr>
            </thead>
            {coinList.map((coin)=>{
                const posProfit = coin.price_change_percentage_24h>0;
                return (
                    <tbody  key={coin.id}>

                    <tr className="col-tab" onClick={()=>handleClick(coin.id)}>
                        <td><img src={coin.image} alt="" /></td>
                        <td>
                        {coin.name}
                        </td>
                        <td>{coin.current_price}</td>
                        <td style={{
                            color: posProfit > 0 ? "rgb(14, 203, 129)" : "red",
                        }}>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                        <td>{numberWithCommas(coin.current_price.toFixed(2))}m</td>
                    </tr>
                    </tbody>
                )
            })}
        </table>
        {/* {coinList[0]} */}
        </div>
  )
}

export default CoinLists