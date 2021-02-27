type SupportedLeaf = boolean | number | string;

type FlatMap<Leaf extends SupportedLeaf> = {
  [key: string]: Leaf;
};

type _Tree<Leaf extends SupportedLeaf> =
  | Leaf
  | Readonly<{ [key: string]: _Tree<Leaf> }>;
type Tree<Leaf extends SupportedLeaf> = Readonly<{
  [key: string]: _Tree<Leaf>;
}>;

const _treeToFlatMap = <Leaf extends SupportedLeaf>(
  tree: _Tree<Leaf>,
  separator: string,
  camelcase: boolean,
  path: string,
  result: FlatMap<Leaf>
): FlatMap<Leaf> => {
  if (typeof tree !== "object") {
    if (path in result) {
      throw new Error(
        `Tree has multiple leaves for path "${path}": ${JSON.stringify(
          result[path]
        )} and ${JSON.stringify(tree)}.`
      );
    }

    return Object.assign({ [path]: tree }, result);
  }

  return Object.keys(tree).reduce((accumulator, key) => {
    const newPath: string = camelcase
      ? `${path}${key.charAt(0).toUpperCase()}${key.slice(1)}`
      : `${path}${separator}${key}`;
    return _treeToFlatMap(
      tree[key],
      separator,
      camelcase,
      path ? newPath : key,
      accumulator
    );
  }, result);
};

/** Converts `tree` to a flat map with dot-separated keys. */
export const treeToFlatMap = <Leaf extends SupportedLeaf = string>(
  tree: Tree<Leaf>,
  {
    separator = ".",
    camelcase = false,
  }: Readonly<{ separator?: string; camelcase?: boolean }> = {}
): FlatMap<Leaf> => _treeToFlatMap(tree, separator, camelcase, "", {});
