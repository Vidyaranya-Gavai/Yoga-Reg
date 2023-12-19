import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { RiUser3Line, RiAddCircleLine } from "@remixicon/react";
const Main = () => {
	const [userData, setUserData] = useState([]);
	const [userUpdatedData, setUserUpdatedData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		city: "",
		gender: "",
		zip: "",

	});
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
		getData(user._id)
	},[])

	function parseJwt(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	}

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location = "/";
	};

	const handleUpdateChange = async (e) => {
		const { name, value } = e.target;
		console.log(e.target.value)
		setUserData({
			...userData,
			[name]: value,
		})
	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		const result = await fetch("https://yoga-reg-api.vercel.app/api/users/updatedata", {
			method: "POST",
			body: JSON.stringify({
				userUpdatedData: userData,
			}),
			headers: {
				"Content-Type": "application/json",
			}
		})
		const res = await result.json();
	}

	const openAddPass = () => {
		window.location = "/addpass";
	}

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.sidebar}>
					<div className={styles.sidebar_nav}>
						<div className={styles.element}>
							<i><RiUser3Line size={30} /></i>
							<h2>Profile</h2>
						</div>

						<div className={styles.element} onClick={openAddPass}>
							<i><RiAddCircleLine size={30} /></i>
							<h2>Add a pass</h2>
						</div>
					</div>

					<button className={styles.logout} onClick={handleLogout}>Logout</button>
				</div>

				<div className={styles.rightDiv}>
					<div className={styles.profile}>
						<div className={styles.user}>
							<img src={`http://localhost:4000/${userData.cover}`} alt="NOt" className={styles.face} />
						</div>

						<div className={styles.update_form}>
							<form className="row g-3 needs-validation" novalidate>
								<div className="col-md-4">
									<label htmlfor="validationCustom01" className="form-label">First name</label>
									<input type="text" className="form-control" id="validationCustom01" onChange={handleUpdateChange} name="firstName" disabled value={userData.firstName} />
									<div className="valid-feedback">
										Looks good!
									</div>
								</div>
								<div className="col-md-4">
									<label htmlfor="validationCustom02" className="form-label">Last name</label>
									<input type="text" className="form-control" id="validationCustom02" onChange={handleUpdateChange} name="lastName" disabled value={userData.lastName} />
									<div className="valid-feedback">
										Looks good!
									</div>
								</div>
								<div className="col-md-4">
									<label htmlfor="validationCustomUsername" className="form-label">Email</label>
									<div className="input-group has-validation">

										<input type="text" className="form-control" id="validationCustomUsername" onChange={handleUpdateChange} name="email" aria-describedby="inputGroupPrepend" value={userData.email} disabled />
										{/* <span className="input-group-text" id="inputGroupPrepend">@gmail.com</span> */}
									</div>
								</div>



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
			</div>
		</div>
	);
};

export default Main;
