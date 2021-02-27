`tree-to-flat-map` converts a tree to a flat map with dot-separated keys.

```ts
import { treeToFlatMap } from "tree-to-flat-map";

console.log(
  treeToFlatMap(
    {
      a: {
        b: {
          c: true,
        },
      },
      d: {
        e: 1,
      },
      f: "leaf",
    },
    { separator: "." }
  )
);
// {"a.b.c": true, "d.e": 1, "f": "leaf"}
```

`tree-to-flat-map` also supports the conversion of keys to camelCase.

```ts
console.log(
  treeToFlatMap(
    {
      user: {
        id: "40",
      },
      account: {
        id: "2",
        status: {
          active: "true",
        },
      },
    },
    { camelcase: true }
  )
);
```
