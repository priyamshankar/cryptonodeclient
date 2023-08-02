import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style/chart.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import AlertBox from "../../../components/AlertBox/AlertBox";

const ChartComp = ({ coinId }) => {
  const [coinData, setCoinData] = useState([]);
  const [date, setDate] = useState(1);
  const [alert, setAlert] = useState(false);
  const [CurrentState, setCurrentState] = useState([]);
  const [coinPrice, setcoinPrice] = useState(0);
  const [dayhigh,setDayhigh]= useState(0);

  async function fetchState(){
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=INR&include_24hr_change=true`);
    const fetchedCoin = response.data;
    setCurrentState(fetchedCoin);
        const coinPriceInr = fetchedCoin[coinId].inr;
        const change24Hr = fetchedCoin[coinId].inr_24h_change;
        setcoinPrice(coinPriceInr);
        setDayhigh(change24Hr);
        // console.log(coinPriceInr)
  }

  async function fetchCoinData() {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=INR&days=${date}`
    );
    const fetchedCoin = response.data;
    setCoinData(fetchedCoin.prices);
  }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const posProfit = dayhigh>0;

  useEffect(() => {
    fetchCoinData(); //mus tuncomment this
    fetchState();
  }, [date]);
  return (
    <div className="chartcontainer">
        <div className="headerCharpage">
            <p>{coinId.toUpperCase()}</p>
            <p style={{color:"	#89CFF0"}}>INR { numberWithCommas(coinPrice)}</p>
            <p style={{color: posProfit > 0 ? "rgb(14, 203, 129)" : "red",}}>{dayhigh.toFixed(2)}%</p>
        </div>
      <div className="graphContainer">
        <div className="button-graph">
          <button
            onClick={() => {
              setDate(1);
            }}
          >
            Hours
          </button>
          <button
            onClick={() => {
              setDate(30);
            }}
          >
            Days
          </button>
          <button
            onClick={() => {
              setDate(365);
            }}
          >
            Months
          </button>
        </div>
        <Line
          data={{
            labels: coinData.map((coinDataMap) => {
              let localDate = new Date(coinDataMap[0]);
              let time =
                localDate.getHours() > 12
                  ? `${localDate.getHours() - 12}:${localDate.getMinutes()} PM`
                  : `${localDate.getHours()}:${localDate.getMinutes()} AM`;
              return date === 1 ? time : localDate.toLocaleDateString();
            }),
            datasets: [
              {
                data: coinData.map((dataVal) => dataVal[1]),
                label: `Price ( Past ${date} Days ) in INR`,
              },
            ],
          }}
        />
        <button
          className="Add-alert-btn"
          onClick={() => {
            setAlert(true);
          }}
        >
          Add Alert
        </button>
        {alert && (
          <div className="alertdialog">
            <AlertBox setAlert={setAlert} coinId={coinId} coinPrice={coinPrice}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartComp;
