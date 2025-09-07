import React, { useState } from 'react';
import './App.css';

const App = () => {
  let [city, setCity] = useState('');
  let [wdetails, setWDetails] = useState(false);

  let getData = (event) => {
    event.preventDefault(); // Prevent default form submission.

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ab1bc893efbc697c7cca95f7fa303fdd&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404") {
          setWDetails(undefined); // Indicates no data found.
        } else {
          setWDetails(data); // Pass valid weather data to state.
        }
      })
      .catch((err) => console.error("Error fetching data:", err)); // Gracefully handle errors.
    
    setCity(''); // Clear input field.
  };

  return (
    <div>
      <h1>Simple Weather  </h1>
      <form onSubmit={getData}>
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <div>
        {wdetails !== undefined && wdetails !== false ? (
          <>
            <h3>
              {wdetails.name} 
              {wdetails.sys && <span>{wdetails.sys.country}</span>}
            </h3>

            <h2>
              {wdetails.main && wdetails.main.temp ? `${wdetails.main.temp}°C` : "Temperature not available"}
            </h2>

            {wdetails.weather && wdetails.weather[0] && (
              <img
                src={`https://openweathermap.org/img/wn/${wdetails.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            )}
          </>
        ) : (
          "No data found..."
        )}
      </div>
    </div>
  );
};

export default App;