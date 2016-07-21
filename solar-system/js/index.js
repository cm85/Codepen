$(document).ready(function() {
  var planets = [
    "sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "neptune", "pluto"
  ]

  planets.forEach(addPlanets)
});

function addPlanets(name) {
  $list = $("ul.solarsystem");
  text = '<li class="' + name + '">' +
    '<span>' + name + '</span></li>'
  $list.append(text);
}