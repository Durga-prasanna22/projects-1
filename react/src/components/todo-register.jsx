
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export function ToDoRegister() {
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [errorClass, setErrorClass] = useState('');

    // Define Yup validation schema
    const validationSchema = Yup.object({
        UserId: Yup.string().required("UserId is required"),
        UserName: Yup.string().required("UserName is required"),
        Password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        Email: Yup.string().email("Invalid email format").required("Email is required"),
        Mobile: Yup.string()
            .required("Mobile is required")
            .matches(/^\+91\d{10}$/, "Mobile number must be exactly 10 digits, with an optional +91 prefix"),
    });

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: '',
            Email: '',
            Mobile: ''
        },
        validationSchema,
        onSubmit: (user) => {
            axios.post('http://127.0.0.1:4500/register-user', user)
            .then((response) => {
                alert('Registered Successfully...');
                navigate('/todo-thankyou', { state: { userId: user.UserId } });
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setMsg("User ID or Email already exists");
                    setErrorClass("text-danger");
                } else {
                    console.error("Registration failed:", error);
                }
            });
        }
    });

    // Duplicate check function for UserId
    function VerifyUserId(e) {
        const userId = e.target.value;
        axios.get(`http://127.0.0.1:4500/users`)
        .then(response => {
            const isDuplicate = response.data.some(user => user.UserId === userId);
            if (isDuplicate) {
                setMsg('User ID Taken - Try Another');
                setErrorClass('text-danger');
            } else {
                setMsg('User ID Available');
                setErrorClass('text-success');
            }
        })
        .catch(error => {
            console.error("Error checking UserId:", error);
        });
    }

    return (
        <div className="d-flex vh-50 align-items-center justify-content-center animate__animated animate__backInLeft">
            <div className="m-4 p-4 bg-dark w-25 text-white rounded-5">
                <form onSubmit={formik.handleSubmit}>
                    <h1>User-Register</h1>
                    <dl>
                        <dt>UserId</dt>
                        <dd><input type="text" onChange={(e) => {formik.handleChange(e);
                                    VerifyUserId(e); // Check for duplicate as user types
                                }} 
                                name="UserId" onBlur={formik.handleBlur} className="form-control" />
                            {formik.touched.UserId && formik.errors.UserId ? (
                                <div style={{ color: 'red' }}>{formik.errors.UserId}</div>
                            ) : null}
                        </dd>
                        <dd className={errorClass}>{msg}</dd>

                        {/* Rest of the form fields */}
                        <dt>UserName</dt>
                        <dd>
                            <input 
                                type="text" 
                                onChange={formik.handleChange} 
                                name="UserName" 
                                onBlur={formik.handleBlur} 
                                className="form-control" 
                            />
                            {formik.touched.UserName && formik.errors.UserName ? (
                                <div style={{ color: 'red' }}>{formik.errors.UserName}</div>
                            ) : null}
                        </dd>

                        <dt>Password</dt>
                        <dd>
                            <input 
                                type="password" 
                                onChange={formik.handleChange} 
                                name="Password" 
                                onBlur={formik.handleBlur} 
                                className="form-control" 
                            />
                            {formik.touched.Password && formik.errors.Password ? (
                                <div style={{ color: 'red' }}>{formik.errors.Password}</div>
                            ) : null}
                        </dd>

                        <dt>Email</dt>
                        <dd>
                            <input 
                                type="text" 
                                onChange={formik.handleChange} 
                                name="Email" 
                                onBlur={formik.handleBlur} 
                                className="form-control" 
                            />
                            {formik.touched.Email && formik.errors.Email ? (
                                <div style={{ color: 'red' }}>{formik.errors.Email}</div>
                            ) : null}
                        </dd>

                        <dt>Mobile</dt>
                        <dd>
                            <input 
                                type="text" 
                                onChange={formik.handleChange} 
                                name="Mobile" 
                                onBlur={formik.handleBlur} 
                                className="form-control" 
                            />
                            {formik.touched.Mobile && formik.errors.Mobile ? (
                                <div style={{ color: 'red' }}>{formik.errors.Mobile}</div>
                            ) : null}
                        </dd>
                    </dl> 
                    <button type="submit" className="btn btn-warning w-100 fw-bold mb-3">Register</button>
                </form>
                <Link to="/user-login" className="me-4">Existing User?</Link>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
}





