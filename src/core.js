// @flow
import { hiResTime } from './utils';

export interface IInputManager {}

export interface IRenderingContext {}

export interface IScene {
  +_objects: IGameObject[];
  +_renderingContext: IRenderingContext;
  handleInput(inputManager: IInputManager): void;
  update(dt: number): void;
  render(remainder: number): void;
  getRenderingContext(): IRenderingContext;
}

export interface IGameObject {
  handleInput(scene: IScene, inputManager: IInputManager): void;
  update(scene: IScene, dt: number): void;
  render(scene: IScene, remainder: number): void;
}

export class Scene implements IScene {
  _objects: IGameObject[];
  _renderingContext: IRenderingContext;

  constructor(gameObjects: IGameObject[], renderingContext: IRenderingContext) {
    this._objects = gameObjects;
    this._renderingContext = renderingContext;
  }

  handleInput(inputManager: IInputManager) {
    this._objects.forEach(gameObject => gameObject.handleInput(this, inputManager));
  }

  update(dt: number) {
    this._objects.forEach(gameObject => gameObject.update(this, dt));
  }

  render(remainder: number) {
    this._objects.forEach(gameObject => gameObject.render(this, remainder));
  }

  getRenderingContext() {
    return this._renderingContext;
  }
}

/**
 * Main Game class. Controls game loop and scene processing
 */
export class Game {
  _inputManager: IInputManager;

  _scenes: IScene[];
  _activeIScene: number;

  _running: boolean;

  _dt: number;
  _lag: number;
  _current: number;
  _previous: number;
  _elapsed: number;

  /**
   * @param {IScene[]} scenes Game scenes collection
   * @param {IInputManager} inputManager IInputManager instance for game loop process input step
   * @param {number} fps Frames per second
   */
  constructor(scenes: IScene[], inputManager: IInputManager, fps: number = 30) {
    if (scenes.length === 0) {
      throw new Error('At least one IScene should be provided');
    }

    this._scenes = scenes;
    this._inputManager = inputManager;
    this._activeIScene = 0;
    this._running = false;

    this._dt = 1000 / fps;
    this._reset();
  }

  /**
   * Reset game time
   */
  _reset() {
    this._lag = 0;
    this._current = 0;
    this._previous = 0;
    this._elapsed = 0;
  }

  /**
   * Get active game scene
   *
   * @returns {IScene} active game scene
   */
  getActive() {
    return this._scenes[this._activeIScene];
  }

  /**
   * Starts game loop
   */
  start() {
    this._reset();
    this._previous = hiResTime();
    this._running = true;

    this._update();
  }

  /**
   * Stops game loop
   */
  stop() {
    this._running = false;
  }

  /**
   * Game loop cycle:
   *
   * 1) Run IScene.handleInput
   * 2) Run IScene physics update as much times as needed
   * 3) Render IScene
   */
  _update() {
    if (!this._running) return;

    const scene = this.getActive();

    this._current = hiResTime();
    // Calc time between frames
    this._elapsed = this._current - this._previous;
    this._previous = this._current;
    // Add remainder of time form previous frame
    this._lag += this._elapsed;

    scene.handleInput(this._inputManager);

    // Run scene update (n = _lag % _dt) times;
    while (this._lag >= this._dt) {
      scene.update(this._dt);
      this._lag -= this._dt;
    }

    // Render scene
    scene.render(this._lag / this._dt);
    // Wait for another frame
    requestAnimationFrame(() => this._update());
  }
}