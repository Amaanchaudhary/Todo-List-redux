import { createSlice } from '@reduxjs/toolkit'        //4. import createSlice to make slices of reducer

const initialState = {                               //5. define your initialState 
    allTodos : []                      //here we take todos name as an empty array inside object of initialState
}

const todoSlice = createSlice({             //6. Here we make a slice using createSlice
    name : 'todos',                         //6.1  give name
    initialState,                           //6.2  initialState
    reducers : {                            //6.3  Make reducers object and define your actions as a method
        addTodo : (state , action) => {
            state.allTodos.push(action.payload)  //here we access state.todo -> initialState = state 
        },
        toggleCompleted : (state , action) => {
            const id = action.payload
            const completedTodo = state.allTodos.find(todo => todo.id === id)
            if(completedTodo){
                completedTodo.completed = !completedTodo.completed
            }
        },
        deleteTodo : (state , action) => {
            const id = action.payload
            // console.log(id)
            const updatedTodo = state.allTodos.filter(todo => todo.id !== id)
            if(updatedTodo){
              state.allTodos = updatedTodo
            }
        },
        updateTodo : (state , action) => {
            const id = action.payload.updateID
            const idArrays = state.allTodos.map(todos => todos.id)
            const indexToUpdate = idArrays.indexOf(id)
            state.allTodos[indexToUpdate].text = action.payload.updateItem
        }
    }
})

export const {addTodo , toggleCompleted , deleteTodo , updateTodo} = todoSlice.actions  //7. export your actions like this
export default todoSlice.reducer            //8.export your whole reducer like this  
//                                          import these reducer in store.js