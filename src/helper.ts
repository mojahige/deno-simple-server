import { parse } from "./deps.ts";
import {
  DEFAULT_PORT,
  DEFAULT_ROOT,
  PORT_ARGUMENTS,
  ROOT_ARGUMENTS,
} from "./constants.ts";

export function generateArgumentKeys(
  { denoArguments, availableKeys }: {
    denoArguments: typeof Deno.args;
    availableKeys: ReadonlyArray<string>;
  },
) {
  const keySet = new Set(
    denoArguments.filter((argument) =>
      availableKeys.some((key) => key === argument)
    ),
  );

  // If there are multiple arguments of the same type, use `reverse()` to apply the most recent one.
  return Array.from(keySet).map((key) => key.replaceAll("-", "")).reverse();
}

export function findArgumentValue<T>({
  parsedArgs,
  keys,
  defaultValue,
}: {
  parsedArgs: ReturnType<typeof parse>;
  keys: ReadonlyArray<string>;
  defaultValue: T;
}) {
  let value = defaultValue;

  for (const key of keys) {
    const find = parsedArgs[key];

    if (find) {
      value = find;
      break;
    }
  }

  return value;
}

export function getUseArguments() {
  const { args: denoArguments } = Deno;
  const parsedArgs = parse(denoArguments);
  const rootKeys = generateArgumentKeys({
    denoArguments,
    availableKeys: ROOT_ARGUMENTS,
  });
  const portKeys = generateArgumentKeys({
    denoArguments,
    availableKeys: PORT_ARGUMENTS,
  });
  const root = findArgumentValue({
    parsedArgs,
    keys: rootKeys,
    defaultValue: DEFAULT_ROOT,
  });
  const port = findArgumentValue({
    parsedArgs,
    keys: portKeys,
    defaultValue: DEFAULT_PORT,
  });

  return {
    root,
    port,
  };
}
