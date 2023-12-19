import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import { RiUser3Line, RiAddCircleLine } from "@remixicon/react";
import axios from 'axios';
import Swal from 'sweetalert2';

function AddPass() {
    const [userData, setUserData] = useState([]);

    const getData = async (user_id) => {
        const result = await fetch("https://yoga-reg-api.vercel.app/api/auth/getdata", {
            method: "POST",
            body: JSON.stringify({
                id: user_id,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const res = await result.json();
        setUserData(res);
    }
    useEffect(() => {
        const user = parseJwt(localStorage.getItem("token"));
        console.log(user);
        getData(user._id)
    }, [])


    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }


    const [gender, setGender] = useState('')
    const [batch, setBatch] = useState('')
    const [formData1, setFormData1] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        batch: "",
        referedBy: ""
    })
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/";
    };

    const openProfile = () => {
        window.location = "/profile";
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.set('firstName', formData1.firstName);
        formData.set('lastName', formData1.lastName);
        formData.set('age', formData1.age);
        formData.set('gender', formData1.gender);
        formData.set('batch', formData1.batch);
        formData.set('referedBy', userData._id);
        console.log(formData1,formData)

        
        Swal.fire({
            title: "Your Pass has been created!",
            icon: "success",
          });
        // const data = await axios.post("http://localhost:4000/api/auth/addPass", formData);
        const result = await fetch("https://yoga-reg-api.vercel.app/api/auth/addPass", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(result);
        
        // const res = await data;
        
    }

    const handleChange = async (e) => {
        const { name, value } = e.target;
        // if (name === 'gender') {
        //     setFormData1({
        //         ...formData1,
        //         [formData1.gender]: e.target.value
        //     })
        // }
        // else if (name === 'batch') {
        //     setFormData1({
        //         ...formData1,
        //         [formData1.batch]: e.target.value
        //     })
        // }
        // else {

        // }
        setFormData1({
            ...formData1,
            [name]: value
        })
    }
    const handleChangeGender = (e) => {
        setGender(e.target.value);
    }
    const handleChangeBatch = (e) => {
        setBatch(e.target.value);
    }
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebar_nav}>
                        <div className={styles.element} onClick={openProfile}>
                            <i><RiUser3Line size={30} /></i>
                            <h2>Profile</h2>
                        </div>

                        <div className={styles.element}>
                            <i><RiAddCircleLine size={30} /></i>
                            <h2>Add a pass</h2>
                        </div>
                    </div>

                    <button className={styles.logout} onClick={handleLogout}>Logout</button>
                </div>

                <div className={styles.rightDiv}>
                    <form className="row g-3 needs-validation" novalidate>
                        <div className="col-md-4">
                            <label htmlfor="validationCustom01" className="form-label" style={{ fontWeight: "bold" }}>First name</label>
                            <input type="text" className="form-control" id="validationCustom01" name="firstName" onChange={handleChange} />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlfor="validationCustom02" className="form-label" style={{ fontWeight: "bold" }}>Last name</label>
                            <input type="text" className="form-control" id="validationCustom02" name="lastName" onChange={handleChange} />

                        </div>



                        <div className="col-md-4">

                            <label htmlfor="validationCustomUsername" className="form-label" style={{ fontWeight: "bold" }}>Age</label>

                            <div className="input-group has-validation">
                                <input type="number" className="form-control" id="validationCustomUsername" onChange={handleChange} name="age" aria-describedby="inputGroupPrepend" />
                            </div>
                        </div>



                        <div className='row'>
                            <div className='col-md-5'>
                                <label htmlfor="validationCustomUsername" className="form-label" style={{ fontWeight: "bold" }}>Gender</label>
                                <select class="form-select" onChange={handleChange} name='gender' aria-label="Default select example">
                                    <option selected>--select gender--</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-5'>
                                <label htmlfor="validationCustomUsername" className="form-label" style={{ fontWeight: "bold" }}>Batch</label>
                                <select class="form-select" onChange={handleChange} name='batch' aria-label="Default select example">
                                    <option selected>--select batch--</option>
                                    <option value="6-7">6am to 7am</option>
                                    <option value="7-8">7am to 8am</option>
                                    <option value="8-9">8am to 9am</option>
                                    <option value="5-6">5pm to 6pm</option>
                                </select>
                            </div>
                        </div>



                        <button className={styles.addbatch} onClick={handleSubmit}>Register for batch</button>


                        <div className="col-12">
                            <div className="form-check">
                                <div className="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddPass
