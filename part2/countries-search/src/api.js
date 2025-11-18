import axios from 'axios'

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const REST_COUNTRIES_BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/'
const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export const getCountries = async () => {
  try {
    const response = await axios.get(`${REST_COUNTRIES_BASE_URL}/api/all`)
    return response.data
  } catch (error) {
    console.error('Error fetching countries:', error)
    throw error
  }
}


export const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${OPENWEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
