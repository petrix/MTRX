var CNV = document.getElementById("c");
var CTX = CNV.getContext("2d");
var columns;
var fontSize = 24;
var drops = [];
const colr = {};
colr.h = 290;
colr.s = 100;
colr.l = 50;
let drawDelay = 50;
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
/////////////////////////////////////////////////////////
chinese = [...chinese];
console.log(chinese);
// javascript: (function () {
// 	var script = document.createElement('script');
// 	script.onload = function () {
// 		var stats = new Stats();
// 		document.body.appendChild(stats.dom);
// 		requestAnimationFrame(function loop() {
// 			stats.update();
// 			requestAnimationFrame(loop)
// 		});
// 	};
// 	script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
// 	document.head.appendChild(script);
// })()
let viewDebugData = false;

if (localStorage.getItem('colr') != null) {
	let cc = JSON.parse(localStorage.getItem('colr'));
	console.log(cc);
	colr.h = cc.h;
	colr.s = cc.s;
	colr.l = cc.l;
} else {
	localStorage.setItem('colr', JSON.stringify(colr));
}
if (localStorage.getItem('drawDelay') != null) {
	drawDelay = JSON.parse(localStorage.getItem('drawDelay'));
} else {
	localStorage.setItem('drawDelay', drawDelay);
}
if (localStorage.getItem('fontSize') != null) {
	fontSize = JSON.parse(localStorage.getItem('fontSize'));
} else {
	localStorage.setItem('fontSize', fontSize);
}

function calcColumns() {
	columns = Math.round(CNV.width / fontSize); //number of columns for the rain
	console.log(columns);
	for (var x = 0; x < columns; x++) {
		drops[x] = 1;
	}
}

function resize() {
	CNV.style.width = CNV.width = window.innerWidth;
	CNV.style.height = CNV.height = window.innerHeight;
	calcColumns();
	// CTX.fillStyle = "rgba(0, 0, 0, 0.07)";
	CTX.fillStyle = "#000";

	CTX.fillRect(0, 0, CNV.width, CNV.height);

}
resize();
window.addEventListener("resize", resize);

