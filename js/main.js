// Phaser current version test environment
// Smoothed camera with parallax scrolling 


var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'test',null,false);

var BasicGame = function(game) {};

BasicGame.Boot = function (game) {
    // nothing here
};

var cameraPos = new Phaser.Point(0, 0);

BasicGame.Boot.prototype = 
{
    preload: function() {
      game.time.advancedTiming = true;
    },
	create: function() 
	{
        // generate a background so we can see the world/camera movement
        var checkerboard = game.add.bitmapData(1024, 1024, null, true);
        checkerboard.rect(0, 0, 32, 32, 'rgba(255,255,255,1)');
        checkerboard.rect(32, 32, 32, 32, 'rgba(255,255,255,1)');
        
        this.bg = game.add.tileSprite(0, 0, game.width, game.height, checkerboard);
        this.bg.fixedToCamera = true;
        this.bg.tileScale.set(0.5);
        this.bg.tint = 0x660000;
        
        this.bgnear = game.add.tileSprite(0, 0, game.width, game.height, checkerboard);
        this.bgnear.fixedToCamera = true;
        this.bgnear.tint = 0xcc4400;
        
        this.square = game.add.group();
        this.square.speed = 5;
        
        var squareGraphics = game.add.graphics();
        squareGraphics.beginFill(0xffffff);
        squareGraphics.drawCircle(0, 0, 16);
        this.square.add(squareGraphics);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        this.game.world.setBounds(-512, -512, 1024, 1024);
        cameraPos.setTo(this.square.x, this.square.y);
    },
    update: function() 
    {
        if (this.cursors.left.isDown) {
            this.square.x -= this.square.speed;
        }
        else if (this.cursors.right.isDown) {
            this.square.x += this.square.speed;   
        }
        if (this.cursors.up.isDown) {
            this.square.y -= this.square.speed;
        }
        else if (this.cursors.down.isDown) {
            this.square.y += this.square.speed;   
        }
        
        // change this value to alter the amount of damping, lower values = smoother camera movement
        var lerp = 0.1;
        cameraPos.x += (this.square.x - cameraPos.x) * lerp;
        cameraPos.y += (this.square.y - cameraPos.y) * lerp;
        
        this.game.camera.focusOnXY(cameraPos.x, cameraPos.y);
        this.bg.tilePosition.set(this.game.camera.x * -0.5, this.game.camera.y * -0.5);
        this.bgnear.tilePosition.set(this.game.camera.x * -1, this.game.camera.y * -1);
        
    }, 
    render: function()
    {
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");   
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
