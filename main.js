//`main.js` will contain the logic of your app. Running it in Terminal/Bash will start the game.
var Word = require('./word.js');
var prompt = require('prompt');

console.log("Welcome to Sports Team Hangman!");
console.log("Guess a letter of the name of an American sports team");
console.log("Goodluck!");
console.log("-----------------------------");
prompt.start();



game = {
 	teams: ['cowboys', 'patriots', 'steelers', 'broncos', 'jets', 'yankees', 'mets', 'bluejays', 'astros', 'dodgers', 'devils', 'blackhawks', 'bruins', 'stars', 'predators','bulls','nets', 'wolves','spurs','knicks'],
 	guessesRight: 0,
 	guessesRemaining: 10,
 	currentWord: null,
 	
 	startGame: function (word) {
 		this.resetGuesses();
 		this.currentWord = new Word(this.teams[Math.floor(Math.random()* this.teams.length)]);
 		this.currentWord.getLet();
 		this.promptUser();
 	},

 	resetGuesses: function(){
 		this.guessesRemaining = 10;
 	},

 	promptUser: function(){
 		var self = this;
 		prompt.get(['Guess_a_Letter'], function(err, result){
 			console.log("You guessed: " + result.Guess_a_Letter);
 			var manyGuessed = self.currentWord.checkLetter(result.Guess_a_Letter);

 			if(manyGuessed ==0) {
 				console.log("Whoops! No " + result.Guess_a_Letter + " in this word!");
 				self.guessesRemaining--;
 				
 			} else {
                 console.log("You are right, " + result.Guess_a_Letter + " is in this word!");
                 
 					if(self.currentWord.findWord()){
                         console.log("You won!");
                         console.log("Your word: " +self.currentWord.target);
 						console.log("-------------------");
 						return;
 					}
 			}

 			console.log("Guesses remaining: " + self.guessesRemaining);
 			console.log("-------------------");
 			if((self.guessesRemaining > 0) && (self.currentWord.found == false)){
 				self.promptUser();
 			}
 			else if(self.guessesRemaining ==0){
                 console.log("Game over. The correct word was: ", self.currentWord.target);
                 console.log("Let's play again!");
                 console.log("-------------------");
        
                 game.startGame();
 			} else {
 				console.log(self.currentWord.wordRender());
 			}
 		});

 	}


};

game.startGame();
