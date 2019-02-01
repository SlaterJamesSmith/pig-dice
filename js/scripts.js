function Player(dice) {
  this.roundScore = 0;
  this.totalScore = 0;
  this.dice = dice;
}

Player.prototype.calcRoundScore = function() {
  if(this.dice !== 1){
    this.roundScore += this.dice;
  } else {
    this.roundScore = 0;
  }
}

Player.prototype.calcTotalScore = function () {
  this.totalScore += this.roundScore;
  this.roundScore = 0;
}

Player.prototype.scoring = function (){
  this.roundScore = this.calcRoundScore(this.dice);
  this.totalScore = this.calcTotalScore(this.roundScore);
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var playerOne = new Player(0);
var playerTwo = new Player(0);

$(document).ready(function () {
  //landing
  $('.two-player').click(function () {
    $('.landing-page').hide();
    $('#human').show();
  });
  $('.vs-pig').click(function () {
    $('.landing-page').hide();
    $('#robo-pig').show();
  });

  // two player game
  $('#roll-player-one').click(function () {
    playerOne.dice = getRandomInt(1, 6);
    if (playerOne.dice === 1) {
      playerOne.calcRoundScore()
      $('.pig-right').toggle();
      $('.pig-left').toggle();
      $('#roll-player-one').toggle();
      $('#roll-player-two').toggle();
      $('.result').text("You rolled a 1");
    } else {
      playerOne.calcRoundScore()
      $('.result').text(playerOne.roundScore);
      $('.total-result').text(playerOne.totalScore);
    }
  });
  $('#roll-player-two').click(function () {
    playerTwo.dice = getRandomInt(1, 6);
    if (playerTwo.dice === 1) {
      playerTwo.calcRoundScore()
      $('.pig-right').toggle();
      $('.pig-left').toggle();
      $('#roll-player-one').toggle();
      $('#roll-player-two').toggle();
      $('.result-two').text("You rolled a 1");
    } else {
      playerTwo.calcRoundScore()
      $('.result-two').text(playerTwo.roundScore);
      $('.total-two-result').text(playerTwo.totalScore);
    }
  });
  $('#pass-player-one').click(function () {
    playerOne.calcTotalScore()
    playerTwo.calcTotalScore()
    if (playerOne.totalScore < 100 && playerTwo.totalScore < 100) {
      $('.result').text(playerOne.roundScore);
      $('.total-result').text(playerOne.totalScore);
      $('.result-two').text(playerTwo.roundScore);
      $('.total-two-result').text(playerTwo.totalScore);
      $('#roll-player-one').toggle();
      $('#roll-player-two').toggle();
      $('.pig-right').toggle();
      $('.pig-left').toggle();
    }
    else if (playerOne.totalScore >= 100) {
      $(".winner").text("PLAYER ONE WINS")
    } else if (playerTwo.totalScore >= 100) {
      $(".winner").text("PLAYER TWO WINS")
    }
  });


// vs Robo Pig
  $('#roll-human').click(function () {
    playerOne.dice = getRandomInt(1, 6);
    if (playerOne.dice === 1) {
      playerOne.calcRoundScore()
      $('.pig-left').show();
      $('.result').text("You rolled a 1");
      $('#roll-human').hide();
    } else {
      playerOne.calcRoundScore()
      $('.result').text(playerOne.roundScore);
      $('.total-result').text(playerOne.totalScore);
    }
  });

  $('#pass-computer').click(function () {
    $('.pig-robo').show();
    $('#roll-human').show();
    playerOne.calcTotalScore()
    $('.total-result').text(playerOne.totalScore);
    // playerOne.calcTotalScore()
    // playerTwo.calcTotalScore()

    if (playerOne.totalScore < 100 && playerTwo.totalScore < 100) {

      for(var i = 0; i < 4; i++) {
          playerTwo.dice = getRandomInt(1, 6);
          if(playerTwo.dice === 1) {
            playerTwo.roundScore = 0;
            $("#result-"+(i+1)).text("")
            $("#result-"+(i+2)).text("")
            $("#result-"+(i+3)).text("")
            $('#result-'+i).text("Robo Pig rolled a 1");
            $('.total-two-result').text(playerTwo.totalScore);
            break;
          }
          else if (i === 3 && playerTwo.dice !== 1) {
            playerTwo.calcRoundScore()
            $('#result-'+i).text(playerTwo.dice);
            playerTwo.calcTotalScore()
            $('.total-two-result').text(playerTwo.totalScore);
            if (playerTwo.totalScore >= 100) {
              $(".winner").text("ROBO PIG WINS")
            }
          } else {
            $('#result-'+i).text(playerTwo.dice+', ');
            $('.total-two-result').text(playerTwo.totalScore);
            playerTwo.roundScore += playerTwo.dice;
        }
      }

    }
    else if (playerOne.totalScore >= 100) {
      $(".winner").text("PLAYER ONE WINS")
    } else if (playerTwo.totalScore >= 100) {
      $(".winner").text("ROBO PIG WINS")
    }
  });

});







// $('#second-roll').click(function () {
//   var diceTwo = getRandomInt(1, 6);
//   nextRoll = new Player(dice);
//   $('.result').text(playerOne.dice);
//   console.log(dice);
//   console.log(playerOne);
// });
