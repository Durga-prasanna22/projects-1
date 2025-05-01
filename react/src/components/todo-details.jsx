import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"


export function ToDoDetails(){

    const [appointment, setAppointments] = useState([{AppointmentId:0, Title:'', Description:'',Date:'', UserId: ''}])
    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:4500/get-appointment/${params.id}`)
        .then(response => {
            setAppointments(response.data);
        })
    }, [])

    function handleDeleteClick(){
        var flag = window.confirm('Are you Sure? Want to Delete this Appointment?');
        if(flag===true){
            axios.delete(`http://127.0.0.1:4500/delete-appointment/${params.id}`)
            .then(() => {
                alert('Appointment deleted SuccessFully...');
                navigate('/user-dashboard');
        })
        }
    }
    return(
        <div className="d-flex vh-50 align-items-center justify-content-center animate__animated animate__flipInY mt-4">
            <div className="m-2 p-4 bg-dark text-white w-25 rounded-5">
            <h2 className="text-info">Appointment Details</h2>
            <dl>
                <dt>Title</dt>
                <dd>{appointment[0].Title}</dd>
                <dt>Description</dt>
                <dd>{appointment[0].Description}</dd>
                <dt>Date</dt>
                <dd>{moment(appointment[0].Date).format('dddd DD MMMM yyyy')}</dd>
            </dl>
            <div>
                <Link to={`/edit-appointment/${appointment[0].AppointmentId}`} className="bi bi-pen-fill me-4 btn btn-warning mb-3"> Edit Appointment</Link>
                <button onClick={handleDeleteClick} className="bi bi-trash-fill btn btn-danger mb-3"> Delete Appointment</button>
            </div>
            <Link to="/user-dashboard">Back to Appointments</Link>
        </div>
        </div>
        
    )
}