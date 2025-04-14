import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { loginSchema } from "../schema/schema";
import { toast } from "react-toastify";
import { clearAllAuthData } from "../helper/ImageLink";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("user");
    const initialValues = {
        email: "",
        password: "",
    };

    const { errors, values, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {

                const endpoint = role === "user" ? "user" : "admin";

            const response = await axios.post(`${BASE_URL}public/auth/${endpoint=== "user" ? "login-user":"login-admin"}`, values);
            if (response.status === 200) {
                clearAllAuthData()
                localStorage.setItem(`${role}AccessToken`, response?.data?.accessToken);
                localStorage.setItem(`${role}RefreshToken`, response?.data?.refreshToken);
                localStorage.setItem(`${role}payload`,JSON.stringify(response.data.payload));
                navigate(`/${role}/dashboard`);
            }
            

            } catch (error) {
                toast.error(error.response?.data?.message|| "Something wet wrong")
                return error.response?.data?.message
            }
        },
    });

    const handleLoginAs = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/google-login`, {
                token: credentialResponse.credential,
            });
            if (response.status === 200) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Google login failed", error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row w-100 justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <img
                                    src="./logo.png"
                                    alt="Logo"
                                    className="img-fluid"
                                    style={{ maxHeight: "60px" }}
                                />
                                <h4 className="mt-3">Login</h4>
                            </div>

                            {/* Role Buttons */}
                            <div className="d-flex gap-2 mb-4">
                                <button
                                    type="button"
                                    className={`btn ${role === "admin" ? "btn-primary" : "btn-outline-primary"} w-50`}
                                    onClick={() => handleLoginAs("admin")}
                                >
                                    Admin
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${role === "user" ? "btn-secondary" : "btn-outline-secondary"} w-50`}
                                    onClick={() => handleLoginAs("user")}
                                >
                                    User
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.email && errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                        id="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.password && errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-success w-100">
                                    Login with Email
                                </button>
                            </form>

                            {role === "user" && (
                                <button
                                    type="button"
                                    className="btn btn-outline-danger w-100 mt-2"
                                    onClick={() => {
                                        handleGoogleLogin({ credential: "dummy_google_token" });
                                    }}
                                >
                                    <i class="fa-brands fa-google"></i> Login with Google
                                </button>
                            )}


                            <div className="text-end mt-3">
                                <Link to="/sign" className="small">
                                    Sign in?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
