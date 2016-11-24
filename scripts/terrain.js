var t=[[[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' ']],
			[[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[4,' '],[0,' ']],
			[[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[3,'z'],[0,' ']],
			[[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[2,'z'],[0,' ']],
			[[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[1,'z'],[0,' ']],
			[[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' ']],
			[[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' ']],
			[[5,'x'],[4,'x'],[3,'x'],[2,'x'],[1,'x'],[0,' '],[0,' '],[0,' '],[0,' '],[0,' ']],
			[[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' ']],
			[[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' '],[0,' ']],
			];
			
var zamik=t.length/2;
			
function loadTerrain(){
	for(var i=0; i<t.length; i++)
			for(var j=0; j<t[i].length; j++){
				/*for(var k=0; k<t[i][j][0]-1; k++){
					world.push(new World());
					world[world.length - 1].name = "World";
					world[world.length - 1].load("./assets/stair.obj");
					world[world.length - 1].position[x]=5*(j-zamik);
					world[world.length - 1].position[y]=k;
					world[world.length - 1].position[z]=5*(i-zamik);
				}
					world.push(new World());
					world[world.length - 1].name = "World";
					world[world.length - 1].load("./assets/stair.obj");
					world[world.length - 1].position[x]=5*(j-zamik);
					world[world.length - 1].position[y]=t[i][j][0]-1;
					world[world.length - 1].position[z]=5*(i-zamik);*/
					
					switch(t[i][j][1]){
						case 'x':
							if(j-1<0)
								stairsX(i, j, t[i][j][0], 555, t[i][j+1][0]);
							else if(j+1>=t.length)
								stairsX(i, j, t[i][j][0], t[i][j-1][0], 555);
							else
								stairsX(i, j, t[i][j][0], t[i][j-1][0], t[i][j+1][0]);
							break;
						case 'z':
							if(i-1<0)
								stairsZ(i, j, t[i][j][0], 555, t[i+1][j][0]);
							else if(i+1>=t.length)
								stairsZ(i, j, t[i][j][0], t[i-1][j][0], 555);
							else
								stairsZ(i, j, t[i][j][0], t[i-1][j][0], t[i+1][j][0]);
							break;
						default: break;
					}
			}
}

function stairsX(a, b, c, d, e){
	if(d>e){
		world.push(new World());
		world[world.length - 1].name = "World";
		world[world.length - 1].load("./assets/stair_x.obj");
		world[world.length - 1].position[x]=5*(b-zamik);
		world[world.length - 1].position[y]=c-0.5;
		world[world.length - 1].position[z]=5*(a-zamik);
		world.push(new World());
		world[world.length - 1].name = "World";
		world[world.length - 1].load("./assets/stair_x.obj");
		world[world.length - 1].position[x]=5*(b-zamik)+2.5;
		world[world.length - 1].position[y]=c-1;
		world[world.length - 1].position[z]=5*(a-zamik);
	}
	
	else{
		world.push(new World());
		world[world.length - 1].name = "World";
		world[world.length - 1].load("./assets/stair_x.obj");
		world[world.length - 1].position[x]=5*(b-zamik);
		world[world.length - 1].position[y]=c-1;
		world[world.length - 1].position[z]=5*(a-zamik);
		world.push(new World());
		world[world.length - 1].name = "World";
		world[world.length - 1].load("./assets/stair_x.obj");
		world[world.length - 1].position[x]=5*(b-zamik)+2.5;
		world[world.length - 1].position[y]=c-0.5;
		world[world.length - 1].position[z]=5*(a-zamik);
	}
		
	
	for(var i=0; i<c; i++){
		
		
		obstacle.push(new World());
		obstacle[obstacle.length - 1].name = "Obstacle";
		obstacle[obstacle.length - 1].load("./assets/wall_x.obj");
		obstacle[obstacle.length - 1].position[x] = 5*(b-zamik);
		obstacle[obstacle.length - 1].position[z] = 5*(a-zamik)-zamik/2;
		obstacle[obstacle.length - 1].position[y] = i-1+0.5;
		
		obstacle.push(new World());
		obstacle[obstacle.length - 1].name = "Obstacle";
		obstacle[obstacle.length - 1].load("./assets/wall_x.obj");
		obstacle[obstacle.length - 1].position[x] = 5*(b-zamik);
		obstacle[obstacle.length - 1].position[z] = 5*(a+1-zamik)-zamik/2;
		obstacle[obstacle.length - 1].position[y] = i-1+0.5;
	}
}

function stairsZ(a, b, c, d, e){
	if(d>e){
		world.push(new World());
		world[world.length - 1].name = "World";
		world[world.length - 1].load("./assets/stair_z.obj");
		world[world.length - 1].position[x]=5*(b-zamik);
		world[world.length - 1].position[y]=c-0.5;
		world[world.length - 1].position[z]=5*(a-zamik);
		world.push(new World());
		world[world.length - 1].name = "World";
		world[world.length - 1].load("./assets/stair_z.obj");
		world[world.length - 1].position[x]=5*(b-zamik);
		world[world.length - 1].position[y]=c-1;
		world[world.length - 1].position[z]=5*(a-zamik)+2.5;
	}
	
	else{
		world.push(new World());
		world[world.length - 1].name = "World";
		world[world.length - 1].load("./assets/stair_z.obj");
		world[world.length - 1].position[x]=5*(b-zamik);
		world[world.length - 1].position[y]=c-1;
		world[world.length - 1].position[z]=5*(a-zamik);
		world.push(new World());
		world[world.length - 1].name = "World";
		world[world.length - 1].load("./assets/stair_z.obj");
		world[world.length - 1].position[x]=5*(b-zamik);
		world[world.length - 1].position[y]=c-0.5;
		world[world.length - 1].position[z]=5*(a-zamik)+2.5;
	}
		
	
	for(var i=0; i<c; i++){
		
		
		obstacle.push(new World());
		obstacle[obstacle.length - 1].name = "Obstacle";
		obstacle[obstacle.length - 1].load("./assets/wall_z.obj");
		obstacle[obstacle.length - 1].position[x] = 5*(b-zamik)-zamik/2;
		obstacle[obstacle.length - 1].position[z] = 5*(a-zamik);
		obstacle[obstacle.length - 1].position[y] = i-1+0.5;
		
		obstacle.push(new World());
		obstacle[obstacle.length - 1].name = "Obstacle";
		obstacle[obstacle.length - 1].load("./assets/wall_z.obj");
		obstacle[obstacle.length - 1].position[x] = 5*(b+1-zamik)-zamik/2;
		obstacle[obstacle.length - 1].position[z] = 5*(a-zamik);
		obstacle[obstacle.length - 1].position[y] = i-1+0.5;
	}
}