- Game class controls game loop, calls methods on Scene, InputController (Game Loop pattern)

- Scene triggers methods on all GameObjects and provide some methods to find
  relative gameobjects (eg. closest(O1), distance(O1, O2)), accepts GameObject[], RenderingContext

- RenderingContext provides rendering context

- GameObject accepts StateComponent, TransitionComponent, InputComponent, PhysicsComponent, GraphicsComponent (Component pattern)

- StateComponent contains object state information

- TransitionComponent contains position, rotation, velocity

- InputComponent contains input handing behavior

- PhysicsComponent contains object updating behavior

- GraphicsComponent contains object graphics information