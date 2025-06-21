import { useState, useEffect } from 'react';
import countryService from '../services/countries';

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then(initialCountries => {
      setCountries(initialCountries);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <h2>Country Search</h2>
      <input value={search} onChange={handleSearchChange} placeholder="Search for a country" />
      {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )}
      {filteredCountries.length === 1 && (
        <div>
          <h3>{filteredCountries[0].name.common}</h3>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area: {filteredCountries[0].area} km²</p>
          <p>Languages: {Object.values(filteredCountries[0].languages).join(', ')}</p>
          <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} width="100" />
        </div>
      )}
    </div>
  );
};

export default CountrySearch; 