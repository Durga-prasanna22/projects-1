

import { Link, useLocation } from "react-router-dom";

export function ToDoThankYou() {
    const location = useLocation();
    const { userId } = location.state || {}; // Retrieve UserId passed in state

    return (
        <div className="d-flex vh-100 align-items-center justify-content-center animate__animated animate__swing">
            <div className="text-center p-4 rounded-5 shadow bg-dark text-white fs-3">
                <div className="text-success fs-1 fw-bold"><i className="bi bi-check2-circle"></i></div>
                    <span>Thank You for Register! {userId && <p className="text-primary" style={{ fontStyle: 'italic' }}> {userId} <i className="bi bi-emoji-kiss-fill"></i></p>}</span>
                    <p>You are now a user of our website <i className="bi bi-emoji-smile-fill fs-4"></i></p>
                    <Link to="/user-login" className="btn btn-warning fw-bolder">Go to Login</Link>
                
                
            </div>
        </div>
    );
}
