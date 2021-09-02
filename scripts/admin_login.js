const baseURL = "https://guarded-retreat-61794.herokuapp.com/login-admin/";

// this code below allows users to Admin login
function loginAdmin() {
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
    console.log(username, password)
	fetch(baseURL, {
		method: "PATCH",
		body: JSON.stringify({
			username: username,
			password: password,
		}),
        headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
            localStorage.setItem("user", JSON.stringify(data.data));
			if (data.status_code == 200) {
				window.location.href = "./index.html";
			} else {
				alert("Sorry wrong username and password try again.");
			}
		});
}