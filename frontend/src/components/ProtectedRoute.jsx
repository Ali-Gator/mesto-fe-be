import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({loggedIn, component: Component, ...props}) => (
    <Route>
      {loggedIn
          ? <Component {...props} />
          : <Redirect to="/sign-in"/>
      }
    </Route>
);

export default ProtectedRoute;
