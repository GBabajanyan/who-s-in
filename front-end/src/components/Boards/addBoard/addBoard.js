import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import './addBoard.css'
import Error from './Error'

const validationSchema = Yup.object().shape({
    toDo: Yup.string()
        .required('required'),
    place: Yup.string()
        .required('required'),
    meetingTime: Yup.string()
        .required('required'),
    timeOut: Yup.string()
        .required('required')
})

const AddBoard = (props) => {
    /// add Post
    const addPost = async (value) => {
        props.sideToggle()
        try {
            const token = localStorage.getItem("token");
            const addPost = await fetch("https://boxing-canoe-89626.herokuapp.com/posts/add", {
                method: "POST",
                headers: {
                    'auth_token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });
            const AddPostToProfile = await addPost.json();
            props.setBoards((prev) => [...prev, AddPostToProfile])


        } catch (error) {
            console.log(error);
            console.log("Trycatch");
        }
       
    }


    return (
        <Formik
            initialValues={{ toDo: '', place: '', meetingTime: '', timeOut: '', }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                addPost(values)
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
                            <label htmlFor="toDo"><b>What to Do</b></label><br />
                            <input
                                id="text"
                                type="text"
                                placeholder="To ..."
                                name="toDo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.toDo}
                                className={touched.toDo && errors.toDo ? 'has-error' : null} />
                            <Error touched={touched.toDo} message={errors.toDo} />

                            <label htmlFor="place"><b>Place</b></label><br />
                            <input
                                type="text"
                                placeholder="Hmm, Where???"
                                name="place"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.place}
                                className={touched.place && errors.place ? 'has-error' : null} />
                            <Error touched={touched.place} message={errors.place} />

                            <label htmlFor="meetingTime"><b>Meeting Time</b></label><br />
                            <input
                                type="time"
                                name="meetingTime"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.meetingTime}
                                className={touched.meetingTime && errors.meetingTime ? 'has-error' : null} />
                            <Error touched={touched.meetingTime} message={errors.meetingTime} />


                            <label htmlFor="timeOut"><b>Timer</b></label><br />
                            <input
                                type="text"
                                name="timeOut"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.timeOut}
                                className={touched.timeOut && errors.timeOut ? 'has-error' : null} />
                            <Error touched={touched.timeOut} message={errors.timeOut} /><hr />

                            <button type="submit" style={{ color: 'white', backgroundColor: "#3b5998" }}>
                                Add
                        </button>
                        </div>
                    </form>)}

        </Formik>
    );
}

export default AddBoard;
