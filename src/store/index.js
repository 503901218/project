import {configureStore} from '@reduxjs/toolkit'
import TabReducer from './reducers/tap'
import CounterReducer from './reducers/counter'
export default configureStore({
    reducer:{
        tab:TabReducer,
        counter:CounterReducer
    }
})