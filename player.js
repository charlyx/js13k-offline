function createKeyboardListeners(player) {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      player.move_right = true
    }
    if (e.key === 'ArrowLeft') {
      player.move_left = true
    }
    if (e.key === ' ') {
      player.jumpPressed = true
    }
  })

  document.addEventListener('keyup', e => {
    if (e.key === 'ArrowRight') {
      player.move_right = false
    }
    if (e.key === 'ArrowLeft') {
      player.move_left = false
    }
    if (e.key === ' ') {
      player.jumpPressed = false
    }
  })
}

export class Player { 
  constructor(position = {x: 0, y: 0}) {
    // TODO : faire en sorte qu'un saut passe jusqu'à 7 cases de distance
    // TODO : le saut amène à une hauteur de 2 cases et demi au plus haut
    this.GRAVITY = 1.5
    this.WALK_FORCE = 0.06
    this.WALK_MIN_SPEED = 0.5
    this.WALK_MAX_SPEED = 10
    this.MAX_FALL_SPEED = 16
    this.STOP_FORCE = 3
    this.JUMP_SPEED = 7
    this.JUMP_MAX_AIRBORNE_TIME = 15
    this.jumping = false
    this.on_air_time = 0
    this.prev_jump_pressed = false
    this.position = position
    this.velocity = {x: 0, y: 0}

    createKeyboardListeners(this)

    this.element = document.getElementById('gerard')
    
    this.move_left = this.move_right = this.jumpPressed = false
  }

  move(refreshRate) {
    this.calculateMovement(refreshRate)
    this.applyMovement()
  }

  calculateMovement(delta) {

    if (this.move_left) {
      this.velocity.x -= (this.WALK_FORCE * delta) + this.STOP_FORCE
      if(this.velocity.x < -this.WALK_MAX_SPEED) {
        this.velocity.x = -this.WALK_MAX_SPEED
      }
    } else if (this.move_right) {
      this.velocity.x += (this.WALK_FORCE * delta) + this.STOP_FORCE
      if(this.velocity.x > this.WALK_MAX_SPEED) {
        this.velocity.x = this.WALK_MAX_SPEED
      }
    }


    const vsign = Math.sign(this.velocity.x)
    let vlen = Math.abs(this.velocity.x)

    vlen -= this.jumping ? this.STOP_FORCE / 2 : this.STOP_FORCE
    if (vlen < 0) vlen = 0

    this.velocity.x = vlen * vsign
    this.velocity.y += this.GRAVITY

    if(this.velocity.y > this.MAX_FALL_SPEED) {
      this.velocity.y = this.MAX_FALL_SPEED
    }

    // si player intersect avec une div (faire une ligne), alors considérer qu'il est au sol et mettre on_air_time à 0
    // et mettre velocity.y à 0
    if ((this.position.y + this.velocity.y) >= 400) {
      this.position.y = 400
      this.velocity.y = 0
      this.on_air_time = 0
      this.jumping = false
    }

    this.on_air_time += 1

    if (this.on_air_time < this.JUMP_MAX_AIRBORNE_TIME && this.jumpPressed) {
      this.velocity.y -= this.JUMP_SPEED / this.on_air_time
      this.jumping = true
    }
  }

  applyMovement() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.element.style.top = `${this.position.y}px`
    this.element.style.left = `${this.position.x}px`
  }
}