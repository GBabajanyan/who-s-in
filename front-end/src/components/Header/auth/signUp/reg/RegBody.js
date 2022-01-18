import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import Error from '../Error'
import "./regStyle.css"
import { Avatar } from '@material-ui/core';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email address')
        .max(30, 'Must be shorter than 255')
        .required('required'),
    password: Yup.string()
        .min(6, 'Must be more than 6 letters')
        .required('required'),
    avatar: Yup.string()
        .required('required'),
    name: Yup.string()
        .required('required'),
        poh: Yup.string()
        .required('required')
})

const RegBody = (props) => {   

    const signup = async (values) => {
        try {
            const data = await fetch('https://boxing-canoe-89626.herokuapp.com/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const fetchedData = await data.json()
            if (fetchedData.message) {
                alert(fetchedData.message);
            }
                    
        } catch (error) {
            console.log('backend error')
            console.log(error);
        }
        props.close()

    }

    return (
        <div className='modalWrapReg'>
            <div className="regTitle">
                <h2>Sign Up</h2>
            </div>
            <div className="regForm">
                <Formik
                    initialValues={{ email: '', password: '', name: '', poh: '', avatar: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)
                        signup(values)
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
                                <div className="containerreg">
                                    <div className="halfContainer">
                                        <div className="formItem">
                                            <label htmlFor="text"><b>Full Name</b></label>
                                            <br />
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Enter your full name"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                className={touched.name && errors.name ? 'has-error' : null} />
                                            <Error touched={touched.name} message={errors.name} />
                                        </div>
                                        <div className="formItem">
                                            <label htmlFor="poh"><b>Profession or Hobbies</b></label>
                                            <br />
                                            <input
                                                id="poh"
                                                type="text"
                                                placeholder="..."
                                                name="poh"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.poh}
                                                className={touched.poh && errors.poh ? 'has-error' : null} />
                                            <Error touched={touched.poh} message={errors.poh} />
                                        </div>
                                    </div>
                                    <div className="halfContainer">
                                        <div className="formItem">
                                            <label htmlFor="email"><b>Email</b></label>
                                            <br />
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                className={touched.email && errors.email ? 'has-error' : null} />
                                            <Error touched={touched.email} message={errors.email} />
                                        </div>
                                        <div className="formItem">
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
                                    </div>
                                    <div className="halfContainer">
                                        <div className="formItem">
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                                <label htmlFor="avatar"><b>Avatar</b></label>
                                                <Avatar src={values.avatar} /></div>
                                            <br />
                                            <input
                                                id="avatar"
                                                type="text"
                                                placeholder="Enter your avatar image link"
                                                name="avatar"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.avatar}
                                                className={touched.avatar && errors.avatar ? 'has-error' : null} />
                                            <Error touched={touched.avatar} message={errors.avatar} />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" style={{ backgroundColor: "cyan", marginLeft: '80%', }}>
                                    Sign Up
                        </button>

                            </form>)}

                </Formik>
            </div>
        </div>
    );
}

export default RegBody;


