
import React from 'react';
import './App.css';
import Datelocation from './views/Datelocation';
import Tickets from './views/Tickets';
import Checkout from './views/Checkout';
import Confirm from './views/Confirm';
import Final from './views/Final';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Datelocation} />
        <Route path="/tickets" component={Tickets} />
        <Route path="/confirm" component={Confirm} />
        <Route path="/checkout" component={Checkout} />
<<<<<<< HEAD
        <Route path="/final" component={Final} />
=======
        <Route path="/final" component={Final}/>
>>>>>>> 25cf8ee11407888d43ef8bdf1a8bf5efc7dd8d20
      </Switch>
    </BrowserRouter>
  );
}

export default App;