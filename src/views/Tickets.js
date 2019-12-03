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
import Checkout from './Checkout';




export default class DateLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bus: "",
            availableSeat: "",
            departureTime: "",
            arrivalTime: "",
            duration: "",
            adult: "",
            child: "",
            journeyTo: "",
            journeyFrom: "",
            petsa: "",
        }
    }
    checkout = () => {
        if (this.state.adult === "" & this.state.child === "") {
            alert("Input fields")
        } else {
            ReactDOM.render(<Checkout />, document.getElementById('root'));
        }
    };

    componentDidMount() {
        this.setState({ 
            journeyTo: this.props.location.state.journeyTo,
            journeyFrom: this.props.location.state.journeyFrom,
            petsa:this.props.location.state.petsa,
            departureTime:this.props.location.state.departureTime
        });
    }

    render() {
        return (
            <div>
                {this.tickets()}
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
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
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
            <FormControl required className={classes.formControl}>
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
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
                {/* <FormHelperText>Required</FormHelperText> */}
            </FormControl>
        )
    }

    tickets() {
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

        const rows = [
            createData('', <div>{this.Adult()}&nbsp;&nbsp;&nbsp;&nbsp;{this.child()}<h6 align="left">Child Price: </h6><h6 align="left">Adult Price: </h6></div>, '', ' ', ' '),
            createData('', '', '', ' ', ' '),
            createData('', '', '', ' ', ' '),
            createData('', '', '', ' ', ' '),
            createData('', '', '', ' ', ' '),
        ];

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
                <Header />
                <Grid container spacing={3} justify="center" style={{ marginTop: '7%' }}>
                    <Grid item xs={8}>
                        <Navigation />
                        <Paper className={classes.paper}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h6">
                                        Journey from <span style={{color:'#3b81b3'}}><b>{this.state.journeyFrom}</b></span> to <span style={{color:'#3b81b3'}}><b>{this.state.journeyTo}</b></span>
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="h6">
                                        Date of Departure: <span style={{color:'#3b81b3'}}><b>{this.state.petsa}</b></span>
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="h6">
                                        Departure Time: <span style={{color:'#3b81b3'}}><b>{this.state.departureTime}</b></span>
                                    </Typography>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Bus</StyledTableCell>
                                                <StyledTableCell align="center">Available Seats</StyledTableCell>
                                                <StyledTableCell align="center">Departure Time</StyledTableCell>
                                                <StyledTableCell align="center">Arrival Time</StyledTableCell>
                                                <StyledTableCell align="center">Duration</StyledTableCell>
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
                                    <Typography gutterBottom variant="h6" component="h6">
                                        &nbsp;&nbsp;Price:
                                                </Typography>
                                    <Grid container justify='flex-end'>
                                        <Button size="small" color="primary" type="submit" onClick={this.checkout} >Checkout</Button>
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