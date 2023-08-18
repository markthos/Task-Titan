// Get the modal
var modal = document.getElementById("myModal");
// Get the modal
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// When the user clicks on the button, open the modal
btn.addEventListener("click", function(event) {
  event.preventDefault();
  modal.style.display = "block";
});

// Get the button that opens the modal2
var btn2 = document.getElementById("myBtn2");

// When the user clicks on the button, open the modal2
btn2.addEventListener("click", function(event) {
  event.preventDefault();
  modal2.style.display = "block";
});

// When the user clicks anywhere outside of the modals, close them
window.addEventListener("click", function(event) {
  console.log(event.target);
  if (event.target == modal || event.target == modal2) {
    console.log("hello");
    modal.style.display = "none";
    modal2.style.display = "none";
  }
});

// Get the <span> element that closes modal
var spanModal = document.getElementsByClassName("close")[1];
// When the user clicks on <span> (x), closes modal
spanModal.addEventListener("click", function(event) {
  event.preventDefault();
  modal.style.display = "none";
});

// Get the <span> element that closes modal2
var spanModal2 = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), closes modal2
spanModal2.addEventListener("click", function(event) {
  event.preventDefault();
  modal2.style.display = "none";
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('#comment_bar');
  var instances = M.Sidenav.init(elems, {edge:'right'});
});


