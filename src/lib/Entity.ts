import { EntityManager } from './EntityManager';

let nextId = 0;

export class Entity {
    // tslint:disable-next-line:no-any
    [key: string]: any;
    id: number;
    manager: EntityManager;
    components: Object[];
    tags: string[];

    constructor(manager: EntityManager) {
        this.id = nextId++;
        this.manager = manager;
        this.components = [];
        this.tags = [];
    }

    addComponent = (component: Object): Entity => {
        this.manager.addComponent(this, component);
        return this;
    };

    removeComponent = (component: string): Entity => {
        this.manager.removeComponent(this, component);
        return this;
    };

    removeAllComponents = () => this.manager.removeAllComponents(this);

    hasComponent = (component: string): boolean => {
        let exists = false;
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].constructor.name === component) {
                exists = true;
                break;
            }
        }
        return exists;
    };

    hasAllComponents = (componentsToCheck: string[]): boolean => {
        for (let i = 0; i < componentsToCheck.length; i++) {
            if (!this.hasComponent(componentsToCheck[i])) {
                return false;
            }
        }
        return true;
    };

    hasTag = (tag: string) => this.tags.includes(tag);

    addTag = (tag: string) => {
        this.manager.addTag(this, tag);
        return this;
    };

    removeTag = (tag: string) => this.manager.removeTag(this, tag);

    remove = () => this.manager.removeEntity(this);
}
