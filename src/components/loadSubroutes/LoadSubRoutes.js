import React from 'react';
import {Route} from 'react-router-dom';

function LoadSubRoutes(route) {
    return (
        <Route
            path={route.path}
            element={<route.component routes={route.routes}/>}
            // path={route.path}
            // render = {props => (
            //     <route.component {...props} routes={route.routes}/>
            // )}
        />
    );
}

export default LoadSubRoutes;