import rootReducer,{middleware as SelectMiddleWare} from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';


const saveToLocalStorage = (state) => {
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state',serializedState)
    }
    catch(e){
        console.log(e)
    }
  }
  
  const loadFromLocalStorage = () => {
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }   
    catch(e){
        console.log(e)
        return undefined
    }
  }
  
  const persistedState = loadFromLocalStorage()

  const store = configureStore({
      reducer: rootReducer,
      preloadedState:persistedState,
      middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false
        })
        .concat(SelectMiddleWare)

  })

  store.subscribe(() => saveToLocalStorage(store.getState()))

  export default store