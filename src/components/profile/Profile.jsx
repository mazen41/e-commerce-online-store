import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './profile.css';
import api from "../../api";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { LocalSeeOutlined, Password } from '@mui/icons-material';
const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user')) || "";
    const [userInformation, setUserInformation] = useState(user);
    const [username, setUsername] = useState(userInformation.name);
    const [email, setEmail] = useState(userInformation.email);
    const [currentPassword, setCurrentPassword] = useState("00000000");
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [successMessage, setSuccessMessage] = useState("")
    const [passwordError, setPasswordError] = useState("");
    const [updatePasswordsuccess, setUpdatePasswordSuccess] = useState('');
    const [updatePasswordError, setUpdatepasswordError] = useState('');
    const [error, setError] = useState("")
    const [popup, setPopup] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState("");
    const [deleteUserError, setDeleteUserError] = useState()
    const navigate = useNavigate();
    const handlePopup = () => {
        setPopup(true);
    }
    const handleChangeProfile = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('user_id', userInformation.id);
            formData.append('name', username)
            if (email !== userInformation.email) {
                formData.append('email', email)
            }
            formData.append('current_password', currentPassword);
            await api.get("/sanctum/csrf-cookie");

            const response = await api.post('api/user/update', formData, {
                headers: {
                    "X-CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                setSuccessMessage(response.data.msg);
                setTimeout(() => {
                    setSuccessMessage("");
                }, 5000);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUserInformation(response.data.user);

            } else if (response.status === 201) {
                setPasswordError(response.data.msg);
                setTimeout(() => {
                    setPasswordError("");
                }, 5000);

            } else {
                setError(response.data.msg)
                setTimeout(() => {
                    setError("")
                }, 5000);

            }
        } catch (error) {
            if (error.response && error.response.data) {
                // Extract the error message and set it as a string
                setError(error.response.data.message || "An error occurred");
                setTimeout(() => {
                    setError("");
                }, 5000);
            } else {
                // Set a generic error message
                setError("An error occurred");
                setTimeout(() => {
                    setError("");
                }, 5000);
            }
            console.log(error);
        }
    }
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('user_id', userInformation.id);
            formData.append('current_password', currentPassword);
            formData.append('password', password);
            formData.append('password_confirmation', passwordConfirmation);
            await api.get("/sanctum/csrf-cookie");

            const response = await api.post('api/user/update/password', formData, {
                headers: {
                    "X-CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                setUpdatePasswordSuccess(response.data.msg);
                setTimeout(() => {
                    setUpdatePasswordSuccess("");
                }, 5000);
                console.log(response);

            } else if (response.status === 201) {
                setUpdatepasswordError(response.data.msg);
                setTimeout(() => {
                    setUpdatepasswordError("");
                }, 5000);
                console.log(response);

            }
        } catch (error) {
            if (error) {
                setPasswordErrors(error.response.data.errors);
                setTimeout(() => {
                    setPasswordErrors("")
                }, 5000);
            }
            console.log(error);
        }
    }
    const handelDeleteUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('user_id', userInformation.id);
            formData.append('current_password', currentPassword);
            await api.get("/sanctum/csrf-cookie");

            const response = await api.post('api/user/delete', formData, {
                headers: {
                    "X-CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                Cookies.remove('token');
                localStorage.removeItem('user');
                localStorage.removeItem('cart')
                localStorage.removeItem('cart_count');
                navigate('/');
                console.log(response);
            }else {
                setDeleteUserError(response.data.msg)
            }
        } catch (error) {
            if (error) {
                console.log(error);
            }
        }
    }
    const handleClose = () => {
        setPopup(false);
    }
    const handleLogout = async () => {
        try {
            const formData = new FormData();
            formData.append('user_id', userInformation.id);
            await api.get("/sanctum/csrf-cookie");

            const response = await api.post('api/user/logout', formData, {
                headers: {
                    "X-CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
                    "Content-Type": "application/json",
                },
            });
            if (response) {
                Cookies.remove('token');
                localStorage.removeItem('user');
                localStorage.removeItem('cart');
                localStorage.removeItem('cart_count');
                navigate('/');
            }
        }catch (error) {
            return error;
        }
    }
    return  (
        <div className='profile_container'>
            <div className="nav">
                <ul>
                    <li className='logo'>Profile</li>
                    <li><Link to={'/'}>Home</Link></li>
                </ul>
            </div>
            <div className="settings">
                {
                    popup && (
                        <div className="overlay">

                        </div>
                    )
                }
                <div className="title">
                    <h4>Profile Information</h4>
                    <p>Update your account's profile information and email address.</p>
                </div>
                <form className="basic" onSubmit={handleChangeProfile}>
                    {
                        successMessage ? (
                            <div className="success-message">
                                <p>{successMessage}</p>
                            </div>
                        ) : null
                    }
                    <div className="input-group">
                        <label htmlFor="">Username</label>
                        <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Email Address</label>
                        <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Password</label>
                        <input type="password" name='current_password' onChange={(e) => setCurrentPassword(e.target.value)} />
                        {
                            passwordError ? (
                                <div className="error">
                                    <p>{passwordError}</p>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="button">
                        <button>Save</button>
                    </div>
                </form>

                <form className="password" onSubmit={handleChangePassword}>
                    {
                        updatePasswordsuccess ? (
                            <div className="success-message">
                                <p>{updatePasswordsuccess}</p>
                            </div>
                        ) : null
                    }
                    <div className="title">
                        <p>Update The Current Passowrd.</p>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Current Password</label>
                        <input type="password" name='current_password' onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">New Password</label>
                        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Password Confirmation</label>
                        <input type="password" name='password_confirmation' onChange={(e) => setPasswordConfirmation(e.target.value)} />
                    </div>
                    <div className="button">
                        <button>Save</button>
                    </div>
                    {
                        updatePasswordError ? (
                            <div className="error">
                                <p>{updatePasswordError}</p>
                            </div>
                        ) : null
                    }
                    {
                        passwordErrors ? (
                            <div className="error">
                                <p>{passwordErrors["password"]}</p>
                            </div>
                        ) : null
                    }
                </form>
                {
                    error ? (
                        <div className="error">
                            <p>{error}</p>
                        </div>
                    ) : null
                }
                <div className="deleteAccount">
                    <div className="button" onClick={handleLogout}>
                        <button className='logout'>Logout</button>
                    </div>
                    <div className="button" onClick={handlePopup}>
                        <button>Delete Account</button>
                    </div>
                    {
                        popup && (
                            <form className="popup" onSubmit={handelDeleteUser}>
                                <div className="warning">
                                    
                                    <p>Delete Account Will Delete All Your Data</p>
                                </div>
                                <div className="input-group">
                                    <input placeholder='password' type="password" name='current_password' onChange={(e) => setCurrentPassword(e.target.value)} />
                                </div>
                                <div className="button">
                                    <button>Delete Account?</button>
                                    <button className="close" onClick={handleClose}>Close</button>
                                </div>
                                {
                                    deleteUserError ? (
                                        <div className="error">
                                            <p>{deleteUserError}</p>
                                        </div>                                        
                                    ) : null
                                }
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;