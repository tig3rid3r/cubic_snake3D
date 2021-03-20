
class Cubes {
    constructor(){
        this.cubesArray;
        this.renderer;
        this.camera;
        this.light1;
        this.light2;
        this.light3;
        this.scene;
    }
    static setupRenderer(){
        Cubes.renderer = new THREE.WebGLRenderer();
        Cubes.renderer.setSize(window.innerWidth, window.innerHeight);
        Cubes.renderer.shadowMap.enabled = true;
        Cubes.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(Cubes.renderer.domElement);
    }
    static setupCamera(){
        Cubes.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
        Cubes.camera.position.set( 0, 0, 100 );
        Cubes.camera.lookAt( 0, 0, 0 );
    }
    static setupLight(){
        Cubes.light = new THREE.DirectionalLight( 0xffffff);
        Cubes.light.position.set( 0, 0, 1 );  
    }
    static generateCube(x, y, z){
        return {
            xPos: x*5,
            yPos: y*5,
            zPos: z*5
        }
    }
    static generateCubesArray(){
        let tempCubes = [];
        //let size = prompt('Enter size: ');
        let size = 11;
        size -= 1;
        for(let x = -size/2; x <= size/2; x++){
            for(let y = -size/2; y <= size/2; y++){
                for(let z = -size/2; z <= size/2; z++){
                    //array size reduction (only edge/wall objects created):
                    if(x === -size/2 || x === size/2 ||
                        y === -size/2 || y === size/2 ||
                        z === -size/2 || z === size/2){
                        let temp = Cubes.generateCube(x, y, z);
                        tempCubes.push(temp);
                    }
                }
            }
        }
        Cubes.cubesArray = tempCubes;
    }
    play(){
        /* View Setup */
        Cubes.setupRenderer();
        Cubes.setupCamera();
        Cubes.setupLight();
        Cubes.scene = new THREE.Scene();
        Cubes.scene.add(Cubes.light)

        let currentPos = {
            xsP: 0,
            ysP: 0,
            zsP: 25
        }
        let previousPos = {}

        const boxGeometry = new THREE.BoxGeometry(4,4,4);
        const insideBoxGeometry = new THREE.BoxGeometry(46,46,46);
        const boxMaterial = new THREE.MeshStandardMaterial({color: 0x3e3f40, flatShading: true});
        const changeBoxMaterial = new THREE.MeshStandardMaterial({color: 0xa32626})
        const insideBoxMaterial = new THREE.MeshStandardMaterial({color: 0x000000});

        Cubes.generateCubesArray();
        const group = new THREE.Group();
        Cubes.cubesArray.forEach(item => {
            let cube = new THREE.Mesh(boxGeometry, boxMaterial);
            cube.position.set(item.xPos, item.yPos, item.zPos);
            group.add(cube);
        })
        let insideCube = new THREE.Mesh(insideBoxGeometry, insideBoxMaterial);
        group.add(insideCube);

        const changeColor = () => {
            group.clear();
            Cubes.cubesArray.forEach(item => {
                if (item.xPos === currentPos.xsP &&  item.yPos === 0 && item.zPos === currentPos.zsP) {
                    let cube = new THREE.Mesh(boxGeometry, changeBoxMaterial);
                    cube.position.set(item.xPos, item.yPos, item.zPos);
                    group.add(cube);
                }
                else {
                    let cube = new THREE.Mesh(boxGeometry, boxMaterial);
                    cube.position.set(item.xPos, item.yPos, item.zPos);
                    group.add(cube);
                }
                let insideCube = new THREE.Mesh(insideBoxGeometry, insideBoxMaterial);
                group.add(insideCube);
            })
        }
        const changeOne = () => {
            group.children.some(item => {
                if (item.position.x === currentPos.xsP &&
                    item.position.y === currentPos.ysP &&
                    item.position.z === currentPos.zsP){
                        group.remove(item);
                    }
                }
            )
            group.children.some(item => {
                if (item.position.x === previousPos.xsP &&
                    item.position.y === previousPos.ysP &&
                    item.position.z === previousPos.zsP){
                        group.remove(item);
                    }
                }
            )
            let prevCube = new THREE.Mesh(boxGeometry, boxMaterial);
            prevCube.position.set(previousPos.xsP, previousPos.ysP, previousPos.zsP)
        
            let cube = new THREE.Mesh(boxGeometry, changeBoxMaterial);
            cube.position.set(currentPos.xsP, currentPos.ysP, currentPos.zsP);

            group.add(prevCube);
            group.add(cube);
        }
        const changePrevious = () => {
            let getPos = 0;
            group.children.some(item => {
                if (item.position.x === previousPos.xsP &&
                    item.position.y === previousPos.ysP &&
                    item.position.z === previousPos.zsP){
                    getPos = item.id
                    group.remove(getPos);
                    let prevCube = new THREE.Mesh(boxGeometry, boxMaterial);
                    prevCube.position.set(previousPos.xsP, previousPos.ysP, previousPos.zsP)
                    group.add(prevCube);
                }
            }) 
            let insideCube = new THREE.Mesh(insideBoxGeometry, insideBoxMaterial);
            group.add(insideCube);
        }

        const moveRight = () =>{
            previousPos.xsP = currentPos.xsP;
            previousPos.ysP = currentPos.ysP;
            previousPos.zsP = currentPos.zsP;
            if (currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === 25){
                currentPos.xsP += 5;
            }
            else if(currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === -25){
                currentPos.xsP -= 5;
            }
            else if(currentPos.zsP < 25 && currentPos.zsP > -25 && currentPos.xsP === 25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.zsP < 25 &&  currentPos.zsP > -25 && currentPos.xsP === -25){
                currentPos.zsP += 5;
            }

            //corner_cases:
            else if(currentPos.xsP === 25 && currentPos.ysP === 25 && currentPos.zsP === 25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.xsP === 25 && currentPos.ysP === -25 && currentPos.zsP === 25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.xsP === 25 && currentPos.ysP === 25 && currentPos.zsP === -25){
                currentPos.xsP -= 5;
            }
            else if(currentPos.xsP === 25 && currentPos.ysP === -25 && currentPos.zsP === -25){
                currentPos.xsP -= 5;
            }
            else if(currentPos.xsP === -25 && currentPos.ysP === 25 && currentPos.zsP === 25){
                currentPos.xsP += 5;
            }
            else if(currentPos.xsP === -25 && currentPos.ysP === -25 && currentPos.zsP === 25){
                currentPos.xsP += 5;
            }
            else if(currentPos.xsP === -25 && currentPos.ysP === 25 && currentPos.zsP === -25){
                currentPos.zsP += 5;
            }
            else if(currentPos.xsP === -25 && currentPos.ysP === -25 && currentPos.zsP === -25){
                currentPos.zsP += 5;
            }

            /* else if(currentPos.xsP === 25 && currentPos.zsP === 25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.xsP === 25 && currentPos.zsP === -25){
                currentPos.xsP -= 5;
            }
            else if(currentPos.xsP === -25 && currentPos.zsP === -25){
                currentPos.zsP += 5;
            }
            else if(currentPos.xsP === -25 && currentPos.zsP === 25){
                currentPos.xsP += 5;
            } */
            //return currentPos;
        }
        const moveLeft = () =>{
            previousPos.xsP = currentPos.xsP;
            previousPos.ysP = currentPos.ysP;
            previousPos.zsP = currentPos.zsP;
            if (currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === 25){
                currentPos.xsP -= 5;
            }
            else if(currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === -25){
                currentPos.xsP += 5;
            }
            else if(currentPos.zsP < 25 && currentPos.zsP > -25 && currentPos.xsP === 25){
                currentPos.zsP += 5;
            }
            else if(currentPos.zsP < 25 &&  currentPos.zsP > -25 && currentPos.xsP === -25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.xsP === 25 && currentPos.zsP === 25){
                currentPos.xsP -= 5;
            }
            else if(currentPos.xsP === 25 && currentPos.zsP === -25){
                currentPos.zsP += 5;
            }
            else if(currentPos.xsP === -25 && currentPos.zsP === -25){
                currentPos.xsP += 5;
            }
            else if(currentPos.xsP === -25 && currentPos.zsP === 25){
                currentPos.zsP -= 5;
            }
            //return currentPos;
        }
        const moveUp = () =>{
            previousPos.xsP = currentPos.xsP;
            previousPos.ysP = currentPos.ysP;
            previousPos.zsP = currentPos.zsP;
            if (currentPos.ysP > -25 && currentPos.ysP < 25 && currentPos.zsP === 25){
                currentPos.ysP += 5;
            }
            else if(currentPos.ysP > -25 && currentPos.ysP < 25 && currentPos.zsP === -25){
                currentPos.ysP -= 5;
            }
            else if(currentPos.zsP < 25 && currentPos.zsP > -25 && currentPos.ysP === 25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.zsP < 25 &&  currentPos.zsP > -25 && currentPos.ysP === -25){
                currentPos.zsP += 5;
            }
            else if(currentPos.ysP === 25 && currentPos.zsP === 25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.ysP === 25 && currentPos.zsP === -25){
                currentPos.ysP -= 5;
            }
            else if(currentPos.ysP === -25 && currentPos.zsP === -25){
                currentPos.zsP += 5;
            }
            else if(currentPos.ysP === -25 && currentPos.zsP === 25){
                currentPos.ysP += 5;
            }
            //return currentPos;
        }
        const moveDown = () =>{
            previousPos.xsP = currentPos.xsP;
            previousPos.ysP = currentPos.ysP;
            previousPos.zsP = currentPos.zsP;
            if (currentPos.ysP > -25 && currentPos.ysP < 25 && currentPos.zsP === 25){
                currentPos.ysP -= 5;
            }
            else if(currentPos.ysP > -25 && currentPos.ysP < 25 && currentPos.zsP === -25){
                currentPos.ysP += 5;
            }
            else if(currentPos.zsP < 25 && currentPos.zsP > -25 && currentPos.ysP === 25){
                currentPos.zsP += 5;
            }
            else if(currentPos.zsP < 25 &&  currentPos.zsP > -25 && currentPos.ysP === -25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.ysP === 25 && currentPos.zsP === 25){
                currentPos.ysP -= 5;
            }
            else if(currentPos.ysP === 25 && currentPos.zsP === -25){
                currentPos.zsP += 5;
            }
            else if(currentPos.ysP === -25 && currentPos.zsP === -25){
                currentPos.ysP += 5;
            }
            else if(currentPos.ysP === -25 && currentPos.zsP === 25){
                currentPos.zsP -= 5;
            }
            //return currentPos;
        }
        
        Cubes.scene.add(group)

        document.addEventListener("keydown", keyPush);

        //let dir = 0;

        let move = '';

        let lets = true;

        function keyPush(evt) {
            switch(evt.keyCode){
                case 37:
                    console.log('LEFT');
                    move = 'left';
                    break;
                case 38:
                    console.log('UP');
                    move = 'up';
                    break;
                case 39:
                    console.log('RIGHT');
                    move = 'right';
                    break;
                case 40:
                    console.log('DOWN');
                    move = 'down';
                    break;
                case 32:
                    lets = false;
            }
        }

        const rollForward = () =>{
            //positions_assignment
            previousPos.xsP = currentPos.xsP;
            previousPos.ysP = currentPos.ysP;
            previousPos.zsP = currentPos.zsP;
            //wall_cases:
            if (currentPos.zsP > -25 && currentPos.zsP < 25 && currentPos.ysP === 25){
                currentPos.zsP += 5;
            }
            else if(currentPos.zsP > -25 && currentPos.zsP < 25 && currentPos.ysP === -25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.ysP < 25 && currentPos.ysP > -25 && currentPos.zsP === 25){
                currentPos.ysP -= 5;
            }
            else if(currentPos.ysP < 25 &&  currentPos.ysP > -25 && currentPos.zsP === -25){
                currentPos.ysP += 5;
            }
            //corner_edge_cases:
            else if(currentPos.ysP === 25 && currentPos.zsP === 25){
                currentPos.ysP -= 5;
            }
            else if(currentPos.ysP === 25 && currentPos.zsP === -25){
                currentPos.zsP += 5;
            }
            else if(currentPos.ysP === -25 && currentPos.zsP === 25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.ysP === -25 && currentPos.zsP === -25){
                currentPos.ysP += 5;
            }
        }

        const pitchForward = () =>{
            //positions_assignment
            previousPos.xsP = currentPos.xsP;
            previousPos.ysP = currentPos.ysP;
            previousPos.zsP = currentPos.zsP;
            //wall_cases:
            if (currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === 25){
                currentPos.xsP += 5;
            }
            else if(currentPos.xsP > -25 && currentPos.xsP < 25 && currentPos.zsP === -25){
                currentPos.xsP -= 5;
            }
            else if(currentPos.zsP < 25 && currentPos.zsP > -25 && currentPos.xsP === 25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.zsP < 25 &&  currentPos.zsP > -25 && currentPos.xsP === -25){
                currentPos.zsP += 5;
            }
            //corner_edge_cases:
            else if(currentPos.xsP === 25 && currentPos.zsP === 25){
                currentPos.zsP -= 5;
            }
            else if(currentPos.xsP === 25 && currentPos.zsP === -25){
                currentPos.xsP -= 5;
            }
            else if(currentPos.xsP === -25 && currentPos.zsP === 25){
                currentPos.xsP += 5;
            }
            else if(currentPos.xsP === -25 && currentPos.zsP === -25){
                currentPos.zsP += 5;
            }
        }
        function d() {
            previousPos.xsP = currentPos.xsP;
            previousPos.ysP = currentPos.ysP;
            previousPos.zsP = currentPos.zsP;
            if(currentPos.zsP === 25 ){
                switch(move){
                    case 'right':
                        if(currentPos.xsP < 25 && currentPos.xsP >= -25){
                            currentPos.xsP += 5;
                        }
                        else if(currentPos.xsP === 25){
                            currentPos.zsP -= 5;
                        }
                        group.rotation.y -= 0.1570796325;
                        
                        break;
                    case 'left':
                        if(currentPos.xsP <= 25 && currentPos.xsP > -25){
                            currentPos.xsP -= 5;
                        }
                        else if(currentPos.xsP === -25){
                            currentPos.zsP -= 5;
                        }
                        group.rotation.y += 0.1570796325;
                        break;
                    case 'down':
                        if(currentPos.ysP <= 25 && currentPos.ysP > -25){
                            currentPos.ysP -= 5;
                            group.rotation.x -= 0.1570796325;
                        }
                        break;
                    case 'up':
                        if(currentPos.ysP < 25 && currentPos.ysP >= -25){
                            currentPos.ysP += 5;
                            group.rotation.x += 0.1570796325;
                        }
                        break;
                }
            }
            else if(currentPos.zsP === -25 ){
                switch(move){
                    case 'right':
                        if(currentPos.xsP <= 25 && currentPos.xsP > -25){
                            currentPos.xsP -= 5;
                        }
                        else if(currentPos.xsP === -25){
                            currentPos.zsP += 5;
                        }
                        group.rotation.y -= 0.1570796325;
                        break;
                    case 'left':
                        if(currentPos.xsP < 25 && currentPos.xsP >= -25){
                            currentPos.xsP += 5;
                        }
                        else if(currentPos.xsP === 25){
                            currentPos.zsP += 5;
                        }
                        group.rotation.y += 0.1570796325;
                        break;
                    case 'down':
                        if(currentPos.ysP <= 25 && currentPos.ysP > -25){
                            currentPos.ysP -= 5;
                            group.rotation.x -= 0.1570796325;
                        }
                        break;
                    case 'up':
                        if(currentPos.ysP < 25 && currentPos.ysP >= -25){
                            currentPos.ysP += 5;
                            group.rotation.x += 0.1570796325;
                        }
                        break;
                }
            }
            else if(currentPos.xsP === 25 ){
                switch(move){
                    case 'right':
                        if(currentPos.zsP <= 25 && currentPos.zsP > -25){
                            currentPos.zsP -= 5;
                        }
                        else if(currentPos.zsP === -25){
                            currentPos.xsP -= 5;
                        }
                        group.rotation.y -= 0.1570796325;
                        break;
                    case 'left':
                        if(currentPos.zsP < 25 && currentPos.zsP >= -25){
                            currentPos.zsP += 5;
                        }
                        else if(currentPos.zsP === 25){
                            currentPos.xsP -= 5;
                        }
                        group.rotation.y += 0.1570796325;
                        break;
                    case 'down':
                        if(currentPos.ysP <= 25 && currentPos.ysP > -25){
                            currentPos.ysP -= 5;
                            group.rotation.z += 0.1570796325;
                        }
                        break;
                    case 'up':
                        if(currentPos.ysP < 25 && currentPos.ysP >= -25){
                            currentPos.ysP += 5;
                            group.rotation.z -= 0.1570796325;
                        }
                        break;
                }
            }
            else if(currentPos.xsP === -25 ){
                switch(move){
                    case 'right':
                        if(currentPos.zsP < 25 && currentPos.zsP >= -25){
                            currentPos.zsP += 5;
                        }
                        else if(currentPos.zsP === 25){
                            currentPos.xsP += 5;
                        }
                        group.rotation.y -= 0.1570796325;
                        break;
                    case 'left':
                        if(currentPos.zsP <= 25 && currentPos.zsP > -25){
                            currentPos.zsP -= 5;
                        }
                        else if(currentPos.zsP === -25){
                            currentPos.xsP -= 5;
                        }
                        group.rotation.y += 0.1570796325;
                        break;
                    case 'down':
                        if(currentPos.ysP <= 25 && currentPos.ysP > -25){
                            currentPos.ysP -= 5;
                            group.rotation.z -= 0.1570796325;
                        }
                        break;
                    case 'up':
                        if(currentPos.ysP < 25 && currentPos.ysP >= -25){
                            currentPos.ysP += 5;
                            group.rotation.z += 0.1570796325;
                        }
                        break;
                }
            }
            /* else if(currentPos.ysP === 25 ){
                switch(move){
                    case 'right':
                        currentPos.zsP -= 5;
                        break;
                    case 'left':
                        currentPos.zsP += 5;
                        break;
                    case 'down':
                        currentPos.xsP += 5;
                        break;
                    case 'up':
                        currentPos.xsP -= 5;
                }
            }
            else if(currentPos.ysP === -25 ){
                if(){};
                switch(move){
                    case 'right':
                        currentPos.zsP -= 5;
                        break;
                    case 'left':
                        currentPos.zsP += 5;
                        break;
                    case 'down':
                        currentPos.xsP += 5;
                        break;
                    case 'up':
                        currentPos.xsP -= 5;
                }
            } */
        }

        function moveCube(){
            d();
            changeOne();
            //Cubes.scene.add(group);
            console.log(currentPos);
            console.log(group.rotation);
            Cubes.renderer.render(Cubes.scene, Cubes.camera);
        }
        setInterval(moveCube,200);
        //group.rotation.z = -0.47123889750000003
        //moveCube(); 
    }
}

const cubeBox = new Cubes();
cubeBox.play();

//http://127.0.0.1:5500/index.html
