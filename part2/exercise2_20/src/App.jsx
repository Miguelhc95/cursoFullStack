import { useState, useEffect } from 'react';
import axios from 'axios';
import countryService from './services/country';

const Filter = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const countriesToShow = props.countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <form>
        Find countries:
        <input value={searchTerm} onChange={handleSearchChange} />
      </form>
      <h2>Results</h2>
      <ul>
        {countriesToShow.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countriesToShow.length === 1 ? (
          <CountryDetails country={countriesToShow[0]} />
        ) : (
          <Countries countries={countriesToShow} />
        )}
      </ul>
    </div>
  );
};

const Countries = (props) => {
  if (!props.countries) {
    return null;
  }

  return (
    <ul className='country'>
      {props.countries.map(country =>
        <Country key={country.name.common} country={country} />
      )}
    </ul>
  );
};

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const options = {
        method: 'GET',
        url: `https://open-weather13.p.rapidapi.com/city/${country.capital}`,
        headers: {
          'X-RapidAPI-Key': 'YOUR API KEY', //CHANGE WITH YOU API KEY OR EXPORT DEFAULT VARIABLE
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km<sup>2</sup></p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) =>
          <li key={index}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

const Country = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (!country) {
    return null;
  }

  return (
    <div>
      <p>{country.name.common}</p>
      {showDetails && (
        <CountryDetails country={country} />
      )}
      <button onClick={toggleDetails}>Details</button>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Countries</h2>
      <Filter countries={countries} />
    </div>
  );
};

export default App;
