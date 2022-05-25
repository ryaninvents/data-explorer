export type JsSubtype =
  | "array"
  | "null"
  | "node"
  | "regexp"
  | "date"
  | "map"
  | "set"
  | "weakmap"
  | "weakset"
  | "iterator"
  | "generator"
  | "error"
  | "proxy"
  | "promise"
  | "typedarray";

export let JS_SUBTYPES: Array<JsSubtype>;

export enum JsType {
  Object = "object",
  Function = "function",
  Undefined = "undefined",
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Symbol = "symbol"
}

export enum DiffMarker {
  Added = "Added",
  Removed = "Removed",
  Changed = "Changed",
  Same = "Same"
}
