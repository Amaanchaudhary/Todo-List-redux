import {configureStore} from '@reduxjs/toolkit'      //1. import configureStore
import todoReducer from '../Slices/slice'          //9. import reducer from slices

const store = configureStore({                     //2. make a store using configureStore
    reducer : {                     
        todos : todoReducer                       //10. we give name todo and assign reducer to it -> 11 -> index.js
    } 
})

export default store                               //3. export your store  -> 4. -> in slice.js