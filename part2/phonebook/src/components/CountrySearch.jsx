import { useState, useEffect } from 'react';
import countryService from '../services/countries';

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
    setSelectedCountry(null); // Reset selected country when search changes
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h2>Country Search</h2>
      <input value={search} onChange={handleSearchChange} placeholder="Search for a country" />
      {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>
              {country.name.common} <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div>
          <h3>{selectedCountry.name.common}</h3>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="100" />
        </div>
      )}
      {filteredCountries.length === 1 && !selectedCountry && (
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