import Phaser from 'phaser'
import Inventory from '../sprites/Inventory'
export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game
    this.stuff = {
      potion: 0,
      gold: 0
    }
    this.hearts = []
    this.life = 1
    this.anchor.setTo(1)
    this.scale.setTo(1)
    this.game.physics.arcade.enable(this)
    this.body.mass = 0
    this.body.bounce.y = 0
    this.body.gravity.y = 0
    this.body.gravity.x = 0
    this.body.velocity.x = 0
    this.body.collideWorldBounds = true
    this.body.setSize(30, 25, 13, 35)

    this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
    this.initMouvement()
    this.initAnimation()
    this.lifePoint()

    this.animations.play('bottom')
    this.animations.stop()

    this.inventory = new Inventory({
      game: this.game,
      player: this
    })
  }

  update () {
    this.body.velocity.y = 0
    this.body.velocity.x = 0
    if (this.upButton.isDown) {
      this.body.velocity.y = -300
      this.animations.play('top')
    } else if (this.downButton.isDown) {
      this.body.velocity.y = 300
      this.animations.play('bottom')
    } else if (this.leftButton.isDown) {
      this.body.velocity.x = -300
      this.animations.play('left')
    } else if (this.rightButton.isDown) {
      this.animations.play('right')
      this.body.velocity.x = 300
    } else {
      this.animations.stop()
    }
  }
  initMouvement () {
    this.upButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.downButton = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.DOWN, Phaser.Keyboard.RIGHT])
  }
  initAnimation () {
    this.animations.add('left', [208, 209, 210, 211, 212, 213, 214, 215], 10, true)
    this.animations.add('right', [254, 255, 256, 257, 258, 259, 260], 10, true)
    this.animations.add('bottom', [231, 232, 233, 234, 235, 236, 237, 238], 10, true)
    this.animations.add('top', [185, 186, 187, 188, 189, 190, 191, 192], 10, true)
  }

  lifePoint () {
    var heartPos = 50
    this.hearts.map(heart => {
      heart.destroy()
    })

    this.hearts = []

    for (var i = 1; i <= this.life; i++) {
      this.hearts.push(this.game.add.sprite(heartPos, 50, 'heart'))
      this.hearts[this.hearts.length - 1].scale.setTo(0.2)
      this.hearts[this.hearts.length - 1].fixedToCamera = true
      heartPos += 50
    }
  }
}
