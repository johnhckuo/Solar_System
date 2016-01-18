var scene, camera, renderer, controls, stats;    
var parent = [];
var boxSize = 2000;
var testCounter = 240;
var totalMinute = 1440;
var starParticle;
var earthCloud, earth;
//var earthSize = 6378;
//var earthRange = 149597871;
var earthSize = 1;
//var earthRange = 10000000;
var earthRange = 10000000;
var skySize = 1000000000;
//var radius = [109, 0.3824, 0.95, 1, 0.273,0.53, 11.2, 9.46, 4.0, 3.88, 0.18];
var radius = [110, 20, 40, 50, 10, 100, 90, 80, 60, 10];


//var rangeProportion = [0,0.4,0.7,1,0.27,1.5,5.2,9.5,19.6,30,39];
var rangeProportion = [0,0.4,0.7,1,0.27,3,5,7,9,11];
var revolveSpeed = [0, 4.16, 1.62, 1, 0.53, 0.084, 0.034, 0.012, 0.006, 0.004]


$(document).ready(function(){

    $("li").on("click",function(){
        switchCamera(this);
    });

    var now = new Date();
    var hours = now.getHours();
    lastHour = hours;

    scene = new THREE.Scene();

    //////////
    //camera//
    //////////

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.00001, 10000000000 );

   // camera.position.y = -boxSize/2;
    camera.position.set(0, 10000000, 10000000 )
    camera.useQuaternion = true;
    ////////////
    //renderer//
    ////////////

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xffffff, 1);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.autoClear = true;

    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    
    ///////
    //sky//
    ///////

    var geometry  = new THREE.SphereGeometry(skySize, 32, 32)
    var material  = new THREE.MeshBasicMaterial()
    material.map   = THREE.ImageUtils.loadTexture('img/galaxy_starfield.png')
    material.side  = THREE.BackSide
    var mesh  = new THREE.Mesh(geometry, material)
    scene.add(mesh)


    


    ////////
    //info//
    ////////

    info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.bottom = '30px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.color = '#fff';
    info.style.fontWeight = 'bold';
    info.style.backgroundColor = 'transparent';
    info.style.zIndex = '1';
    info.style.fontFamily = 'Monospace';
    info.innerHTML = 'Solar System Project by johnhckuo';
    document.body.appendChild( info );

    ////////
    //Stat//
    ////////

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '20px';
    stats.domElement.style.left = '20px';
    document.body.appendChild(stats.domElement);

    ////////////
    //CONTROLS//
    ////////////

    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.1;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.2;
     
    controls.noZoom = false;
    controls.noPan = false;
     
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;
     
    controls.minDistance = 0.1;
    controls.maxDistance = 2000000000;
     
    controls.keys = [ 16, 17, 18 ]; // [ rotateKey, zoomKey, panKey ] 
   
    ////////
    //axes//
    ////////

    axes = buildAxes( skySize );
    scene.add(axes);

    

    ////////////
    //sunLight//
    ////////////


    var sunLight   = new THREE.PointLight( 0xffffff, 1 ,skySize);
    sunLight.position.set(0,0,0);
    scene.add( sunLight )



    //////////
    //planet//
    //////////



    

  //  var Sun = createSun(earthSize*1300000);
    Sun = createSun(earthSize*calculateVolume(radius[0]), earthRange*rangeProportion[0]);
    scene.add(Sun);


    var origin = createOrigin();

    mercury = createMercury(earthSize*calculateVolume(radius[1]) , earthRange*rangeProportion[1]);
    venus = createVenus(earthSize*calculateVolume(radius[2]), earthRange*rangeProportion[2]);
    earth = createEarth(earthSize*calculateVolume(radius[3]), earthRange*rangeProportion[3]);
    moon = createMoon(earthSize*calculateVolume(radius[4]), earthRange*rangeProportion[4]);
    mars = createMars(earthSize*calculateVolume(radius[5]), earthRange*rangeProportion[5]);
    jupiter = createJupiter(earthSize*calculateVolume(radius[6]), earthRange*rangeProportion[6]);
    saturn = createSaturn(earthSize*calculateVolume(radius[7]), earthRange*rangeProportion[7]);
    uranus = createUranus(earthSize*calculateVolume(radius[8]), earthRange*rangeProportion[8]);
    
    
    neptune = createNeptune(earthSize*calculateVolume(radius[9]), earthRange*earthRange*rangeProportion[9]);
    pluto = createPluto(earthSize*calculateVolume(radius[10]), earthRange*earthRange*rangeProportion[10]);


    //earthCloud = createEarthCloud(earthSize*calculateVolume(radius[3]), earthRange*rangeProportion[3]);
    //earth.add(earthCloud);

    
 

    

    // parent earth
    earthParent = new THREE.Object3D();
    scene.add( earthParent );
    earthParent.rotation.x = -Math.PI/2;


    var pivot_track  = createSatelliteTrack(earthRange*rangeProportion[4]);
    pivot_track.add(earth);
    pivot_track.add(moon);
    earth.rotation.x = -Math.PI/2;
    moon.rotation.x = -Math.PI/2;
    earthParent.add(pivot_track);
    earthParent.position.set(earthRange , 0 , 0);
    earthParent.rotation.x = -Math.PI/2;
    

    

    var pivot = [];
    for (var i = 1; i<radius.length ; i++){      //without sun, oso begin with 1
        
        parent[i] = new THREE.Object3D();                  
        scene.add( parent[i] );

        pivot[i] = createTrack(i);
        parent[i].add(pivot[i]);

    }
