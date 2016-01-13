

function createSatelliteTrack(radius){
    var geometry = new THREE.RingGeometry( radius-1, radius, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    var ring = new THREE.Line( geometry, material ) ;
    ring.rotation.x = Math.PI/2;
    earthParent.add( ring );
    return ring;
}

function createTrack(i){
    var geometry = new THREE.RingGeometry( earthRange*rangeProportion[i]-1, earthRange*rangeProportion[i], 64 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var ring = new THREE.Line( geometry, material ) ;
    ring.rotation.x = Math.PI/2;
    parent[i].add( ring );
    return ring;
}


function createOrigin(){
    var geometry = new THREE.SphereGeometry( 1, 1, 1 );
    var material =  new THREE.MeshBasicMaterial({ color: 0x000000});
    var origin = new THREE.Mesh( geometry, material );
    return origin;
}

function createSun(size,range){
    var geometry = new THREE.SphereGeometry( size, 32, 32 );
    var material =  new THREE.MeshBasicMaterial({ color: 0xFFFF33, vertexColors: THREE.FaceColors });
    material.map    = THREE.ImageUtils.loadTexture("img/sunmap.jpg")
    var Sun = new THREE.Mesh( geometry, material );
    Sun.position.set(range, 0, 0);
    Sun.rotation.x = -Math.PI/2;



    return Sun;
}

function createMoon(size, range){
    var geometry = new THREE.SphereGeometry( size, 32, 32 );
    var material =  new THREE.MeshLambertMaterial();
    material.map    = THREE.ImageUtils.loadTexture('img/moon.jpg')
    var moon = new THREE.Mesh( geometry, material );
    moon.position.set(range, 0, 0)
    return moon;
}

function createEarth(earthSize, earthRange){

    

    var geometry    = new THREE.SphereGeometry(earthSize, 32, 32)
    var material    = new THREE.MeshLambertMaterial({
        map     : THREE.ImageUtils.loadTexture('img/earthmap1k.jpg'),
        bumpMap     : THREE.ImageUtils.loadTexture('img/earthbump1k.jpg'),
        bumpScale   : 0.05,
        specularMap : THREE.ImageUtils.loadTexture('img/earthspec1k.jpg'),
        specular    : new THREE.Color('grey')
    })
    var mesh    = new THREE.Mesh(geometry, material)

    

    return mesh;

}

function createEarthCloud(earthSize){
    // create destination canvas
    var canvasResult    = document.createElement('canvas')
    canvasResult.width  = 1024
    canvasResult.height = 512
    var contextResult   = canvasResult.getContext('2d')     

    // load earthcloudmap
    var imageMap    = new Image();
    imageMap.addEventListener("load", function() {
        
        // create dataMap ImageData for earthcloudmap
        var canvasMap   = document.createElement('canvas')
        canvasMap.width = imageMap.width
        canvasMap.height= imageMap.height
        var contextMap  = canvasMap.getContext('2d')
        contextMap.drawImage(imageMap, 0, 0)
        var dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

        // load earthcloudmaptrans
        var imageTrans  = new Image();
        imageTrans.addEventListener("load", function(){
            // create dataTrans ImageData for earthcloudmaptrans
            var canvasTrans     = document.createElement('canvas')
            canvasTrans.width   = imageTrans.width
            canvasTrans.height  = imageTrans.height
            var contextTrans    = canvasTrans.getContext('2d')
            contextTrans.drawImage(imageTrans, 0, 0)
            var dataTrans       = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
            // merge dataMap + dataTrans into dataResult
            var dataResult      = contextMap.createImageData(canvasMap.width, canvasMap.height)
            for(var y = 0, offset = 0; y < imageMap.height; y++){
                for(var x = 0; x < imageMap.width; x++, offset += 4){
                    dataResult.data[offset+0]   = dataMap.data[offset+0]
                    dataResult.data[offset+1]   = dataMap.data[offset+1]
                    dataResult.data[offset+2]   = dataMap.data[offset+2]
                    dataResult.data[offset+3]   = 255 - dataTrans.data[offset+0]
                }
            }
            // update texture with result
            contextResult.putImageData(dataResult,0,0)  
            material.map.needsUpdate = true;
        })
        imageTrans.src  = 'img/earthcloudmaptrans.jpg';
    }, false);
    imageMap.src    = 'img/earthcloudmap.jpg';

    var geometry    = new THREE.SphereGeometry(earthSize*1.001, 32, 32)
    var material    = new THREE.MeshPhongMaterial({
        map     : new THREE.Texture(canvasResult),
        side        : THREE.DoubleSide,
        transparent : true,
        opacity     : 0.8
    })
    var mesh    = new THREE.Mesh(geometry, material)

    return mesh 

}

function createMercury(size, range){  //水星
    var geometry    = new THREE.SphereGeometry(size, 32, 32)
    var material    = new THREE.MeshLambertMaterial({
        map     : THREE.ImageUtils.loadTexture('img/mercurymap.jpg'),
        bumpMap     : THREE.ImageUtils.loadTexture('img/mercurybump.jpg'),
        bumpScale   : 0.05
    })
    var mesh    = new THREE.Mesh(geometry, material)
    mesh.position.set(range, 0, 0);
    mesh.rotation.x = -Math.PI/2;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return mesh;
}


function createJupiter(size, range){  //木星
    var geometry    = new THREE.SphereGeometry(size, 32, 32)
    var material    = new THREE.MeshLambertMaterial({
        map     : THREE.ImageUtils.loadTexture('img/jupitermap.jpg')
    })
    var mesh    = new THREE.Mesh(geometry, material)
    mesh.position.set(range, 0, 0);
    mesh.rotation.x = -Math.PI/2;
    return mesh;
}


function createUranus(size, range){ //天王星                                   //ring
    var geometry    = new THREE.SphereGeometry(size, 32, 32)
    var material    = new THREE.MeshLambertMaterial({
        map     : THREE.ImageUtils.loadTexture('img/uranusmap.jpg')
    })
    var mesh    = new THREE.Mesh(geometry, material)
    mesh.position.set(range, 0, 0);
    mesh.rotation.x = -Math.PI/2;
    return mesh;
}


function createPluto(size, range){ //冥王星
    var geometry    = new THREE.SphereGeometry(size, 32, 32)
    var material    = new THREE.MeshLambertMaterial({
        map     : THREE.ImageUtils.loadTexture('img/plutomap1k.jpg'),
        bumpMap     : THREE.ImageUtils.loadTexture('img/plutobump1k.jpg'),
        bumpScale   : 0.05
    })
    var mesh    = new THREE.Mesh(geometry, material)
    mesh.position.set(range, 0, 0);
    mesh.rotation.x = -Math.PI/2;
    return mesh;
}


function createVenus(size, range){  //金星
    var geometry    = new THREE.SphereGeometry(size, 32, 32)
    var material    = new THREE.MeshLambertMaterial({
        map     : THREE.ImageUtils.loadTexture('img/venusmap.jpg'),
        bumpMap     : THREE.ImageUtils.loadTexture('img/venusbump.jpg'),
        bumpScale   : 0.05
    })
    var mesh    = new THREE.Mesh(geometry, material)
    mesh.position.set(range, 0, 0);
    mesh.rotation.x = -Math.PI/2;
    return mesh;
}

function createMars(size, range){  //火星
    var geometry    = new THREE.SphereGeometry(size, 32, 32)
    var material    = new THREE.MeshLambertMaterial({
        map     : THREE.ImageUtils.loadTexture('img/marsmap1k.jpg'),
        bumpMap     : THREE.ImageUtils.loadTexture('img/marsbump1k.jpg'),
        bumpScale   : 0.05
    })
    var mesh    = new THREE.Mesh(geometry, material)
    mesh.position.set(range, 0, 0);
    mesh.rotation.x = -Math.PI/2;
    return mesh;
}

function createSaturn(size, range){  //土星                     //1k
    var geometry    = new THREE.SphereGeometry(size, 32, 32)
    var material    = new THREE.MeshLambertMaterial({
        map     : THREE.ImageUtils.loadTexture('img/saturnmap.jpg')
    })
    var mesh    = new THREE.Mesh(geometry, material)
    mesh.position.set(range, 0, 0);
    mesh.rotation.x = -Math.PI/2;
    return mesh;
}


function createNeptune(size, range){   //海王星
    var geometry    = new THREE.SphereGeometry(size, 32, 32)
    var material    = new THREE.MeshLambertMaterial({
        map     : THREE.ImageUtils.loadTexture('img/neptunemap.jpg')
    })
    var mesh    = new THREE.Mesh(geometry, material)
    mesh.position.set(range, 0, 0);
    mesh.rotation.x = -Math.PI/2;
    return mesh;
}

function createStar(type) {
    var starNumber;
    scene.remove(starParticle);
    if (type == 'max'){
        starNumber = 500;
    }else if ( type == 'normal'){
        starNumber = 250
    }else if (type == 'min'){
        starNumber = 150;
    }else{
        starNumber = 0;
    }


    var geometry = new THREE.Geometry();
    var material = new THREE.PointCloudMaterial( { size: 1 } );
    //top
    for (var i = 0; i < starNumber; i++) 
    {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * boxSize - boxSize/2;
        vertex.y = boxSize/2 -2;
        vertex.z = Math.random() * boxSize - boxSize/2;

        geometry.vertices.push( vertex );
         //sunLight.castShadow = true;
    }

    //north
    for (var i = 0; i < starNumber; i++) 
    {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * boxSize - boxSize/2;
        vertex.y = Math.random() * boxSize - boxSize/2;
        vertex.z = boxSize/2 -1;

        geometry.vertices.push( vertex );
        //sunLight.castShadow = true;
    }

    //west
    for (var i = 0; i < starNumber; i++) 
    {
        var vertex = new THREE.Vector3();
        vertex.x = boxSize/2 -1;
        vertex.y = Math.random() * boxSize - boxSize/2;
        vertex.z = Math.random() * boxSize - boxSize/2;

        geometry.vertices.push( vertex );
        //sunLight.castShadow = true;
    }

    //south
    for (var i = 0; i < starNumber; i++) 
    {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * boxSize - boxSize/2;
        vertex.y = Math.random() * boxSize - boxSize/2;
        vertex.z = -boxSize/2 +1;

        geometry.vertices.push( vertex );
                //sunLight.castShadow = true;
    }

    //east
    for (var i = 0; i < starNumber; i++) 
    {
        var vertex = new THREE.Vector3();
        vertex.x = -boxSize/2 +1;
        vertex.y = Math.random() * boxSize - boxSize/2;
        vertex.z = Math.random() * boxSize - boxSize/2;

        geometry.vertices.push( vertex );
        //sunLight.castShadow = true;
    }

    starParticle = new THREE.PointCloud( geometry, material );   
    //create mesh and add to scene
    scene.add(starParticle);

    

}



