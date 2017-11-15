// @flow
import { hiResTime } from '../utils';

import { IScene } from './Scene';

/**
 * Main Game class. Controls game loop and scene processing
 */
export class Game {
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
   * @param {number} fps Frames per second
   */
  constructor(scenes: IScene[], fps: number = 30) {
    if (scenes.length === 0) {
      throw new Error('At least one IScene should be provided');
    }

    this._scenes = scenes;
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

    scene.handleInput();

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
