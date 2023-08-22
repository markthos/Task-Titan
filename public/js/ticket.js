function init() {
  const containers = [
    document.querySelector("#todo"),
    document.querySelector("#doing"),
    document.querySelector("#review"),
    document.querySelector("#done"),
  ];

  const drake = dragula(containers, {
    revertOnSpill: true,
  });

  drake.on("drop", async (el, target, source, sibling) => {
    try {
      const itemId = el.getAttribute("data-id"); // assuming you have a unique identifier for each item
      const status = target.id; // you might want to use a unique identifier for each container as well

      // Prepare the data for the update
      const updateData = {
        id: itemId,
        status: status,
      };

      // Send a PUT request to your server to update the database
      const response = await fetch("/api/tickets", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        console.log("Failed to update item");
      }
    } catch (error) {
      console.error(error);
    }
  });

  const deleteTicket = async (id, ticket) => {
    console.log("deleting ticket...");

    const response = await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      ticket.remove();
    } else {
      return console.log("nothing to delete");
    }

    localStorage.setItem("toastMessage", "Deleted Task");
    location.reload();
  };

  const openEditor = async (id) => {
    console.log("editing ticket " + id);

    await fetch(`/api/tickets/${id}`, {
      method: "PUT",
      body: JSON.stringify({ is_editing: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    location.reload();
  };

  const handleUpdateSubmit = async (id, title, text) => {
    console.log("saving ticket...");

    if (title && text) {
      const response = await fetch(`/api/tickets/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, text, is_editing: false }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to update");
      }
    }
  };

  const handleCancel = async (id) => {
    console.log("Canceling update ticket...");

    await fetch(`/api/tickets/${id}`, {
      method: "PUT",
      body: JSON.stringify({ is_editing: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("toastMessage", "Canceled Edit");
    location.reload();
  };

  const openComments = async (id, ticket) => {
    const commentList = ticket.querySelector("#comment_list");
    console.log("opening comments for ticket id: ", id);
    commentList.innerHTML = "";

    const response = await fetch(`/api/tickets/${id}/ticketcomments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const commentsData = await response.json(); // Parse JSON response

    const length = commentsData.comments.length;

    if (length <= 0) {
      commentList.innerHTML = "No Comments Yet";
    }

    for (let i = 0; i < commentsData.comments.length; i++) {
      commentList.innerHTML += `
          <li style="width: 100%; display: flex; justify-content: space-between; margin: 10px 0px;">
            <div>
              ${commentsData.comments[i].text}
            </div>
            <div>
              - ${commentsData.comments[i].user.first_name}
            </div>
          </li>`;
    }
  };

  const handleNewCommentSubmit = async (id, ticket) => {
    console.log("submitting new comment...");

    const textField = ticket.querySelector("#new_comment");

    const text = textField.value;
    const ticket_id = id;

    console.log(text);
    console.log(ticket_id);

    const response = await fetch(`/api/tickets/${id}/ticketcomments`, {
      method: "POST",
      body: JSON.stringify({ text, ticket_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    openComments(ticket_id, ticket);

    if (response.ok) {
      console.log("something went wrong");
    }
  };

  document.addEventListener("click", async (event) => {
    const target = event.target;
    const ticket = target.closest(".ticket"); // Find the closest parent with the .ticket class
    if (!ticket) {
      return; // Click didn't happen within a ticket, exit
    }

    const hide_all = ticket.querySelector(".hide_all_contents");
    const card_title = ticket.querySelector(".card-title");

    if (hide_all && card_title) {
      if (hide_all.style.display === "none" || !hide_all.style.display) {
        hide_all.style.display = "block";
      } else if (card_title === target && hide_all.style.display === "block") {
        hide_all.style.display = "none";
      }
    }

    const ticketId = ticket.getAttribute("data-id");

    if (target.matches(".comment-button")) {
      // Handle comment button click
      const commentState = target.getAttribute("data-state");

      const commentSection = ticket.querySelector("#comments_section");
      if (commentState === "closed") {
        target.setAttribute("data-state", "open");
        target.innerHTML = "Hide Comments";
        commentSection.style.display = "flex";
        openComments(ticketId, ticket);
      } else {
        target.innerHTML = "Comments";
        commentSection.style.display = "none";
        target.setAttribute("data-state", "closed");
      }
    } else if (target.matches("#add_comment")) {
      // Handle add comment button click
      const addCommentDisplay = ticket.querySelector("#add_comment_display");
      if (addCommentDisplay.style.display === "none") {
        target.innerHTML = "Cancel";
        addCommentDisplay.style.display = "flex";
      } else {
        target.innerHTML = "Add Comment +";
        addCommentDisplay.style.display = "none";
      }
    } else if (target.matches("#submit_new_comment")) {
      // Handle submit new comment button click
      handleNewCommentSubmit(ticketId, ticket);
    } else if (target.matches(".delete_button")) {
      deleteTicket(ticketId, target);
    } else if (target.matches(".edit_button")) {
      openEditor(ticketId);
    } else if (target.matches(".save_button")) {
      const title = ticket.querySelector("#new_ticket_title").value.trim();
      const text = ticket.querySelector("#new_ticket_content").value.trim();
      if (text == "" || title == "") {
        alert("no text");
      } else {
        handleUpdateSubmit(ticketId, title, text);
      }
    } else if (target.matches(".cancel_button")) {
      handleCancel(ticketId, ticket);
    }
  });
}

document.addEventListener("DOMContentLoaded", init);



document.addEventListener("DOMContentLoaded", function () {
  var toastMessage = localStorage.getItem("toastMessage");

  if (toastMessage) {
    M.toast({ html: toastMessage });
    localStorage.removeItem("toastMessage");
  }

  var elems = document.querySelectorAll(".dropdown-trigger");
  var options = {}; // Add any necessary options for Dropdown initialization
  var instances = M.Dropdown.init(elems, options);
  console.log;

  // Add a click event listener to each dropdown item // ticket status elector not done
  var dropdownItems = document.querySelectorAll(".dropdown-content li a");
  dropdownItems.forEach(function (item) {
    item.addEventListener("click", async () => {
      // Action to perform when a dropdown item is clicked
      // You can replace this with your desired action
      try {
        console.log("Dropdown item clicked:", item.textContent);

        const itemId = item.getAttribute("id"); // assuming you have a unique identifier for each item
        const status = item.getAttribute("data-id"); // you might want to use a unique identifier for each container as well

        console.log(itemId + " " + status);

        const updateData = {
          id: itemId,
          status: status,
        };

        // Send a PUT request to your server to update the database
        const response = await fetch("/api/tickets", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          console.log("Failed to update item");
        }

        //location.reload()
      } catch (error) {
        console.error(error);
      }
    });
  });
});



