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
