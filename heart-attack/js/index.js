/* Vectors:
http://codepen.io/enxaneta/pen/210462e4c2c0a8af6460e09499d6b99b */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 400,
  cx = cw / 2;
var ch = canvas.height = 400,
  cy = ch / 2;
var rad = Math.PI / 180;
ctx.fillStyle = "#ccc";
ctx.strokeStyle = "#fff";


var tree;
var max_dist = 25;
var min_dist = 10;
var R = 200;
var growing = true;

function heart(r){
ctx.beginPath();
for( var t = 0; t < 360; t++){
var x = cx + (16*r*(Math.sin(t*rad) *Math.sin(t*rad) *Math.sin(t*rad) ) );	
var y = cy -2*r - 13*r*Math.cos(t*rad) +
             5*r*Math.cos(2*t*rad) +
			 2*r*Math.cos(3*t*rad) +
			 r*Math.cos(4*t*rad);	
ctx.lineTo(x,y);
}

ctx.closePath();
//ctx.stroke();
}

////////////////////////////////////////
function Tree() {
  this.leaves = [];
  this.branches = [];
  this.numLeaves = 2000;

heart(12);

var count = 0;
 while (count < this.numLeaves){
  var x = ~~(Math.random() * cw);
  var y = ~~(Math.random() * ch);
  
  if (ctx.isPointInPath(x, y)){
    this.leaves.push(new Leaf(x,y));
    count++
  }
}
 

  this.show = function() {
    for (var i = 0; i < this.leaves.length; i++) {
      this.leaves[i].draw();
    }
    for (var i = 0; i < this.branches.length; i++) {
      this.branches[i].draw();
    }
  }

  var rootPos = new Vector(cx, cy);
  var dir = new Vector(0, -1);
  var root = new Branch(null, rootPos, dir);
  this.branches.push(root);

 /* 
  // Generate Trunk
  var current = root;
  var found = false;

  while (!found) {
    for (var i = 0; i < this.leaves.length; i++) {
      var l = this.leaves[i]
      var d = dist(current.pos, l.pos)

      if (d < max_dist) {
        found = true;
      }
    }
    if (!found) {
      var branch = current.next();
      branch.d = d;
      current = branch;
      this.branches.push(current);
    }
  }*/

  this.grow = function() {
      for (var i = 0; i < this.leaves.length; i++) {
        var leaf = this.leaves[i];

        var closestBranch = null;
        var record = 1000;
        for (var j = 0; j < this.branches.length; j++) {
          var branch = this.branches[j];
          var d = dist(leaf.pos, branch.pos);

          if (d < min_dist) {
            leaf.reached = true;
            closestBranch = null;
            break;
          } else if (d > max_dist) {
            // ignore, do nothing 
          } else if (closestBranch == null || d < record) {
            closestBranch = branch;
            record = d;
          }
        } //for j loop

        if (closestBranch != null) {
          var newDir = leaf.pos.copy().sub(closestBranch.pos);
          newDir.normalize();
          closestBranch.dir.add(newDir);
          closestBranch.count++;
        }else if(closestBranch ==  null && this.leaves.length < this.numLeaves/200){growing = false}

      } // for i loop

      // delete all the reached leaves
      for (var i = this.leaves.length - 1; i >= 0; i--) {
        if (this.leaves[i].reached) {
          this.leaves.splice(i, 1)
        }
      }

      for (var i = this.branches.length - 1; i >= 0; i--) {
        var branch = this.branches[i];
        if (branch.count > 0) {
          branch.dir.div(branch.count);

          this.branches.push(branch.next());
        }
        branch.reset()
      }
    } //this.grow
}
////////////////////////////////////////

////////////////////////////////////////
function Leaf(x, y) {
  this.pos = new Vector(x, y);
  this.r = 2;
  this.reached = false;
  this.draw = function() {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.r, this.r)
  }
}
////////////////////////////////////////

////////////////////////////////////////
function Branch(parent, pos, dir) {
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.origDir = dir;
  this.count = 0;
  
  this.d  = dist(this.pos, {x:cx,y:cy});


  this.reset = function() {
    this.dir = this.origDir.copy();
    this.count = 0;

  }

  this.draw = function() {
    if (this.parent != null) {
      var light = map(this.d,0,R,20,70);
      ctx.strokeStyle = "hsl(0,100%,"+light+"%)";
      ctx.lineWidth = this.branchLength;
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(this.parent.pos.x, this.parent.pos.y);
      ctx.stroke();
     
    }
  }

  this.next = function() {
    this.branchLength = map(this.d,0,R,16,1);
    var nextDir = this.dir.copy().mult(this.branchLength)

    var parent = this;
    var nextPos = this.pos.copy().add(nextDir);
    var nextBranch = new Branch(parent, nextPos, this.dir.copy());
    return nextBranch;
  }
}
////////////////////////////////////////

tree = new Tree();
tree.show();
function Draw() {
    rid = window.requestAnimationFrame(Draw);

  ctx.clearRect(0, 0, cw, ch);
  tree.grow();
  tree.show();

  if (tree.branches.length > tree.numLeaves) {
    window.cancelAnimationFrame(rid);
  }
}
requestId = window.requestAnimationFrame(Draw);



function dist(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function map(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + n * u;
}