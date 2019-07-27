import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

 export default class CityList extends React.Component {

 static navigationOptions = {
    title: '         날씨가 궁금한 도시를 선택해주세요',
    //headerStyle: {
      //    backgroundColor: '#000066',
        //},
        headerTintColor: '#0f046a',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
 };

  constructor(props) {
    super(props);

     this.state = {
      cities: [],
    };
  }

   componentDidMount() {
    fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
      .then(response => response.json())
      .then(cities => {
        this.setState({
          cities
        });
      });
  }

   onPressCity(item) {

        this.props.navigation.navigate(
        'Detail',
          {
            city: item
          }
        );
  }

   renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Text style={styles.text}>{city}</Text>
      </TouchableOpacity>
    );
  }

   render() {
    return (
      <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item}
                data={this.state.cities}
      />
    );
  }
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },

   item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    borderRadius: 15,
    margin: 2,
    borderWidth: 3,
    //borderColor: '#87cefa',
    borderColor: 'white',
    backgroundColor: '#4169e1',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  }
});