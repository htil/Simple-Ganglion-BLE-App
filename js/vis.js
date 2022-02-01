/** Class used to manage data visualization
 * @class
 */

var Vis = function () {
  window.rawSignalGraph = new Rickshaw.Graph({
    element: document.querySelector("#graph"),
    width: 600,
    height: 400,
    renderer: "line",
    series: new Rickshaw.Series.FixedDuration(
      [
        { name: "0", color: "steelblue" },
        { name: "1", color: "lightblue" },
        { name: "2", color: "gold" },
        { name: "3", color: "red" },
      ],
      undefined,
      {
        timeInterval: 1,
        maxDataPoints: 256 * 2,
        timeBase: new Date().getTime() / 1000,
      }
    ),
  });
};
