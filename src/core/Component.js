// @flow
import { type Point } from '../utils';

import { IScene } from './Scene';
import { IGameObject } from './GameObject';
import { IRenderingContext } from './RenderingContext';

export interface IStateComponent {
  +_state: Object;
  get(key: string): any;
  set(key: string, value: any): IStateComponent;
}

export class StateComponent {
  _state: Object;

  constructor(state: Object = {}) {
    this._state = state;
  }

  get(key: string) {
    return this._state[key];
  }

  set(key: string, value: any) {
    this._state[key] = value;
    return this;
  }
}

export interface ITransitionComponent {
  +_position: Point;
  +_rotation: Point;
  +_velocity: Point;
  getPosition(): Point;
  getRotation(): Point;
  getVelocity(): Point;
  setPosition(p: Point): ITransitionComponent;
  setRotation(p: Point): ITransitionComponent;
  setVelocity(p: Point): ITransitionComponent;
}

export class TransitionComponent implements ITransitionComponent {
  _position: Point;
  _rotation: Point;
  _velocity: Point;

  constructor(position: Point, rotation: Point = { x: 0, y: 0 }, velocity: Point = { x: 0, y: 0 }) {
    this._position = position;
    this._rotation = rotation;
    this._velocity = velocity;
  }

  getPosition() {
    return this._position;
  }

  getRotation() {
    return this._rotation;
  }

  getVelocity() {
    return this._velocity;
  }

  setPosition(p: Point) {
    this._position = p;
    return this;
  }

  setRotation(p: Point) {
    this._rotation = p;
    return this;
  }

  setVelocity(p: Point) {
    this._velocity = p;
    return this;
  }
}

export interface IInputComponent {
  update(object: IGameObject, scene: IScene): void;
}

export interface IPhysicsComponent {
  update(object: IGameObject, scene: IScene, dt: number): void;
}

export interface IGraphicsComponent {
  update(object: IGameObject, renderingContext: IRenderingContext, remainder: number): void;
}
