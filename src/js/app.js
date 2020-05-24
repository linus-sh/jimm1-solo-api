//for user table
document.getElementById("Get User List").onclick = () => {
  return fetch("http://localhost:3000/api/users", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log("userList", response);
    })
    .catch((error) => {
      console.log(error);
    });
};

document.getElementById("Register New User").onclick = () => {
  const newUser = { name: "Jason Statham", height: "178.0" };

  return fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (!response.hasOwnProperty("detail")) {
        console.log("New User", response);
      }
      console.log("This user is already registered");
    });
};

document.getElementById("Fix User Data").onclick = () => {
  const newUserData = { name: "Jason Statham", newUserName: "Bruce Willis" };

  return fetch("http://localhost:3000/api/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (!response.hasOwnProperty("detail")) {
        console.log("User Updated", response);
      } else {
        console.log("This user is already registered");
      }
    });
};

document.getElementById("Delete User Data").onclick = () => {
  const targetUser = "BruceWillis";
  return fetch(`http://localhost:3000/api/users/${targetUser}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.length === 0) {
        console.log("Delete target User");
      } else {
        console.log(response.message);
      }
    });
};

//for record table
// document.getElementById("Get All Record").onclick = () => {
//   return fetch("http://localhost:3000/api/records", {
//     method: "GET",
//   }).then((response) => {
//     return response.json();
//   });
// };

// document.getElementById("Get Record By User").onclick = () => {
//   return fetch("http://localhost:3000/api/users", {
//     method: "GET",
//   }).then((response) => {
//     return response.json();
//   });
// };

// document.getElementById("Register New Record").onclick = () => {
//   return fetch("http://localhost:3000/api/users", {
//     method: "GET",
//   }).then((response) => {
//     return response.json();
//   });
// };

// document.getElementById("Fix record").onclick = () => {
//   return fetch("http://localhost:3000/api/users", {
//     method: "GET",
//   }).then((response) => {
//     return response.json();
//   });
// };

// document.getElementById("Delete recorde").onclick = () => {
//   return fetch("http://localhost:3000/api/users", {
//     method: "GET",
//   }).then((response) => {
//     return response.json();
//   });
// };
