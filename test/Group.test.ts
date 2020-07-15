import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Entity } from "../src/Entity.ts";
import { Group } from "../src/Group.ts";
import { GroupManager } from "../src/GroupManager.ts";
import { EntityManager } from "../src/EntityManager.ts";

const domain: string = "group";
const testEntityManager = new EntityManager();
const testGroupManager = new GroupManager();
const testEntity = new Entity(testEntityManager);
const testEntity2 = new Entity(testEntityManager);

Deno.test(`${domain} instantiates as expected`, (): void => {
  const testGroup = new Group(testGroupManager);
  assertEquals(
    testGroup.manager,
    testGroupManager,
    `expected group to have GroupManager as its manager, found ${testGroup.manager.constructor.name}`,
  );
  assertEquals(
    testGroup.entities.length,
    0,
    "found entities on a fresh instantiation of a group; should be empty",
  );
});

Deno.test(`${domain} can add individual entities to itself`, (): void => {
  const testGroup = new Group(testGroupManager);
  testGroup.addEntity(testEntity).addEntity(testEntity2);
  assertEquals(
    testGroup.entities.length,
    2,
    `expected group to have 2 entities, found ${testGroup.entities.length}`,
  );
  assertEquals(
    testGroup.entities[0],
    testEntity,
    "expected to find testEntity in the first position of the group's list of entities, but it wasn't there",
  );
});

Deno.test(`${domain} can add multiple entities to itself`, (): void => {
  const testGroup = new Group(testGroupManager);
  testGroup.addEntities([testEntity, testEntity2]);
  assertEquals(
    testGroup.entities.length,
    2,
    `expected group to have 2 entities, found ${testGroup.entities.length}`,
  );
  assertEquals(
    testGroup.entities[0],
    testEntity,
    "expected to find testEntity in the first position of the group's list of entities, but it wasn't there",
  );
});

Deno.test(`${domain} can remove individual entities from itself`, (): void => {
  const testGroup = new Group(testGroupManager);
  testGroup.addEntity(testEntity).addEntity(testEntity2);
  testGroup.removeEntity(testEntity);
  assertEquals(
    testGroup.entities.length,
    1,
    `expected group to have 1 entity, found ${testGroup.entities.length}`,
  );
  assertEquals(
    testGroup.entities[0],
    testEntity2,
    "expected to find testEntity2 in the first position of the group's list of entities, but it wasn't there",
  );
});

Deno.test(`${domain} can remove multiple entities from itself`, (): void => {
  const testGroup = new Group(testGroupManager);
  testGroup.addEntity(testEntity).addEntity(testEntity2);
  testGroup.removeEntities([testEntity, testEntity2]);
  assertEquals(
    testGroup.entities.length,
    0,
    `expected group to have 0 entity, found ${testGroup.entities.length}`,
  );
});

Deno.test(`${domain} can remove all entities from itself`, (): void => {
  const testGroup = new Group(testGroupManager);
  testGroup.addEntity(testEntity).addEntity(testEntity2);
  testGroup.removeAllEntities();
  assertEquals(
    testGroup.entities.length,
    0,
    `expected group to have 0 entities, found ${testGroup.entities.length}`,
  );
});

Deno.test(`${domain} knows if it has an entity`, (): void => {
  const testGroup = new Group(testGroupManager);
  testGroup.addEntity(testEntity);
  assertEquals(
    testGroup.hasEntity(testEntity),
    true,
    "expected group know if it has an entity, but it doesn't",
  );
});

Deno.test(`${domain} can list its entities`, (): void => {
  const testGroup = new Group(testGroupManager);
  testGroup.addEntity(testEntity).addEntity(testEntity2);
  assertEquals(
    testGroup.listEntities(),
    [testEntity, testEntity2],
    `expected an array containing testEntity and testEntity2, received ${testGroup.listEntities()}`,
  );
});

Deno.test(`${domain} can add entities from another group`, (): void => {
  const testGroup = new Group(testGroupManager);
  const testGroup2 = new Group(testGroupManager);
  testGroup.addEntity(testEntity);
  testGroup2.addEntity(testEntity2);
  testGroup.copyFromGroup(testGroup2);
  assertEquals(
    testGroup.listEntities(),
    [testEntity, testEntity2],
    `expected an array containing testEntity and testEntity2, received ${testGroup.listEntities()}`,
  );
});
