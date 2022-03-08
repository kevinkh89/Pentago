import { createContext } from 'react';

const SituationContext = createContext();
function SituationProvider({ children, value }) {
   // const default=

   return <SituationContext.Provider value={value}>{children}</SituationContext.Provider>;
}

const DispatchContext = createContext();
function DispatchProvider({ children, value }) {
   return <DispatchContext.Provider value={value}>{children}</DispatchContext.Provider>;
}

export { SituationProvider, SituationContext, DispatchContext, DispatchProvider };
