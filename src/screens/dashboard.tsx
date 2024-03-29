import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Fab, Drawer } from 'native-base';
import { DailyWorkout } from '../models/daily-workout';
import { getShortDate } from '../utils/date';
import { NoStatistics } from '../components/no-statistics';
import StatisticsView from '../components/statistics-view';
import { connect } from 'react-redux';
import { setDate } from '../actions/set-date';
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import TransparentModal from '../components/transparent-modal';
import CalendarModalBody from '../components/calendar-modal-content';
import AddExercise from '../components/add-exercise';
import { DashboardHeader } from '../components/dashboard-header';
import SideBar from '../components/side-bar';

class Dashboard extends Component<
    {
        navigation: any;
        activeWorkouts: DailyWorkout[];
        ready: boolean;
        setDate: (date: string | Date) => Promise<void>;
    },
    {
        date: string;
        activeFab: boolean;
        showCalendarModal: boolean;
        showExerciseModal: boolean;
        suspendRendering: boolean;
        exerciseParentId: string;
        swiperKey: number;
    }
> {
    _drawer: Drawer;

    constructor(props) {
        super(props);
        this.state = {
            date: getShortDate(new Date()),
            activeFab: false,
            showCalendarModal: false,
            suspendRendering: false,
            showExerciseModal: false,
            exerciseParentId: null,
            swiperKey: 1
        };
    }

    render() {
        return (
            <Drawer
            
                ref={ref => {
                    this._drawer = ref;
                }}
                content={<SideBar drawer={this._drawer} />}
            >
                <Container style={{ backgroundColor: '#f0f5f7' }}>
                    <DashboardHeader
                        date={this.state.date}
                        onOpenCalendar={() => {
                            this.setState({ showCalendarModal: !this.state.showCalendarModal });
                        }}
                        onOpenSideBar={() => {
                            this._drawer._root.open();
                        }}
                    />
                    <TransparentModal visible={this.state.showCalendarModal}>
                        <CalendarModalBody
                            onCancel={() => {
                                this.setState({ showCalendarModal: false });
                            }}
                            onDateSubmit={this.onDateSelected.bind(this)}
                            date={this.state.date}
                        ></CalendarModalBody>
                    </TransparentModal>
                    <TransparentModal visible={this.state.showExerciseModal}>
                        <AddExercise
                            parentId={this.state.exerciseParentId}
                            onComplete={() => this.setState({ showExerciseModal: false })}
                        />
                    </TransparentModal>
                    {this.props.ready ? this.renderContent() : <ActivityIndicator size="large" />}
                    <Fab
                        onPress={() => this.setState({ showExerciseModal: true, exerciseParentId: null })}
                        direction="up"
                        position="bottomRight"
                    >
                        <AntDesign name="plus" />
                    </Fab>
                </Container>
            </Drawer>
        );
    }
    onDateSelected(date) {
        this.setState({
            date: date,
            showCalendarModal: false
        });
        this.props.setDate(date);
    }

    renderContent() {
        let pages: JSX.Element[] = [];
        if (this.props.activeWorkouts) {
            this.props.activeWorkouts.forEach(workout => {
                if (!workout || workout.exercises.length === 0) {
                    pages.push(<NoStatistics />);
                } else {
                    pages.push(
                        <StatisticsView
                            exercises={workout.exercises}
                            onAddChildExercise={(parentId: string) =>
                                this.setState({ showExerciseModal: true, exerciseParentId: parentId })
                            }
                        />
                    );
                }
            });
        }

        return (
            <Swiper
                showsPagination={false}
                key={this.state.swiperKey}
                index={1}
                onIndexChanged={(id: number) => {
                    this.onPageChanged(id);
                }}
            >
                {pages}
            </Swiper>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        // prevent redundant and time-consuming rendering
        if (nextState.suspendRendering) {
            return false;
        }
        return true;
    }

    private onPageChanged(id: number) {
        if (id === 0) {
            let prevDay: Date | string = new Date(this.state.date);
            prevDay.setDate(prevDay.getDate() - 1);
            prevDay = getShortDate(prevDay);
            this.setState({ date: prevDay });
            this.props.setDate(prevDay).then(() => {
                this.setState({ suspendRendering: false });
            });
        } else if (id === 2) {
            let nextDay: Date | string = new Date(this.state.date);
            nextDay.setDate(nextDay.getDate() + 1);
            nextDay = getShortDate(nextDay);
            this.setState({ date: nextDay });
            this.props.setDate(nextDay).then(() => {
                this.setState({ suspendRendering: false });
            });
        }
        this.setState({ swiperKey: new Date().getMilliseconds(), suspendRendering: true });
    }
}

function mapStateToProps(state) {
    return {
        activeWorkouts: [state.previousWorkout, state.activeWorkout, state.nextWorkout],
        ready: state.ready
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setDate: date => {
            return dispatch(setDate(date));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
