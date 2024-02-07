import React, { createContext, useState } from 'react'

export const BracketContext = createContext(null);


export default function BracketContextProvider({ children, value }) {

    return (
    <BracketContext.Provider value={ value }>
    {children}
    </BracketContext.Provider>
  )
}
