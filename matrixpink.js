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
// var chinese = "0123456789";

// var chinese = "ТИПАБЛИН";
let bgCNV = document.createElement('canvas');
let bgCTX = bgCNV.getContext('2d');

let fgCNV = document.createElement('canvas');
let fgCTX = fgCNV.getContext('2d');

/////////////////////////////////////////////////////////
chinese = [...chinese];
console.log(chinese);
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
	bgCNV.style.width = fgCNV.style.width = CNV.style.width = bgCNV.width = fgCNV.width = CNV.width = window.innerWidth;
	bgCNV.style.height = fgCNV.style.height = CNV.style.height = bgCNV.height = fgCNV.height = CNV.height = window.innerHeight;
	calcColumns();
	// CTX.fillStyle = "rgba(0, 0, 0, 0.07)";
	bgCTX.fillStyle = "#000";
	bgCTX.fillRect(0, 0, bgCNV.width, bgCNV.height);

}
resize();
window.addEventListener("resize", resize);

let timer = performance.now();
let timerArray = [];



let rectPosition = 0;

function fgRNDR() {
	fgCTX.clearRect(0, 0, fgCTX.canvas.width, fgCTX.canvas.height);

	rectPosition += 4;
	fgCTX.fillStyle = '#900';
	let txtLGNH = fgCTX.measureText('performance');
	fgCTX.fillRect(rectPosition, 300-txtLGNH.actualBoundingBoxAscent, txtLGNH.width, txtLGNH.actualBoundingBoxAscent)

	fgCTX.fillStyle = "#fff";
	fgCTX.font = "50px Stormfaze"
	fgCTX.fillText(`performance`, rectPosition, 300);;
	if (rectPosition > fgCTX.canvas.width) {
		console.log(txtLGNH)
		rectPosition = -txtLGNH.width;
	}
	return fgCTX.canvas;
}

//drawing the characters
function bgRNDR() {
	///ТЕРРОБОРОНОВСКИЕ КАРАМЕЛЬКИ

	bgCTX.fillStyle = "rgba(0, 0, 0, 0.2)";
	bgCTX.fillRect(0, 0, bgCNV.width, bgCNV.height);
	bgCTX.fillStyle = `hsl(${colr.h},${colr.s}%,${colr.l}%)`; //green text
	bgCTX.font = fontSize + "px Stormfaze";
	//looping over drops
	for (var i = 0; i < drops.length; i++) {
		//a random chinese character to print
		var text = chinese[Math.floor(Math.random() * chinese.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		bgCTX.fillText(text, i * fontSize, drops[i] * fontSize);

		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if (drops[i] * fontSize > bgCNV.height && Math.random() > 0.99) {
			drops[i] = 0;
		}
		//incrementing Y coordinate
		drops[i]++;
	}

	return bgCTX.canvas;
}

function RNDR() {
	// setTimeout(() => {
		requestAnimationFrame(RNDR);

	// }, drawDelay);
	CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height)
	CTX.fillStyle = "#000";
	CTX.fillRect(0, 0, CTX.canvas.width, CTX.canvas.height)
	CTX.drawImage(bgRNDR(), 0, 0, bgCTX.canvas.width, bgCTX.canvas.height)

	CTX.drawImage(fgRNDR(), 0, 0, fgCTX.canvas.width, fgCTX.canvas.height)

	if (viewDebugData) {
		let debugFontSize = 30;
		CTX.font = debugFontSize + "px Stormfaze"
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
		timerArray.push(now - timer);
		if (timerArray.length > 20) timerArray.shift();
		let sum = timerArray.reduce((a, b) => (a + b)) / timerArray.length;
		CTX.fillText(`performance- ${Math.floor(1000/(now-timer))}fps`, 10, debugFontSize * 6);
		CTX.fillText(`               - ${Math.floor(now-timer)}ms`, 10, debugFontSize * 7);
		CTX.fillText(`               - ${Math.round(sum)}`, 10, debugFontSize * 9);
		timer = now;
	}
	// CTX.translate(0,0)
	// CTX.fillRect(0, 0, 200, 10)


}

RNDR();
// CNV.addEventListener('click', fullScreen)

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
			break;

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

	fontSize < 10 ? fontSize = 10 : false;
	// resize();
}