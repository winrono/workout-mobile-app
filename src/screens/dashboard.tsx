import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Container, Fab, Icon, Button } from 'native-base';
import { Datepicker } from '../components/date-picker';
import { DailyWorkout } from '../models/daily-workout';
import { Set } from '../models/set';
import { ExerciseService } from '../data-access/exercise-service';
import { lazyInject } from '../ioc/container';
import { Navbar } from '../components/navbar';
import { getShortDate } from '../utils/date';
import { NoStatistics } from '../components/no-statistics';
import { StatisticsView } from '../components/statistics-view';
import { initialize } from '../actions/initialize';
import { connect } from 'react-redux';
import { setDate } from '../actions/set-date';

class Dashboard extends Component<
    {
        dailyWorkout: DailyWorkout, ready: boolean, initialize: () => void, setDate: (date: string | Date) => void
    },
    {
        date: string, activeFab: boolean
    }> {

    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;

    constructor(props) {
        super(props);
        this.state = { date: getShortDate(new Date()), activeFab: false };
    }

    componentWillMount() {
        this.props.initialize();
    }

    render() {
        return (
            <Container>
                <Navbar />
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
                            onPress={() => this.props.navigation.navigate('AddExercise', { date: this.state.date })}
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
                            this.setState({ date: date });
                            this.props.setDate(date);
                        }}
                    />
                </View>
                {this.props.ready ? this.renderContent() : <ActivityIndicator size='large' />}
            </Container>
        );
    }
    renderContent() {
        if (!this.props.dailyWorkout || this.props.dailyWorkout.exercises.length === 0) {
            return <NoStatistics />
        }
        return <StatisticsView
            exercises={this.props.dailyWorkout.exercises}
            onDeleteSet={() => { }}
            onEditSet={(set: Set) => this.props.navigation.navigate('EditSet', { set: set })} />
    }

    //added for future usage
    addAfter<T>(array: Array<T>, index: number, newItem: T) {
        return [
            ...array.slice(0, index),
            newItem,
            ...array.slice(index)
        ];
    }
}

function mapStateToProps(state) {
    return {
        dailyWorkout: state.activeWorkout,
        ready: state.ready
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initialize: () => {
            dispatch(initialize());
        },
        setDate: (date) => {
            dispatch(setDate(date));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);