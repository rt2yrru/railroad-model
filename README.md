- Game class controls game loop, calls methods on Scene, InputController (Game Loop pattern)

- Scene triggers methods on all GameObjects and provide some methods to find
  relative gameobjects (eg. closest(O1), distance(O1, O2)), accepts GameObject[], RenderingContext

- RenderingContext provides rendering context

- GameObject accepts StateComponent, TransitionComponent, InputComponent, PhysicsComponent, GraphicsComponent (Component pattern)

- StateComponent contains object state information

- TransitionComponent contains position, rotation, velocity

- InputComponent contains input handing behavior

- PhysicsComponent contains object updating behavior

- GraphicsComponent contains object graphics information and responsible for rendering



# version 0.1.1

- simply having this repo as the original owner/developer has either deleted this repo or removed it
- Keeping this repo as I have used this once a long time back and would try to keep it updated
- Keeping it as a relic 
