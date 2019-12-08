
import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navigation from '../components/navigationBar';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { Redirect } from "react-router-dom";




export default class Confirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            lName: "",
            email: "",
            phone: "",
            paymentMethod: "",
            book: "",
            bookSaved: "",
            bus: "",
            busNumber: "",
            seats: "",
            departureTime: "",
            arrivalTime: "",
            duration: "",
            adult: "",
            child: "",
            journeyTo: "",
            journeyFrom: "",
            petsa: "",
            toFinal: false,
            confirm: "Save",
            bill: 0,
            stageChecker: false
        }
    }

    save = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:4000/ticket/book', data)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    confirm = () => {
        if (this.state.book === "") {
            this.setState({ book: "Your booking is saved.", confirm: "View Ticket" });
            let seat = this.state.seats.split(",")

            for (var i = 0; i < seat.length; ++i) {
                var num = seat[i].replace('"', '')
                let data = {
                    date: this.state.petsa,
                    from: this.state.journeyFrom,
                    to: this.state.journeyTo,
                    bus: this.state.bus,
                    busNumber: this.state.busNumber,
                    seats: Number(num.trim()),
                    departureTime: this.state.departureTime,
                    arrivalTime: this.state.arrivalTime,
                    firstname: this.state.fName,
                    lastname: this.state.lName,
                    bill: Number(this.state.bill)
                }
                this.save(data).then(res => {
                    console.log(res)
                })
            }
        }
        if (this.state.book !== "") {
            localStorage.setItem("stage","five")
            this.setState({ toFinal: true });
        }
    }
    componentDidMount() {
        if (localStorage.getItem("stage") === 'four') {
            this.setState({
                fName: this.props.location.state.fName,
                lName: this.props.location.state.lName,
                email: this.props.location.state.email,
                phone: this.props.location.state.phone,
                paymentMethod: this.props.location.state.paymentMethod,
                petsa: this.props.location.state.petsa,
                bus: this.props.location.state.bus,
                journeyFrom: this.props.location.state.journeyFrom,
                journeyTo: this.props.location.state.journeyTo,
                departureTime: this.props.location.state.departureTime,
                arrivalTime: this.props.location.state.arrivalTime,
                adult_fare: this.props.location.state.adult_fare,
                child_fare: this.props.location.state.child_fare,
                child: this.props.location.state.child,
                adult: this.props.location.state.adult,
                bus: this.props.location.state.bus,
                busNumber: this.props.location.state.busNumber,
                seats: this.props.location.state.seats,
                bill: eval(this.props.location.state.adult * this.props.location.state.adult_fare + this.props.location.state.child_fare * this.props.location.state.child)
            });
        }else{
            this.setState({stageChecker:true})
        }
    }
    routes = () =>{
        if(this.state.stageChecker){
            return <Redirect to={{pathname:'/'}}/>
        }
    }

    final() {
        if (this.state.toFinal) {
            return <Redirect to={{
                pathname: "/final",
                state: {
                    fName: this.state.fName,
                    lName: this.state.lName,
                    email: this.state.email,
                    phone: this.state.phone,
                    paymentMethod: this.state.paymentMethod,
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
                    seats: this.state.seats,
                    bus: this.state.bus,
                    Bill: this.state.bill
                }
            }} />
        }
    }

    render() {
        return (
            <div>
                {this.tickets()}
                {this.final()}
                {this.routes()}
            </div>
        )
    }

    tickets() {
        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                height: 140,
                width: 100,
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
            pos: {
                marginBottom: 12,
            },
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
            },
        }));
        return (
            <div className={classes.root}>
                <Header />
                <Grid container spacing={3} justify="center" style={{ marginTop: '5%%' }}>
                    <Grid item xs={8}>
                        <Navigation />
                        <Paper className={classes.paper} style={{ borderColor: 'secondary' }}>
                            <Grid container justify='space-around' style={{ height: '10%' }}>
                                <Grid style={{ width: '30%' }}>
                                    <Card className={classes.card} style={{ maxHeight: '300px', marginTop: '8%' }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Journey
                                                </Typography>

                                                <p><b>Date:</b>&nbsp;{this.state.petsa}</p>
                                                <p><b>Depart from:</b> &nbsp;{this.state.journeyFrom + " / " + this.state.departureTime}</p>
                                                <p><b> Arrive to: </b> &nbsp;{this.state.journeyTo + " / " + this.state.arrivalTime}</p>
                                                <p><b>Bus: </b>{this.state.bus}</p>
                                                <p><b>Bus Number:</b> {this.state.busNumber}</p>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid style={{ width: '30%', maxHeight: '300px', marginTop: '2.5%' }}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Tickets
                                                </Typography>

                                                <p><b>Adult:</b> &nbsp;{this.state.adult + " x " + this.state.adult_fare}</p>
                                                <p><b>SP:</b> &nbsp;{this.state.child + " x " + this.state.child_fare}</p>
                                                <p><b>Seats:</b> &nbsp; {this.state.seats}</p>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid style={{ width: '30%', marginTop: '2.5%', }}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Payment
                                                </Typography>

                                                <p>  <b>Tickets Total:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"₱ " + this.state.bill + ".00"}</p>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>
                            <br></br>
                            <hr style={{ width: '96%' }}></hr>
                            <Grid >
                                <Grid container justify='space-around'>
                                    <Card style={{ width: '97%' }}>
                                        <CardContent>
                                            <Grid>
                                                <Typography gutterBottom variant="h6" component="h6">
                                                    <b>Personal Details</b>
                                                </Typography>
                                                <Grid>
                                                    <Typography gutterBottom variant="h6" component="h6">
                                                        First Name : {this.state.fName}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" component="h6">
                                                        Last Name : {this.state.lName}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" component="h6">
                                                        Email : {this.state.email}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" component="h6">
                                                        Phone : {this.state.phone}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" component="h6">
                                                        Payment Method : {this.state.paymentMethod}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <p style={{ marginLeft: '2%' }}>{this.state.book} </p>
                            <br></br>
                            <br></br>
                            <hr style={{ width: '96%' }}></hr>
                            <Card>
                                <CardActions>
                                    <Grid container justify='flex-end'>
                                        <Button size="small" color="primary" type="submit" onClick={this.confirm} >{this.state.confirm}</Button>
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
            </div >
        )
    }

}