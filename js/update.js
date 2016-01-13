
function planetUpdate(currentMinute){

    
    var timeSplice = 2*Math.PI/totalMinute;

//    parent.rotation.y = timeSplice*currentMinute;
    earthParent.rotation.y = timeSplice*currentMinute;
    earthCloud.rotation.y = timeSplice*currentMinute;
    //parent.rotation.y = timeSplice*currentMinute;
  //  parent[2].rotation.y = timeSplice*currentMinute*2;
  //  parent[3].rotation.y = timeSplice*currentMinute*4;
  //  parent[4].rotation.y = timeSplice*currentMinute*3;
}




function trackUpdate (currentMinute){
    
    //Keep in code - Written by Computerhope.com
    //Place this script in your HTML heading section

   // document.write('It\'s now: ', hours, '<br><br>');
    //document.bgColor="#CC9900";
    var hour = Math.floor(currentMinute/60);
    switch (hour){
        case 1 :
            generateSky([0, '#00000c']);
            createStar('max');

            break;

        case 2 :
            generateSky([0.85, '#020111',1, '#191621']);
            createStar('max');
            break;

        case 3 :
            generateSky([0.6, '#020111',1, '#20202c']);
            createStar('max');
   
            break;

        case 4 :
            generateSky([0.1, '#020111',1, '#3a3a52']);
            createStar('normal');
            break;

        case 5 :
            generateSky([0, '#20202c',1, '#515175']);
            createStar('normal');

            break;
        
        case 6 :
            generateSky([0, '#40405c',0.8, '#6f71aa',1, '#8a76ab']);
            createStar('min');
            break;
        
        case 7 :
            generateSky([0, '#4a4969',0.5, '#7072ab',1, '#cd82a0']);
            createStar('min');
            break;
        
        case 8 :
            generateSky([0, '#757abf',0.6, '#8583be',1, '#eab0d1']);
            createStar('none');
            break;
        
        case 9 :
            generateSky([0, '#82addb',1, '#ebb2b1']);
            createStar('none');
            break;
        
        case 10 :
            generateSky([0.01, '#94c5f8',0.7, '#a6e6ff',1, '#b1b5ea']);
            createStar('none');
            break;
        
        case 11 :
            generateSky([0, '#b7eaff',1, '#94dfff']);
            createStar('none');
            break;
        
        case 12 :
            generateSky([0, '#9be2fe',1, '#67d1fb']);
            createStar('none');
            break;
        
        case 13 :
            generateSky([0, '#90dffe',1, '#38a3d1']);
            createStar('none');
            break;
        
        case 14 :
            generateSky([0, '#57c1eb',1, '#246fa8']);
            createStar('none');
            break;
        
        case 15 :
            generateSky([0, '#2d91c2',1, '#1e528e']);
 
            createStar('none');
            break;
        
        case 16 :
            generateSky([0, '#2473ab',0.7, '#1e528e',1, '#5b7983']);
            createStar('min');
            break;
        
        case 17 :
            generateSky([0, '#1e528e',0.5, '#265889',1, '#9da671']);
            createStar('min');
            
            break;
        
        case 18 :
            generateSky([0, '#1e528e',0.5, '#728a7c',1, '#e9ce5d']);
            createStar('min');


            break;
        
        case 19 :
            generateSky([0, '#154277',0.3, '#576e71',0.7, '#e1c45e',1,"#b26339"]);
            createStar('normal');

            break;
        
        case 20 :
            generateSky([0, '#163C52',0.3, '#4F4F47',0.6, '#C5752D',0.8, '#B7490F',1, '#2F1107']);
            createStar('normal');
            
            break;
        
        case 21 :
            generateSky([0, '#071B26',0.3, '#071B26',0.8, '#8A3B12',1, '#240E03']);
            createStar('normal');

            break;
        
        case 22 :
            generateSky([0.3, '#010A10',0.8, '#59230B',1, '#2F1107']);
            createStar('normal');
            break;
        
        case 23 :
            generateSky([0.5, '#090401',1, '#4B1D06']);
            createStar('max');
            break;
        
        case 24 :
            generateSky([0.8, '#00000c',1, '#150800']);
            createStar('max');
            break;
        
        
    }
    //return gradient;
}