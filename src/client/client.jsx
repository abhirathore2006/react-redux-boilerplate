import * as React from 'react'
import {render}  from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'

import App from '../components/app/App'
import Home from '../components/home/Home'

let routes =(
    <Route path="/" component={App}>
        <Route path="/home" component={Home} />
    </Route>
)
render(<Router history={browserHistory} routes={routes}/>,document.getElementById("react-root"))
