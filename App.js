import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Form from './src/components/Form';
import Content from './src/components/Content';
import { useState } from 'react';
import { WEATHER_APP_API_KEY, WEATHER_APP_API_URL } from '@env'; // Importing environment variables

// weather images based on weather conditions
const images = {
  Clear: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Northern_lights_%289997815384%29.jpg',
  Clouds:
    'https://upload.wikimedia.org/wikipedia/commons/8/85/Cloudy.jpg',
  Rain: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Rain_splashes_on_rooftop_4.jpg',
  Unknown: 'https://upload.wikimedia.org/wikipedia/commons/6/63/A_Typical_Sky.jpg'

}

const App = () => {

  // State to hold the city name input
  const [city, setCity] = useState('');

  // States to hold weather data from API response
  const [countryCode, setCountryCode] = useState(''); // State to hold the country code input
  const [temp, setTemp] = useState(''); // State to hold the temperature input
  const [weather, setWeather] = useState(''); // State to hold the weather input

  // Debugging: See the current city input in the console
  // console.log('city', city);

  const fetchData = () => {
    fetchCityData(city);
  }

  const fetchCityData = async (city) => {
    const url = `${WEATHER_APP_API_URL}?q=${city}&appid=${WEATHER_APP_API_KEY}&units=metric`;

    console.log('Fetching data from URL:', url); // Debugging: Log the URL being fetched
    const apiCall = await fetch(url);

    const response = await apiCall.json();
    // Debugging: Log the response from the API
    // console.log('API Response:', response);

    // Setting the state with the response data
    setCountryCode(response.sys.country);
    setTemp(response.main.temp);
    setWeather(response.weather[0].main);


  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: images[weather] || images.Unknown }}
        style={styles.image}
      />
      <Form 
        onChangeText={ text => setCity(text) } 
        onSubmit={ fetchData }
      />
      <Content 
        city={city} 
        temp={temp} 
        weather={weather}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  }
});
