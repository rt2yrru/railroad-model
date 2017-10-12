// @flow

export interface IRenderingContext {
  +_width: number;
  +_height: number;
  +_canvas: HTMLCanvasElement;
  +_context: CanvasRenderingContext2D;
  getContext(): CanvasRenderingContext2D;
}

export class Canvas implements IRenderingContext {
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

    const context = canvas.getContext('2d');

    if (context == null) {
      throw new Error('Context not found on DOM Element "' + selector + '"');
    }

    this._context = context;
  }

  getContext() {
    return this._context;
  }
}
