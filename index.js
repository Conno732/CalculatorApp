//Calulator functions a -first num, b- second num, c -operator

let calcMem = {
  a: "0",
  b: "0",
  c: null,
  d: false,
  dot: false,
};

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b ? a / b : "Err";
}

function operator(a, b, c) {
  switch (c) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
  }
}

const doc = document.getElementById("buttonPad");
const scrn = document.getElementById("screen");

doc.addEventListener("click", (e) => inputHandler(e.target));

function inputHandler(e) {
  if (e.id === "buttonPad" || e.id === "clrDel" || e.class === "row") return;

  switch (e.id) {
    case "equals":
      scrn.innerText = compute();
      break;
    case "del":
      del();
      break;
    case "clear":
      clear();
      break;
    default:
      logNum(e.id);
      break;
  }

  console.log(e);
  console.log(calcMem);
}

function logNum(e) {
  if (e === "dot") {
    if (calcMem.dot) return;
    calcMem.dot = true;
    e = ".";
  }
  if (isNaN(e) && e !== ".") {
    calcMem.c = e;
    calcMem.dot = false;
  } else if (calcMem.c !== null) {
    calcMem.b === "0" && e !== "." ? (calcMem.b = e) : (calcMem.b += e);
    scrn.innerText = calcMem.b;
  } else {
    if (calcMem.d || calcMem.a === "Err") calcMem.a = "0";
    calcMem.a === "0" && e !== "." ? (calcMem.a = e) : (calcMem.a += e);
    calcMem.d = false;
    scrn.innerText = calcMem.a;
  }
}

function compute() {
  if (calcMem.a === "Err") {
    calcMem.a = "0";
    calcMem.b = "0";
    calcMem.c = null;
    calcMem.d = true;
    return "Err";
  }
  let tmp = operator(
    Number(calcMem.a),
    Number(calcMem.b),
    calcMem.c === null ? "add" : calcMem.c
  );
  calcMem.a = tmp;
  calcMem.b = "0";
  calcMem.c = null;
  calcMem.d = true;
  return tmp % 1 === 0 || tmp === "Err" ? tmp : tmp.toFixed(1);
}

function clear() {
  calcMem.a = "0";
  calcMem.b = "0";
  calcMem.c = null;
  calcMem.d = false;
  calcMem.dot = false;
  scrn.innerText = calcMem.a;
}

function del() {
  if (calcMem.d) {
    clear();
    calcMem.d = false;
    return;
  }
  if (calcMem.c !== null) {
    calcMem.dot = !(calcMem.b.slice(-1) === ".");
    calcMem.b =
      calcMem.b.length === 1
        ? "0"
        : calcMem.b.substring(0, calcMem.b.length - 1);
    scrn.innerText = calcMem.b;
  } else {
    calcMem.dot = !(calcMem.a.slice(-1) === ".");
    calcMem.a =
      calcMem.a.length === 1
        ? "0"
        : calcMem.a.substring(0, calcMem.a.length - 1);
    scrn.innerText = calcMem.a;
  }
}
