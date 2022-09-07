import React from 'react';
import ReactDOM from 'react-dom/client';
// import {BrowserRouter} from "react-router-dom";
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "./redux";

import {App} from './App';
import {history} from "./services";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore()

root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter history={history}>
                <App/>
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>
);


