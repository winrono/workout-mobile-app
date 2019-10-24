import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { AsyncStorage, ActivityIndicator, ScrollView } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { NavigationEvents } from 'react-navigation';
import {
    Container,
    Content,
    Header,
    Accordion,
    Card,
    DeckSwiper,
    Button,
    Icon,
    Tabs,
    Tab,
    ScrollableTab,
    List,
    ListItem,
    Left,
    Body,
    Right
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Exercise } from '../models/exercise';
import { DailyWorkout } from '../models/daily-workout';
import { Set } from '../models/set';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from 'react-native-vector-icons';

export default class Dashboard extends Component<any, any> {
    _deckSwiper: DeckSwiper;
    constructor(props) {
        super(props);
        this.state = { date: '2019-10-24' };
    }
    render() {
        return (
            <Container style={{ marginTop: 50 }}>
                <NavigationEvents
                    onDidFocus={() => {
                        this.getExercises();
                    }}
                />
                <DatePicker
                    style={{ width: 200, alignSelf: 'center', marginBottom: 20 }}
                    date={this.state.date}
                    mode="date"
                    androidMode="default"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={date => {
                        this.setState({ date: date });
                    }}
                />
                {this.state.exercises ? this.renderContent() : <ActivityIndicator size="large" />}
            </Container>
        );
    }
    async getExercises() {
        axios
            .get('http://localhost:55191/exercise/exercises', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then(async (res: AxiosResponse<Exercise[]>) => {
                let nonGroupedExercises = res.data.map(ex => {
                    return {
                        title: this.getDisplayedDate(ex.creationTime),
                        entity: ex
                    };
                });
                let dailyWorkouts: DailyWorkout[] = nonGroupedExercises.reduce(
                    (prev, current) => {
                        var found = prev.find(obj => {
                            return obj.title === current.title;
                        });
                        if (!found) {
                            prev.push({ title: current.title, exercises: [current.entity] });
                        } else {
                            found.exercises.push(current.entity);
                        }
                        return prev;
                    },
                    [] as DailyWorkout[]
                );
                this.setState({
                    dailyWorkouts
                });
                this.setState({ exercises: res.data });
            });
    }
    renderContent() {
        let item: DailyWorkout = this.state.dailyWorkouts.find(dailyWorkout => {
            return dailyWorkout.title == this.state.date;
        });
        if (!item) {
            return <Text>No workout statistics</Text>;
        }
        let sets: Set[] = item.exercises.reduce(
            (prev, current) => {
                let found = prev.find((set: Set) => {
                    return set.title == current.name;
                });
                if (!found) {
                    prev.push({ title: current.name, exercises: [current] });
                } else {
                    found.exercises.push(current);
                }
                return prev;
            },
            [] as Set[]
        );
        return (
            <ScrollView>
                <Accordion dataArray={sets} renderContent={this._renderAccordionItem.bind(this)}></Accordion>
            </ScrollView>
        );
    }
    _renderAccordionItem(set: Set) {
        return (
            <List>
                {set.exercises.map(exercise => (
                    <ListItem icon>
                        <Body>
                            <Text>
                                Weight: {exercise.weight}, Repetitions count is {exercise.repetitionsCount}
                            </Text>
                        </Body>
                        <Right>
                            <Icon active name="paper" />
                            <Button
                                onPress={() => {
                                    this.deleteExercise(exercise);
                                }}
                            >
                                <EvilIcons size={30} active name="minus" />
                            </Button>
                        </Right>
                    </ListItem>
                ))}
            </List>
        );
    }
    deleteExercise(exercise: Exercise) {
        axios
            .delete(`http://localhost:55191/exercise/exercises/${exercise.exerciseId}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then(() => {
                this.getExercises();
            });
    }
    getDisplayedDate(dateString) {
        let now = new Date(Date.parse(dateString));
        const year = now.getFullYear();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        return `${year}-${month}-${day}`;
    }
}
