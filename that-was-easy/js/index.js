leftgo = true;
topgo = true;

$(document).ready(function() {
	// your code here
    $('#button').click(function(){
        alert("You deserve a prize!");
    });
    $('#button').hover(function(){
        var left = parseInt($('#button').css('left').replace("px", ""));
        if(leftgo){
            $('#button').animate({left:'-=100'},50);
            if(left <= 100){
                leftgo = !leftgo;
            }
        }
        else{
            $('#button').animate({left:'+=100'},50);
            if(left >= 400){
                leftgo = !leftgo;
            }
        }
        var top = parseInt($('#button').css('top').replace("px", ""));
        if(topgo){
            $('#button').animate({top:'-=100'},50);
            if(top <= 150){
                topgo = !topgo;
            }
        }
        else{
            $('#button').animate({top:'+=100'},50);
            if(top >= 100){
                topgo = !topgo;
            }
        }
    });


	});