import * as React from 'react'
import {render}  from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/configureStore';

import App from '../components/app/App'
import Home from '../components/home/Home'

const store = configureStore(browserHistory, {});
const enhancedHistory = syncHistoryWithStore(browserHistory, store);
let routes =(
    <Route path="/" component={App}>
        <Route path="/home" component={Home} />
    </Route>
)
render( (<Provider store={store}>
          <Router history={enhancedHistory} routes={routes} />
      </Provider>) ,document.getElementById("react-root"))
