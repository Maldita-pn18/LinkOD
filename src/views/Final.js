import React, { Component } from 'react';
import { Redirect } from "react-router-dom";





export default class Final extends Component {

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
            Bill: "",
            stageChecker: false,
        }
    }

    render() {
        return (
            <div>
                {this.tickets()}
                {this.routes()}
            </div>
        )
    }
    componentDidMount() {
        if (localStorage.getItem("stage") === "five") {
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
                Bill: this.props.location.state.Bill
            });
        } else {
            this.setState({ stageChecker: true })
        }
    }
    routes = () => {
        if (this.state.stageChecker) {
            return <Redirect to={{ pathname: "/" }} />
        }
    }

    tickets() {

        const container = {
            ticket: {
                background: '#3b81b3',
                width: '90%',
                height: '370px',
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

            seats: {
                justify: 'left',
                width: '42%'
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
                textAlign: 'left',
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
                width: '60%',
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
                fontSize: '20px',
                margin: '0',
                borderBottom: '2px solid black'
            },

            name_span: {
                fontWeight: '300',
                fontSize: '9px',
                borderTop: '1px solid black',
                paddingTop: '3px'
            },
            info: {
                color: '#3b81b3',
                marginLeft: '50px',
                fontSize: '20px'

            }


        }

        return (
            <div className="container">
                <div className="row">
                    <div className="ticket" style={container.ticket}>
                        <div style={container.ticket_left} className="ticket-left">
                            <div className="ticket01">
                                <h3 style={container.h6}>FROM</h3>
                                <h1 style={container.ticket_left_h1}>{this.state.journeyFrom}</h1>
                                <div className="desc">
                                    <span>{this.state.departureTime}</span>
                                </div>
                            </div>
                            <i style={container.i} className="fas fa-bus-alt">&nbsp;&nbsp;{this.state.bus}</i>
                            <div className="ticket-2">
                                <h3 style={container.h6}>TO</h3>
                                <h1>{this.state.journeyTo}</h1>
                                <div style={container.desc} className="desc">
                                    <span style={container.desc.span}>{this.state.arrivalTime}</span>
                                    {/* <span style={container.desc.span}> 01:30 AM</span> */}
                                </div>
                            </div>
                        </div>
                        <div style={container.ticket_right} className="ticket-right">
                            <div style={container.ticket_top} className="ticket-top">
                                <div className="ticket-white">
                                    <p style={container.p}>FROM </p>
                                    <h1 style={container.ticket_right_h1}>{this.state.journeyFrom}</h1>
                                    <div style={container.desc} className="desc">
                                        <span style={container.desc.span}>{this.state.departureTime}</span>
                                        {/* <span style={container.desc.span}> 04:10 AM</span> */}
                                    </div>
                                </div>
                                <h2>{this.state.busNumber}</h2>
                                <div style={container.ticket_white} className="ticket-white">
                                    <p style={container.p}>TO </p>
                                    <h1 style={container.ticket_right_h1}>{this.state.journeyTo}</h1>
                                    <div style={container.desc} className="desc">
                                        <span style={container.desc.span}>{this.state.arrivalTime}</span>
                                        {/* <span style={container.desc.span}> 01:30 AM</span> */}
                                    </div>
                                </div>
                            </div>
                            <center>
                                <h3>Bill:&nbsp;&nbsp;{"₱ " + this.state.Bill + ".00"}</h3>
                            </center>
                            <div style={container.ticketBottom} className="ticket-bottom">
                                <div style={container.name} className="name">
                                    <h1 style={container.name_h1}>{this.state.lName + ", " + this.state.fName}</h1>
                                    <span style={container.desc.span}> PASSENGER</span>

                                </div>
                                <div style={container.seats} align="right">
                                    <h3>Seats: {this.state.seats}</h3>
                                </div>
                            </div>
                            <center><h3>{this.state.petsa}</h3>
                                {/* <i style={container.i} className="fas fa-barcode"></i> */}
                                <p style={container.info}>Thank you for using LINKOD</p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}