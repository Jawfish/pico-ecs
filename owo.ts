interface Component {}
class TestComponent implements Component {}

var components: Component[] = [];

function hasComponent<T>() {
  return components.includes(c => (c as T) != null);
}

hasComponent<TestComponent>();
