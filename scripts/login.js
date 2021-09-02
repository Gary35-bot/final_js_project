
const baseURL = "https://blooming-ocean-52967.herokuapp.com/login/";

// this code below allows users to login
function loginUser() {
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

