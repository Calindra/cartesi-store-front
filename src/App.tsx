// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import ThemeSettings from "./assets/global/ThemeSettings"
import { CssBaseline, ThemeProvider } from "@mui/material";
import MarketPlace from './views/MarketPlace'

function App() {
  const theme = ThemeSettings();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MarketPlace />
      </ThemeProvider>
    </>
  )
}

export default App
