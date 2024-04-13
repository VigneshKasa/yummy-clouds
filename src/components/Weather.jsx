import React from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { TiWeatherPartlySunny } from "react-icons/ti";
import styles from "./Weather.module.css";
import summer from "/images/summer.gif";
import spring from "/images/spring.gif";
import winter from "/images/winter.gif";
import rainy from "/images/rainy.gif";

import { useState } from "react";

function Weather() {
  let [cityName, SetCityName] = useState();
  let [details, setDetails] = useState(null);
  let [message,setMessage]=useState()
  let [displayImg, setDisplayImg] = useState(spring);

  function handleInput(e) {
    SetCityName(e.target.value);
  }
function  handleKeyDown(e){
  if(e.key==="Enter"){
    weatherReport()
  }
}
  const weatherReport = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=b69234595241bcea69f58c5c2a6bbffc`
    );
    const result = await response.json();
    console.log(result);
    if(result.cod ==='404'){
      console.log(details)
      setDetails(null)
      setMessage("Please enter correct City / Country name or try again")
    }
    else if(result.cod ==='400'){
      console.log(details)
      setDetails(null)
      setMessage("Please enter any City / Country name")
    }
    else{setDetails(result);}
    if (result.main.temp > 20 && result.main.temp < 30) {
      setDisplayImg(spring);
    } else if (result.main.temp > 30) {
      setDisplayImg(summer);
    } else if (result.main.temp < 20) {
      setDisplayImg(winter);
    }
    if (
      result.weather[0].icon == "09d" ||
      result.weather[0].icon == "10d" ||
      result.weather[0].icon == "11d"
    ) {
      setDisplayImg(rainy);
    }

  };

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <img src="/images/logo.png" alt="" />
        </div>
        <div className={styles.headerCaption}>
          | GET YOUR WEATHER INFORMATION FROM THE BEST SOURCE <TiWeatherPartlySunny/> |
        </div>
      </div>
      <div className={styles.topBox}>
        <div className={styles.weatherBox}>
          <div className={styles.weatherInfoBox}>
            <div className={styles.searchBox}>
              <input
                type="text"
                id="cityName"
                placeholder="Please enter city / country name"
                className={styles.input}
                onChange={(e) => handleInput(e)}
                onKeyDown={handleKeyDown}
              />
              <div className={styles.submitButton} onClick={weatherReport}>
                Get info
              </div>
            </div>
            {!details? (
              <>
              <p className={styles.info}>Know your clouds and their Tastes</p>
              <p className={styles.message}>{message}</p>
              </>
            ) : (
              <>
                <ul>
                  <div className={styles.heading}>
                    Temperature in {details.name}
                  </div>
                  <li>Temperature : {details.main.temp}</li>
                  <li>Min Temperature: {details.main.temp_min}</li>
                  <li>Max Temperature : {details.main.temp_max}</li>
                  <li>Humidity : {details.main.humidity} % </li>
                  <li>Clouds : {details.clouds.all}</li>
                  <li>Winds : {details.wind.speed} KM/H</li>
                </ul>
              </>
            )}
          </div>
          <div className={styles.weatherImage}>
            <img src={displayImg} alt="" />
            <p className={styles.scrollInfo}>Scroll down to get Food Info <FaAnglesDown /> </p>
          </div>
        </div>
        {details && (
          <>
              <div className={styles.foodHeading}>Best food for NOW!</div>
              <div className={styles.cardContainer}>
                <div className={styles.cards1}>Nutritious Food</div>
                <div className={styles.cards2}>Delicious Food</div>
                <div className={styles.cards3}>Don't comsume</div>
              </div>
              <div className={styles.foodInfo}>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                <p>Coming soon !!!!!</p>
                </div>
          </>
        )}
      </div>
    </>
  );
}
export default Weather;
