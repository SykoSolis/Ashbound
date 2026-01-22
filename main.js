// =====================
// ASHBOUND - MAIN.JS
// =====================

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#1a1a2e",
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
let background;
let titleGlow;

// ---------------------
// PRELOAD
// ---------------------
function preload() {
    this.load.image('titleBackground', 'assets/title-background.png');
}

// ---------------------
// CREATE
// ---------------------
function create() {
    const scene = this;

    if (this.textures.exists('titleBackground')) {
        background = this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'titleBackground'
        );
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    } else {
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x0f0f1e, 0x0f0f1e, 1);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, this.cameras.main.width);
            const y = Phaser.Math.Between(0, this.cameras.main.height);
            const size = Phaser.Math.Between(1, 3);
            graphics.fillStyle(0xffffff, Phaser.Math.FloatBetween(0.3, 0.8));
            graphics.fillRect(x, y, size, size);
        }
    }

    titleGlow = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 50,
        "ASHBOUND",
        {
            fontSize: '72px',
            fill: '#ff6b35',
            stroke: '#000000',
            strokeThickness: 8
        }
    );
    titleGlow.setOrigin(0.5);

    titleText = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 50,
        "ASHBOUND",
        {
            fontSize: '72px',
            fill: '#ffffff',
            stroke: '#ff6b35',
            strokeThickness: 4
        }
    );
    titleText.setOrigin(0.5);

    this.tweens.add({
        targets: titleText,
        y: titleText.y - 10,
        duration: 2000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    this.tweens.add({
        targets: titleGlow,
        y: titleGlow.y - 10,
        duration: 2000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    this.tweens.add({
        targets: titleGlow,
        alpha: 0.6,
        duration: 1500,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    hintText = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 120,
        "Press any key to start...",
        {
            fontSize: '24px',
            fill: '#aaaaaa',
            stroke: '#000000',
            strokeThickness: 4
        }
    );
    hintText.setOrigin(0.5);

    this.tweens.add({
        targets: hintText,
        alpha: 0.3,
        duration: 1000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

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

    titleText.setVisible(false);
    titleGlow.setVisible(false);
    hintText.setVisible(false);
    if (background) {
        background.setVisible(false);
    }

    player = scene.add.rectangle(
        scene.cameras.main.centerX,
        scene.cameras.main.centerY,
        32,
        32,
        0x00ffcc
    );

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