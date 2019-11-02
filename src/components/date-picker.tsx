import React from 'react';
import RNDatePicker from 'react-native-datepicker';

export const Datepicker = (props) => {
    return (<RNDatePicker
        style={props.pickerStyle}
        date={props.date}
        mode='date'
        androidMode='default'
        placeholder='select date'
        format='YYYY-MM-DD'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        onDateChange={date => {
            props.onDateChange(date);
        }}
    ></RNDatePicker>);
}