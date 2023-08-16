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
          ${commentsData.comments[i].first_name} on ${commentsData.comments[i].date_posted} //!need dayjs?
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

const main = document.querySelector('#main');

document.addEventListener("click", async (event) => {
  const target = event.target;
  const ticket = target.closest(".ticket"); // Find the closest parent with the .ticket class
  if (!ticket) {
    return; // Click didn't happen within a ticket, exit
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
  } else if (target.matches(".edit_button")) {
    event.preventDefault()
    openEditor(ticketId);
  } else if (target.matches(".delete_button")) {
    deleteTicket(ticketId, target);
  } else if (target.matches(".edit_button")) {
    openEditor(ticketId);
  } else if (target.matches(".save_button")) {
    const title = ticket.querySelector("#new_ticket_title").value.trim();
    const text = ticket.querySelector("#new_ticket_content").value.trim();
    handleUpdateSubmit(ticketId, title, text);
  } else if (target.matches(".cancel_button")) {
    console.log("here");
    handleCancel(ticketId, ticket);
  }
});

