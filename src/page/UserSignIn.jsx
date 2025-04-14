import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { signUpSchema } from "../schema/schema";
import { toast } from "react-toastify";
const BASE_URL=process.env.REACT_APP_API_BASE_URL
const UserSignIn = () => {
    const navigate = useNavigate();
    const   initialValues={
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
        mobile: "",
    }
    const { errors, values, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit: async (values) => {
            try {
                
                const response = await axios.post(`${BASE_URL}public/auth/register`, values); 
                if (response.status === 200) {
                    navigate("/"); 
                }
            } catch (error) {
                toast.error(error.response?.data?.message)
                return error?.response?.data?.message
            }
        },
    });

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row w-100 justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <div className="text-center mb-1">
                                <img
                                    src="./logo.png"
                                    alt="Logo"
                                    className="img-fluid"
                                    style={{ maxHeight: "40px" }}
                                />
                                <h4 className="mt-2">User Sign Up </h4><hr/>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label htmlFor="fullname">Full Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${touched.fullname && errors.fullname ? "is-invalid" : ""}`}
                                        id="fullname"
                                        name="fullname"
                                        placeholder="Enter full name"
                                        value={values.fullname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.fullname && errors.fullname && (
                                        <div className="invalid-feedback">{errors.fullname}</div>
                                    )}
                                </div>

                                <div className="form-group mb-2">
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
                                <div className="form-group mb-2">
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
                                <div className="form-group mb-2">
                                    <label htmlFor="confirmpassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${touched.confirmpassword && errors.confirmpassword ? "is-invalid" : ""}`}
                                        id="confirmpassword"
                                        name="confirmpassword"
                                        placeholder="Confirm password"
                                        value={values.confirmpassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.confirmpassword && errors.confirmpassword && (
                                        <div className="invalid-feedback">{errors.confirmpassword}</div>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input
                                        type="text"
                                        className={`form-control ${touched.mobile && errors.mobile ? "is-invalid" : ""}`}
                                        id="mobile"
                                        name="mobile"
                                        placeholder="Enter mobile number"
                                        value={values.mobile}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.mobile && errors.mobile && (
                                        <div className="invalid-feedback">{errors.mobile}</div>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Sign Up
                                </button>

                                <div className="text-end mt-3">
                                    <Link to="/" className="small">
                                        Already have an account? Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSignIn;
