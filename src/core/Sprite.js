// @flow
import { type Point } from '../utils';

export interface ISprite {
  +_width: number;
  +_height: number;
  +_ready: boolean;
  +_texture: HTMLImageElement;
  getWidth(): number;
  getHeight(): number;
  getSize(): Point;
  getTexture(): HTMLImageElement;
  isReady(): boolean;
}

export class Sprite implements ISprite {
  _width: number;
  _height: number;
  _ready: boolean;

  _texture: HTMLImageElement;

  constructor(src: string, width: number, height: number) {
    this._ready = false;
    this._width = width;
    this._height = height;

    this._texture = new Image(width, height);
    this._texture.onload = () => (this._ready = true);
    this._texture.src = src;
  }

  getWidth() {
    return this._width;
  }

  getHeight() {
    return this._height;
  }

  getSize() {
    return {
      x: this._width,
      y: this._height,
    };
  }

  getTexture() {
    return this._texture;
  }

  isReady() {
    return this._ready;
  }
}
