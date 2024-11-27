let yCoord = null;
let rValue = null;
let xCoord = null;
let prevElem = null;
let prevEq = false;
let loaded = false;
let toggleLoaded = false;


window.addEventListener('load', function () {
    const applicantForm = document.getElementById('pform');
    applicantForm.addEventListener('submit', handleFormSubmit);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", function (e) {
        getMousePosition(canvas, e);
    });
    drawGraph(ctx, 2);
    var span = document.getElementById('span');

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  span.textContent = 
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}

setInterval(time, 7000);
})


async function handleFormSubmit(event) {
    event.preventDefault();
    let checkCounterX = 0;
    let checkCounterR = 0;
    var cont = document.getElementById("loader");
    var radios = document.getElementsByName('r');
    var xs = document.getElementsByName('x');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            rValue = radios[i].value;
            checkCounterR += 1;
        }
    }
    if (checkCounterR != 1) {
        cont.innerText = "Choose one option for R";
        if (!toggleLoaded) {
            toggleLoader();
            toggleLoaded = true;
        }

        loaded = true;
    } else {


        for (var i = 0, length = xs.length; i < length; i++) {
            if (xs[i].checked) {
                xCoord = xs[i].value;
                checkCounterX += 1;
            }
        }
        if (checkCounterX != 1) {
            cont.innerText = "Choose one option for X";
            if (!toggleLoaded) {
                toggleLoader();
                toggleLoaded = true;
            }

            loaded = true;
        } else {
            yCoord = document.getElementById('y').value;
            console.log(Number(yCoord))
            if (isNaN(yCoord) || !(-3 <= yCoord && yCoord <= 3)) {
                cont.innerText = "Y should be in -3...3 range";
                if (!toggleLoaded) {
                    toggleLoader();
                    toggleLoaded = true;
                }
                loaded = true;
            } else {

                let coords = {
                    x: xCoord,
                    y: yCoord,
                    r: rValue
                }
                const resp = await fetch(window.root + `/controller-servlet?x=${xCoord}&y=${yCoord}&r=${rValue}&click=${false}`, {
                    method: 'GET'
                });

                if (!resp.ok) throw new Error(errMessage.SERVER_ERROR);
                if (resp.redirected) {
                    window.location.href = resp.url;
                    return
                }


            }
            ;


        }

    }
    for (var i = 0, length = radios.length; i < length; i++) {
        radios[i].checked = false;
    }
    for (var i = 0, length = xs.length; i < length; i++) {
        xs[i].checked = false;
    }
    yCoord = null;
    xCoord = null;
    rValue = null;
    document.getElementById('y').value = "";
    // if (prevElem != null){
    //   prevElem.classList.toggle('change_color');
    // }
    // prevElem = null;
    // prevEq = false;
}


function toggleLoader() {
    const loader = document.getElementById('loader');
    loader.classList.toggle('hidden');
}


// function resetColor(){
//   var yS = document.getElementsByName('y');
//   for (var j = 0, len = yS.length; j < len; j++) {
//     yS[j].style.backgroundColor = 'yellow';
//   }
// }


// function yClick(clickedElement) {
//   if (prevElem == clickedElement){
//     if (yCoord == null){
//       yCoord = clickedElement.value;
//     }
//     else {
//       yCoord = null;
//     }

//     prevElem.classList.toggle('change_color');
//     prevEq = true;
//     return;
//   }
//   if (prevElem != null && prevEq != true){
//     prevElem.classList.toggle('change_color');
//   }
//   clickedElement.classList.toggle('change_color');
//   yCoord = clickedElement.value;
//   prevElem = clickedElement;
//   prevEq = false;
//   wait(10);
// }

function yClick(clickedElement) {
    yCoord = clickedElement.value;
}

async function getMousePosition(canvas, event) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let checkCounterR = 0;
    var cont = document.getElementById("loader");
    var radios = document.getElementsByName('r');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            rValue = radios[i].value;
            checkCounterR += 1;
        }
    }
    if (checkCounterR != 1) {
        cont.innerText = "Choose one option for R";
        if (!toggleLoaded) {
            toggleLoader();
            toggleLoaded = true;
        }

        loaded = true;
    } else {
        let yey = 88 / rValue;
        let yex = 84 / rValue;


        console.log("Coordinate x: " + x,
            "Coordinate y: " + y);
        let xx1 = (x - 150) / yex;
        let yy1 = -1 * (y - 150) / yey;
        let xx = Number((xx1).toFixed(1));
        let yy = Number((yy1).toFixed(1));
        // точка при удачном попаданNumber(-1 * (y - 150) / yey).toFixed(1)ии
        const resp = await fetch(window.root + `/controller-servlet?x=${xx}&y=${yy}&r=${rValue}&click=${true}`, {
            method: 'GET'
        });

        if (!resp.ok) throw new Error(`${resp.status}`);


        const data = await resp.json();
        console.log(data);
        var res = data;

        var table = document.getElementById("tres");
        var tbody = table.getElementsByTagName("tbody")[0];
        var row = document.createElement("tr");
        var isHit = document.createElement("td");
        var x1 = document.createElement("td");
        var y1 = document.createElement("td");
        var r1 = document.createElement("td");
        console.log(table);
        console.log(table.getElementsByTagName("tbody")[0]);
        console.log(table.getElementsByTagName("tbody"));
        if (res.isHit == true) {
            isHit.innerText = "OK";
        } else {
            isHit.innerText = "MISS";
        }
        x1.innerText = Math.trunc(res.x);
        y1.innerText = Math.trunc(res.y);
        r1.innerText = Math.trunc(res.r);

        row.appendChild(x1);
        row.appendChild(y1);
        row.appendChild(r1);
        row.appendChild(isHit);
        tbody.appendChild(row);
        if (toggleLoaded == true) {
            cont.innerText = "";
            toggleLoader();
            toggleLoaded = false;

        }


        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.ellipse(x, y / 2, 2, 1, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}


function prepareCoordinates() {
    // привести R к обычным координатам ()
}


function drawGraph(ctx, r) {
    


    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);

    //ctx.clearRect(0, 10, 40, 40);
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "blue";
    //ctx.fillRect(0, 10, 40, 40);
    ctx.beginPath();
    ctx.moveTo(128 - (20 * (r - 1)), 74); // (108 + 20) (30 + 10); 108 74;  (108 - 20) (30 - 10) 
    ctx.lineTo(149, 40 - (10 * (r - 1))); // 149 30
    ctx.lineTo(149, 74); // 149 74
    ctx.fill();
    ctx.fillRect(151, 40 - ((r - 1) * 10), 64 + (20 * (r - 1)), 54); // (64 34); (84 44); (104 54)
    //ctx.clearRect(151, 40 - ((r - 1) * 10), 64 + (20 * (r - 1)), 54);
    //ctx.fillRect(151, 30, 84, 44);
    ctx.beginPath();
    ctx.ellipse(150, 75, 22 + (20 * (r - 1)), 13 + (10 * (r - 1)), 0, 0, Math.PI);
    ctx.fill();
    ctx.stroke();


    ctx.fillStyle = "white";
    ctx.fillRect(150, 76, 120, 120);


    ctx.beginPath(); // Start a new path
    ctx.lineWidth = 2;
    ctx.moveTo(10, 75); // Move the pen to (30, 50)
    ctx.lineTo(290, 75); // Draw a line to (150, 100)
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath(); // Start a new path
    ctx.lineWidth = 4;
    ctx.moveTo(150, 5); // Move the pen to (30, 50)
    ctx.lineTo(150, 145); // Draw a line to (150, 100)
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.stroke();
}

