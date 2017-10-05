/**
 * Transforms statements such as `let z = x + y` into a function body,
 * such as `{ return x + y; }`.
 */
export default function (babel) {
    const { types: t } = babel;
  
    return {
      name: "to-function-body",
      visitor: {
        Program: {
          exit(path, {opts}) {
            // Current implementation only allows one declaration per code block.
            // TODO: generalize
            opts.onFoundProperties({
              declares: Object.keys(path.scope.bindings),
              dependsOn: Object.keys(path.scope.globals),
            });
          },
        },
        VariableDeclaration(path) {
          const decl = path.get("declarations.0");
          const init = decl.get("init");
          path.replaceWith(
            t.blockStatement([t.returnStatement(init.node)])
          );
        },
      },
    };
  }
  