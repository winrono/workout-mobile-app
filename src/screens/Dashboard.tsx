import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { NavigationEvents } from 'react-navigation';
import { Container, Content, Header, Accordion, Card, DeckSwiper, Button, Icon } from 'native-base';
import { Exercise } from '../models/exercise';
import { DailyWorkout } from '../models/daily-workout';

export default class Dashboard extends Component {
    _deckSwiper: DeckSwiper;
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <NavigationEvents
                    onDidFocus={() => {
                        this.getExercises();
                    }}
                />
                <Content padder contentContainerStyle={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch'
                }}>
                    {this.state.exercises ? this.renderDashboard() : <ActivityIndicator size="large" />}
                </Content>
            </Container>
        );
    }
    async getExercises() {
        axios
            .get('http://localhost:55191/exercise/exercises', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(async (res: AxiosResponse<Exercise[]>) => {
                let nonGroupedExercises = res.data.map(ex => {
                    return { title: this.getDisplayedDate(ex.creationTime), entity: { name: ex.name, weight: ex.weight, repetitionsCount: ex.repetitionsCount } }
                });
                let viewableDataTree: DailyWorkout[] = nonGroupedExercises.reduce((prev, current) => {
                    var found = prev.find(obj => {
                        return obj.title === current.title
                    });
                    if (!found) {
                        prev.push({ title: current.title, exercises: [current.entity] })
                    } else {
                        found.exercises.push(current.entity);
                    }
                    return prev;
                }, [] as DailyWorkout[]);
                this.setState({
                    viewableDataTree
                });
                this.setState({ exercises: res.data });
            });
    }
    renderDashboard() {
        return (<View><DeckSwiper ref={(c) => this._deckSwiper = c} dataSource={this.state.viewableDataTree} renderItem={this.renderContent}></DeckSwiper>
            <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
            </View></View>)
    }
    renderContent(item: DailyWorkout) {
        return (<Card>
            {item.exercises.map((entity) => {
                return (<Card><Text>Exercise is {entity.name}</Text>
                    <Text>Weight is {entity.weight}</Text>
                    <Text>Repetitions count is {entity.repetitionsCount}</Text></Card>);
            })}
        </Card>);
    }
    getDisplayedDate(dateString) {
        let now = new Date(Date.parse(dateString));
        const year = now.getFullYear();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        return `${year}-${month}-${day}`;
    }
}
