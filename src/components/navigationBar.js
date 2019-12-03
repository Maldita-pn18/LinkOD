import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ReactDOM from 'react-dom';
import DateLocation from '../views/Datelocation';
import Tickets from '../views/Tickets';
import Checkout from '../views/Checkout';
import Confirm from '../views/Confirm';
export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // dateLocation: "",
            // tickets: "",
            // checkOut: "",
            // confirm: ""
        }
    }
    dateLocation = () => {
        ReactDOM.render(<DateLocation />, document.getElementById('root'));
    }
    tickets = () => {
        ReactDOM.render(<Tickets />, document.getElementById('root'));

    }
    checkOut =()=>{
        ReactDOM.render(<Checkout/>, document.getElementById('root'));

    }
    confirm =() =>{
        ReactDOM.render(<Confirm/>, document.getElementById('root'));

    }
    
    render() {
        return (
            <div>
                {this.ButtonAppBar()}
            </div>
        )
    }

    ButtonAppBar() {
        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }));

        return (
            <div className={classes.root}>
                <AppBar position="static" style={{ backgroundColor: '#0269e8' }}>
                    <Toolbar>
                        <ButtonGroup style={{ height: '30px' }} variant="text" aria-label="outlined contained primary button group">
                            <Button onClick={this.dateLocation} style={{ color: "white" }}>Date & Location</Button>
                            <Button onClick={this.tickets} style={{ color: "white" }} >Tickets</Button>
                            <Button onClick={this.checkOut} style={{ color: "white" }}>CheckOut</Button>
                            <Button onClick={this.confirm} style={{ color: "white" }}>Confirm</Button>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}