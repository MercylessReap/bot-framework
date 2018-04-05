(function($) {
  "use strict"; // Start of use strict
  $(".table").DataTable();
  // Configure tooltips for collapsed side navigation
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  })
  // Toggle the side navigation
  $("#sidenavToggler").click(function(e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
  });
  // Intents table
  document.getElementById('mainNav').addEventListener("load",loadIntents());
  function loadIntents() {
    var intentRequest = new XMLHttpRequest();
    intentRequest.open('GET', 'http://localhost/api/intent');
    intentRequest.onload = function () {
      var intentsData = JSON.parse(intentRequest.responseText);
      renderHTML(intentsData);
    }
    intentRequest.send();
  }

  function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  function renderHTML(data) {
    var table = [];
    for (var i = 0; i < data.length; i++) {

      var id = data[i]._id.toString(),
        disabled
      if (data[i].diasbled == "true") {
        disabled = 'Disabled'
      } else {
        disabled = 'Enabled'
      };

      var count = i+1;
      var row = "<th scope='row'>" + count + "</th>"
      var name = "<td>" + data[i].name + "</td>"
      var department = "<td>" + data[i].department + "</td>"
      var updated = "<td>" + parseISOString(data[i].updated)+ "</td>"
      var status = "<td>" + disabled + "</td>"
      var inBtn = ' <td><a class="btn btn-primary" href="/bot-growth/intent/' + id + '">Edit</a><span class="btn-right"><a class="btn btn-primary" href="/bot-growth/intent/' + id + '/delete/'+ '">Delete</a></span></td>'
      table = table +'<tr>' + row + name + department + updated + status + inBtn + '</tr>'
      document.getElementById('intentList').innerHTML = table;
    }
  }


  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".navbar-sidenav .nav-link-collapse").click(function(e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip()
  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });
})(jQuery); // End of use strict
