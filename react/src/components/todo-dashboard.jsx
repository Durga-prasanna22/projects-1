import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export function ToDoDashBoard(){
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    const [appointments, setAppointments] = useState([{AppointmentId:0, Title:'', Description: '', Date:'', UserId:''}]);
    const [searchQuery, setSearchQuery] = useState('');

    function handleSignout(){
        removeCookie('userid');
        navigate('/user-login');
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:4500/get-appointments/${cookies['userid']}`)
        .then(response => {
            setAppointments(response.data);
        })
    },[]);

    const filteredAppointments = appointments.filter(appointment => 
        appointment.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.Description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return(
        <div className="p-4 bg-dark m-4 text-white rounded-5 animate__animated animate__rotateInDownRight">
            <h2 className="d-flex justify-content-between">
                <span>DashBoard of <span style={{ fontStyle: 'italic' }} className="bg-success fs-4 text-white rounded-5">{cookies['userid']}</span> <i className="bi bi-emoji-smile-fill"></i></span>
                <button className="btn btn-danger fs-4" onClick={handleSignout}>SignOut <i className="bi bi-box-arrow-right"></i></button>
            </h2>

            <div className="my-3">
                <input type="text" placeholder="Search Appointments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control" />
            </div>
            <div>
                <Link to="/add-appointment" className="bi btn btn-primary my-2 bi-calendar-check"> Add Appointment</Link>
            </div>
            <div className="d-flex flex-wrap">
                {filteredAppointments.map(appointment => (
                    <div key = {appointment.AppointmentId} className="alert alert-info m-4 animate__animated animate__fadeInBottomRight">
                        <div className="fs-4 fw-bold">{appointment.Title}</div>
                        <div className="my-2">
                            <Link to={`/user-details/${appointment.AppointmentId}`} className="bi bi-eye-fill btn btn-success me-2"> View</Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAppointments.length === 0 && (
                <div className="text-center mt-3">
                    <p className="text-warning">No appointments match your search criteria.</p>
                </div>
            )}             
        </div>
    )
}


