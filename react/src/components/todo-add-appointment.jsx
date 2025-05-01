import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";


export function ToDoAddAppointment(){

    const [cookies, setCookies, removeCookies] = useCookies(['userid']);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            AppointmentId: 0,
            Title: '',
            Description: '',
            Date: '',
            Status: '',
            UserId: cookies['userid']
        },
        onSubmit: (appointment) => {
            axios.post(`http://127.0.0.1:4500/add-appointment`, appointment)
            .then(() => {
                alert('Appointment Added SuccessFully...');
                navigate('/user-dashboard');
            })
        }
    })
    return(
        <div>
            
            <div className="d-flex vh-50 align-items-center justify-content-center">
            <div className="bg-dark p-4 m-4 w-25 text-white rounded-5">
            <h1 className="d-flex justify-content-between m-4">
                <span>Add an Appointment of <span style={{ fontStyle: 'italic' }} className="bg-success p-1 text-white rounded-5 fs-5">{cookies['userid']}</span> <i className="bi bi-emoji-smile-fill fs-4"></i></span>
                {/* <span style={{ fontStyle: 'italic' }}>{cookies['userid']}</span> */}
                
            </h1>
            <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>Id</dt>
                <dd><input type="number" onChange={formik.handleChange} name="AppointmentId" className="form-control" /></dd>
                <dt>Title</dt>
                <dd><input type="text" onChange={formik.handleChange} name="Title" className="form-control"/></dd>
                <dt>Description</dt>
                <dd><textarea rows={4} cols={40} onChange={formik.handleChange} name="Description" className="form-control"/></dd>
                <dt>Date</dt>
                <dd><input type="date" onChange={formik.handleChange} name="Date" className="form-control"/></dd>
            </dl>
            <button type="submit" className="btn btn-light w-100">Add Appointment</button>
            <Link to="/user-dashboard" className="btn mt-2 btn-warning w-100">Cancel</Link>
            </form>
        </div>
            </div>
            
        </div>
        
    )
} 