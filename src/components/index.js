// @flow
import { IGraphicsComponent, IPhysicsComponent } from '../core/Component';
import { ISprite } from '../core/Sprite';
import { IScene } from '../core/Scene';
import { IGameObject } from '../core/GameObject';
import { IRenderingContext } from '../core/RenderingContext';

export class MovementPhysicsComponent implements IPhysicsComponent {
  update(object: IGameObject, scene: IScene, dt: number) {
    const objectTransition = object.getTransition()

    const { x: posX, y: posY } = objectTransition.getPosition();
    const { x: velX, y: velY } = objectTransition.getVelocity();

    if (posX >= 304) {
      objectTransition.setVelocity({ x: -4, y: -2 });
    } else if (posX <= 0) {
      objectTransition.setVelocity({ x: 4, y: 2 });
    }

    objectTransition.setPosition({
      x: posX + velX,
      y: posY + velY,
    });
  }
}

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
