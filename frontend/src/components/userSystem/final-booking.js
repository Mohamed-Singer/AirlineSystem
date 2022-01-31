import React from "react";
import { Link } from "react-router-dom";
import ReservationDataService from "../../services/reservation";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BackgroundSlider from 'react-background-slider'
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpg'
import image3 from './images/image3.jpg'
import FlightIcon from "@mui/icons-material/Flight";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import EventIcon from "@mui/icons-material/Event";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NumbersIcon from '@mui/icons-material/Numbers';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import LuggageIcon from "@mui/icons-material/Luggage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Container, Typography, Grid, CardContent, CardActions, Card, ListItemAvatar, ListItem, Divider, List } from '@mui/material';
import { ButtonGroup } from "@mui/material";
import { height } from "@mui/system";
import StripeCheckout from "react-stripe-checkout";
import { Carousel } from 'react-bootstrap';
import '../main.css';

const Booking = props => {

  const state = JSON.parse(localStorage.getItem("state"));



   const res = state.res 



  

  

  let edit = false

  if (res != null) edit = true;

  //console.log(edit)

  const flight = state.retflight
  const returnFlight = state.depflight
  const cabin = state.cabin
  const noseats = state.noseats
  console.log(props.User)

  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(flight)
  // console.log(returnFlight)
  // console.log(props.User)

  const noadults = state.noadults

  const nochild = noseats - noadults

  const depreserved = state.departurereserved
  //console.log(depreserved)

  const retreserved = state.reserved
  console.log(retreserved)
  let pricem = 1

  if (cabin=="Business Class") pricem = 1.5
  else if (cabin=="First Class") pricem = 2

  const tprice = noadults*(pricem*(flight.Price+returnFlight.Price)) + nochild*(pricem*((flight.Price+returnFlight.Price))/2);
  let oldprice = 0 

    if(res!=null) {edit = true; oldprice = res.Price}
    const pay = tprice-oldprice

    const pmt = pay>0

  const ReservationData = {
    BookingNumber: GenerateBookingNumber(),
    DepartureFlight: {
      id: returnFlight._id,
      FlightNumber: returnFlight.FlightNumber,
      DepartureTime: returnFlight.DepartureTime,
      ArrivalTime: returnFlight.ArrivalTime,
      Date: returnFlight.Date,
      DepartureAirport: returnFlight.DepartureAirport,
      DestinationAirport: returnFlight.DestinationAirport,
      TripDuration: returnFlight.TripDuration,
      BaggageAllowance: returnFlight.BaggageAllowance,
      Price: returnFlight.Price,
      EconomySeats: returnFlight.EconomySeats,
      BusinessSeats: returnFlight.BusinessSeats,
      FirstSeats: returnFlight.FirstSeats,
      ReservedSeats: returnFlight.ReservedSeats

    },
    ReturnFlight: {
      id: flight._id,
      FlightNumber: flight.FlightNumber,
      DepartureTime: flight.DepartureTime,
      ArrivalTime: flight.ArrivalTime,
      Date: flight.Date,
      DepartureAirport: flight.DepartureAirport,
      DestinationAirport: flight.DestinationAirport,
      TripDuration: flight.TripDuration,
      BaggageAllowance: flight.BaggageAllowance,
      Price: flight.Price,
      EconomySeats: flight.EconomySeats,
      BusinessSeats: flight.BusinessSeats,
      FirstSeats: flight.FirstSeats,
      ReservedSeats: flight.ReservedSeats


    },
    User: {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      passportnumber: user.passportnumber,
      email: user.email
    },

    CabinClass: cabin,

    Price: tprice,

    UserId: user._id,

    DepSeats: depreserved,

    RetSeats: retreserved,

    NoSeats: noseats,

    NoAdults: noadults,

    NoChildren: noadults





  }

  function GenerateBookingNumber() {
    const chars = '123456789123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    for (var i = 10; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  function Payment(token) {

    localStorage.removeItem("user");
    localStorage.removeItem("state");

   if(edit)
   {
    ReservationDataService.deletenomail(res._id); 
    ReservationData.BookingNumber = res.BookingNumber; 
    ReservationDataService.create(ReservationData); 
    props.history.push("/flights/MyBooking", ReservationData)
   }
   else {
    ReservationDataService.create(ReservationData);
    props.history.push("/flights/MyBooking", ReservationData);

   }

  }



  return (
    <div >
           <Carousel>
        <Carousel.Item id="carousel-itemd">
          <img
            id="image-3"
            className="d-block w-100"
            src={image3}
            alt="First slide"
          />
          <Carousel.Caption>
          <h1 id="greeting-title">AS Airlines.</h1>
            <h4>Let The Journey Begin</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id="carousel-itemd">
          <img
            id="image-2"
            className="d-block w-100"
            src={image2}
            alt="Second slide"
          />

          <Carousel.Caption>
          <h1 id="greeting-title">AS Airlines.</h1>
            <h4>Let The Journey Begin</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id="carousel-itemd">
          <img
            id="image-1"
            className="d-block w-100"
            src={image1}
            alt="Third slide"
          />

          <Carousel.Caption>
          <h1 id="greeting-title">AS Airlines.</h1>
            <h4>Let The Journey Begin</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>     

      <Box
        opacity='[0,0,0]'
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 3, width: '65ch' },
        }}
        noValidate
        textAlign='left'
        autoComplete="off"
        height="0px"
        marginTop={-2}
        backgroundColor="#f0f6f7ff"
      >
        
        <Grid sx={{ justifyContent: "center", textAlign: "center" }}>
          <br /><div className="row">
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '5vh' }}>
          <Button variant='contained'  size='small' color='primary' onClick={() => {props.history.goBack()}}>Back</Button>
          </div>
            <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', height: '5vh' }}>
              {edit &&
                ((<Link to={"/ViewReservations"} className="btn btn-danger" onClick={() => { props.history.push("/ViewReservations") }}>Cancel</Link>))

              }
            </div>
            <h1>Final Summary</h1><br />
            <strong>Please review before confirming your booking.</strong>
          </div>
        </Grid>
        <Grid container sx={{ justifyContent: "space-evenly", margin: "70px 0 0 0" }}>
          <Grid item>
            <h3>Departure Flight</h3>
            <Grid item xs={12} sm={10} md={4}>

              <Card
                sx={{ width: "400px", height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>

                  <Grid style={{ width: "450px" }} fullWidth container>
                    <Grid
                      align="center"
                      style={{

                        width: "450px",
                        height: "70px",
                        alignItems: "center",
                      }}
                      item
                      fullWidth
                      container
                    >
                      <Typography sx={{ margin: "0 0 0 15px" }} variant="h4">{returnFlight.DepartureAirport} to {returnFlight.DestinationAirport}</Typography>
                      <Typography sx={{ margin: "0 0 0 15px" }} variant="h9">Flight No. {returnFlight.FlightNumber}</Typography>
                    </Grid>

                    <List
                      sx={{
                        width: "450px",
                        paddingTop: "0",
                        paddingBottom: "0",
                      }}
                    >
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <EventIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container columns={16}>
                          <Grid container item xs={7}>
                            <Grid item align="left" xs={12}>
                              <Typography
                                sx={{ mt: 0.5 }}
                                color="text.secondary"
                                display="block"
                                variant="caption"
                              >
                                Date
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography>
                                {returnFlight.Date}

                              </Typography>
                            </Grid>
                          </Grid>


                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem fullWidth>
                        <ListItemAvatar>
                          <FlightTakeoffIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid container item xs={6}>
                            <Grid item align="left" xs={12}>
                              <Typography
                                sx={{ mt: 0.5 }}
                                color="text.secondary"
                                display="block"
                                variant="caption"
                              >
                                Departure Time
                              </Typography>
                            </Grid>

                          </Grid>
                          <Grid item xs>
                            <Grid container>
                              <Grid item align="left" xs={12}>
                                <Typography
                                  sx={{ mt: 0.5 }}
                                  color="text.secondary"
                                  display="block"
                                  variant="caption"
                                >
                                  {returnFlight.DepartureTime}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <FlightLandIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid container item xs={6}>
                            <Grid item align="left" xs={12}>
                              <Typography
                                sx={{ mt: 0.5 }}
                                color="text.secondary"
                                display="block"
                                variant="caption"
                              >
                                Arrival Time
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs>
                            <Grid container>
                              <Grid item align="left" xs={12}>
                                <Typography
                                  sx={{ mt: 0.5 }}
                                  color="text.secondary"
                                  display="block"
                                  variant="caption"
                                >
                                  {returnFlight.ArrivalTime}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <AccessTimeIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Flight Duration
                            </Typography>
                          </Grid>
                          <Grid>{returnFlight.TripDuration}</Grid>
                        </Grid>
                      </ListItem>
                      <Divider />

                      <ListItem>
                        <ListItemAvatar>
                          <AirlineSeatReclineExtraIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid item align="left" xs={12}>
                          <Typography
                            sx={{ mt: 0.5 }}
                            color="text.secondary"
                            display="block"
                            variant="caption"
                          >
                            Cabin Class
                          </Typography>
                          <Typography>{state.cabin}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <LuggageIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Baggage allowance
                            </Typography>
                          </Grid>
                          <Typography>{returnFlight.BaggageAllowance}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <EventSeatIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Seats Selected
                            </Typography>
                          </Grid>
                          <Typography>{depreserved.sort().toString()}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <AttachMoneyIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Adult Ticket Price
                            </Typography>
                          </Grid>
                          <Typography>{"$" + returnFlight.Price}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <AttachMoneyIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Child Ticket Price
                            </Typography>
                          </Grid>
                          <Typography>{"$" + (returnFlight.Price / 2)}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </List>
                  </Grid>
                </CardContent>
              </Card>

            </Grid>
          </Grid>
          <Grid item>
            <h3>Return Flight</h3>
            <Grid item xs={12} sm={6} md={5}>
              <Card
                sx={{ width: "400px", height: '100%', display: 'flex', flexDirection: 'column' }}
              >

                <CardContent sx={{ flexGrow: 1 }}>

                  <Grid style={{ width: "450px" }} fullWidth container>
                    <Grid
                      align="center"
                      style={{

                        width: "450px",
                        height: "70px",
                        alignItems: "center",
                      }}
                      item
                      fullWidth
                      container
                    >
                      <Typography sx={{ margin: "0 0 0 15px" }} variant="h4">{flight.DepartureAirport} to {flight.DestinationAirport}</Typography>
                      <Typography sx={{ margin: "0 0 0 15px" }} variant="h9">Flight No. {flight.FlightNumber}</Typography>
                    </Grid>
                    <List
                      sx={{
                        width: "450px",
                        paddingTop: "0",
                        paddingBottom: "0",
                      }}
                    >
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <EventIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container columns={16}>
                          <Grid container item xs={7}>
                            <Grid item align="left" xs={12}>
                              <Typography
                                sx={{ mt: 0.5 }}
                                color="text.secondary"
                                display="block"
                                variant="caption"
                              >
                                Date
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography>
                                {flight.Date}

                              </Typography>
                            </Grid>
                          </Grid>


                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem fullWidth>
                        <ListItemAvatar>
                          <FlightTakeoffIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid container item xs={6}>
                            <Grid item align="left" xs={12}>
                              <Typography
                                sx={{ mt: 0.5 }}
                                color="text.secondary"
                                display="block"
                                variant="caption"
                              >
                                Departure Time
                              </Typography>
                            </Grid>

                          </Grid>
                          <Grid item xs>
                            <Grid container>
                              <Grid item align="left" xs={12}>
                                <Typography
                                  sx={{ mt: 0.5 }}
                                  color="text.secondary"
                                  display="block"
                                  variant="caption"
                                >
                                  {flight.DepartureTime}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <FlightLandIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid container item xs={6}>
                            <Grid item align="left" xs={12}>
                              <Typography
                                sx={{ mt: 0.5 }}
                                color="text.secondary"
                                display="block"
                                variant="caption"
                              >
                                Arrival Time
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs>
                            <Grid container>
                              <Grid item align="left" xs={12}>
                                <Typography
                                  sx={{ mt: 0.5 }}
                                  color="text.secondary"
                                  display="block"
                                  variant="caption"
                                >
                                  {flight.ArrivalTime}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <AccessTimeIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Flight Duration
                            </Typography>
                          </Grid>
                          <Grid>{flight.TripDuration}</Grid>
                        </Grid>
                      </ListItem>
                      <Divider />

                      <ListItem>
                        <ListItemAvatar>
                          <AirlineSeatReclineExtraIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid item align="left" xs={12}>
                          <Typography
                            sx={{ mt: 0.5 }}
                            color="text.secondary"
                            display="block"
                            variant="caption"
                          >
                            Cabin Class
                          </Typography>
                          <Typography>{state.cabin}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <LuggageIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Baggage allowance
                            </Typography>
                          </Grid>
                          <Typography>{flight.BaggageAllowance}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <EventSeatIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Seats Selected
                            </Typography>
                          </Grid>
                          <Typography>{retreserved.sort().toString()}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <AttachMoneyIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Adult Ticket Price
                            </Typography>
                          </Grid>
                          <Typography>{"$" + flight.Price}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <AttachMoneyIcon style={{ transform: "scale(1.2)" }} />
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item align="left" xs={12}>
                            <Typography
                              sx={{ mt: 0.5 }}
                              color="text.secondary"
                              display="block"
                              variant="caption"
                            >
                              Child Ticket Price
                            </Typography>
                          </Grid>
                          <Typography>{"$" + (flight.Price / 2)}</Typography>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </List>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>


        <Grid>


          <Grid sx={{ justifyContent: "center", textAlign: "center", margin: "60px 0 0 240px" }}>
            <Card
              sx={{ width: "400px", height: ' 220px', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <List
                  sx={{
                    width: "400px",
                    paddingTop: "0",
                    paddingBottom: "0",
                  }}
                ><ListItem>
                    <ListItemAvatar>
                      <NumbersIcon style={{ transform: "scale(1.2)" }} />
                    </ListItemAvatar>
                    <Grid container>
                      <Grid item align="left" xs={12}>
                        <Typography
                          sx={{ mt: 0.5 }}
                          color="text.secondary"
                          display="block"
                          variant="caption"
                        >
                          Total Travellers
                        </Typography>
                      </Grid>
                      <Typography>{noseats} ({noadults} Adults, {nochild} Children)</Typography>
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemAvatar>
                      <AttachMoneyIcon style={{ transform: "scale(1.2)" }} />
                    </ListItemAvatar>
                    <Grid container>
                      <Grid item align="left" xs={12}>
                        <Typography
                          sx={{ mt: 0.5 }}
                          color="text.secondary"
                          display="block"
                          variant="caption"
                        >
                          Total Price
                        </Typography>
                      </Grid>
                      <Typography>{noadults * (flight.Price + returnFlight.Price) + nochild * ((flight.Price + returnFlight.Price) / 2)}</Typography>
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
      <ListItemAvatar>
        <AttachMoneyIcon style={{ transform: "scale(1.2)" }} />
      </ListItemAvatar>
      <Grid container>
        <Grid item align="left" xs={12}>
          <Typography
            sx={{ mt: 0.5 }}
            color="text.secondary"
            display="block"
            variant="caption"
          >
            Total to be paid
          </Typography>
        </Grid>
        <Typography>{pay}</Typography>
      </Grid>
    </ListItem>
    <Divider/>
                </List>
              </CardContent>
            </Card>
          </Grid>





          <Grid container >
            <Grid item align="right" xs={12}>

              <List
                sx={{
                  width: "300px",
                  paddingTop: "0",
                  paddingBottom: "0",
                  marginTop: "-60px",
                  marginRight: "170px",
                  height: '100px'
                }}
              >

                {/* <div className="col-lg-4 pb-1" style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', height: '6vh' }}>
                  {edit ?
                    ((<Button variant='contained' size='small' color='primary' onClick={() => { if (window.confirm('Are you sure you want to book this flight?')) {  }; }}>Confirm</Button>))
                    : (<Button variant='contained' size='medium' color='primary' onClick={() => {
                      <StripeCheckout stripekey="pk_test_51KAKwFFMqAsw1TKn9YPjlgLvEEMefEOP8aemjBzhg5xJ29HuPFHMt4a2AUe6PnR83q6EIJ14uU1jQHYQqQd3sqk6008zLvCzwe"
                        token={Payment}
                      />
                    }}>Confirm</Button>)
                  }
                </div> */}
       

                

                
                
              </List>
            </Grid>
            
          </Grid>

        </Grid>
        
      </Box>
      {pmt ?(
      <StripeCheckout stripeKey="pk_test_51KAKwFFMqAsw1TKn9YPjlgLvEEMefEOP8aemjBzhg5xJ29HuPFHMt4a2AUe6PnR83q6EIJ14uU1jQHYQqQd3sqk6008zLvCzwe"
                        token={Payment} style={{
                          position: 'absolute',
                          right: "240px",
                          top:"1410px" ,
                    }}
                      />):(<Grid container style={ {backgroundColor:"#f0f6f7ff"}}>
                        <Grid item align="right" xs={12}>
                                  
                            <List
                        sx={{
                          width: "300px",
                          paddingTop: "0",
                          paddingBottom: "0",
                          marginTop:"1170px",
                          marginRight:"230px",
                          height:'100px'
                        }}
                      >
                        
                      <div className="col-lg-4 pb-1" style={{display: 'flex',  justifyContent:'right', alignItems:'right', height: '6vh'}}>
                      {edit?
                          ((<Button variant='contained'  size='small' color='primary' onClick={() => {if(window.confirm('Are you sure you want to book this flight?')){ReservationDataService.delete(res._id);ReservationData.BookingNumber=res.BookingNumber;ReservationDataService.create(ReservationData);props.history.push("/flights/MyBooking", ReservationData)};}}>Confirm</Button>))
                          :(<Button variant='contained'  size='medium' color='primary' onClick={() => {if(window.confirm('Are you sure you want to book this flight?')){ReservationDataService.create(ReservationData);props.history.push("/flights/MyBooking", ReservationData)};}}>Confirm</Button>)
                          }
                                </div>
                                </List>
                                </Grid>
                                </Grid>)
                  }
                     
      
    </div>


  );

};

export default Booking;