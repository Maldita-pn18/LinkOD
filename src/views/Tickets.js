import 'date-fns';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navigation from '../components/navigationBar';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Redirect } from "react-router-dom";
import Checkout from './Checkout';




export default class DateLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bus: "",
            busNumber: "",
            availableSeat: "",
            departureTime: "",
            arrivalTime: "",
            duration: "",
            adult: "",
            time: "",
            child: "",
            journeyTo: "",
            journeyFrom: "",
            petsa: "",
            child_fare: "",
            adult_fare: "",
            seats: "[3,1]",
            availableBus: "",
            toCheckout: false
        }
    }

    validation = () => {
        if (this.state.adult === "" && this.state.child === "") {
            alert("Input fields")
        } else {
            this.setState({ toCheckout: true })
            // ReactDOM.render(<Checkout />, document.getElementById('root'));
        }
    };

    checkout = () => {
        if (this.state.toCheckout) {
            if (this.state.toCheckout) {
                return <Redirect to={{
                    pathname: "/checkout",
                    state: {
                        petsa: this.state.petsa,
                        departureTime: this.state.departureTime,
                        arrivalTime: this.state.arrivalTime,
                        duration: this.state.duration,
                        adult: this.state.adult,
                        child: this.state.child,
                        journeyTo: this.state.journeyTo,
                        journeyFrom: this.state.journeyFrom,
                        petsa: this.state.petsa,
                        child_fare: this.state.child_fare,
                        adult_fare: this.state.adult_fare,
                        busNumber: this.state.busNumber,
                        seats: JSON.stringify(this.state.seats),
                        bus: this.state.bus,
                    }
                }} />
            }
        }
    }

    componentWillMount() {
        this.setState({
            journeyTo: this.props.location.state.journeyTo,
            journeyFrom: this.props.location.state.journeyFrom,
            petsa: this.props.location.state.petsa,
            time: this.props.location.state.time,
            availableBus:this.props.location.state.availableBus,
        });
        
    }
    render() {
        return (
            <div>
                {this.tickets()}
                {this.checkout()}
            </div>
        )
    }

    Adult() {
        const classes = makeStyles(theme => ({
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));

        const handleChange = name => event => {
            this.setState({
                [name]: event.target.value,
            });
        }
        return (
            <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="Adult">Adult</InputLabel>
                <Select
                    native
                    value={this.state.adult}
                    onChange={handleChange('adult')}
                    name="adult"
                    inputProps={{
                        id: 'Adult',
                    }}
                >
                    <option value="" />
                    <option value={1}>one</option>
                    <option value={2}>two</option>
                    <option value={3}>three</option>
                </Select>
                {/* <FormHelperText>Required</FormHelperText> */}
            </FormControl>
        )
    }
    child() {
        const classes = makeStyles(theme => ({
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));

        const handleChange = name => event => {
            this.setState({
                [name]: event.target.value,
            });
        }
        return (
            <FormControl required>
                <InputLabel htmlFor="Child">Child</InputLabel>
                <Select
                    native
                    value={this.state.child}
                    onChange={handleChange('child')}
                    name="child"
                    inputProps={{
                        id: 'Child',
                    }}
                >
                    <option value="" />
                    <option value={1}>one</option>
                    <option value={2}>two</option>
                    <option value={3}>three</option>
                </Select>
                {/* <FormHelperText>Required</FormHelperText> */}
            </FormControl>
        )
    }

    tickets() {
        console.log("testing..", this.state.availableBus)
        let key = 0;
        const StyledTableCell = withStyles(theme => ({
            head: {
                backgroundColor: "#0269e8",
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);

        const StyledTableRow = withStyles(theme => ({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.background.default,
                },
            },
        }))(TableRow);

        function createData(bus, availableSeat, departureTime, arrivalTime, duration) {
            return { bus, availableSeat, departureTime, arrivalTime, duration };
        }

        let rows = [];

        function busInfo(bus, Adult, Child) {
            for (var i = 0; i < bus.length; ++i) {
                rows.push(createData(
                    bus[i].busName,
                    <div>
                        {Adult}&nbsp;&nbsp;&nbsp;&nbsp;{Child}
                        <p align="left">Child Price:&nbsp;&nbsp;&nbsp;{bus[i].fare.child}</p>
                        <p align="left">Adult Price:&nbsp;&nbsp;&nbsp;{bus[i].fare.adult}</p>
                    </div>,
                    bus[i].startTime,
                    bus[i].endTime,
                    bus[i].duration
                ))
            }
        }

        busInfo(this.state.availableBus, this.Adult(), this.child())

        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
                width: '100%',
                marginTop: theme.spacing(3),
                overflowX: 'auto',
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
            table: {
                minWidth: 700,
            },
        }));
        return (
            <div className={classes.root}>
                <p>{this.state.buses}</p>
                <Header />
                <Grid container spacing={3} justify="center" style={{ marginTop: '7%' }}>
                    <Grid item xs={8}>
                        <Navigation />
                        <Paper className={classes.paper}>
                            <Card>
                                <CardContent>
                                    <p> Journey from <span style={{ color: '#3b81b3' }}><b>{this.state.journeyFrom}</b></span> to <span style={{ color: '#3b81b3' }}><b>{this.state.journeyTo}</b></span></p>
                                    <p>Date of Departure: <span style={{ color: '#3b81b3' }}><b>{this.state.petsa}</b></span></p>
                                    <p> Departure Time: <span style={{ color: '#3b81b3' }}><b>{this.state.time}</b></span></p>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Bus</StyledTableCell>
                                                <StyledTableCell align="center">Available Seats</StyledTableCell>
                                                <StyledTableCell align="center">Departure Time</StyledTableCell>
                                                <StyledTableCell align="center">Arrival Time</StyledTableCell>
                                                <StyledTableCell align="center">Duration</StyledTableCell>
                                                <StyledTableCell align="center">Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => (
                                                <StyledTableRow key={key++}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.bus}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{row.availableSeat}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.departureTime}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.arrivalTime}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.duration}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardActions>
                                    <p>&nbsp;&nbsp;Price:</p>
                                    <Grid container justify='flex-end'>
                                        <Button size="small" color="primary" type="submit" onClick={this.validation} >Checkout</Button>
                                        <Grid container justify='flex-end'>
                                            <Button size="small" color="primary">
                                                Back
                                    </Button>
                                        </Grid>
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