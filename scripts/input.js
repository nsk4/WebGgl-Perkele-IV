// useful url for input
// https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes



function handleKeyDown(event) {
  // storing the pressed state for individual key
  currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
  // reseting the pressed state for individual key
  currentlyPressedKeys[event.keyCode] = false;
}


function handleMouseClick(event) {

	//Get mouse coordinates canvas-wise
	var rect = canvas.getBoundingClientRect();
	var mouse_x = event.clientX - rect.left;
	var mouse_y = event.clientY - rect.top;
	//console.log("x: " + mouse_x + " y: " + mouse_y);
	
	//Black magic, leave as it is!
	var mx = (2.0 * mouse_x) / canvas.width - 1.0;
	var my = 1.0 - (2.0 * mouse_y) / canvas.height;
	var mz = 1.0;
	
	var ray = vec3.create();
	ray[x] = mx;
	ray[y] = my;
	ray[z] = mz;
	
	var ray_clip = []
	ray_clip[x] = ray[0];
	ray_clip[y] = ray[1];
	ray_clip[z] = -1.0;
	ray_clip[3] = 1.0;
	
	//console.log(ray_clip);
	var ray_eye = matrixVectorMultiply4(mat4.inverse(pMatrix),ray_clip);	
	//console.log(ray_eye);
	ray_eye[z] = -1.0;
	ray_eye[3] = 0.0;
	
	var viewMatrix = mat4.create();
	mat4.identity(viewMatrix);

	mat4.rotateX(viewMatrix, degToRad(-camera.rotation[x]));
	mat4.rotateY(viewMatrix, degToRad(-camera.rotation[y]));
	mat4.rotateZ(viewMatrix, degToRad(-camera.rotation[z]));
	mat4.translate(viewMatrix, camera.position);
	mat4.translate(viewMatrix, camera.offset);
	
	var ray_wor = matrixVectorMultiply4(mat4.inverse(viewMatrix), ray_eye);
	//console.log(ray_wor);
	
	var final_vector = vec3.create();
	final_vector[x] = ray_wor[x];
	final_vector[y] = ray_wor[y];
	final_vector[z] = ray_wor[z];

	vec3.normalize(final_vector,final_vector);
	
	//final_vector represents direction where the camera is looking
	
	var currentPos = []
	currentPos[x] = -camera.position[x]-camera.offset[x];
	currentPos[y] = -camera.position[y]-camera.offset[y];
	currentPos[z] = -camera.position[z]-camera.offset[z];
	
	//We get the camera position and keep adding the direction vector to it.
	//When we "pierce" the world plane, we stop and get our x and z coordinates.
	//There is also a threshold for safety if something happens or we click outside of the world plane.
	var limit = 10000;
	var count = 0;
	//console.log((enemy.position[x]-enemy.collisionBox[x]/2) + " " + (enemy.position[x]+enemy.collisionBox[x]/2));
	//console.log((enemy.position[z]-enemy.collisionBox[y]/2) + " " + (enemy.position[y]+enemy.collisionBox[y]/2));
	//console.log((enemy.position[z]-enemy.collisionBox[z]/2) + " " + (enemy.position[z]+enemy.collisionBox[z]/2));
	
	currentlyPressedEntity = null;
	while (currentPos[y] > world.position[y]) {
		currentPos[x] += final_vector[x];
		currentPos[y] += final_vector[y];
		currentPos[z] += final_vector[z];

		
		var clickedObject = checkCollisionWithObjects(currentPos);
		if(clickedObject != null)
		{
			currentPos[x] = clickedObject.position[x];
			currentPos[y] = clickedObject.position[y];
			currentPos[z] = clickedObject.position[z];
			currentlyPressedEntity = clickedObject;
			console.log("Clicked entity " + currentlyPressedEntity.name);
			
			break;
		}
		
		
		count++;
		if (count > limit) break;
	}
	if (count <= limit) console.log("Clicked position | x: " + currentPos[x] + " z: " + currentPos[z]);
	else console.log("BAD CLICKED POSITION");
	
	//We pass the values to the mouseCorrdinate variable for further use.
	
	currentlyPressedMouseCoordinates[x] = currentPos[x];
	currentlyPressedMouseCoordinates[y] = world.position[y]+world.offset[y];
	currentlyPressedMouseCoordinates[z] = currentPos[z];
	
	
	//Testing: draw an object where we clicked
	//CAN BE DELETED
	/*qwe = new Hero();
	qwe.load();
	
	setTimeout(function() {
		qwe.position = currentPos;
		qwe.draw();
	},200);*/

}


function handleKeys() {

	// Left cursor key or A
	if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {

		camera.direction[x] = 1;
	} 
	// Right cursor key or D
	else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {

		camera.direction[x] = -1;
	} 
	else {
		camera.direction[x] = 0;
	}

	// Up cursor key or W
	if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) {

		camera.direction[z] = 1;
	} 
	// Down cursor key
	else if (currentlyPressedKeys[40] || currentlyPressedKeys[83]) {
		camera.direction[z] = -1;
	} 
	else {
		camera.direction[z] = 0;
	}

	// Q key
	if (currentlyPressedKeys[81]) {
		camera.direction[y] = 1;
	} 
	// E key
	else if (currentlyPressedKeys[69]) {
		camera.direction[y] = -1;
	} 
	else {
		camera.direction[y] = 0;
	}
  
  
  
  
  
  
  ///////////////////////// debug only ////////////////////////////////
  /*
	if(currentlyPressedKeys[102]) {
		hero.direction[x]=1;
		//hero.move=true;
	}
	else if(currentlyPressedKeys[100]) {
		hero.direction[x]=-1;
		//hero.move=false;
	}
	else {
		hero.direction[x]=0;
		//hero.move=false;
	}
	
	if(currentlyPressedKeys[104]) {
		hero.direction[z]=-1;
		//hero.move=true;
	}
	else if(currentlyPressedKeys[98]) {
		hero.direction[z]=1;
		//hero.move=true;
	}
	else {
		hero.direction[z]=0;
		//hero.move=false;
	}
	
	
	if(currentlyPressedKeys[101]) {
		
		hero.destination[x]=-8.1360884308815;
		hero.destination[z]=1.0930535793304443;
		//hero.destination[x]=0;
		//hero.destination[y]=hero.position[y];
		//hero.destination[x]=1;
		//hero.destination[z]=1;
		hero.waypointMove=true;
	}
	else {
		//hero.destination[x]=0;
		//hero.destination[y]=0;
		//hero.destination[z]=0;
		//hero.waypointMove=false;
		//hero.move=true;
	}
	*/
}


