// @flow

import 'normalize.css';

/**
 * Hi Res time in seconds
 */
const hiResTime = () => performance.now();

class InputController {}

class GameObject {}

class Scene {
  _objects: GameObject[];

  constructor(gameObjects: GameObject[]) {
    this._objects = gameObjects;
  }

  handleInput(inputController: InputController) {}

  update(dt: number) {}

  render(remainder: number) {}
}

/**
 * Main Game class. Controls game loop and scene processing
 */
class Game {
  _inputController: InputController;

  _scenes: Scene[];
  _activeScene: number;

  _running: boolean;

  _dt: number;
  _lag: number;
  _current: number;
  _previous: number;
  _elapsed: number;

  /**
   * @param {Scene[]} scenes Game scenes collection
   * @param {InputController} inputController InputController instance for game loop process input step
   * @param {number} dt Constant delta step for game loop update step
   */
  constructor(scenes: Scene[], inputController: InputController, dt: number = 1000 / 30) {
    if (scenes.length === 0) {
      throw new Error('At least one Scene should be provided');
    }

    this._scenes = scenes;
    this._inputController = inputController;
    this._activeScene = 0;
    this._running = false;

    this._dt = dt;
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
   * Set provided scene active
   *
   * @param {Scene} scene
   */
  setSceneActive(scene: Scene) {
    const id = this._scenes.findIndex(s => s === scene);
    if (id !== -1) {
      this.setActive(id);
    }
  }

  /**
   * Set scene active by id in the game scenes collection
   *
   * @param {number} id
   */
  setActive(id: number) {
    if (this._scenes[id] instanceof Scene) {
      // TODO: Reset scene before setting active?
      this._activeScene = id;
    } else {
      throw new Error('No Scene with id "' + id + '" found in Game');
    }
  }

  /**
   * Get active game scene
   *
   * @returns {Scene} active game scene
   */
  getActive() {
    return this._scenes[this._activeScene];
  }

  /**
   * Set next scene active
   * (looped, if current scene is last in collection, will set first scene active)
   */
  next() {
    const id = this._activeScene === this._scenes.length - 1 ? 0 : this._activeScene + 1;
    this.setActive(id);
  }

  /**
   * Set previous scene active
   * (looped, if current scene is first in collection, will set last scene active)
   */
  prev() {
    const id = this._activeScene === 0 ? this._scenes.length - 1 : this._activeScene - 1;
    this.setActive(id);
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
   * 1) Run Scene.handleInput
   * 2) Run Scene physics update as much times as needed
   * 3) Render Scene
   */
  _update() {
    const scene = this.getActive();

    this._current = hiResTime();
    // Calc time between frames
    this._elapsed = this._current - this._previous;
    this._previous = this._current;
    // Add remainder of time form previous frame
    this._lag += this._elapsed;

    scene.handleInput(this._inputController);

    // Run scene update (n = _lag % _dt) times;
    while (this._lag >= this._dt) {
      scene.update(this._dt);
      this._lag -= this._dt;
    }

    // Render scene
    scene.render(this._lag / this._dt);
    // Waint for another frame
    if (this._running) {
      requestAnimationFrame(() => this._update());
    }
  }
}

const scene = new Scene([]);
const inputController = new InputController();
const game = new Game([scene], inputController);

game.start();
