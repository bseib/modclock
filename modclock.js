let SZ = 400;
let draw = SVG('drawing').size(SZ, SZ);
let R = 200;
let OFFSET = (SZ - R)/2;
let Cx = R / 2 + OFFSET;
let Cy = R / 2 + OFFSET;
let VISITED = {};

let renderClockFace = function(N) {
  let circle = draw.circle(R).attr({ fill: '#ccf' }).move(OFFSET,OFFSET);

  let ANGLE = 360 / N;
  for ( var i=0;i<N;i++) {
    let line = draw.line(0, 0, 0, 10).move(Cx, OFFSET);
    line.stroke({ color: '#666', width: 5, linecap: 'round' });
    line.rotate(ANGLE*i, Cx, Cy);
  }
}

let renderPositionWithMessage = function(position, msg) {
  let ANGLE = (360 / getInputModulo()) * position;
  let outset = 14;
  let visited = VISITED[""+position];
  if ( ! visited ) {
    visited = 0;
  }
  visited++;
  VISITED[""+position] = visited;
  outset = outset * visited;
  let text = draw.text("" + msg);
  text = text.font({ fill: '#66f', family: 'monospace' });
//  text.move(0,0).rotate(-ANGLE, OFFSET, OFFSET).move(Cx, OFFSET).rotate(ANGLE, Cx, Cy).font({ fill: '#66f', family: 'Inconsolata' });
  text.move(Cx, OFFSET-outset).rotate(ANGLE, Cx, Cy);

}

let onRender = function() {
//  let circle2 = draw.circle(R/2).attr({ fill: '#cfc' }).move(OFFSET +R/2-R/4,OFFSET+R/2-R/4);
  draw.clear();
  renderClockFace(getInputModulo());
  clearLog();
}

let onMark = function() {
  var base = getInputBase();
  var exponent = getInputExponent();
  var modulo = getInputModulo();
  doModuloMath(base, exponent, modulo)
}

let onWalk = function() {
  onRender();
  var base = getInputBase();
  var exponent = getInputExponent();
  var modulo = getInputModulo();
  for ( var i = 1; i < modulo ; i++ ) {
    doModuloMath(base, i, modulo)
  }
}

let doModuloMath = function(base, exponent, modulo) {
  var answer = bigInt(base).modPow(exponent, modulo);
  appendLogWithMathyStuff(base, exponent, modulo, answer);
  renderPositionWithMessage(answer.value, exponent);
}

let appendLogWithMathyStuff = function(base, exponent, modulo, answer) {
  var div = document.createElement("div");
  var span = document.createElement("span");
  span.appendChild(document.createTextNode(base));
  var sup = document.createElement("sup");
  sup.appendChild(document.createTextNode(exponent));
  span.appendChild(sup);
  span.appendChild(document.createTextNode(" mod " + modulo + " = " +answer));
  div.appendChild(span);
  document.getElementById("logs").appendChild(div);
}

let appendLog = function(msg) {
  var div = document.createElement("div");
  var text = document.createTextNode(msg);
  div.appendChild(text);
  document.getElementById("logs").appendChild(div);
}

let clearLog = function() {
  var node = document.getElementById("logs");
  while (node.firstChild) {
      node.removeChild(node.firstChild);
  }
  VISITED = {};
}

let getInputModulo = function() {
  return document.getElementById("modulo").value;
}
let getInputBase = function() {
  return document.getElementById("base").value;
}
let getInputExponent = function() {
  return document.getElementById("exponent").value;
}

renderClockFace(getInputModulo());

//document.write(bigInt(2).modPow(3, 7)); // ( 2 ^ 3 ) % 7 => 1
