import { useState, useEffect } from 'react';
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
