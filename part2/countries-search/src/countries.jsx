import { useEffect, useState } from "react";
import { getWeather } from "./api";

export const ActionButton = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

export const WeatherDisplay = ({ locationName, lat, lon }) => {
  const [temperature, setTemperature] = useState(0);
  const [iconUrl, setIconUrl] = useState("");
  const [condition, setCondition] = useState("");
  const [windVelocity, setWindVelocity] = useState(0);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const result = await getWeather(lat, lon);
        const kelvinToCelsius = result.main.temp - 273.15;
        setTemperature(kelvinToCelsius);
        setIconUrl(
          `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`
        );
        setCondition(result.weather[0].description);
        setWindVelocity(result.wind.speed);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };
    fetchWeatherData();
  }, [lat, lon]);

  return (
    <div>
      <h3>Weather in {locationName}</h3>
      <li>Temperature: {temperature.toFixed(2)} Celcius</li>
      <p>
        {condition}, wind: {windVelocity}
      </p>
      <img src={iconUrl} width={200} height={200} alt="Weather icon" />
    </div>
  );
};

export const CountryDetails = ({ countryData, isVisible }) => {
  if (!isVisible) {
    return null;
  }
  const languageCodes = Object.keys(countryData.languages || {});

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <li>Capital: {countryData.capital}</li>
      <li>Area: {countryData.area}</li>
      <h3>languages:</h3>
      {languageCodes.map((code) => (
        <li key={code}>{countryData.languages[code]}</li>
      ))}
      <img
        src={countryData.flags.png}
        width={400}
        height={200}
        alt="Country flag"
      />
      <WeatherDisplay
        locationName={countryData.name.common}
        lat={countryData.latlng[0]}
        lon={countryData.latlng[1]}
      />
    </div>
  );
};

export const CountryItem = ({ countryData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleVisibility = () => setIsExpanded((prev) => !prev);

  return (
    <div>
      <li>
        {countryData.name.common}{" "}
        <ActionButton text={"show"} onClick={toggleVisibility} />
      </li>
      <CountryDetails countryData={countryData} isVisible={isExpanded} />
    </div>
  );
};

export const FilteredCountries = ({ filteredResults }) => {
  const resultCount = filteredResults.length;

  if (resultCount > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (resultCount === 1) {
    return (
      <div>
        <CountryDetails countryData={filteredResults[0]} isVisible={true} />
      </div>
    );
  }

  if (resultCount > 1) {
    return (
      <div>
        {filteredResults.map((item, idx) => (
          <CountryItem key={idx} countryData={item} />
        ))}
      </div>
    );
  }

  return null;
};

export const CountrySearchInput = ({ onSearchChange }) => {
  return (
    <div>
      find countries <input onChange={onSearchChange} />
    </div>
  );
};
