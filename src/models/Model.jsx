import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { CategorySchema } from "../schema/schema";
import { axiosInstance } from "../helper/Apis";
const BASE_URL=process.env.REACT_APP_API_BASE_URL
const CategoryModel = ({
  modalOpen,
  toggleModal,
  fetchcategory,
  updatedata,
  setupdatedata,
  userId
}) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
  };
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues,
    validationSchema:CategorySchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = updatedata?._id
          ? await axiosInstance.put(`${BASE_URL}users/category/${updatedata?._id}`, values)
          : await axiosInstance.post(`${BASE_URL}users/category`, values);
        if (response.status === 200) {
          fetchcategory();
          toggleModal();
          toast.success(response?.data?.message);
          resetForm();
          setupdatedata(null);
        }
      } catch (errors) {
        toast.error(errors?.response?.data?.message);
        return errors?.response?.data?.message;
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (updatedata?._id) {
      setFieldValue("name", updatedata?.name || "");
    }
  }, [updatedata]);

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal}>
        {updatedata?._id ? "Edit" : "Add"} Category
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
        <div className="form-group mb-3">
    <input
        type="text"
        className={`form-control form-control-lg ${touched.name && errors.name ? "is-invalid" : ""}`}
        id="name"
        name="name"
        placeholder="Enter category name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
    />
    {touched.name && errors.name && (
        <div className="invalid-feedback">{errors.name}</div>
    )}
</div>

        </ModalBody>
        <ModalFooter>


          <Button type="submit" color="primary" disabled={loading}>
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Waiting...
              </span>
            ) : updatedata?._id ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>

          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export {CategoryModel}