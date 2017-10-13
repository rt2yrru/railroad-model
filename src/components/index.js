// @flow
import { IGraphicsComponent } from '../core/Component';
import { ISprite } from '../core/Sprite';
import { IGameObject } from '../core/GameObject';
import { IRenderingContext } from '../core/RenderingContext';

export class SpriteGraphicsComponent implements IGraphicsComponent {
  _sprite: ISprite;

  constructor(sprite: ISprite) {
    this._sprite = sprite;
  }

  update(object: IGameObject, renderingContext: IRenderingContext) {
    const { x, y } = object.getTransition().getPosition();
    const { x: width, y: height } = this._sprite.getSize();

    // TODO: Rotation
    // TODO: Velocity

    renderingContext.getContext().drawImage(this._sprite.getTexture(), x, y, width, height);
  }
}
