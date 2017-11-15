// @flow
import 'normalize.css';
import './index.css';

import grassTile from './assets/grass_16x16.png';

import { Game, GameObject, Scene, Canvas, TransitionComponent, Sprite } from './core';
import { SpriteGraphicsComponent, MovementPhysicsComponent } from './components';

const renderingContext = new Canvas('canvas', 320, 240);

const sprite = new Sprite(grassTile, 16, 16);

const grassGraphics = new SpriteGraphicsComponent(sprite);

const object1 = new GameObject({
  transition: new TransitionComponent({ x: 0, y: 0 }),
  graphics: grassGraphics,
});

const object2 = new GameObject({
  transition: new TransitionComponent({ x: 16, y: 0 }),
  graphics: grassGraphics,
});

const object3 = new GameObject({
  transition: new TransitionComponent({ x: 16, y: 16 }),
  graphics: grassGraphics,
});

const object4 = new GameObject({
  transition: new TransitionComponent({ x: 32, y: 16 }),
  graphics: grassGraphics,
});

const object5 = new GameObject({
  transition: new TransitionComponent({ x: 0, y: 64 }, void 0, { x: 2, y: 0 }),
  physics: new MovementPhysicsComponent(),
  graphics: grassGraphics,
});

const scene = new Scene([object1, object2, object3, object4, object5], renderingContext);

const game = new Game([scene]);

game.start();
