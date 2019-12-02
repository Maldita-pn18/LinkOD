import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navigation from '../components/navigationBar';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';



export default class DateLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            time: "",
            from: "",
            to: "",
            bus: "",
            busNumber: "",
            seats: "",
            departureTime: "",
            arrivalTime: "",
            firstName: "",
            lastName: "",
            phone: "",
        }
    }

    render() {
        return (
            <div>
                {this.tickets()}
            </div>
        )
    }

    tickets() {

        const container = {
            ticket: {
                background: '#3b81b3',
                width: '90%',
                height: '300px',
                margin: '100px auto',
                border: '1px solid black',
                borderRadius: '4px',
                display: 'flex',
                boxShadow: '1px 1px 5px 0px #0000005e'
            },
            p: {
                borderBottom: '2px solid black',
                // color:'white'
                // textDecoration:'underline',
                // textDecorationThickness:'5px'
            },
            h6: {
                borderBottom: '2px solid black',
                color: 'white',
                borderBottomColor: 'white'
                // textDecoration:'underline',
                // textDecorationThickness:'5px'
            },
            seats:{
                justify:'left',
                width:'42%'
            },
            i: {
                fontSize: '60px',
                // color:'white'
            },
            ticket_left_h1: {
                fontWeight: 'bold',
                color: 'white'
            },
            ticket_left: {
                padding: '20px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRight: '2px dotted black',
                color: 'white'

            },

            desc: {
                display: 'flex',
                flexDirection: 'column',

            },

            desc_span: {
                fontWeight: '300',
                fontSize: '14px',

            },
            ticket_right: {
                width: '40%',
                background: 'white',
                padding: '20px',
                border: '1px solid black',
                borderRadius: '4px',
                borderLeft: '0'
            },
            ticket_top: {
                display: 'flex',
                justifyContent: 'space-between',

            },
            ticket_white: {
                marginBottom: '15px',
            },
            ticket_right_h1: {
                fontWeight: 'bold',
                fontSize: '20px'
            },
            ticket_right_p: {
                fontWeight: '300',
                fontSize: '14px',
                marginBottom: '10px'
            },
            ticketBottom: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            name: {
                marginTop: '20px',
            },

            //   .name p {
            //     font-size: 10px;
            //   }

            name_h1: {
                fontSize: '13px',
                margin: '0',
                borderBottom: '2px solid black'
            },

            name_span: {
                fontWeight: '300',
                fontSize: '9px',
                borderTop: '1px solid black',
                paddingTop: '3px'
            }


        }

        return (
            <body>
                <div class="container">
                    <div class="row">
                        <div class="ticket" style={container.ticket}>
                            <div style={container.ticket_left} class="ticket-left">
                                <div class="ticket01">
                                    <h3 style={container.h6}>FROM</h3>
                                    <h1 style={container.ticket_left_h1}>BOHOL</h1>
                                    <div class="desc">
                                        <span>SEPTEMBER 22, 2019</span>
                                        <span> 04:10 AM</span>
                                    </div>
                                </div>
                                <i style={container.i} class="fas fa-bus-alt"></i>
                                <div class="ticket-2">
                                    <h3 style={container.h6}>TO</h3>
                                    <h1>DANAO</h1>
                                    <div style={container.desc} class="desc">
                                        <span style={container.desc.span}>SEPTEMBER 30, 2019</span>
                                        <span style={container.desc.span}> 01:30 AM</span>
                                    </div>
                                </div>
                            </div>
                            <div style={container.ticket_right} class="ticket-right">
                                <div style={container.ticket_top} class="ticket-top">
                                    <div class="ticket-white">
                                        <p style={container.p}>FROM </p>
                                        <h1 style={container.ticket_right_h1}>DANAO</h1>
                                        <div style={container.desc} class="desc">
                                            <span style={container.desc.span}>SEPTEMBER 22, 2019</span>
                                            <span style={container.desc.span}> 04:10 AM</span>
                                        </div>
                                    </div>
                                    <div style={container.ticket_white} class="ticket-white">
                                        <p style={container.p}>TO </p>
                                        <h1 style={container.ticket_right_h1}>CEBU</h1>
                                        <div style={container.desc} class="desc">
                                            <span style={container.desc.span}>SEPTEMBER 30, 2019</span>
                                            <span style={container.desc.span}> 01:30 AM</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={container.ticketBottom} class="ticket-bottom">
                                    <div style={container.name} class="name">
                                        <h1 style={container.name_h1}>YOHANNE SMITH</h1>
                                        <span style={container.desc.span}>ORDINARY</span>
                                    </div>
                                    <div style={container.seats}>
                                        <h3>Seats:</h3>
                                    </div>
                                </div>
                                <i style={container.i} class="fas fa-barcode"></i>
                                <span style={container.desc.span}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thank you for using LINKOD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </body >
        )
    }

}