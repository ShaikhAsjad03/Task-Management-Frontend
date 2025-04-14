import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, fetchAllData } from "../../helper/Apis";
import { useFormik } from "formik";
import Select from "react-select";
import { ImageLink } from "../../helper/ImageLink";
import { taskSchema } from "../../schema/schema";
import { toast } from "react-toastify";
const BASE_URL=process.env.REACT_APP_API_BASE_URL
const AddTasks = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const editData = location.state;

  const initialValues={
    title:"",
    categoryId:"",
    image:null,
    description:"",
    imageUrl: "",
    deadline: new Date(),
  }
  const {errors,values,handleBlur,handleChange,handleSubmit,setFieldValue,touched,setFieldTouched}=useFormik({
    initialValues,
     validationSchema:taskSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const formdata=new FormData()
        formdata.append("title",values.title)
        formdata.append("categoryId",values.categoryId)
        formdata.append("image",values.image)
        formdata.append("description",values.description)
        formdata.append("deadline",values.deadline)

        const response = editData?._id
          ? await axiosInstance.put(`${BASE_URL}users/task/${editData?._id}`, formdata)
          : await axiosInstance.post(`${BASE_URL}users/task`, formdata);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          navigator("/user/task")
          resetForm();
        }
      } catch (errors) {
        toast.error(errors?.response?.data?.message);
        return errors?.response?.data?.message;
      } finally {
        setLoading(false);
      }
    },
  })
 
  const [categorydata,setCategorydata]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    fetchAllData("users/category", setCategorydata, setLoading);
      }, [])

      const formatted = categorydata && categorydata?.map((item) => ({
        label: item.name,
        value: item._id,
      }));


useEffect(()=>{
  if(editData?._id){
    setFieldValue("title",editData?.title)
    setFieldValue("categoryId",editData?.category?._id)
    setFieldValue("description",editData?.description)
    setFieldValue("deadline",editData?.deadline)
    setFieldValue("image",editData?.image)
    setFieldValue("deadline", editData?.deadline?.substring(0, 10));
  }
},[editData])
      return (
    <div className="container-fluid">
         <div className="page-header">
         <h3 className="text-dark">
             Add Tasks
          </h3>
         </div>


         <div className="col-md-12 grid-margin stretch-card">
         <div className="col-md-12">
         <div className="card">
         <div className="card-body">
         <form className="" onSubmit={handleSubmit}>
         <div className="row" >
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label
                          htmlFor="exampleInputUsername2"
                          className="col-form-label font-weight-medium"
                        >
                         Title
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-md"
                          id="title"
                          name="title"
                          placeholder="Enter banner title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}

                        />
                        {touched.title && errors.title && (
                          <small className="text-danger">{errors.title}</small>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label font-weight-medium">
                        Select Category
                      </label>
                      <Select
                        options={formatted}
                        isLoading={loading}
                        placeholder="Select a category"
                        value={formatted.find(option => option.value === values.categoryId)}
  onChange={(option) => setFieldValue("categoryId", option.value)} 
  onBlur={() => setFieldTouched("categoryId", true)}
                      />
                      {touched.categoryId || errors.categoryId && (
                        <small className="text-danger">{errors.categoryId}</small>
                      )}
                    </div>
                  </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label
                          htmlFor="exampleInputUsername2"
                          className="col-form-label font-weight-medium"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-md"
                          id="deadline"
                          name="deadline"
                          placeholder="Enter banner deadline"
                          value={values.deadline}
                          onChange={handleChange}
                        />
                        {touched.deadline && errors.title && (
                          <small className="text-danger">{errors.deadline}</small>
                        )}
                      </div>
                    </div>
                   
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label
                          htmlFor="exampleInputUsername2"
                          className="col-form-label font-weight-medium"
                        >
                          Upload Image
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-md"
                          id="image"
                          name="image"
                          placeholder="Enter banner title"
                          accept="image/*"
                          onChange={(e)=>{
                            const file=e.target.files[0]
                            setFieldValue("image",file)
                          }}
                        />
                        {touched.image && errors.image && (
      <small className="text-danger">{errors.image}</small>
    )}

{values?.image && (
                        <div  className="image-wrapper">
                          <img
                            src={
                              values?.image instanceof File
                                ? URL.createObjectURL(values?.image)
                                : ImageLink(values?.image)
                            }
                            alt={`image`}
                            style={{
                             maxWidth:"300px",maxHeight:"200px"
                            }}
                            className="product-image"
                          />
                        </div>
                      )}
                        
                      </div>
                    </div>
                    <div className="col-sm-12">
  <div className="form-group">
    <label
      htmlFor="bannerTitle"
      className="col-form-label font-weight-medium"
    >
     Desription
    </label>
    <textarea
      className="form-control form-control-md"
      id="description"
      name="description"
      value={values.description}
      onChange={handleChange}
      placeholder="Enter description"
      rows={3} 
    />
  </div>
</div>

         </div>

         <div className="col-lg-12 mt-3 d-flex justify-content-center " style={{gap:"10px"}}>
          {/* <button className="btn btn-success" type="submit">Save</button> */}
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Waiting...
              </span>
            ) : editData?._id ? (
              "Update"
            ) : (
              "Add"
            )}
          </button>


          <button className="btn btn-danger" type="button">Clear</button>
         </div>
         </form>
         </div>
         </div>
         </div>
         </div>
    </div>
  );
};

export default AddTasks;
