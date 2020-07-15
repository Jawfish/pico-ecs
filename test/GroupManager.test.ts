import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Entity } from "../src/Entity.ts";
import { Group } from "../src/Group.ts";
import { GroupManager } from "../src/GroupManager.ts";
import { EntityManager } from "../src/EntityManager.ts";

const domain: string = "group manager";

Deno.test(`${domain} instantiates as expected`, (): void => {
  const testGroupManager = new GroupManager();
  assertEquals(
    testGroupManager.groups,
    [],
    `expected group manager to have no groups on instantiation, found ${testGroupManager.groups}`,
  );
});

Deno.test(`${domain} can create new groups`, (): void => {
  const testGroupManager = new GroupManager();
  const testGroup = testGroupManager.createGroup();
  const testGroup2 = testGroupManager.createGroup();
  assertEquals(
    testGroupManager.groups,
    [testGroup, testGroup2],
    `expected group manager to have 2 groups, found ${testGroupManager.groups}`,
  );
});

Deno.test(`${domain} can merge groups`, (): void => {
  const testGroupManager = new GroupManager();
  const testGroup = testGroupManager.createGroup();
  const testGroup2 = testGroupManager.createGroup();
  const testEntity = new Entity(new EntityManager());
  const testEntity2 = new Entity(new EntityManager());
  testGroup.addEntity(testEntity);
  testGroup2.addEntity(testEntity2);
  const mergedGroup = testGroupManager.mergeGroups(testGroup, testGroup2);
  assertEquals(
    mergedGroup.entities,
    [testEntity, testEntity2],
    "merged group does not contain expected entities",
  );
});
