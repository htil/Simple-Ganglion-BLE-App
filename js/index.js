var update = (data) => {
  console.log(data);
};

var vis = new Vis();
var physio = new Physio(update, vis);

document.querySelector("#connect").onclick = () => {
  physio.connect();
};

document.querySelector("#disconnect").onclick = () => {
  physio.disconnect();
};

window.addEventListener("beforeunload", function (e) {
  // Cancel the event
  physio.disconnect();
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = "";
});
