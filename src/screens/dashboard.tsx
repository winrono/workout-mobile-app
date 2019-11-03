import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Container, Accordion, List, Fab, Icon, Button } from 'native-base';
import { Datepicker } from '../components/date-picker';
import { Exercise } from '../models/exercise';
import { DailyWorkout } from '../models/daily-workout';
import { Set } from '../models/set';
import { Alert } from 'react-native';
import { ExerciseService } from '../data-access/exercise-service';
import { lazyInject } from '../ioc/container';
import { SuperSet } from '../models/super-set';
import { SupersetView } from '../components/superset-view';
import { SetView } from '../components/set-view';
import { Navbar } from '../components/navbar';
import { getShortDate } from '../utils/date';
import { NoStatistics } from '../components/no-statistics';
import { StatisticsView } from '../components/statistics-view';

export default class Dashboard extends Component<any, any> {

    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;

    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    render() {
        return (
            <Container>
                <Navbar />
                <NavigationEvents
                    onDidFocus={() => {
                        this.getSets();
                    }}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <Fab
                        containerStyle={{ position: 'relative', left: 5, top: 0 }}
                        active={this.state.activeFab}
                        onPress={() => this.setState({ activeFab: !this.state.activeFab })}
                        direction='right'
                    >
                        <Icon name='ios-fitness' />
                        <Button
                            style={{ backgroundColor: '#34A34F' }}
                            onPress={() => this.props.navigation.navigate('AddSet')}
                        >
                            <Icon name='ios-add' />
                        </Button>
                        <Button
                            style={{ backgroundColor: '#3B5998' }}
                            onPress={() => this.props.navigation.navigate('AddSuperset')}
                        >
                            <Icon name='ios-list' />
                        </Button>
                        <Button
                            style={{ backgroundColor: '#DD5144' }}
                            onPress={() => this.props.navigation.navigate('AddTimeset')}
                        >
                            <Icon name='ios-alarm' />
                        </Button>
                    </Fab>
                    <Datepicker
                        pickerStyle={{ width: 150, position: 'absolute', right: 10 }}
                        date={getShortDate(this.state.date)}
                        onDateChange={(date: string) => {
                            this.setState({ date: new Date(date), ready: false }, () => {
                                this.getSets();
                            });
                        }}
                    />
                </View>
                {this.state.ready ? this.renderContent() : <ActivityIndicator size='large' />}
            </Container>
        );
    }
    async getSets() {
        this._exerciseService.getSetsByDate(this.state.date).then(data => {
            let dailyWorkout: DailyWorkout;
            if (data && data.length > 0) {
                dailyWorkout = { title: getShortDate(data[0].creationTime), sets: data };
            }
            this.setState({
                dailyWorkout, ready: true
            });
        });
    }
    renderContent() {
        if (!this.state.dailyWorkout) {
            return <NoStatistics />
        }

        let exercises: Exercise[] = this.state.dailyWorkout.sets.reduce(
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

        return <StatisticsView
            exercises={exercises}
            onDeleteSet={() => { this.getSets() }}
            onEditSet={(set: Set) => this.props.navigation.navigate('EditSet', { set: set })} />
    }
}