// =====================
// ASHBOUND - MAIN.JS
// =====================

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#0d0d0d",
    parent: null,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

// Global variables
let player;
let cursors;
let titleText;
let hintText;
let gameStarted = false;

// ---------------------
// PRELOAD
// ---------------------
function preload() {
    // Load assets here later (player sprites, tilesets, etc)
    // Example:
    // this.load.image('player', 'assets/player.png');
}

// ---------------------
// CREATE
// ---------------------
function create() {
    const scene = this;

    // TITLE SCREEN
    titleText = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Ashbound",
        { font: "80px Arial", fill: "#ffffff" }
    );
    titleText.setOrigin(0.5);

    hintText = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 100,
        "Press any key to start...",
        { font: "28px Arial", fill: "#aaaaaa" }
    );
    hintText.setOrigin(0.5);

    // Listen for any key press to start the game
    this.input.keyboard.on("keydown", () => {
        if (!gameStarted) {
            startGame(scene);
        }
    });
}

// ---------------------
// START GAME FUNCTION
// ---------------------
function startGame(scene) {
    gameStarted = true;

    // Remove title text
    titleText.setVisible(false);
    hintText.setVisible(false);

    // Create player (placeholder square)
    player = scene.add.rectangle(
        scene.cameras.main.centerX,
        scene.cameras.main.centerY,
        32,
        32,
        0x00ffcc
    );

    // Set up controls
    cursors = scene.input.keyboard.createCursorKeys();
}

// ---------------------
// UPDATE LOOP
// ---------------------
function update() {
    if (!gameStarted || !player) return;

    const speed = 5;

    if (cursors.left.isDown) player.x -= speed;
    if (cursors.right.isDown) player.x += speed;
    if (cursors.up.isDown) player.y -= speed;
    if (cursors.down.isDown) player.y += speed;
}

// ---------------------
// RESIZE HANDLER
// ---------------------
window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});