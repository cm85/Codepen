var canvas = document.getElementById('canvas');
//declare the type of canvas, the context can be 2D or 3D
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;


function expandCollapse(){
var footer = document.getElementById("footer");
	if (footer.clientHeight == 20){
		footer.style.height = 'auto';
	}
	else{
	footer.style.height = '20px';
	}
}

window.onload=function(){  
drawPan();
};

function loadPizzaImg(pizzaSize){
var retunedSize;
var imgPizza=document.getElementById("pizza");

if (isNaN(pizzaSize)){
retunedSize = pizzaSize.value;
}
else{
retunedSize = pizzaSize;
}

switch(retunedSize){
	case "s":
	case 12:
		clearCanvas();
		drawPan();
		context.drawImage(imgPizza,80, 80,240,240);	
		focusOnInput();
		break;
	case "m":
	case 14:
		clearCanvas();
		drawPan();
		context.drawImage(imgPizza, 60, 60,280,280);
		focusOnInput();
		break;
	case "l":
	case 16:
		clearCanvas();
		drawPan();
		context.drawImage(imgPizza, 40, 40,320,320);
		focusOnInput();
		break;
	case "xl":
	case 18:
		clearCanvas();
		drawPan();
		context.drawImage(imgPizza, 20, 20,360,360);
		focusOnInput();
		break;
	default:
		break;			
}
}

function clearCanvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPan()
{
	var imgPizzaPan=document.getElementById("pizzaPan");
    context.drawImage(imgPizzaPan, 0, 0,400,400);
}

function focusOnInput()
{
    document.getElementById("slices").focus();	
}
	
function reset(){
var radios = document.getElementsByTagName('input');
var value;

for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === 'radio') {
		radios[i].checked = false;
	}
}
	
	 document.getElementById("slices").value = "";	
 
}
	
function drawPizzaSlices(){
//Initialize Variables
var selectedSize = getPizzaSize();
var slices = document.getElementById("slices");
var radius = selectedSize * 10;
// we use theta(i.e. theta = angle * Math.PI) in the code, what it does convert angles to radian units //See http://www.mathsisfun.com/geometry/radians.html
var numberOfSlices = slices.value.trim();
//There are 360 degrees in a circle(i.e. a pizza). 
//For example a circle with 4 slices we calculate the number of degrees per slice as follows 360degrees/4slices = 90 degrees/per slice.
var degreePerSlice = (360/numberOfSlices);

validateSliceValue(numberOfSlices);
loadPizzaImg(selectedSize);
drawCircumference(centerX,centerY,radius);
drawSlices(radius,degreePerSlice);

function validateSliceValue(numSlice){
var isNotNum = isNaN(numSlice)
	if (isNotNum){
		alert("Slices are numbers only");
	}
}

function getPizzaSize(){
var radios = document.getElementsByTagName('input');
var value;
for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === 'radio' && radios[i].checked) {
		switch(radios[i].value){
			case "s":
				return 12;
				break;
			case "m":
				return 14;
				break;
			case "l":
				return 16;
				break;
			case "xl":
				return 18;
				break;
			default:
				break;
		}	
    }
}
}

function drawCircumference(x,y,r){	
	context.save();
	context.beginPath();
	//.arc(x, y, radius, startAngle, endAngle)
	context.arc(x,y,radius,0,2 * Math.PI);
	context.stroke();

	//if the pizza will be split into 2 slices or more add the starting cut
	if (numberOfSlices >= 2 ){
		context.save();//Saves the state of the current context
		context.beginPath();
		context.translate(centerX, centerY); //Remaps the (0,0) position on the canvas
		context.rotate(-90 * Math.PI/180);// 1st cut position
		context.moveTo(0, 0);
		context.lineTo(0, radius);
		context.strokeStyle="#FFFFFF";
		context.stroke();
		context.restore();
	}
}

function drawSlices(radius, angle){
	if (numberOfSlices >= 2 ){
		context.save();//Saves the state of the current context
		context.beginPath();
		//display angle per slice on top left of canvas
		context.font="12px Arial";
		context.fillText(angle.toFixed(2)+ "°/pizza slice",5,15);
		//draw the slices
		context.translate(centerX, centerY); //Remaps the (0,0) position on the canvas
		context.rotate(-90 * Math.PI/180);// 1st cut position
		do{//loops to add the remaining cuts to create the slices
			context.rotate(-angle * Math.PI/180); //Rotates the current drawing
			context.moveTo(0, 0);
			context.lineTo(0, radius);
			numberOfSlices --;
		}while (numberOfSlices >= 2) ; 
		context.strokeStyle="#FFFFFF";
		context.stroke();

	context.restore();
	}
}
}
//Copyright © 2013 Dimitrios Kanavaros