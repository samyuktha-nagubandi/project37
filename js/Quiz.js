class Quiz {
    constructor(){}
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        contestant = new Contestant();
        var contestantCountRef = await database.ref('contestantCount').once("value");
        if(contestantCountRef.exists()){
            contestantCount = contestantCountRef.val();
            contestant.getCount();
        }
        question = new Question()
        question.display();
      }
    }
  
    play(){
        question.hide();
      textSize(30);
      text("result of the quiz", 340, 50);
      text("---------------------------------------------",320,65);
      Contestant.getContestantInfo();
  
      if(allContestants !== undefined){
        var display_answers = 230;
        fill("blue");
        textSize(20);

        for(var plr in allContestants){
            var correctAns="2";

          if (correctAns === allContestants[plr].answer)
            fill("green")
          else
            fill("red");
  
          display_answers+=30;
          textSize(15);
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 120,display_answers)
        }
      }
  
      
    }
  }