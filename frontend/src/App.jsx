// src/App.jsx
import { lazy, Suspense } from 'react' // Import React lazy utilities
import { Box } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar"
import { useColorModeValue } from "./components/ui/color-mode"
import { Toaster } from "./components/ui/toaster" 

// ❌ REMOVE OLD STATIC IMPORTS:
// import Createpage from './pages/Createpage'
// import Homepage from './pages/Homepage'

// ✅ ADD NEW LAZY IMPORTS:
const Homepage = lazy(() => import('./pages/Homepage'))
const Createpage = lazy(() => import('./pages/Createpage'))

const App = () => {
  return (
    <Box minHeight={"100vh"} display={"flex"} flexDirection={"column"} bg={useColorModeValue("gray.200","gray.900")}>
      <Navbar />
      
      {/* Wrap routes in Suspense to provide a fallback while lazy chunks load */}
      <Suspense fallback={<Box p={8}>Loading layout...</Box>}>
        <Routes>
          <Route path={"/"} element={<Homepage/>} />
          <Route path={"/create"} element={<Createpage/>} />
        </Routes>
      </Suspense>

      <Toaster />
    </Box>
  )
}

export default App
