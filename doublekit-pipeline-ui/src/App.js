import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import {routers} from "./routes";

const App=()=> {
    return (
        <BrowserRouter>
            {renderRoutes(routers)}
        </BrowserRouter>

    );
}

export default App;
