import 'date-fns';
import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Navigation from '../components/navigationBar'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Redirect } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";



export default class DateLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            displayDate: new Date(),
            time: "",
            displayTime: Date.now(),
            from: "",
            to: "",
            toRequired: '',
            fromRequire: '',
            availableBus: "", // []
            toTickets: false,
            toRequiredColor: null,
            fromRequiredColor: null
        }
    }
    componentDidMount() {
        localStorage.setItem("stage","one")
        let months = {
            '0': 'January',
            '1': 'February',
            '2': 'March',
            '3': 'April',
            '4': 'May',
            '5': 'June',
            '6': 'July',
            '7': 'August',
            '8': 'September',
            '9': 'October',
            '10': 'November',
            '11': 'December'
        };
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        month = months[String(month)];
        let day = new Date().getDate();
        let date = month + ' ' + day + ', ' + year;
        this.setState({ date: date });
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        var ampm = hour >= 12 ? 'pm' : 'am';
        hour = hour % 12;
        hour = hour ? hour : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let time = hour + ':' + minutes + ' ' + ampm;
        this.setState({ time: time })

    }

    checkCredential = () => {
        if (this.state.from !== "" && this.state.to !== "" && this.state.date !== "") {
            this.datelocationCheck(this.state.from, this.state.to).then(callback => {
                if (callback.data.data.body.buses.length !== 0) {
                    //go to the Ticket Component
                    this.setState({
                        toTickets: true,
                        toRequiredColor: { color: "black" },
                        fromRequiredColor: { color: "black" },
                        availableBus: callback.data.data.body.buses
                    })
                    console.log("test",this.state.availableBus)
                } else {
                    swal("We're Sorry!", "Routes unavailable!", "info");
                }
            })
        }
        if (this.state.from === "") {
            this.setState({ fromRequire: "Required field" })
            this.setState({
                fromRequiredColor: {
                    color: "red"
                }
            })
        }
        if (this.state.to === "") {
            this.setState({ toRequired: "Required Field" });
            this.setState({
                toRequiredColor: {
                    color: "red"
                }
            })
        }
        if (this.state.from === "" && this.state.to === "") {
            this.setState({ fromRequire: "Required field", toRequired: "Required field" })
        }
    };
    datelocationCheck(from, to) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:4000/date-location/' + from + '/' + to)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    ticketRedirect() {
        if (this.state.toTickets) {
            localStorage.setItem("stage","two")
            return <Redirect to={{
                pathname: "/Tickets",
                state: {
                    journeyTo: this.state.to,
                    journeyFrom: this.state.from,
                    petsa: this.state.date,
                    time: this.state.time,
                    availableBus:this.state.availableBus,
                }
            }} />
        }
    }
    render() {
        return (
            <div>
                {this.datelocation()}
                {this.ticketRedirect()}
            </div>
        )
    }

    datelocation() {
        const dating = date => {
            let months = {
                '0': 'January',
                '1': 'February',
                '2': 'March',
                '3': 'April',
                '4': 'May',
                '5': 'June',
                '6': 'July',
                '7': 'August',
                '8': 'September',
                '9': 'October',
                '10': 'November',
                '11': 'December'
            }
            let month = new Date(date).getMonth();
            month = months[String(month)];
            let day = new Date(date).getDate();
            let Year = new Date(date).getFullYear();
            let updatedDate = month + ' ' + day + ', ' + Year
            this.setState({ date: updatedDate, displayDate: date })
        };

        const time = time => {
            let hour = time.getHours();
            let minutes = time.getMinutes();
            var ampm = hour >= 12 ? 'pm' : 'am';
            hour = hour % 12;
            hour = hour ? hour : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            let times = hour + ':' + minutes + ' ' + ampm;
            this.setState({ time: times, displayTime: time })
        }

        const from = from => event => {
            this.setState({ [from]: event.target.value })
        }
        const to = to => event => {
            this.setState({ [to]: event.target.value })
        }




        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                height: 100,
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));

        return (
            <div className={classes.root}>
                <Header />
                <Grid container spacing={3} justify="center" style={{ marginTop: '7%' }}>
                    <Grid item xs={8} style={{boxShadow:'0px 0px 3px black'}}>
                        <Navigation />
                        <Paper className={classes.paper}>
                            <Card>
                                <CardContent>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify='space-around'>
                                            <Grid>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    label="Departure Date"
                                                    value={this.state.displayDate}
                                                    onChange={dating}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid>
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    label="Departure Time"
                                                    value={this.state.displayTime}
                                                    onChange={time}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container justify="space-around" >
                                            <Grid>
                                                <FormControl className={classes.formControl} style={{ width: '250px' }}>
                                                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                        From:
                                                </InputLabel>
                                                    <NativeSelect
                                                        value={this.state.from}
                                                        onChange={from('from')}
                                                        inputProps={{
                                                            name: 'from',
                                                            id: 'age-native-label-placeholder',
                                                        }}
                                                    >
                                                        <option value={''}></option>
                                                        <option value={'Talisay'}>Talisay</option>
                                                        <option value={'Parkmall'}>Parkmall</option>
                                                        <option value={'SM Seaside'}>SM Seaside</option>
                                                        <option value={'SM City'}>SM City</option>
                                                    </NativeSelect>
                                                    <FormHelperText style={this.state.fromRequiredColor}>{this.state.fromRequire}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                            <Grid>
                                                <FormControl className={classes.formControl} style={{ width: '250px' }}>
                                                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                        To:
                                                </InputLabel>
                                                    <NativeSelect
                                                        value={this.state.to}
                                                        onChange={to('to')}
                                                        inputProps={{
                                                            name: 'to',
                                                            id: 'age-native-label-placeholder',
                                                        }}
                                                    >
                                                        <option value={''}></option>
                                                        <option value={'Parkmall'}>Parkmall</option>
                                                        <option value={'SM Seaside'}>SM Seaside</option>
                                                        <option value={'Sanremo'}>Sanremo</option>
                                                        <option value={'Mactan Airport'}>Mactan Airport</option>
                                                    </NativeSelect>
                                                    <FormHelperText style={this.state.toRequiredColor}>{this.state.toRequired}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </CardContent>
                                <CardActions>
                                    <Grid container justify='flex-end'>
                                        <Button size="small" color="primary" type="submit" onClick={this.checkCredential} >CHECK AVAILABILITY</Button>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

