let access_level;




const saveNewTicket = async (ticket, status, project_id) => {
  const titleData = ticket.querySelector(".new_ticket_title");
  const textData = ticket.querySelector(".new_ticket_content");

  const title = titleData.value.trim();
  const text = textData.value.trim();

  const response = await fetch(`/api/tickets`, {
    method: "POST",
    body: JSON.stringify({ title, text, status, project_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("something went wrong");
  }
  
  localStorage.setItem('toastMessage', 'Task Added');
  ticket.style.display = "none";
  location.reload();
};

document.addEventListener("click", (event) => {
  const target = event.target;
  const addTaskButton = target.closest(".add_task");

  if (addTaskButton) {
    const targetSelector = addTaskButton.getAttribute("data-target");
    const targetStatus = addTaskButton.getAttribute("data-status"); // Get the status

    // Adjust the selector to target the .new_task element with the specific data-status
    const targetElement = document.querySelector(
      `.new_task[data-status="${targetStatus}"]`
    );

    if (targetElement) {
      targetElement.style.display = "block";
    }
  }
});

document.addEventListener("click", async (event) => {
  const target = event.target;
  const ticket = target.closest(".new_ticket");
  const new_ticket = target.closest(".new_task");

  if (!ticket) {
    return; 
  }

  

  if (target.matches(".save_button")) {
    console.log("save");
    const status = new_ticket.getAttribute("data-status");
    const project_id = new_ticket.getAttribute("data-id");
    saveNewTicket(ticket, status, project_id);
  } else if (target.matches(".cancel_button")) {
    console.log("cancel");
    new_ticket.style.display = "none";
  }
});


const findAccessLevel = async (access_level) => {
  const PUTTHESHITHERE = document.querySelector("#PUTTHESHITHERE");
  const project_id = PUTTHESHITHERE.getAttribute("data-project-id");
  const user_id_selector = document.querySelector("#user_id");
  
  const user_id = user_id_selector.getAttribute("data-user-id");
  const project_view = document.querySelector("#project_view")
  const worker_hide = document.querySelectorAll(".worker_hide")


  console.log(project_id, "userID:" + user_id);
  //set progress bar on page reload

  const response = await fetch(`/api/collaborator/validate`, {
    method: "POST",
    body: JSON.stringify({ project_id, user_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response) {
    return console.log("nope");
  }

  access_level = await response.json();
  console.log("Access Level: " + access_level);

  if (access_level === "admin") {
    PUTTHESHITHERE.textContent = "Admin View";
    project_view.style.display = "block"
    worker_hide.forEach(e => {
      e.style.display = "block"
    })
  }  else if (access_level === "worker") {
    PUTTHESHITHERE.textContent = "Worker View";
    project_view.style.display = "block"
    worker_hide.forEach(e => {
      e.style.display = "none"
    })
  } else if (access_level === "client") {
    PUTTHESHITHERE.textContent = "Client View";
    project_view.style.display = "none"
  }

};

document.addEventListener("DOMContentLoaded", findAccessLevel);





// Listen for the "progressUpdate" event
socket.on("progressUpdate", (data) => {
  const progressData = data.progress_data;

  if (progress_data === null) {
    data.progress_data = 100
  } 

  console.log("updating progress: " + progressData)
  

  // Update progress on the client side based on the received data
  const progressStat = document.querySelector('#progress_stat');
  progressStat.textContent = progressData + "%";
  progressStat.style.width = progressData + "%";
});
