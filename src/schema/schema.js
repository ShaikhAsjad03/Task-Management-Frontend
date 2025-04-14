import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Only Gmail addresses are allowed")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const signUpSchema = Yup.object({
    fullname: Yup.string().required("Full Name is required"),
   email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Only Gmail addresses are allowed")
    .required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    mobile: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits").required("Mobile is required"),
});


const CategorySchema=Yup.object({
  name:Yup.string().required("Field is required")
})


const taskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  categoryId: Yup.string().required("Category is required"),
  description: Yup.string(),
  deadline: Yup.date().required("Deadline is required"),
  // image: Yup.mixed().test(
  //   "image-or-link",
  //   "Image is required",
  //   (value, context) => {
  //    console.log(context.parent.imageUr)
  //     if (context.parent.imageUrl) {
  //       return true;
  //     }
  //     // If there's a file provided, check file type and size
  //     if (value) {
  //       return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
  //     }
  //     // If no image and no link, return false (i.e., error)
  //     return false;
  //   }
  // ),
  // imageUrl: Yup.string().url("Invalid URL format"),
});

const profileSchema = Yup.object({
  fullname: Yup.string()
    .min(3, "Full Name must be at least 3 characters")
    .max(50, "Full Name must be less than 50 characters")
    .required("Full Name is required"),

});

export{
    loginSchema,
    signUpSchema,
    CategorySchema,
    taskSchema,
    profileSchema
}