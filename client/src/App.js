import React from 'react'
import Heading from './components/Header/Heading'
import { EmployeeTable } from './components/Table/EmployeeTable'
import './App.css';

function App() {
  return (
    <div style={{margin:"20px 0"}}>
      <Heading />
      <EmployeeTable />
    </div>
  )
}

export default App
