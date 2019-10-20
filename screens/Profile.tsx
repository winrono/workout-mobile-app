import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { AsyncStorage } from "react-native";
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NavigationEvents onDidFocus={() => { this.getExercises() }} />
        <Button title="Add new" onPress={() => { this.props.navigation.navigate('AddExercise'); }}></Button>
        {this.renderExercises()}
      </View>
    );
  }
  async getExercises() {
    axios.get('http://localhost:55191/exercise/exercises', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: await AsyncStorage.getItem('cookie')
      }
    }).then((res) => {
      this.setState({ exercises: res.data });
    });
  }
  renderExercises() {
    if (this.state.exercises) {
      return this.state.exercises.map((exercise) => {
        return (<Text>{exercise.name} with weight {exercise.weight}</Text>);
      });
    }
  }
}