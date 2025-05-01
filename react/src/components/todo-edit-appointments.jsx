import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";


export function ToDoEditAppointment(){
    let params = useParams();
    let navigate = useNavigate();
    

    const [appointment, setAppointments] = useState([{AppointmentId:0, Title:'', Description:'', Date:'', UserId:''}]);

    const [cookies, setCookie, removeCookie] = useCookies(['userid']);

    const formik = useFormik({

        initialValues: {
            AppointmentId: appointment[0].AppointmentId,
            Title: appointment[0].Title,
            Description: appointment[0].Description,
            Date: appointment[0].Date,
            UserId: cookies['userid']
        },

        onSubmit:(task) => {
            axios.put(`http://127.0.0.1:4500/edit-appointment/${params.id}`, task)
            .then(() => {
                // alert('Appointment Modified SuccessFully...');
                alert(
                    <div style={{
                      color: 'white',
                      backgroundColor: 'white',
                      padding: '15px',
                      borderRadius: '5px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                      Appointment Modified Successfully!
                    </div>
                );
                navigate(`/user-details/${params.id}`);
            })
        },

        enableReinitialize: true
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:4500/get-appointment/${params.id}`)
        .then(response => {
            setAppointments(response.data);
        })
    }, [])
    return(
        <div className="d-flex vh-50 align-items-center justify-content-center animate__animated animate__jackInTheBox">
            <div className="m-4 p-4 bg-dark w-25 text-white rounded-5">
            <h2>Edit Appointments</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Appointment Id</dt>
                    <dd><input type="text" value={formik.values.AppointmentId} name="AppointmentId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title} name="Title" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd><textarea name="Description" value={formik.values.Description} onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Date</dt>
                    <dd><input type="date" value={formik.values.Date} name="Date" onChange={formik.handleChange} className="form-control"/></dd>
                </dl>
                <button type="submit" className="btn btn-success">Save</button>
                <Link to={`/user-details/${params.id}`} className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
        </div>
        
    )
}