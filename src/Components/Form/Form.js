import React from 'react';
import {withFormik, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

 function Form(values, isSubmitting) {
    return (
        <form>
            <div>
                <Field type = 'name' name = 'name' placeholder = 'Name' />

                <Field type = 'password' name = 'password' placeholder = 'Password' />

                <Field type = 'email' name = 'email' placeholder = 'Email' />

                <Field type = 'checkbox' name = 'tos' checked = {values.tos} />
                Accept the TOS

                <button>Submit User Info</button>
            </div>
        </form>
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, password, email, tos}) {
        return {
            name: name || "",
            password: password || "",
            email: email || "",
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
        .required("Name is required"),
        password: Yup.string()
        .min(8, "Password requires 8 characters minimum")
        .required("Password is required"),
        email: Yup.string()
        .email("Email is not valid")
        .required("Email is required")
    }),
    handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
        if (values.email === "alreadytaken@reqres.in"){
            setErrors({ email: "That email already in use"});
        }else {
            axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log(res);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            });
        }
    }
})(Form)



export default FormikUserForm;