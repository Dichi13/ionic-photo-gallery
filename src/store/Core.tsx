import React, {createContext, useEffect, useReducer} from "react";
import {initialState} from "./State";
import {reducer} from "./Reducer";

interface IContextProps {
  state: any;
  dispatch: ({type, value}:{type:string, value?:any}) => void;
}

const AppContext = createContext({} as IContextProps);
const persistedState = JSON.parse(window.localStorage['persistedState'] ?? "{}");

function AppContextProvider(props: any) {
  const fullInitialState = {
    ...initialState,
    ...persistedState
  };

  const [state, dispatch] = useReducer(reducer, fullInitialState);
  const value = { state, dispatch };

  useEffect(() => {
    window.localStorage['persistedState'] = JSON.stringify(state);
  }, [state]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

const AppContextConsumer = AppContext.Consumer;

export {
  AppContext,
  AppContextProvider,
  AppContextConsumer
}