import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"; 


export function ToDoLogin(){

    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    let navigate = useNavigate();

    const validationSchema = Yup.object({
        UserId: Yup.string().required('UserId is required'),
        Password: Yup.string().required('Password is required'),
      });

    const formik = useFormik({
        initialValues:{
            UserId: '',
            Password: ''
        },
        validationSchema,
        onSubmit: (user) => {
            axios.get('http://127.0.0.1:4500/users')
            .then(response => {
                var userdetail = response.data.find(u => u.UserId === user.UserId);
                if(userdetail){
                    if(userdetail.Password === user.Password){
                        setCookie('userid', user.UserId);
                        navigate('/user-dashboard');
                    }
                    else{
                        alert('Invalid Password');
                    }
                    
                }
                else{
                    alert('Invalid UserId')
                }
                
            })
        }
    });
    
    return(
        <div className="d-flex vh-50 align-items-center justify-content-center animate__animated animate__zoomInDown">
            <div className="m-4 p-4 bg-dark w-25 text-white rounded-5">
             <form onSubmit={formik.handleSubmit}>

                <h1>User-Login</h1>
                <dl>
                    <dt>UserId</dt>
                    <dd>
                        <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" name="UserId" /> 
                        {formik.touched.UserId && formik.errors.UserId ? (
                            <div style={{ color: 'red' }}>{formik.errors.UserId}</div>
                        ) : null}
                    </dd>

                    <dt>Password</dt>
                    <dd>
                        <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" name="Password" />
                        {formik.touched.Password && formik.errors.Password ? (
                            <div style={{ color: 'red' }}>{formik.errors.Password}</div>
                        ) : null}
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success w-100 mb-3 fw-bold">Login</button>
             </form>
            <Link to ="/user-register" className="me-4">New User? Register</Link>
            <Link to="/">Back to Home</Link>
            
        </div>
        </div>
        
    )
}