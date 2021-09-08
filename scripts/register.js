const baseURL = "https://blooming-ocean-52967.herokuapp.com/register/";

// this code below allows users to register
function registeruser() {
  let name = document.querySelector("#first_name").value;
  let surname = document.querySelector("#last_name").value;
  let identity = document.querySelector("#identity").value;
  let number = document.querySelector("#phone").value;
  let email = document.querySelector("#email").value;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  fetch(baseURL, {
    method: "POST",
    body: JSON.stringify({
      full_name: name,
      last_name: surname,
      identity: identity,
      phone_number: number,
      email: email,
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
      localStorage.setItem("register", JSON.stringify(data));
      window.location = "./login.html";
    });
}
