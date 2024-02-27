import { Vector2 } from 'three'

interface Velocity {
  x: number
  y: number
}

export class SmoothMotionController {
  private currentPosition: Vector2
  private currentVelocity: Vector2
  private targetVelocity: Velocity
  private dampingFactor: number

  constructor(
    initialPosition: Vector2,
    initialVelocity: Velocity,
    dampingFactor: number = 0.1
  ) {
    this.currentPosition = initialPosition
    this.currentVelocity = new Vector2(initialVelocity.x, initialVelocity.y)
    this.targetVelocity = { ...initialVelocity }
    this.dampingFactor = dampingFactor
  }

  setTargetVelocity(velocity: Velocity) {
    this.targetVelocity = velocity
  }

  update(delta: number) {
    // Apply cubic interpolation to smoothly transition the current velocity towards the target velocity
    this.currentVelocity.x +=
      (this.targetVelocity.x - this.currentVelocity.x) *
      this.dampingFactor *
      delta
    this.currentVelocity.y +=
      (this.targetVelocity.y - this.currentVelocity.y) *
      this.dampingFactor *
      delta

    // Update position based on the current velocity and the time delta
    this.currentPosition.x += this.currentVelocity.x * delta * 3
    this.currentPosition.y += this.currentVelocity.y * delta * 3
  }

  getPosition(): Vector2 {
    return this.currentPosition
  }

  public reset() {
    this.currentPosition = new Vector2(0, 0)
    this.currentVelocity = new Vector2(0, 0)
    this.targetVelocity = { x: 0, y: 0 }
  }
}
