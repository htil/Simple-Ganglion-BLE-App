var update = (data) => {
  console.log(data);
};

var physio = new Physio(update);
var vis = new Vis();
document.querySelector("#connect").onclick = () => {
  physio.connect();
};

window.addEventListener("beforeunload", function (e) {
  // Cancel the event
  physio.disconnect();
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = "";
});
