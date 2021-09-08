const baseURL = "https://blooming-ocean-52967.herokuapp.com/login/";

// this code below allows users to login
function loginUser() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  if (window.localStorage["cart"] || window.localStorage["users"]) {
    console.log("ganief");
    if (
      username == JSON.parse(window.localStorage["users"])[0].username &&
      password == JSON.parse(window.localStorage["users"])[0].password
    ) {
      alert("already logged in");
      window.location = "./index.html";
    } else {
      alert("log out first");
    }
  } else {
    console.log(username, password);
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
          alert("Wrong username or password");
        } else {
          localStorage.setItem("users", JSON.stringify(json.data));
          window.location = "./index.html";
        }
      });
  }
}
