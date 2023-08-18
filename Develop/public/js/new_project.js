// Get the modal
var modal2 = document.getElementById("myModal2");

// Get the <span> element that closes the modal2
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on <span2> (x), close the modal2
span2.onclick = function () {
  modal2.style.display = "none";
};

// When the user clicks anywhere outside of the modal2, close it
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};

// When user creates a new project redirect to the boards/:id route
const newProjectHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#project-name").value.trim();
  const description = document.querySelector("#project-description").value.trim();

  if (name && description) {
    const response = await fetch(`/api/projects`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/boards/${response.id}`);
    } else {
      alert("Failed to create project");
    }
  }
}
