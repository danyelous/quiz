// HotNCold Game project by Ponto.

$(document).ready(function() {

var currentQuestion = 0;
var points = 0;

var questions = new Array();

// ******************** Input functions ********************

$('.options').on('click', '.radiooption', function(){
	var val = $(this).val();
  
	$('.radiooption').each(function() {
		$(this).attr('disabled',true);
	});  
  

	evaluateEntry(val);
  
});


// to capture the reset button
$('.reset').click(function() {
	reset();
});

 
// ******************** End Input functions ********************


// ******************** Internal functions ********************

// Question objects declaration
function Question(title,options,correctAnswer) {
	this.title = title;
	this.options = options;
	this.correctAnswer = correctAnswer;
}


questions[0] = new Question("Which movie was directed by Quentin Tarantino?",["Madagascar.","Spy Game.","Gran Torino.","Django Unchained.","Alien."],4);
questions[1] = new Question("Which actor never won an Oscar award?",["Jeff Bridges.","Leonardo DiCaprio.","Jamie Foxx.","Sean Penn.","Denzel Washington."],2);
questions[2] = new Question("What year was Jurassic Park released?",["1992.","1993.","1994.","1995.","1996."],2);
questions[3] = new Question("According to Fight Club movie from 1999, which is the Fight Club first rule?",["Someone yells stop, goes limp, taps out, the fight is over.","Only two guys to a fight.","You do not talk about Fight Club.","One fight at a time, fellas.","If this is your first night at Fight Club, you have to fight."],3);
questions[4] = new Question("Which actress stared Black Swan in 2010?",["Sandra Bullock.","Jennifer Lawrence.","Rachel McAdams.","Scarlett Johansson.","Natalie Portman."],5);



function evaluateEntry(val){

	if(val == questions[currentQuestion].correctAnswer){
	
		// the answer is correct
		points = points + 1;
		
		
		insertReply('<span class="correct">Correct!</span>');
		
		insertPoints(points);
	}else{
		insertReply('<span class="incorrect">Incorrect, the correct answer is: ' + questions[currentQuestion].options[questions[currentQuestion].correctAnswer - 1] + '</span>' );
	
	}
	

	
	currentQuestion = currentQuestion + 1;

	if( currentQuestion < questions.length ){

		insertQuestion(currentQuestion,4000);
		
	}else{
	
			$('.reply').delay(4000).fadeOut('slow', function() {

			$('.reply').html('');

			$('.pointstitle').fadeOut();
			
			$('.progress').fadeOut();
			
			$('.questiontitle').fadeOut();
		
			$('.options').slideUp('slow', function(){

				$('.options').html('');

				$('.reply').html('<center>Your final score: ' + points + '</center>').hide().delay('slow').fadeIn('slow');


			});

		});

	}
	

}
	
function reset(){
	$('.reply').html('<center>Restarting...</center>').hide().fadeIn('slow');
		window.setTimeout(performReset, 2000);
	}
	
function performReset(){

		points = 0;
		
		currentQuestion = 0;
		
		$('.pointstitle').fadeIn();
		$('.progress').fadeIn();
		
		insertReply('');
		insertPoints(points);
		insertQuestion(currentQuestion,250);

	}
	
	
// ******************** End Internal functions ********************





// ******************** HTML insertions functions ********************

function insertQuestion(number, delayTime) {
	
	var options = questions[number].options;
		
	// $('.questiontitle').delay(delayTime).fadeOut('slow', function() {
	$('.reply').delay(delayTime).fadeOut('slow', function() {

	$('.reply').html('');
	
	$('.questiontitle').fadeOut('slow');
	
			$('.options').slideUp('slow', function(){

				insertCurrentQuestionNumber(number);

				$('.questiontitle').html(questions[number].title).fadeIn('slow');

				$('.options').html('');

				$.each( options, function( index, value ) {
					$('.options').append('<li> <input type="radio" name="radio" class="radiooption option'+(index + 1)+'"  value="'+(index + 1)+'" > '+ value +' </li>').hide().slideDown('slow');
				});
			
			});

	});


}


function insertCurrentQuestionNumber(number){
	$('.currentquestion').html(number + 1).hide().fadeIn();
}
function insertPoints(number){
	$('.points').html(number).hide().fadeIn();
}
function insertReply(text){
	$('.reply').html(text).hide().fadeIn();

}


insertPoints(points);
$('.total').html(questions.length).hide().fadeIn();
insertReply('');
insertQuestion(0,0);




// ******************** End HTML insertions functions ********************

});
