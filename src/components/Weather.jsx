import React from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { RiNeteaseCloudMusicLine, RiOpenaiFill } from "react-icons/ri";
import styles from "./Weather.module.css";
import summer from "/images/summer.gif";
import spring from "/images/spring.gif";
import winter from "/images/winter.gif";
import rainy from "/images/rainy.gif";

import { useState } from "react";

function Weather() {
  let [cityName, SetCityName] = useState();
  let [details, setDetails] = useState(null);
  let [message,setMessage]=useState("Lets find out")
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
          | GET THE BEST FOOD SUGGESTIONS FROM THE AI<RiOpenaiFill/>|
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
                  <p className={styles.scrollInfo}>Scroll down to get Food Info <FaAnglesDown /> </p>
                </ul>
              </>
            )}
          </div>
          <div className={styles.weatherImage}>
            <img src={displayImg} alt="" />
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt hic soluta laborum explicabo, quia consequuntur nostrum voluptate repudiandae, eos vitae corrupti maxime inventore sed cumque dignissimos, omnis recusandae vero minus!
                Quae voluptates ratione repellendus pariatur, eligendi vero quibusdam, adipisci at cum voluptate aliquam sapiente consequatur reprehenderit? Eos et nulla voluptatem rerum aliquam eaque consectetur maiores sequi. Amet, sapiente? Ullam, est!
                Accusantium sunt rerum sed corrupti cupiditate sint soluta fugit asperiores nemo, molestiae corporis magni, architecto voluptate aliquam eligendi doloribus reiciendis. Optio perspiciatis fugiat tempora est veniam animi accusantium, voluptatem unde.
                Quidem voluptate illum soluta earum deserunt magni, ullam eveniet atque delectus animi, quisquam dolorem vitae dolore maxime aspernatur quae odit temporibus at est nemo impedit quam. A recusandae eum ullam?
                Quam culpa autem incidunt perspiciatis ad explicabo libero hic voluptas ab voluptates pariatur aliquam dolorum, itaque aut, consectetur vero nobis nostrum porro excepturi deserunt. Possimus deserunt omnis quibusdam autem tempora?
                Maxime doloribus sequi, illo sapiente eius delectus ratione quos nam facere quaerat voluptas officiis vero animi ducimus ipsa officia, quae libero repudiandae sint. Dolor quibusdam excepturi amet minima nobis incidunt.
                Consequatur aliquam animi molestias expedita modi quisquam ipsum dolore mollitia cum impedit, officiis blanditiis veniam rem, sint amet et placeat, perferendis fugiat nostrum reprehenderit enim fuga? Assumenda rerum qui nesciunt.
                A quod aspernatur laboriosam iure quae placeat nihil at exercitationem, recusandae fuga deleniti aliquam dolorem culpa autem facere officiis! Ratione nam sunt corrupti quaerat!
                Cumque deserunt ratione inventore officiis amet commodi eveniet dolores laboriosam, numquam voluptates porro dicta. Ex, animi minus numquam unde voluptas iste nulla doloribus perferendis optio tenetur distinctio voluptatibus accusantium rerum!
              </div>
          </>
        )}
      </div>
    </>
  );
}
export default Weather;
