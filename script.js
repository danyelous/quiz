// Quiz Game project by Ponto.

$(document).ready(function() {

var currentQuestion = 0;
var points = 0;

var questions = new Array();

var timeout;



// ******************** Input functions ********************

$('.options').on('click', '.radiooption', function(){ //to capture the click on radio buttons
	var val = $(this).val();
  
	$('.radiooption').each(function() {
		$(this).attr('disabled',true); //I disable the buttons to avoid other clicks
	});  

	evaluateEntry(val); //function to evaluate the selection clicked
	
	$('.next').fadeIn('fast'); //to show next button
	
	
  
});

// to capture the next button
$('.next').click(function() {

	clearTimeout(timeout); //Clear the timer
	goToNextStep(); //Go to next step inmediatelly
	
});


// to capture the reset button
$('.reset').click(function() {

	clearTimeout(timeout); //Clear the timer
	reset(); //function that perform the reset
});

 
// ******************** End Input functions ********************


// ******************** Internal functions ********************

// Question objects declaration
function Question(title,options,correctAnswer) {
	this.title = title;
	this.options = options;
	this.correctAnswer = correctAnswer;
}

// array of questions objects
questions[0] = new Question("Which movie was directed by Quentin Tarantino?",["Madagascar.","Spy Game.","Gran Torino.","Django Unchained.","Alien."],4);
questions[1] = new Question("Which actor never won an Oscar award?",["Jeff Bridges.","Leonardo DiCaprio.","Jamie Foxx.","Sean Penn.","Denzel Washington."],2);
questions[2] = new Question("What year was Jurassic Park released?",["1992.","1993.","1994.","1995.","1996."],2);
questions[3] = new Question("According to Fight Club movie from 1999, which is the Fight Club first rule?",["Someone yells stop, goes limp, taps out, the fight is over.","Only two guys to a fight.","You do not talk about Fight Club.","One fight at a time, fellas.","If this is your first night at Fight Club, you have to fight."],3);
questions[4] = new Question("Which actress stared Black Swan in 2010?",["Sandra Bullock.","Jennifer Lawrence.","Rachel McAdams.","Scarlett Johansson.","Natalie Portman."],5);



function evaluateEntry(val){  //function to evaluate the selection clicked

	if(val == questions[currentQuestion].correctAnswer){ //compare if the selection is the correct one
	
		// the answer is correct
		points = points + 1;

		insertReply('<span class="correct">Correct!</span>');
		
		insertPoints(points);
		
	}else{
	
		//  the answer is incorrect
		
		insertReply('<span class="incorrect">Incorrect, the correct answer is: ' + questions[currentQuestion].options[questions[currentQuestion].correctAnswer - 1] + '</span>' );
	
	}
		timeout = setTimeout(function() {
				goToNextStep(); //  load next question or go to final score display
				
		}, 4000);	

}


function goToNextStep(){

$('.next').fadeOut('fast'); //to hide next button


currentQuestion = currentQuestion + 1;

	if( currentQuestion < questions.length ){   // as long there are question objects on the array, continnue to add them

				  insertQuestion(currentQuestion); // insert next question
		
	}else{ //the quiz is over, no more questions

				  showFinalReply(); // show final score

	}

}

function showFinalReply(){

			$('.reply').fadeOut('slow');

			$('.reply').html('');

			$('.pointstitle').fadeOut();
			
			$('.progress').fadeOut();
			
			$('.questiontitle').fadeOut();
		
			$('.options').slideUp('slow', function(){

				$('.options').html('');
				
				$('.currentquestion').html('&nbsp;&nbsp;');
				
				$('#reply H3').css("text-align", "center"); // to center the fianl answer

				$('.reply').html('Your final score: ' + points).hide().delay('slow').fadeIn('slow'); // show the final score


			});

}

	
function reset(){ //function that perform the reset when clicked

	$('.reply').fadeOut('fast', function(){ //hide current reply
	
		$('#reply H3').css("text-align", "center"); // to center the reply
		
		$('.reply').html('Restarting...').hide().fadeIn('slow');
				
		setTimeout(performReset, 2000); //delay to show Restarting... message for a while and then perform the reset itself
	
	});
		
		
	}
	
function performReset(){ //after reset message, restore the quiz to the beginning

		$('.reply').fadeOut('slow', function(){
			insertReply('');
			$('#reply H3').css("text-align", "left"); // restore left alignment on replies
		});

		points = 0;
		
		currentQuestion = 0;
		
		$('.pointstitle').fadeIn();
		$('.progress').fadeIn();

		insertPoints(points);
		insertQuestion(currentQuestion);

	}
	
	
// ******************** End Internal functions ********************





// ******************** HTML insertions functions ********************

function insertQuestion(number) { //funtion that append question according to its number
	
	var options = questions[number].options; // obtain questions options

	// $('.reply').delay(delayTime).fadeOut('slow', function() {
	$('.reply').fadeOut('slow');

	$('.reply').html('');
	
	$('.questiontitle').fadeOut('slow');
	
			$('.options').slideUp('slow', function(){

				insertCurrentQuestionNumber(number); // funtion to display the current question number

				$('.questiontitle').html(questions[number].title).fadeIn('slow');  // display question title

				$('.options').html('');

				$.each( options, function( index, value ) { // append question options
					$('.options').append('<li> <input type="radio" name="radio" class="radiooption option'+(index + 1)+'"  value="'+(index + 1)+'" > '+ value +' </li>').hide().slideDown('slow');
				});
			
			});

//	});


}


function insertCurrentQuestionNumber(number){  // funtion to display the current question number
	$('.currentquestion').html(number + 1).hide().fadeIn();
}
function insertPoints(number){
	$('.points').html(number).hide().fadeIn();
}
function insertReply(text){
	$('.reply').html(text).hide().fadeIn();

}


// to load the first question at the beginning

$('#reply H3').css("text-align", "left");
insertPoints(points);
$('.total').html(questions.length).hide().fadeIn();
insertReply('');
insertQuestion(0);




// ******************** End HTML insertions functions ********************

});
