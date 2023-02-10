var thecolor = 0;
      function changeback(){
        thecolor++;
        switch(thecolor){
          case 1:
            document.body.className = "back1";
          break;

          case 2:
            document.body.className = "back2";
          break;

          default:
            document.body.className = "back3";
            thecolor=0;
          break;
        }
      }