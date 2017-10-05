import * as t from 'babel-types';
import generate from 'babel-generator';

/**
 * Transforms statements such as `let z = x + y` into a function body,
 * such as `{ return x + y; }`.
 */
export default function (babel) {
  
    return {
      name: "to-function-body",
      visitor: {
        Program(path, {opts}) {
          const source = path.getSource();
          const statements = path.get('body');
          const results = [];
          statements.forEach(stmt => {
            if (stmt.isVariableDeclaration) {
              // TODO: this block assumes only one declarator per declaration; generalize.
              // e.g. `let x = 5` would work; `let x = 5, y = "foo"` would not
              const result = {};
              const decl = stmt.get("declarations.0");
              const id = decl.get("id");
              result.declares = id.name;
              result.depends = Object.keys(decl.scope.globals);
              const init = decl.get("init");
              
              result.functionBody = generate(
                t.blockStatement([t.returnStatement(init.node)]),
                {
                  minified: true,
                },
                source
              );
              results.push(result);
            }
          });
          opts.onFoundDefinitions(results);
        },
      },
    };
  }
  