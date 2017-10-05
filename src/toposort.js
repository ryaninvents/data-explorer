// ## Topological sort algorithm

class CyclicalGraphError extends Error {
    constructor(message, nodes) {
        super(message);
        this.nodes = nodes;
    }
}

// Uses [Kahn's algorithm](https://en.wikipedia.org/wiki/Topological_sorting)
//
// - `nodes`: array of node IDs
// - `edges`: array of edge objects -- `{ source: <node>, target: <node> }`
export function toposort(nodes, edges) {
  const L = [];
  const E = [...edges];
  const S = nodes.filter((n) => !E.some(({ target }) => target === n));
  while (S.length) {
    const n = S.pop();
    L.push(n);
    nodes.forEach((m) => {
      const e = E.filter(({ source, target }) => source === n && target === m)[0];
      if (!e) return;
      E.splice(E.indexOf(e), 1);
      if (!E.some(({ source, target }) => target === m)) {
        S.push(m);
      }
    });
  }
  if (E.length) {
      throw new CyclicalGraphError('Graph contains at least one cycle; cannot sort', E);
  }
  return L;
}