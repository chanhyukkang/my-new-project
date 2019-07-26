import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Constants } from 'expo';

 export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return{
         title: `          ${navigation.getParam('city', 'Unknown')} : 오늘의 날씨`,
         headerTintColor: '#0f046a',
                 headerTitleStyle: {
                   fontWeight: 'bold',
                 },
       };
  };

constructor(props) {
    super(props);

     this.state = {
      isLoading: true,
    };
  }

   componentDidMount() {
    const { navigation } = this.props;
    //const city = navigation.getParam('city', 'Unknown');
   const city = 'Daejeon';

//  fetch('http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dee70819bfec5dc8f2eef976482b0987')

fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
      .then(response => response.json())
      .then(info => {
      console.log(info);
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style ={styles.loading}>날씨 정보를 가져오고 있습니다!</Text>
        </View>
      )
    }

     let celsius = this.state.main.temp - 273.15;
     let tempmin = this.state.main.temp_min -273.15;
     let tempmax = this.state.main.temp_max -273.15;
     let weatherdescription = this.state.weather[0].description;
     //let weatherIcon = this.state.weather.icon;


   return(
       <View style={styles.container}>
        <Text style={styles.weather}>
            날씨 : {weatherdescription}
        </Text>
        <Text style={styles.temperature}>
            {'\n'}현재기온 : {celsius.toFixed(1)}°C
        </Text>
        <Text style={styles.temperature}>
              최고 / 최저기온 : {tempmax.toFixed(1)}°C / {tempmin.toFixed(1)}°C
        </Text>

       </View>
        );


    }
}

 const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#4169e1',

      },
      loading: {
        color: '#0f046a',
        textAlign: 'center',
        marginTop: 300,
      },
      weather: {
          fontSize: 30,
          color: 'white',
         textAlign: 'center',
         margin: 10,
      },
      temperature: {
          fontSize: 25,
          color: 'white',
         textAlign: 'center',
         margin: 5,
      }

});

