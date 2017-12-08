// @flow

export interface IRenderingContext {
  +_width: number;
  +_height: number;
  +_canvas: HTMLCanvasElement;
  +_context: CanvasRenderingContext2D;
  getContext(): CanvasRenderingContext2D;
  clear(): void;
}

export class CanvasContext2D implements IRenderingContext {
  _width: number;
  _height: number;
  _canvas: HTMLCanvasElement;
  _context: CanvasRenderingContext2D;

  constructor(selector: string, width: number, height: number) {
    this._width = width;
    this._height = height;

    const canvas = document.querySelector(selector);

    if (canvas === null) {
      throw new Error('DOM Element "' + selector + '" not found');
    }

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('DOM Element "' + selector + '" is not a canvas');
    }

    this._canvas = canvas;
    this._canvas.width = width;
    this._canvas.height = height;
    this._canvas.style.width = width + 'px';
    this._canvas.style.height = height + 'px';

    const context = canvas.getContext('2d');

    if (context == null) {
      throw new Error('Context not found on DOM Element "' + selector + '"');
    }

    this._context = context;
  }

  getContext() {
    return this._context;
  }

  clear() {
    this._context.clearRect(0, 0, this._width, this._height);
  }
}
