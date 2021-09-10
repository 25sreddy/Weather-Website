import "./App.css";
import React, { useState } from "react";
function App() {
  const [place, setPlace] = useState("");
  const [daily, setDaily] = useState("");
  const [query, setQuery] = useState({});
  const items = [];
  const tableItems = [];
  function submitHandler(e) {
    e.preventDefault();

    fetch(api.base + query + api.base2)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPlace(result);
        setQuery("");
      });
    console.log(api.base4 + query + api.base3);
    fetch(api.base4 + query + api.base3)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        // setDaily(result);
        // for (let i = 0; i < 24; i++) {
        //   items.push(result.forecast.forecastday[0].hour[i].temp_f);
        // }
        // console.log(items.length);
        // for (let i = 0; i < items.length; i++) {
        //   tableItems.push(<td key={Math.random()}>{items[i]}</td>);
        //   console.log("newitem");
        // }
      });
  }
  console.log(items.length);
  function formattedDate(d = new Date()) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${months[d.getMonth()]} ${day} ${year}`;
  }
  // function iconBuilder() {
  //   var iconurl =
  //     "http://openweathermap.org/img/w/" + place.weather[0].icon + ".png";
  //   return iconurl;
  // }
  console.log(items.length);
  function locationBuilder() {
    var country = place.location.country;
    var name = place.location.name;
    return name + ", " + country;
  }
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  const api = {
    key: "&appid=603ed6f100c2c287fd5618796699dbcb&units=imperial",
    base: "http://api.weatherapi.com/v1/current.json?key=4b398274d898439aae2230411210909&q=",
    base2: "&aqi=no",
    base4:
      "http://api.weatherapi.com/v1/forecast.json?key=4b398274d898439aae2230411210909&q=",
    base3: "&days=1&aqi=no&alerts=no",
  };
  {
    console.log(items.length);
  }
  return (
    <div className="App">
      <div className="search">
        <form value={query} onSubmit={submitHandler}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              required
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="search-icon">
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>

      {typeof place.location != "undefined" ? (
        <div>
          <ul>{console.log(items.length)}</ul>
          <div className="words">
            <div className="location">{locationBuilder()}</div>
            <div className="date">{formattedDate()}</div>
            <div className="weather">
              <img src={place.current.condition.icon} alt="Loading..." />
            </div>
            <div className="temp">{Math.round(place.current.temp_f)}°</div>
          </div>
        </div>
      ) : (
        <p>Search Any City!</p>
      )}
    </div>
  );
}

export default App;
