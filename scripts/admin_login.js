const baseURL = "https://blooming-ocean-52967.herokuapp.com/login-admin/";

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
		.then((json) => {
			console.log(json.data);
			if (json.data == 0) {
				alert("wrong")
			} else {
				localStorage.setItem("users", JSON.stringify(json.data));
				window.location = './admin_screen.html'
			}
		});
}