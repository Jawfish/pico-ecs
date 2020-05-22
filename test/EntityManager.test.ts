import {
  assertEquals,
  assertStrictEq,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { EntityManager } from "../src/EntityManager.ts";

const domain: string = "entity manager";

Deno.test(`${domain} creates entities`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  assertEquals(typeof testEntity, "object");
  assertEquals(testEntity.components, []);
  assertNotEquals(testEntity.uuid, undefined);
  assertStrictEq(testEntity.manager, testManager);
  assertEquals(testEntity.tags, []);
});

Deno.test(`${domain} lists entities`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  assertEquals(testManager.listEntities(), [testEntity]);
});

Deno.test(`${domain} removes entities by tag`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity().addTag("Tag");
  const testEntity2 = testManager.createEntity();
  testManager.removeEntitiesByTag("Tag");
  assertEquals(testManager.listEntities(), [testEntity2]);
});

Deno.test(`${domain} removes all entities`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  const testEntity2 = testManager.createEntity();
  testManager.removeAllEntities();
  assertEquals(testManager.listEntities(), []);
});

Deno.test(`${domain} removes entities`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testManager.removeEntity(testEntity);
  assertEquals(testManager.listEntities(), []);
});

Deno.test(`${domain} adds tags`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testManager.addTag(testEntity, "Tag");
  assertEquals(testEntity.tags, ["Tag"]);
});

Deno.test(`${domain} removes tags`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testEntity.addTag("Tag");
  testManager.removeTag(testEntity, "Tag");
  assertEquals(testEntity.tags, []);
});

Deno.test(`${domain} lists tags`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity().addTag("Tag");
  assertEquals(testManager.listTags(), ["Tag"]);
});

Deno.test(`${domain} adds components`, function (): void {
  class TestComponent {}
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testManager.addComponent(testEntity, new TestComponent());
  assertEquals(testEntity.components.length, 1);
  assertEquals(testEntity.components[0].constructor.name, "TestComponent");
  assertEquals(
    Object.getPrototypeOf(testEntity.components[0]),
    Object.getPrototypeOf(new TestComponent()),
  );
  assertEquals(
    Object.getPrototypeOf(testEntity.TestComponent),
    Object.getPrototypeOf(new TestComponent()),
  );
});

Deno.test(`${domain} removes all components`, function (): void {
  class TestComponent {}
  class TestComponent2 {}
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testEntity.addComponent(new TestComponent());
  testEntity.addComponent(new TestComponent2());
  testManager.removeAllComponents(testEntity);
  assertEquals(testEntity.components.length, 0);
  assertEquals(testEntity.components, []);
});

Deno.test(`${domain} removes single components`, function (): void {
  class TestComponent {}
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testEntity.addComponent(new TestComponent());
  testManager.removeComponent(testEntity, "TestComponent");
  assertEquals(testEntity.components.length, 0);
  assertEquals(testEntity.TestComponent, undefined);
});

Deno.test(`${domain} queries component owners`, function (): void {
  class TestComponent {}
  class TestComponent2 {}
  const testManager = new EntityManager();
  const testEntity = testManager
    .createEntity()
    .addComponent(new TestComponent())
    .addComponent(new TestComponent2());
  assertEquals(
    testManager.queryComponentOwners(["TestComponent", "TestComponent2"]),
    [testEntity],
  );
});

Deno.test(`${domain} queries tag owners`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testEntity.addTag("tag");
  assertEquals(testManager.queryTagOwners("tag"), [testEntity]);
});

Deno.test(`${domain} counts entities`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  const testEntity2 = testManager.createEntity();
  assertEquals(testManager.count(), 2);
});
