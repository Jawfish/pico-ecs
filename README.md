# pico-ecs
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## About
pico-ecs is a very small TypeScript library inspired by the Entity-Component-System architecture for prototyping and rapid design iteration of small games. Based on the libraries [nano-ecs](https://github.com/noffle/nano-ecs) and [tiny-ecs](https://github.com/bvalosek/tiny-ecs).

## Installation
pico-ecs is currently not published, so you must download the source from here and integrate it with a project manually.

## Usage
```ts
// Import necessary modules
import { Entity } from './Entity'
import { Component } from './Component'

// Create components
class Position extends Component {
    x: number
    y: number
    constructor(x: number, y: number){
        super()
        this.x = x
        this.y =y
    }
}
class Health extends Component {
    current: number
    max: number
    constructor(max: number){
        super()
        this.current = max
        this.max = max
    }
}

// Create manager
const manager = new EntityManager()
// Create entity and add components
const player = manager.createEntity()
                      .addComponent(Position(0, 0))
                      .addComponent(Health(100))
                      .addTag('player')

// Interact with components
player.Position.x = 50
player.Position.y = 50
player.Health.current -= 50
```