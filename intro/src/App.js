import React, { useState } from 'react';
import './App.css';

var moment = require('moment');
moment().format();








//let date = DateTimePretty(DateTime)


function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function DateTimePretty(Component) {
    return function (props) {
        let date = {
            year: Number(props.date.substr(0, 4)),
            month: Number(props.date.substr(5, 2)),
            day: Number(props.date.substr(8, 2)),
            hour: Number(props.date.substr(11, 2)),
            min: Number(props.date.substr(14, 2)),
        }

        let currentDate = {
            year: Number(moment().format('YYYY')),
            month: Number(moment().format('MM')),
            day: Number(moment().format('DD')),
            hour: Number(moment().format('hh')),
            min: Number(moment().format('mm')),
        }

        let time = new Date(date.year, date.month, date.day, date.hour, date.min).getTime();
        let currentTime = new Date(currentDate.year, currentDate.month, currentDate.day, currentDate.hour, currentDate.min).getTime()
        let difference = (currentTime - time) / 60000;

        let newProps = {
            date: '',
        };

        if (difference < 60) {
            newProps.date = `${difference.toFixed(0)} минут назад`
        } else if (difference < 1440) {
            newProps.date = `${(difference / 60).toFixed(0)} часов назад`
        } else {
            newProps.date = `${(difference / 1440).toFixed(0)} дней назад`
        }

        return Component(newProps);
    }
}

const TimePretty = DateTimePretty(DateTime)

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <TimePretty date={props.date} />

        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}