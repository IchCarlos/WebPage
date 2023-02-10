var mainImg, grayImg, redImg, negImg, rainImg, blurImg, blank = null;
      var can1 = document.getElementById("canvas1");
      //var can2 = document.getElementById("canvas2");
      var ctx1 = can1.getContext("2d");

      function loadimage(){
        var img = document.getElementById("picture");
        mainImg = new SimpleImage(img); 
        mainImg.drawTo(can1);
        alert('Image Loaded!');
      }

      function filterGray(){
        if(imageIsLoaded(mainImg)){
          doGray();
          grayImg.drawTo(can1);
          alert('Gray Filter Applied!');
        }
      }
      function doGray(){
        grayImg=mainImg;
        for(var pixel of grayImg.values()){
          var avg = (pixel.getGreen() + pixel.getBlue() + pixel.getRed())/3;
          pixel.setRed(avg);
          pixel.setGreen(avg);
          pixel.setBlue(avg);
        }
        originalImg();
      }

      function redFilter(){
        if(imageIsLoaded(mainImg)){
          doRed();
          redImg.drawTo(can1);
          alert('Red Filter Applied!');
        }
      }
      function doRed(){
        redImg=mainImg;
        for(var pixel of redImg.values()){
          var avg = (pixel.getGreen() + pixel.getBlue() + pixel.getRed())/3;
          if(avg<128){
            pixel.setRed(2*avg);
            pixel.setGreen(0);
            pixel.setBlue(0);
          }
          else{
            pixel.setRed(255);
            pixel.setGreen((2*avg)-255);
            pixel.setBlue((2*avg)-255);
          }
        }
        originalImg();
      }

      function negativeFilter(){
        if(imageIsLoaded(mainImg)){
          doNegative();
          negImg.drawTo(can1);
          alert('Negative Filter Applied!');
        }
      }
      function doNegative(){
        negImg=mainImg;
        for(var pixel of negImg.values()){
          pixel.setRed(255-pixel.getRed());
          pixel.setGreen(255-pixel.getGreen());
          pixel.setBlue(255-pixel.getBlue());
        }
        originalImg();
      }

      function rainbowFilter(){
        if(imageIsLoaded(mainImg)){
          doRainbow();
          rainImg.drawTo(can1);
          alert('Rainbow Filter Applied!');
        }
      }
      function doRainbow(){
        rainImg=mainImg;
        var segment = rainImg.height/7;
        var seg2 = segment*2;
        var seg3 = segment*3;
        var seg4 = segment*4;
        var seg5 = segment*5;
        var seg6 = segment*6;
        for(var pixel of rainImg.values()){
          var position = pixel.getY();
          var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen())/3;
          if(position < segment){
            if(avg<128){
              pixel.setRed(2*avg);
              pixel.setGreen(0);
              pixel.setBlue(0);
            } else{
              pixel.setRed(255);
              pixel.setGreen(2*avg-255);
              pixel.setBlue(2*avg-255);
            }
          }else if((position >= segment) && (position < seg2)){
            if(avg<128){
              pixel.setRed(2*avg);
              pixel.setGreen(0.8*avg);
              pixel.setBlue(0);
            } else{
              pixel.setRed(255);
              pixel.setGreen(1.2*avg-51);
              pixel.setBlue(2*avg-255);
            }
          }else if((position >= seg2) && (position < seg3)){
            if(avg<128){
              pixel.setRed(2*avg);
              pixel.setGreen(2*avg);
              pixel.setBlue(0);
            } else{
              pixel.setRed(255);
              pixel.setGreen(255);
              pixel.setBlue(2*avg-255);
            }
          }else if((position >= seg3) && (position < seg4)){
            if(avg<128){
              pixel.setRed(0);
              pixel.setGreen(2*avg);
              pixel.setBlue(0);
            } else{
              pixel.setRed(2*avg-255);
              pixel.setGreen(255);
              pixel.setBlue(2*avg-255);
            }
          }else if((position >= seg4) && (position < seg5)){
            if(avg<128){
              pixel.setRed(0);
              pixel.setGreen(0);
              pixel.setBlue(2*avg);
            } else{
              pixel.setRed(2*avg-255);
              pixel.setGreen(2*avg-255);
              pixel.setBlue(255);
            }
          }else if((position >= seg5) && (position < seg6)){
            if(avg<128){
              pixel.setRed(0.8*avg);
              pixel.setGreen(0);
              pixel.setBlue(2*avg);
            } else{
              pixel.setRed(1.2*avg-51);
              pixel.setGreen(2*avg-255);
              pixel.setBlue(255);
            }
          }else{
            if(avg<128){
              pixel.setRed(1.6*avg);
              pixel.setGreen(0);
              pixel.setBlue(1.6*avg);
            } else{
              pixel.setRed(0.4*avg+153);
              pixel.setGreen(2*avg-255);
              pixel.setBlue(0.4*avg+153);
            }
          }    
        }
        originalImg();
      }

      function blurFilter(){
        if(imageIsLoaded(mainImg)){
          alert('Sometimes I bug :c, be patient and try several times till you get the blur image :3');
          doBlur();
          blank.drawTo(can1);
          alert('Blur Filter Applied!');
        }
      }
      function doBlur(){
        blank = new SimpleImage(mainImg.width,mainImg.height);
        console.log(mainImg);
        blurImg = mainImg;
        console.log(blurImg);
        var ran = Math.random();
        var xwidth = mainImg.width;
        var yheight = mainImg.height;
        for(var pixel of blurImg.values()){
          if(ran < 0.5){
            var x = Math.floor(Math.random() * 5);
            var y = Math.floor(Math.random() * 5);
            var positionX = pixel.getX()+x;
            var positionY = pixel.getY()+y;
            if(positionX > xwidth-1){
              positionX = pixel.getX()-x;
            }
            if(positionY > yheight-1){
              positionY = pixel.getY()-y;
            }
            console.log(blurImg.getPixel(positionX,positionY));
            blank.setPixel(pixel.getX(),pixel.getY(),blurImg.getPixel(positionX,positionY) );
          }else{
            
          }
        }
        originalImg();
      }

      function reset(){
        if(imageIsLoaded(mainImg)){
          ctx1.clearRect(0,0,can1.width,can1.height);
          var img = document.getElementById("picture");
          mainImg = new SimpleImage(img);
          mainImg.drawTo(can1);
          alert('Reset Applied!');
        }
      }

      function imageIsLoaded(img){
        if(img == null){
          alert('Image is not Loaded');
          return false;
        }
        else{
          return true;
        }
      }

      function originalImg(){
        //USED THIS TO RESET THE ORIGINAL IMAGE TO ITS ORIGINAL VALUE
        var img = document.getElementById("picture");
        mainImg = new SimpleImage(img);
      }