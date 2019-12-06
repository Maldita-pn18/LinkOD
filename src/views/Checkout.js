import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navigation from '../components/navigationBar';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';
import Tickets from '../views/Tickets'
import Button from '@material-ui/core/Button';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count + 1)
    );
    return count;
}

export default class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formValid: false,
            errorCount: null,
            toConfirm: false,
            date:"",
            depart_from:"",
            arrive_to:"",
            departure_time:"",
            arrive_time:"",
            adult_fair:"",
            adult_passenger:"",
            child_fair:"",
            child_passenger:"",
            seats:"",
            bus:"",
            busNumber:"",
            bill:"",
            fName: "",
            lName: "",
            email: "",
            phone: "",
            paymentMethod: "cash",
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            }
        };
    }

    componentDidMount(){
        // Bus: this.state.bus,
        // AvailableSeat: this.state.availableSeat,
        // DepartureTime: this.state.departureTime,
        // ArrivalTime: this.arrivalTime,
        // Duration: this.state.duration,
        // Adult: this.adult,
        // Child: this.child,
        // JourneyTo: this.journeyTo,
        // JourneyFrom: this.journeyFrom,
        // Petsa: this.petsa
        this.setState({
            date: this.props.location.state.Date,
            depart_from: this.props.location.state.JourneyFrom,
            arrive_to: this.props.location.state.JourneyTo,
            departure_time: this.props.location.state.DepartureTime,
            arrive_time: this.props.location.state.JourneyFrom,
            adult_fair: "",
            adult_passenger: this.props.location.state.Adult,
            child_fair: "",
            child_passenger: this.props.location.state.Child,
            seats: this.props.location.state.AvailableSeat,
            bus: this.props.location.state.Bus,
            busNumber: "",
        })
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        const names = RegExp(/^[-ñ a-zA-Z]+$/);
        switch (name) {
            case 'firstName':
                if (!names.test(value)) {
                    errors.firstName = "Names should only be in an Alphabeth!"
                } else {
                    errors.firstName = ""
                    this.setState({ fName: value });
                }
                break;
            case 'lastName':
                if (!names.test(value)) {
                    errors.lastName = "Names should only be in an Alphabeth!"
                } else {
                    errors.lastName = ""
                    this.setState({ lName: value });
                }
                break;
            case 'email':
                const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
                if (!validEmailRegex.test(value)) {
                    errors.email = 'Invalid email'
                } else {
                    errors.email = ""
                    this.setState({ email: value });
                }
                break;
            case 'phone':
                const reg = new RegExp('^[+0-9]+$');
                if (!reg.test(value)) {
                    errors.phone = 'Enter only numbers!'
                } else {
                    errors.phone = "";
                    this.setState({ phone: value });
                }
                break;
        }
        this.setState({ errors, [name]: value });
    }
    handleBack() {
        //ReactDOM.render(<Tickets />, document.getElementById('root'));
    }


    handleSubmit = (event) => {
        let errors = this.state.errors;
        if (this.state.fName === "") {
            errors.firstName = "This field is required! ";
        }
        if (this.state.lName === "") {
            errors.lastName = "This field is required! ";
        }
        if (this.state.email === "") {
            errors.email = 'This field is required! ';
        }
        if (this.state.phone === "") {
            errors.phone = 'This field is required! ';
        }
        if (this.state.fName !== "" && this.state.lName !== "" && this.state.email !== "" && this.state.phone !== "") {
            event.preventDefault();
            this.setState({
                formValid: validateForm(this.state.errors),
                errorCount: countErrors(this.state.errors),
                toConfirm: true
            });
        } else {
            this.setState({
                'errors.firstName': "This field is required! ",
                'errors.lastName': "This field is required! ",
                'errors.email': 'This field is required! ',
                'errors.phone': 'This field is required! '
            });
        }

    }

    checkout() {
        const { errors, formValid } = this.state;
        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                height: 500,
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
                <Grid container spacing={3} justify="center" style={{ marginTop: '3%' }}>
                    <Grid item xs={8} style={{ height: '100%' }}>
                        <Navigation />
                        <Paper className={classes.paper}>
                            <Grid container justify='space-around' style={{ height: '10%' }}>
                                <Grid style={{ width: '30%' }}>
                                    <Card className={classes.card} style={{ maxHeight: '500px', marginTop: '8%' }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Journey
                                                </Typography>

                                                <p><b>Date:</b>&nbsp;{this.state.date}</p>
                                                <p><b>Depart from:</b> &nbsp;{this.state.depart_from + " / " + this.state.departure_time}</p>
                                                <p><b> Arrive to: </b> &nbsp;{this.state.arrive_to + " / " + this.state.arrive_time}</p>
                                                <p><b>Bus: {this.state.bus}</b></p>
                                                <p><b>Bus Number: {this.state.busNumber}</b></p>
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

                                                <p><b>Adult:</b> &nbsp;{this.state.adult_passenger + " x " + this.state.adult_fair}</p>
                                                <p><b>SP:</b> &nbsp;{this.state.child_passenger + " x " + this.state.child_fair}</p>
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
                                <Grid container justify="center">
                                    <Grid item>
                                        <form className="checkoutForm" onSubmit={this.handleSubmit} noValidate>
                                            <div className='firstName'>
                                                <label className='fName' htmlFor="firstName">Firstname</label>
                                                <input type='text' name='firstName' onChange={this.handleChange} noValidate />
                                                {errors.firstName.length > 0 &&
                                                    <p className='error'>{errors.firstName}</p>}
                                            </div>
                                            <div className='lastName'>
                                                <label className='lName' htmlFor="lastName">Lastname</label>
                                                <input type='text' name='lastName' onChange={this.handleChange} noValidate />
                                                {errors.lastName.length > 0 &&
                                                    <p className='error'>{errors.lastName}</p>}
                                            </div>
                                            <div className='email'>
                                                <label htmlFor="email">Email</label>
                                                <input type='email' name='email' onChange={this.handleChange} noValidate />
                                                {errors.email.length > 0 &&
                                                    <p className='error'>{errors.email}</p>}
                                            </div>
                                            <div className='phone'>
                                                <label htmlFor="phone">Phone Number</label>
                                                <input type='phone' name='phone' onChange={this.handleChange} noValidate />
                                                {errors.phone.length > 0 &&
                                                    <p className='error'>{errors.phone}</p>}
                                            </div>
                                            <div className='pay'>
                                                <p>Payment Method:<b>CASH</b></p>
                                                <Typography gutterBottom variant="h6" component="h6">
                                                    &nbsp;&nbsp;Price:
                                                <hr style={{ width: '96%' }}></hr>
                                                </Typography>
                                            </div>
                                        </form>
                                    </Grid>
                                </Grid>
                                <Grid container justify='flex-end'>
                                    <Button size="small" color="primary" type="submit" style={{ marginRight: '20px', marginBottom: '10px' }} onClick={this.handleSubmit}>Preview</Button>
                                    <Grid container justify='flex-end'>
                                        <Button size="small" color="primary" style={{ marginRight: '20px', marginBottom: '20px' }} onClick={this.handleBack}>
                                            Back
                                    </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        )
    }

    confirm() {
        if (this.state.toConfirm) {
            return <Redirect to={{
                pathname: "/confirm",
                state: {
                    confirmFname: this.state.fName,
                    confirmLname: this.state.lName,
                    confirmGmail: this.state.email,
                    confirmCp: this.state.phone,
                    confirmPay: this.state.paymentMethod
                }
            }} />
        }
    }

    render() {
        return (
            <div>
                {this.checkout()}
                {this.confirm()}
            </div>
        )
    }

}