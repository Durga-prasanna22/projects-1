import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'animate.css';
import { ToDoIndex } from './components/todo-index'
import { ToDoLogin } from './components/todo-login'
import { ToDoRegister } from './components/todo-register'
import './components/todo-index.css';
import { ToDoDashBoard } from './components/todo-dashboard'
import { ToDoAddAppointment } from './components/todo-add-appointment'
import { ToDoDetails } from './components/todo-details'
import { ToDoEditAppointment } from './components/todo-edit-appointments'
import { ToDoThankYou } from './components/todo-thankyou'

function App() {
  return (
    <div className="todo-background">
      <BrowserRouter>
        <header>
          {/* <h1 className="text-center fs-1 bg-dark p-2 text-white" style={{ fontStyle: 'italic', textTransform: 'uppercase' }}>SpotLine</h1> */}
          <marquee behavior="scroll" direction="up" scrollamount="15" className="text-center fs-1 bg-dark p-2 text-white" style={{ fontStyle: 'italic', textTransform: 'uppercase' }}>
            SpotLine  
          </marquee>
        </header>
        <section>
          <Routes>
            <Route path="/" element={<ToDoIndex />} />
            <Route path="user-login" element={<ToDoLogin />} />
            <Route path="user-register" element={<ToDoRegister />} />
            <Route path="user-dashboard" element={<ToDoDashBoard />} />
            <Route path="add-appointment" element={<ToDoAddAppointment />} />
            <Route path="user-details/:id" element={<ToDoDetails />} />
            <Route path="edit-appointment/:id" element={<ToDoEditAppointment />} />
            <Route path="todo-thankyou" element={<ToDoThankYou />} />
          </Routes>
        </section>
      </BrowserRouter>
    </div>
    
  )
}
export default App
