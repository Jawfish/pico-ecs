import {
  assertEquals,
  assertStrictEq,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { EntityManager } from "../src/EntityManager.ts";

const domain: string = "entity manager";

Deno.test(`${domain} creates entities`, (): void => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  assertEquals(typeof testEntity, "object");
  assertEquals(testEntity.components, []);
  assertNotEquals(testEntity.uuid, undefined);
  assertStrictEq(testEntity.manager, testManager);
});

Deno.test(`${domain} lists entities`, (): void => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  assertEquals(testManager.listEntities(), [testEntity]);
});

Deno.test(`${domain} removes entities by tag`, (): void => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity().tag("Tag");
  const testEntity2 = testManager.createEntity();
  testManager.removeEntitiesByTag("Tag");
  assertEquals(testManager.listEntities(), [testEntity2]);
});

Deno.test(`${domain} removes all entities`, (): void => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  const testEntity2 = testManager.createEntity();
  testManager.removeAllEntities();
  assertEquals(testManager.listEntities(), []);
});

Deno.test(`${domain} removes entities`, (): void => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testManager.removeEntity(testEntity);
  assertEquals(testManager.listEntities(), []);
});

Deno.test(`${domain} lists tags`, (): void => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity().tag("Tag");
  assertEquals(testManager.listUsedTags(), ["Tag"]);
});

Deno.test(`${domain} queries component owners`, (): void => {
  class TestComponent {}
  class TestComponent2 {}
  class TestComponent3 {}
  const testManager = new EntityManager();
  const testEntity = testManager
    .createEntity()
    .addComponent(new TestComponent())
    .addComponent(new TestComponent2());
  assertEquals(
    testManager.queryComponentOwners(
      [TestComponent, TestComponent2, TestComponent3],
    ),
    [testEntity],
  );
});

Deno.test(`${domain} queries tag owners`, (): void => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testEntity.tag("tag");
  assertEquals(testManager.queryTagOwners("tag"), [testEntity]);
});

Deno.test(`${domain} counts entities`, (): void => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  const testEntity2 = testManager.createEntity();
  assertEquals(testManager.count(), 2);
});
