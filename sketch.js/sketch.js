var sun = new Sun(50);
var planet_colors = [[235,243,246],[227,220,203],[216,202,157],[165,145,134],[201,144,57]]

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(0);
  translate(width / 2, height / 2);

  sun.spawn_planets(8);
  sun.show();
}


function Sun(radius) {
  this.radius = radius;
  this.planets = NaN;

  this.spawn_planets = function(total) {
    if (!this.planets && total > 0) {
      this.planets = new Array(total);
      for (var idx = 0; idx < this.planets.length; idx++) {
        this.planets[idx] = this.generate_random_planet()
        this.planets[idx].spawn_moons();
      }
    }
  }

  this.generate_random_planet = function() {
    radius = this.radius * random(0.12, 0.33);
    distance = random(this.radius * .75, this.radius * 9);
    orbit_speed = random(0.0001, 0.004);
    moons = floor(random(0, 4));
    return new Planet(this.radius, radius, distance, orbit_speed, moons);
  }

  this.show = function() {
    fill(253, 184, 19);
    ellipse(0, 0, this.radius);

    if (this.planets) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
    }
  }
}

function Planet(solar_radius, radius, distance, orbit_speed, moon_total) {
  this.radius = radius;
  this.distance = distance;
  this.angle = random(TWO_PI);
  this.orbit_speed = orbit_speed;
  this.moon_total = moon_total;
  this.moons = NaN;
  this.surface_color = planet_colors[floor(random(0, planet_colors.length - 1))];

  this.orbit = function() {
    this.angle = this.angle + this.orbit_speed;
  }

  this.spawn_moons = function() {
    if (!this.moons && this.moon_total > 0) {
      this.moons = new Array(this.moon_total);
      for (var idx = 0; idx < this.moons.length; idx++) {
        this.moons[idx] = this.generate_random_moon();
      }
    }
  }

  this.generate_random_moon = function() {
    radius = this.radius * random(0.12, 0.33);
    distance = random(this.radius * 1.15, this.radius * 2);
    orbit_speed = random(0.001, 0.06)
    return new Moon(radius, distance, orbit_speed);
  }

  this.show = function() {
    push();
    fill(this.surface_color);
    rotate(this.angle);
    translate(this.distance, 0);
    ellipse(0, 0, this.radius);
    this.orbit();
    if (this.moons) {
      for (var i = 0; i < this.moons.length; i++) {
        this.moons[i].show();
      }
    }

    pop();
  }
}


function Moon(radius, distance, orbit_speed) {
  this.radius = radius;
  this.distance = distance;
  this.angle = random(TWO_PI);
  this.orbit_speed = orbit_speed;
  this.color = (232,229,240);

  this.orbit = function() {
    this.angle = this.angle + this.orbit_speed;
  }

  this.show = function() {
    push();
    fill(255);
    rotate(this.angle);
    translate(this.distance, 0);
    ellipse(0, 0, this.radius);
    this.orbit()
    pop();
  }
}
