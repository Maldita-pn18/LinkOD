import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
                            <Button onClick={this.dateLocation} style={{ color: "white" }} disabled>Date & Location</Button>
                            <Button onClick={this.tickets} style={{ color: "white" }} disabled>Tickets</Button>
                            <Button onClick={this.checkOut} style={{ color: "white" }} disabled>CheckOut</Button>
                            <Button onClick={this.confirm} style={{ color: "white" }} disabled>SAVE</Button>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}