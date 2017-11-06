import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import reducers from '../src/reducers';

const middleWare=[]
if(process.env.NODE_ENV === 'development') {
    middleWare.push(logger);
}


export default createStore(reducers, applyMiddleware(...middleWare))
