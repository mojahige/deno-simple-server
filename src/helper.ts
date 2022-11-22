import { parse } from "./deps.ts";
import {
  DEFAULT_PORT,
  DEFAULT_ROOT,
  PORT_ARGUMENTS,
  ROOT_ARGUMENTS,
} from "./constants.ts";

type Arguments = ReadonlyArray<string>;
type Keys = ReadonlyArray<string>;
type Result = {
  key: string | undefined;
  valid: boolean;
};
type ValidResult = {
  key: string;
  valid: true;
};
type UseArguments = {
  root: string;
  port: number;
};

export function getUseArgumentKey({ args, keys }: {
  args: Arguments;
  keys: Keys;
}): Result {
  const index = args.findLastIndex((arg) => keys.some((key) => arg === key));

  return {
    key: args[index]?.replaceAll("-", ""),
    valid: index >= 0,
  };
}

export function validResult(test: Result): test is ValidResult {
  return test.valid;
}

export function getUseArguments(): UseArguments {
  const { args } = Deno;
  const parsedArguments = parse(args);
  const root = getUseArgumentKey({ args, keys: ROOT_ARGUMENTS });
  const port = getUseArgumentKey({ args, keys: PORT_ARGUMENTS });
  const result = { root: DEFAULT_ROOT, port: DEFAULT_PORT };

  if (validResult(root)) {
    result.root = parsedArguments[root.key];
  }

  if (validResult(port)) {
    result.port = parsedArguments[port.key];
  }

  return result;
}
