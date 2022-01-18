import React from 'react';
import "./LoginStyle.css"
import { Formik } from 'formik';
import * as Yup from 'yup'
import Error from '../Error'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email address')
        .max(30, 'Must be shorter than 255')
        .required('required'),
    password: Yup.string()
        .min(6, 'Must be more than 6 letters')
        .required('required')
})


const LoginBody = (props) => {

    const login = async (values) => {
        try {
            const data = await fetch("https://boxing-canoe-89626.herokuapp.com/users/signin", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            const fetchedData = await data.json()
            if(fetchedData.message){
                alert(fetchedData.message)
            }   
            else  localStorage.setItem('token', fetchedData.auth_token)
        } catch (error) {
            console.log(error);
        }

        props.close()

    }

    return (
        <div className='modalWrapLogIn'>
            <div className="logInTitle">
                <h1>Log in</h1>
            </div>
            <div className="logInForm">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)
                        login(values)
                        resetForm()
                        setSubmitting(false)
                    }}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit }) => (
                            <form
                                className="modal-content"
                                onSubmit={handleSubmit}>
                                <div className="container">
                                    <div style={{ border: "2px solid black", padding: "5%", borderRadius: "20px", margin: "5%", display: "flex", flexDirection: "column", backgroundColor: "rgb(216, 216, 216)" }}>
                                        <label htmlFor="email"><b>Email</b></label>
                                        <br />
                                        <input
                                            id="Email"
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className={touched.email && errors.email ? 'has-error' : null} />
                                        <Error touched={touched.email} message={errors.email} />
                                    </div>
                                    <div style={{ border: "2px solid black", padding: "5%", borderRadius: "20px", margin: "5%", display: "flex", flexDirection: "column", backgroundColor: "rgb(216, 216, 216)" }}>
                                        <label htmlFor="password"><b>Password</b></label>
                                        <br />
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter Password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className={touched.password && errors.password ? 'has-error' : null} />
                                        <Error touched={touched.password} message={errors.password} />
                                    </div>
                                    <button type="submit" style={{ backgroundColor: "cyan" }}>
                                        Log In
                        </button>
                                </div>
                            </form>)}

                </Formik>
            </div>
        </div>
    );
}

export default LoginBody;

