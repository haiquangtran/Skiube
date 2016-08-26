var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	 game.load.image('star', 'assets/star.png');
	 game.load.image('redSquare', 'assets/redSquare.png');
}

function create() {
	game.add.sprite(0, 0, 'star');
	game.add.sprite(100, 100, 'redSquare');
}


function update() {
}