$.getJSON("js/particles.json", function(data) {
  particlesJS("particles-js", data);
});

$(".carousel").carousel({ //second number is seconds
  interval: 1000 * 40
});