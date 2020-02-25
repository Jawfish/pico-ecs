# pico-ecs
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## About
pico-ecs is a very small TypeScript library inspired by the Entity-Component-System architecture for prototyping and rapid design iteration of small games. Based on the libraries [nano-ecs](https://github.com/noffle/nano-ecs) and [tiny-ecs](https://github.com/bvalosek/tiny-ecs).

## Installation
pico-ecs is currently not published, so you must download the source from here and integrate it with a project manually.

## Usage
```ts
// Import necessary modules
import { EntityManager } from './EntityManager'

// Create components
class Health {
    current: number
    max: number
    constructor(max: number){
        this.current = max
        this.max = max
    }
}

// Create manager
const manager = new EntityManager()

// Create entity and add components
const player = manager.createEntity()
                      .addComponent(new Health(100))
                      .addTag('player')

// Interact with components
player.Health.current -= 50
```
