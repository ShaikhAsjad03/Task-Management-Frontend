import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../helper/Apis';
import { profileSchema } from '../schema/schema';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EditProfile = () => {

  const getPayload = (type = "user") => {
    if (type === "admin") {
      return JSON.parse(localStorage.getItem("adminpayload"));
    }
    return JSON.parse(localStorage.getItem("userpayload"));
  };

  const navigate = useNavigate();

  const initialValues = {
    fullname: '',
    email: '',
    mobile: ''
  };

  const { errors, values, touched, getFieldProps, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      try {
        const type = localStorage.getItem("adminpayload") ? "admin" : "user";
        const payload = getPayload(type);
        const endpoint = payload?.type === "admin" ? "admin" : "users";

        const response = await axiosInstance.post(`${BASE_URL}${endpoint}/profile`, values,
          {
            custom: { tokenType: type }
          }
        );
        if (response.status === 200) {
          toast.success(response?.data?.message);
          const updatedData = {
            name: values.fullname,
            email: values.email,
            mobile: values.mobile
          };

          if (type === "admin") {
            localStorage.setItem("adminpayload", JSON.stringify({ ...payload, ...updatedData }));
          } else {
            localStorage.setItem("userpayload", JSON.stringify({ ...payload, ...updatedData }));
          }
          navigate(`/${getPayload(type)?.type}/dashboard`);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  });

  useEffect(() => {
    const type = localStorage.getItem("adminpayload") ? "admin" : "user";
    const payload = getPayload(type);

    if (payload?.email) {
      setFieldValue("fullname", payload?.name || "");
      setFieldValue("email", payload?.email || "");
      setFieldValue("mobile", payload?.mobile || "");
    }
  }, []);



  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12 col-12">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  className="rounded-circle shadow"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <h3 className="mt-3">Edit Profile</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6 col-12">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      className={`form-control ${touched.fullname && errors.fullname ? 'is-invalid' : ''}`}
                      {...getFieldProps('fullname')}
                    />
                    {touched.fullname && errors.fullname && (
                      <div className="invalid-feedback">{errors.fullname}</div>
                    )}
                  </div>

                  <div className="col-md-6 col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                      {...getFieldProps('email')}
                    />
                    {touched.email && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {getPayload()?.type === "user" && (
                    <div className="col-md-6 col-12">
                      <label htmlFor="mobile" className="form-label">Mobile</label>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        className={`form-control ${touched.mobile && errors.mobile ? 'is-invalid' : ''}`}
                        {...getFieldProps('mobile')}
                      />
                      {touched.mobile && errors.mobile && (
                        <div className="invalid-feedback">{errors.mobile}</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                  >
                    Save Changes
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
