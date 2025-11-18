import { useEffect, useState } from "react";
import { getCountries } from "./api";
import { FilteredCountries, CountrySearchInput } from "./countries";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const data = await getCountries();
      setAllCountries(data);
    };
    loadCountries();
  }, []);

  const handleSearchInput = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm === "") {
      setFilteredCountries([]);
      return;
    }

    const matches = allCountries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(searchTerm);
    });

    setFilteredCountries(matches);
  };

  return (
    <div>
      <CountrySearchInput onSearchChange={handleSearchInput} />
      <FilteredCountries filteredResults={filteredCountries} />
    </div>
  );
}

export default App;
