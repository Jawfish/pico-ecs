# pico-ecs

pico-ecs is a very small TypeScript library for rapid design iteration of small games. Based on the libraries [nano-ecs](https://github.com/noffle/nano-ecs) and [tiny-ecs](https://github.com/bvalosek/tiny-ecs).

## Installation
pico-ecs is currently not published, so you must download the source from here and integrate it with a project manually.

## Usage
```ts
// Import necessary modules
import { EntityManager } from './EntityManager'

// Create component
class Health {
    private max: number
    current: number
    constructor(max: number){
        this.max = max
        this.current = max
    }
}

// Create manager
const manager = new EntityManager()

// Create entity and add components
const player = manager.createEntity()
                      .addComponent(new Health(100))
                      .addTag('player')

// Query entities
const units = manager.queryComponentOwners('Health')
const monsters = manager.queryTagOwners('monster')

// Interact with components
player.Health.current -= 100
player.addTag('dead')

// Interact with entities
manager.listEntities().forEach(entity => {
    if (entity.hasTag('dead')) {
        entity.remove();
    }
});
```
