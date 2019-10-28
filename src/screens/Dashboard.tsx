import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {
    Container,
    Accordion,
    List,
    ListItem,
    Body,
    Right
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Exercise } from '../models/exercise';
import { DailyWorkout } from '../models/daily-workout';
import { Set } from '../models/set';
import { AntDesign } from 'react-native-vector-icons';
import { Alert } from 'react-native';
import { ExerciseService } from '../data-access/exercise-service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { lazyInject } from '../ioc/container';

export default class Dashboard extends Component<any, any> {

    _accordion: Accordion;
    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;

    constructor(props) {
        super(props);
        this.state = { date: this.getCalendarDate() };
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
                    mode='date'
                    androidMode='default'
                    placeholder='select date'
                    format='YYYY-MM-DD'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
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
                        if (this._accordion && date != this.state.date) {
                            this._accordion.setSelected(-1);
                        }
                        this.setState({ date: date });
                    }}
                />
                {this.state.exercisesLoaded ? this.renderContent() : <ActivityIndicator size='large' />}
            </Container>
        );
    }
    async getExercises() {
        this._exerciseService.getSets().then((data) => {
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
                        prev.push({ title: current.title, sets: [current.entity] });
                    } else {
                        found.sets.push(current.entity);
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
        let exercises: Exercise[] = item.sets.reduce(
            (prev, current) => {
                let found = prev.find((exercise: Exercise) => {
                    return exercise.title == current.name;
                });
                if (!found) {
                    prev.push({ title: current.name, sets: [current] });
                } else {
                    found.sets.push(current);
                }
                return prev;
            },
            [] as Exercise[]
        );
        return (
            <ScrollView>
                <Accordion ref={c => (this._accordion = c)} icon='add' expandedIcon='remove' iconStyle={{ position: 'absolute', right: 10 }} expandedIconStyle={{ position: 'absolute', right: 10 }} dataArray={exercises} renderContent={this._renderAccordionItem.bind(this)}></Accordion>
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
    _renderAccordionItem(exercise: Exercise) {
        return (
            <List>
                {exercise.sets.map(set => (
                    <ListItem icon>
                        <Body>
                            <Text>
                                {set.repetitionsCount} reps with {set.weight} kg
                            </Text>
                        </Body>
                        <Right>
                            <TouchableOpacity>
                                <AntDesign style={{ marginRight: 10 }} size={30} active name='edit' />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign onPress={() => {
                                    this.deleteSetSafely(set);
                                }} size={30} active name='delete' />
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                ))}
            </List>
        );
    }
    deleteSetSafely(set: Set) {
        Alert.alert(
            'Are you sure you want to delete set?',
            '',
            [
                { text: 'Cancel', style: 'cancel', },
                { text: 'Delete', onPress: () => this.deleteSet(set) },
            ]
        );
    }
    deleteSet(set: Set) {
        this._exerciseService.deleteSetById(set.exerciseId)
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
    getCalendarDate() {
        let now = new Date();
        const year = now.getFullYear();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        return `${year}-${month}-${day}`;
    }
}
