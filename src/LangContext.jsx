import { createContext, useContext, useState } from 'react'

export const LangContext = createContext({ lang: 'ES', setLang: () => {} })
export const useLang = () => useContext(LangContext)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ES')
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}
