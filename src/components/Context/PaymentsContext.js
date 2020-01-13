import React, { createContext, useReducer, useEffect } from "react";

import { getCurrentTime } from "../../utils/time";

const context = createContext();

const initialState = {
  month: null,
  year: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "MONTH_YEAR": {
      return action.payload;
    }
    case "MONTH": {
      return {
        ...state,
        month: action.payload
      };
    }
    case "YEAR": {
      return {
        ...state,
        year: action.payload
      };
    }
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [time, setTime] = useReducer(reducer, initialState);

  useEffect(() => {
    const payload = getCurrentTime();
    setTime({ type: "MONTH_YEAR", payload });
  }, []);

  const value = { time, setTime };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export { context, Provider };

// { month: 2, year: 2020 }
