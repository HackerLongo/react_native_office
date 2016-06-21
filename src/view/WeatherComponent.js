/* @flow */
'use strict';
var React = require('react-native');

var Colors = require('../util/Colors');

var api = require("../Network/api.js");

var {
  View,
  Text,
  Image,
  StyleSheet
} = React;

var WeatherComponent = React.createClass({
	render: function() {
    console.log("jianglin", this.state.status);
    if(!this.state.loaded){
			return (
				<View style={styles.container}>
				<Text style={styles.loadingText}>
					Fetching weather...
				</Text>
			</View>
			);
		}
			return (
				<View style={styles.container}>
          <View style={styles.leftContainer}>
            <Text style = {styles.weatherLeftTitle}>
              {this.state.city}
            </Text>
            <Text style = {styles.weatherLeftTitle}>
              {this.state.date}
            </Text>
            <Text style = {styles.weatherLeftTitle}>
              {this.state.current}
            </Text>
          </View>
          <View style={styles.leftContainer}>
            <Image source={{uri: this.state.imageUrl}} style={styles.weatherImage}/>
            <Text style = {styles.weatherRightTitle}>
              {this.state.temperature} | {this.state.weather}
            </Text>
          </View>
        </View>
			);
	},

  getInitialState: function() {
    return {
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchWeather();
  },

  fetchWeather: function(){
    fetch(api.WEATHER_URL)
    .then((response) => response.json())
    .then((responseText) => {
      this.setState({
        status: responseText.status,
        city: responseText.results[0].currentCity,
        date: responseText.results[0].weather_data[0].date.split(" (")[0],
        current: responseText.results[0].weather_data[0].date.split("(")[1].split(")")[0],
        imageUrl: responseText.results[0].weather_data[0].dayPictureUrl,
        temperature: responseText.results[0].weather_data[0].temperature,
        weather: responseText.results[0].weather_data[0].weather,
        loaded: true,
      });
    })
    .catch((error) => {
      console.warn("jianglin", error);
    });
  }
});

var styles = StyleSheet.create({
	container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  loadingText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    color: Colors.darkblue
  },

  postsListView:{
    backgroundColor: Colors.veryLightGrey,
  },

  weatherLeftTitle: {
    fontSize: 20,
    margin: 10,
    color: Colors.darkGrey,
    marginLeft: 25,
  },

  weatherRightTitle: {
    fontSize: 20,
    margin: 10,
    color: Colors.darkGrey,
  },

  weatherImage: {
    width: 96,
    height: 66,
  },
});


module.exports = WeatherComponent;
