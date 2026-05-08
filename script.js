function go(id) {



  document.querySelectorAll(".screen").forEach(screen => {

    screen.classList.remove("active");

  });



  document.getElementById(id).classList.add("active");

}



function showMessage(boxId, text, type = "success") {



  const box = document.getElementById(boxId);



  box.innerText = text;



  box.className = "message-box " + type;

}



function signup() {



  const email =

    document.getElementById("signupEmail").value.trim();



  const username =

    document.getElementById("signupUsername").value.trim();



  const password =

    document.getElementById("signupPassword").value.trim();



  if (

    email === "" ||

    username === "" ||

    password === ""

  ) {



    showMessage(

      "signupMessage",

      "Please fill all fields",

      "error"

    );



    return;

  }



  const emailPattern =

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  if (!emailPattern.test(email)) {



    showMessage(

      "signupMessage",

      "Please enter a valid email address",

      "error"

    );



    return;

  }



  if (password.length < 8) {



    showMessage(

      "signupMessage",

      "Password must be at least 8 characters",

      "error"

    );



    return;

  }



  let users =

    JSON.parse(localStorage.getItem("users")) || [];



  const userExists = users.find(user =>

    user.email === email ||

    user.username === username

  );



  if (userExists) {



    showMessage(

      "signupMessage",

      "Email or username already exists",

      "error"

    );



    return;

  }



  const newUser = {
  id: Date.now(),
  email: email,
  username: username,
  password: password
};



  users.push(newUser);



  localStorage.setItem(

    "users",

    JSON.stringify(users)

  );



  showMessage(

    "signupMessage",

    "Account created successfully",

    "success"

  );



  setTimeout(() => {

    go("signin");

  }, 1000);

}



function signin() {



  const emailOrUsername =

    document.getElementById("signinEmail").value.trim();



  const password =

    document.getElementById("signinPassword").value.trim();



  if (

    emailOrUsername === "" ||

    password === ""

  ) {



    showMessage(

      "signinMessage",

      "Please enter email or username",

      "error"

    );



    return;

  }



  let users =

    JSON.parse(localStorage.getItem("users")) || [];



  const user = users.find(user =>

    user.email === emailOrUsername ||

    user.username === emailOrUsername

  );



  if (!user) {



    showMessage(

      "signinMessage",

      "Incorrect email or username",

      "error"

    );



    return;

  }



  if (user.password !== password) {



    showMessage(

      "signinMessage",

      "Incorrect password",

      "error"

    );



    return;

  }



  localStorage.setItem(

    "loggedInUser",

    JSON.stringify(user)

  );



  document.getElementById("welcomeUser").innerText =

    "Welcome, " + user.username;



  showMessage(

    "signinMessage",

    "Login successful",

    "success"

  );



  setTimeout(() => {

   window.location.href = "dashboard.html";

  }, 1000);

}



function logout() {



  localStorage.removeItem("loggedInUser");



  go("signin");

}



window.onload = function () {



  const loggedInUser =

    JSON.parse(localStorage.getItem("loggedInUser"));



  if (loggedInUser) {



    document.getElementById("welcomeUser").innerText =

      "Welcome, " + loggedInUser.username;



    go("home");

  }

};