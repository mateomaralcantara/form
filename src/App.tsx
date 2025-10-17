import { Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Home from './pages/Home'
import DS160 from './pages/DS160'
import Admin from './pages/Admin'   // 👈 añade esto
import Debug from './pages/Debug'

export default function App() {
  return (
    <div style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ds160" element={<DS160 />} />
        <Route path="/admin" element={<Admin />} />  {/* 👈 nueva ruta */}
        <Route path="/debug" element={<Debug />} />
      </Routes>
    </div>
  )
}