let timer = performance.now();
let timerArray = [];
//drawing the characters
requestAnimationFrame(function draw() {
	// setTimeout(() => {
		requestAnimationFrame(draw);
	// }, drawDelay);
	
	CTX.fillStyle = "rgba(0, 0, 0, 0.1)";
	CTX.fillRect(0, 0, CNV.width, CNV.height);
	CTX.fillStyle = `hsl(${colr.h},${colr.s}%,${colr.l}%)`; //green text
	CTX.font = fontSize + "px arial";
	//looping over drops
	for (var i = 0; i < drops.length; i++) {
		//a random chinese character to print
		var text = chinese[Math.floor(Math.random() * chinese.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		CTX.fillText(text, i * fontSize, drops[i] * fontSize);

		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if (drops[i] * fontSize > CNV.height && Math.random() > 0.99) {
			drops[i] = 0;
		}
		//incrementing Y coordinate
		drops[i]++;
	}
	if (viewDebugData) {
		let debugFontSize = 30;
		CTX.font = debugFontSize + "px arial"
		CTX.fillStyle = "#000";
		CTX.strokeStyle = "#fff";
		CTX.lineWidth = 2;
		CTX.fillRect(0, 0, 300, 300);
		CTX.strokeRect(0, 0, 300, 300);

		CTX.fillStyle = "#fff";
		CTX.fillText(`drawDelay  - ${drawDelay}`, 10, debugFontSize);
		CTX.fillText(`Hue	     - ${colr.h}`, 10, debugFontSize * 2);
		CTX.fillText(`Saturation - ${colr.s}`, 10, debugFontSize * 3);
		CTX.fillText(`Luminance  - ${colr.l}`, 10, debugFontSize * 4);
		CTX.fillText(`fontSize   - ${fontSize}`, 10, debugFontSize * 5);
		// CTX.fillStyle = "#fff";
		let now = performance.now();
		timerArray.push(now-timer);
		if (timerArray.length > 20) timerArray.shift();
		let sum = timerArray.reduce((a, b) => (a + b)) / timerArray.length;
		CTX.fillText(`performance- ${Math.floor(1000/(now-timer))}fps`, 10, debugFontSize * 6);
		CTX.fillText(`               - ${Math.floor(now-timer)}ms`, 10, debugFontSize * 7);
CTX.fillText(`               - ${Math.round(sum)}`, 10, debugFontSize * 9);

		timer = now;
	}
})

// function draw() {
// 	setTimeout(function () {
// 		requestAnimationFrame(draw);
// 	}, drawDelay)
// 	// requestAnimationFrame(draw);
// 	//Black BG for the canvas
// 	//translucent BG to show trail
// 	CTX.fillStyle = "rgba(0, 0, 0, 0.1)";
// 	CTX.fillRect(0, 0, CNV.width, CNV.height);
// 	CTX.fillStyle = `hsl(${colr.h},${colr.s}%,${colr.l}%)`; //green text
// 	CTX.font = fontSize + "px arial";
// 	//looping over drops
// 	for (var i = 0; i < drops.length; i++) {
// 		//a random chinese character to print
// 		var text = chinese[Math.floor(Math.random() * chinese.length)];
// 		//x = i*font_size, y = value of drops[i]*font_size
// 		CTX.fillText(text, i * fontSize, drops[i] * fontSize);

// 		//sending the drop back to the top randomly after it has crossed the screen
// 		//adding a randomness to the reset to make the drops scattered on the Y axis
// 		if (drops[i] * fontSize > CNV.height && Math.random() > 0.99) {
// 			drops[i] = 0;
// 		}
// 		//incrementing Y coordinate
// 		drops[i]++;
// 	}
// 	if (viewDebugData) {
// 		let debugFontSize = 30;
// 		CTX.font = debugFontSize + "px arial"
// 		CTX.fillStyle = "#000";
// 		CTX.strokeStyle = "#fff";
// 		CTX.lineWidth = 2;
// 		CTX.fillRect(0, 0, 300, 300);
// 		CTX.strokeRect(0, 0, 300, 300);

// 		CTX.fillStyle = "#fff";
// 		CTX.fillText(`drawDelay  - ${drawDelay}`, 10, debugFontSize);
// 		CTX.fillText(`Hue	     - ${colr.h}`, 10, debugFontSize * 2);
// 		CTX.fillText(`Saturation - ${colr.s}`, 10, debugFontSize * 3);
// 		CTX.fillText(`Luminance  - ${colr.l}`, 10, debugFontSize * 4);
// 		CTX.fillText(`fontSize   - ${fontSize}`, 10, debugFontSize * 5);
// 		// CTX.fillStyle = "#fff";
// 		let now = performance.now();
// 		CTX.fillText(`performance- ${Math.floor(1000/(now-timer))}fps`, 10, debugFontSize * 6);
// 		CTX.fillText(`               - ${Math.floor(now-timer)}ms`, 10, debugFontSize * 7);


// 		timer = now;
// 	}
// }
// draw();


CNV.addEventListener('click', fullScreen)

function fullScreen() {

	if (!document.fullscreen) {
		document.documentElement.requestFullscreen();
		document.documentElement.style.cursor = 'none';
	} else {
		document.exitFullscreen();
		document.documentElement.style.cursor = 'auto';
	}
}

document.addEventListener("keyup", keybHandler, false);

function keybHandler(event) {
	let keyPush = event.code.toUpperCase();
	console.log(keyPush);
	switch (keyPush) {
		// case "SPACE":
		case "MINUS":
		case "NUMPADSUBTRACT":
			fontSize--;
			calcColumns();
			break;
		case "EQUAL":
		case "NUMPADADD":
			fontSize++;
			calcColumns();
			break;
		case "KEYF":
			fullScreen();
		case "NUMPAD7":
			colr.h += 10;
			break;
		case "NUMPAD4":
			colr.h -= 10;
			break;
		case "NUMPAD8":
			colr.s += 10;
			break;
		case "NUMPAD5":
			colr.s -= 10;
			break;
		case "NUMPAD9":
			colr.l += 10;
			break;
		case "NUMPAD6":
			colr.l -= 10;
			break;
		case "ARROWUP":
			drawDelay -= 1;
			break;
		case "ARROWDOWN":
			drawDelay += 1;
			break;
		case "BACKQUOTE":
			viewDebugData == false ? viewDebugData = true : viewDebugData = false;
			break;
		case "DIGIT2":
		case "NUMPAD2":
			// showModule("showHistory");
			break;
		case "DIGIT3":
		case "NUMPAD3":
			// showModule("showUploadStuff");
			break;
		case "ESCAPE":
			// showModule("spinCanvas");
			break;
		default:
			break;
	}
	colr.h %= 360;
	colr.h < 0 ? colr.h = 350 : false;
	colr.s > 100 ? colr.s = 100 : false;
	colr.s < 0 ? colr.s = 0 : false;
	colr.l > 100 ? colr.l = 100 : false;
	colr.l < 0 ? colr.l = 0 : false;
	drawDelay > 100 ? drawDelay = 100 : false;
	drawDelay < 17 ? drawDelay = 17 : false;
	localStorage.setItem('drawDelay', drawDelay);
	localStorage.setItem('colr', JSON.stringify(colr));
	localStorage.setItem('fontSize', fontSize);
	console.log(colr)

	fontSize < 5 ? fontSize = 5 : false;
	// resize();
}