/*
    var pivot_light = new THREE.Object3D();
    parent[0].add( pivot_light );
    pivot_light.add( sunLight );

    var pivot_sun = new THREE.Object3D();
    parent[0].add( pivot_sun );
    pivot_light.add( Sun );
*/
    pivot[1].add( mercury );
    pivot[2].add( venus );
    pivot[3].add( earthParent );
    pivot[4].add( mars );
    pivot[5].add( jupiter );
    pivot[6].add( saturn );
    pivot[7].add( uranus );
    pivot[8].add( neptune );
    pivot[9].add( pluto );
    
    scene.updateMatrixWorld();
    for (var i = 1; i <pivot.length ; i++){
        pivot[i].updateMatrixWorld();
    }
    //moon.add(camera);

    //parent.rotation.x += Math.PI*2;
    

    ///////////
    //animate//
    ///////////

    var render = function () {


        var now = new Date();
        var hours = now.getHours();
        var minute = now.getMinutes();

        requestAnimationFrame( render );
        renderer.render(scene, camera);
        controls.update(); //for cameras
        for (var i = 1; i<pivot.length ; i++){      //without sun, oso begin with 1
        
            revolution(pivot[i], revolveSpeed[i])

        }
        planetSpin();
        stats.update();


        TWEEN.update();
        

    };

    render();
    window.addEventListener('resize', onWindowResize, false);
});


function calculateVolume(r){
    var volume = r * r * r; 
    return volume;
}


function calculateMinute(hours,minute){
    var currentMinute = hours*60 + minute;
    return currentMinute;
}



function switchCamera(obj){
    console.log(obj.innerHTML)
    var text = obj.innerHTML;
    switch (text){
        case 'Sun':
            Sun.add(camera);
            test = 1;
            camera.position = Sun.position.clone();
            camera.translateZ(earthSize*calculateVolume(radius[0])*2)
            break;
        case 'Mercury':
            /*
            mercury.add(camera);
            camera.position = mercury.position.clone();
            camera.translateZ(earthSize*calculateVolume(radius[1])*2)
            */
            // console.log(mercury.position)
            // console.log(camera.position);
            // var tween = new TWEEN.Tween( camera.position )
            //     .to( mercury.position, 2000 )
            //     .onUpdate( function () {
            //             camera.position.x = mercury.position.x;
            //             camera.position.y = mercury.position.y;
            //             camera.position.z = mercury.position.z;
            //     } )
            //     .start();
            var vector = new THREE.Vector3();
            vector.setFromMatrixPosition( mercury.matrixWorld );
            var position = camera.position.clone();
            var tween = new TWEEN.Tween(position).to(vector, 4000);

            tween.onUpdate(function(){
                camera.position.x = position.x;
                camera.position.y = position.y;
                camera.position.z = position.z;
            });

            tween.start();
            mercury.add(camera);
            //camera.translateZ(earthSize*calculateVolume(radius[1])*2);
            break;
        case 'Venus':

            venus.add(camera);
            camera.position = venus.position.clone();
            camera.translateZ(earthSize*calculateVolume(radius[2])*2)

            //camera.lookAt(venus);
            //camera.target.position.copy(venus);
            break;

        case 'Earth':
            // earth.add(camera);
            
            // console.log(camera.position.x+'/'+camera.position.y+'/'+camera.position.z);
            // console.log(mars.position.x+'/'+mars.position.y+'/'+mars.position.z);
            // camera.position = earth.position.clone();
            // camera.translateZ(earthSize*calculateVolume(radius[3])*2)


            var vector = new THREE.Vector3();
            vector.setFromMatrixPosition( earth.matrixWorld );
            var position = camera.position.clone();
            var tween = new TWEEN.Tween(position).to(vector, 4000);

            tween.onUpdate(function(){
                camera.position.x = position.x;
                camera.position.y = position.y;
                camera.position.z = position.z;
            });

            tween.start();
            earth.add(camera);
            break;
        case 'Moon':
            moon.add(camera);
            
            camera.position = moon.position.clone();
            camera.translateZ(earthSize*calculateVolume(radius[4])*2)
            break;

        case 'Mars':
            mars.add(camera);
           
            setTimeout(cameraAnimation(mars),100);
        //    camera.position = mars.position.clone();
        //    camera.translateZ(earthSize*calculateVolume(radius[5])*2)
            break;
        case 'Jupiter':
            jupiter.add(camera);
            camera.position = jupiter.position.clone();
            camera.translateZ(earthSize*calculateVolume(radius[6])*2)
            break;
        case 'Saturn':
            saturn.add(camera);
            camera.position = saturn.position.clone();
            camera.translateZ(earthSize*calculateVolume(radius[6])*2)
            break;
        case 'Uranus':
            uranus.add(camera);
            camera.position = uranus.position.clone();
            camera.translateZ(earthSize*calculateVolume(radius[8])*2)
            break;
        case 'Neptune':
            neptune.add(camera);
            camera.position = neptune.position.clone();
            camera.translateZ(earthSize*calculateVolume(radius[9])*2)
            break;
        case 'Pluto':
            pluto.add(camera);
            camera.position = pluto.position.clone();
            camera.translateZ(earthSize*calculateVolume(radius[10])*2)
            break;
    }

}


function cameraAnimation(planet){

    var speed = 0.1;
    if (camera.position.x > planet.position.x){

        camera.position.x -= speed;
    }
    else if (camera.position.x < planet.position.x){

        camera.position.x += speed;
    }
    if (camera.position.y > planet.position.y){
        camera.position.y -= speed;
    }
    else if (camera.position.y < planet.position.y){
        camera.position.y += speed;
    }
    if (camera.position.z > planet.position.z){
        camera.position.z -= speed;
    }
    else if (camera.position.z < planet.position.z){
        camera.position.z += speed;
    }


}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

