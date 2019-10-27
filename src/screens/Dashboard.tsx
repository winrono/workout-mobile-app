import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {
    Container,
    Content,
    Accordion,
    Card,
    Button,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Icon
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Exercise } from '../models/exercise';
import { DailyWorkout } from '../models/daily-workout';
import { Set } from '../models/set';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from 'react-native-vector-icons';
import { Alert } from 'react-native';
import { ExerciseService } from '../data-access/exercise-service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Types } from '../ioc/types';
import { lazyInject } from '../ioc/container';

export default class Dashboard extends Component<any, any> {

    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;

    constructor(props) {
        super(props);
        this.state = { date: '2019-10-26' };
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
                {this.state.exercisesLoaded ? this.renderContent() : <ActivityIndicator size="large" />}
            </Container>
        );
    }
    async getExercises() {
        this._exerciseService.getExercises().then((data) => {
            this.setState({ exercisesLoaded: true });
            if (!data) {
                return;
            }
            let nonGroupedExercises = data.map(ex => {
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
            this.setState({ exercises: data });
        });
    }
    renderContent() {
        if (!this.state.dailyWorkouts) {
            return this._renderNoStatistics();
        }
        let item: DailyWorkout = this.state.dailyWorkouts.find(dailyWorkout => {
            return dailyWorkout.title == this.state.date;
        });
        if (!item) {
            return this._renderNoStatistics();
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
    _renderNoStatistics() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch'
        }}><Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>No workout statistics</Text></View>);
    }
    _renderAccordionItem(set: Set) {
        return (
            <List>
                {set.exercises.map(exercise => (
                    <ListItem icon>
                        <Body>
                            <Text>
                                {exercise.repetitionsCount} reps with {exercise.weight} kg
                            </Text>
                        </Body>
                        <Right>
                            <TouchableOpacity>
                                <AntDesign style={{ marginRight: 10 }} size={30} active name="edit" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign onPress={() => {
                                    this.deleteExerciseSafely(exercise);
                                }} size={30} active name="delete" />
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                ))}
            </List>
        );
    }
    deleteExerciseSafely(exercise: Exercise) {
        Alert.alert(
            'Are you sure you want to delete record?',
            '',
            [
                { text: 'Cancel', style: 'cancel', },
                { text: 'Delete', onPress: () => this.deleteExercise(exercise) },
            ]
        );
    }
    deleteExercise(exercise: Exercise) {
        this._exerciseService.deleteExercisebyId(exercise.exerciseId)
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
