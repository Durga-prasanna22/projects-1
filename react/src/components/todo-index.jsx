import { Link } from 'react-router-dom';


export function ToDoIndex(){
    return(
        <div>
            <div className="animate__animated animate__backInDown">
                <h3 className="mt-4 text-center">Hello!! <i className="bi bi-emoji-heart-eyes me-2"></i>Users</h3>
                <p className="fs-4 text-center" style={{ fontStyle: 'italic', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}>SpotLine will Provide <br />You the Separate Schedules for Each User in One Place</p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
            <div>
                <Link to="/user-register" className="btn btn-warning me-4 animate__animated animate__bounceInLeft fs-4 rounded-5">New User Register</Link>
                <Link to="/user-login" className="btn btn-success animate__animated animate__bounceInRight fs-4 rounded-5">Existing User Login</Link>
            </div>
            </div>

        </div>
    )
}