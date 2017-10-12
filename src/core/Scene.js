// @flow
import { IGameObject } from './GameObject';
import { IRenderingContext } from './RenderingContext';
import { IInputManager } from './InputManager';

export interface IScene {
  +_objects: IGameObject[];
  +_renderingContext: IRenderingContext;
  handleInput(inputManager: IInputManager): void;
  update(dt: number): void;
  render(remainder: number): void;
  getRenderingContext(): IRenderingContext;
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
