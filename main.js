/* Form validation can be done at three points:
1- Input and change events
2- After timeout after user stops typing
3- On submit */
let input = document.getElementById("user_name");
let submit = document.querySelector(".button");

//adding name to local stoarge
submit.addEventListener("click", () => {
 
 
  if (input.value === "") {
    swal.fire({
      title: "Please Enter your name",
      icon: "warning",
    });
  } else {
    swal
      .fire({
        title: "Let's Start Doing!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Let's Go",
        
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.localStorage.setItem("userName", input.value);
          window.location.href = "/app/index.html";
        }
      });
  }
});


function tasksPage()
{
  if (localStorage.getItem("userName")) {
  window.location.href = "/app/index.html";
  }
};

window.addEventListener("load", tasksPage);