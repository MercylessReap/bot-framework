$(document).ready(function() {
  lineChart();
  donutChart();

  $(window).resize(function() {
    window.lineChart.redraw();
    window.donutChart.redraw();
  });
});

var data = [
  { y: '2014', a: 50, b: 90},
  { y: '2015', a: 65,  b: 75},
  { y: '2016', a: 50,  b: 50},
  { y: '2017', a: 75,  b: 60},
  { y: '2018', a: 80,  b: 65},
  { y: '2019', a: 90,  b: 70},
  { y: '2020', a: 100, b: 75},
  { y: '2021', a: 115, b: 75},
  { y: '2022', a: 120, b: 85},
  { y: '2023', a: 145, b: 85},
  { y: '2024', a: 160, b: 95}
],
config = {
  data: data,
  xkey: 'y',
  ykeys: ['a', 'b', 'c'],
  labels: ['HR Session', 'IT Session', 'Global Session'],
  fillOpacity: 0.6,
  hideHover: 'auto',
  behaveLikeLine: true,
  resize: true,
  pointFillColors:['#ffffff'],
  pointStrokeColors: ['black'],
  lineColors:['#1e88e5','#ff3321'],
  lineWidth: '3px',
  resize: true,
  redraw: true
};
config.element = 'adsChart';
function lineChart() {
  window.lineChart = Morris.Line(config);
}

function donutChart() {
  window.donutChart = Morris.Donut({
    element: 'qaTotal',
    data: [
      {label: "HR", value: 30},
      {label: "IT", value: 15},
      {label: "Global", value: 45},
      {label: "Neutral", value: 10}
    ],
  resize: true,
  redraw: true
});
}
