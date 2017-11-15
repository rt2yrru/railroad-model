// @flow

import { IScene } from './Scene';

import {
  IStateComponent,
  IInputComponent,
  IPhysicsComponent,
  IGraphicsComponent,
  ITransitionComponent,
} from './Component';

export interface IGameObject {
  +_state: ?IStateComponent;
  +_input: ?IInputComponent;
  +_physics: ?IPhysicsComponent;
  +_graphics: ?IGraphicsComponent;
  +_transition: ITransitionComponent;

  handleInput(scene: IScene): void;
  update(scene: IScene, dt: number): void;
  render(scene: IScene, remainder: number): void;

  getState(): ?IStateComponent;
  getTransition(): ITransitionComponent;
}

type GameObjectParams = {
  state: ?IStateComponent,
  input: ?IInputComponent,
  physics: ?IPhysicsComponent,
  graphics: ?IGraphicsComponent,
  transition: ITransitionComponent,
};

export class GameObject implements IGameObject {
  _state: ?IStateComponent;
  _input: ?IInputComponent;
  _physics: ?IPhysicsComponent;
  _graphics: ?IGraphicsComponent;
  _transition: ITransitionComponent;

  constructor({ state, input, physics, graphics, transition }: GameObjectParams) {
    this._state = state;
    this._input = input;
    this._physics = physics;
    this._graphics = graphics;
    this._transition = transition;
  }

  getState() {
    return this._state;
  }

  getTransition() {
    return this._transition;
  }

  handleInput(scene: IScene): void {
    if (this._input != null) {
      this._input.update(this, scene);
    }
  }

  update(scene: IScene, dt: number): void {
    if (this._physics != null) {
      this._physics.update(this, scene, dt);
    }
  }

  render(scene: IScene, remainder: number): void {
    if (this._graphics != null) {
      this._graphics.update(this, scene.getRenderingContext(), remainder);
    }
  }
}
