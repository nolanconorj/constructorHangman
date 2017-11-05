var Word = require('./word.js');
var prompt = require('prompt');

console.log("Welcome to Sports Team Hangman!");
console.log("To start, please guess a letter of the name of an American sports team.");
console.log("Let's get it on!");
console.log("*-----------------------------*");
prompt.start();



game = {
 	teams: ['cowboys', 'patriots', 'steelers', 'broncos', 'jets', 'yankees', 'mets', 'bluejays', 'astros', 'dodgers', 'devils', 'blackhawks', 'bruins', 'stars', 'predators','bulls','nets', 'wolves','spurs','knicks'],
 	guessesRight: 0,
    guessesRemaining: 10,
    guessedLettersTotal: [],
 	currentWord: null,
 	
 	startGame: function (word) {
 		this.resetGuesses();
 		this.currentWord = new Word(this.teams[Math.floor(Math.random()* this.teams.length)]);
        this.currentWord.getLet();
 		this.promptUser();
 	},

 	resetGuesses: function(){
         this.guessesRemaining = 10;
         this.guessedLettersTotal = [];
 	},

 	promptUser: function(){
 		var user = this;
 		prompt.get(['Guess_a_Letter'], function(err, result){
             console.log("You guessed: " + result.Guess_a_Letter);
 			 var manyGuessed = user.currentWord.checkLetter(result.Guess_a_Letter);
             
            
            

 			if(manyGuessed ==0) {
 				console.log("Whoops! No, " + result.Guess_a_Letter + " in this word!");
                 user.guessesRemaining--;
                 user.guessedLettersTotal.push(result.Guess_a_Letter);
               
                 console.log("***"+" Guesses so far: [" + user.guessedLettersTotal + "] ***");
                 console.log(user.currentWord.wordRender());
 				
 			} else {
                 console.log("You are right, " + result.Guess_a_Letter + " is in this word!");
                 user.guessedLettersTotal.push(result.Guess_a_Letter);
                 console.log("***"+" Guesses so far: [" + user.guessedLettersTotal + "] ***");
                 console.log(user.currentWord.wordRender());
                 
 					if(user.currentWord.findWord()){
                         console.log("You won!");
                         console.log("Your winning word: " +user.currentWord.target);
                         console.log("*-------------------*");
                         game.startGame();
                         return;
                         
 					}
 			}

 			console.log("Guesses remaining: " + user.guessesRemaining);
 			console.log("*-------------------*");
 			if((user.guessesRemaining > 0) && (user.currentWord.found == false)){
 				user.promptUser();
 			}
 			else if(user.guessesRemaining ==0){
                 console.log("Game over. The correct word was: ", user.currentWord.target);
                 console.log("Let's play again!");
                 console.log("*-------------------*");
        
                 game.startGame();
 			}
 		});

 	}


};

game.startGame();
