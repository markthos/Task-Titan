// document.getElementById("clientForm").addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const user_id = document.getElementById("user_id").value;
//     const project_id = document.getElementById("project_id").value;
  
//     try {
//         const response = await fetch("/api/client", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ user_id, project_id, name })
//         });

//         const data = await response.json();
//         console.log(data); // Log the response from the server
//     } catch (error) {
//         console.error("Error adding client:", error);
//     }
// }
// );
