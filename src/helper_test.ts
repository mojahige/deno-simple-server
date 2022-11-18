import { assertObjectMatch } from "testing/asserts.ts";
import sinon from "sinon";
import { getUseArgumentKey, getUseArguments } from "./helper.ts";
import { DEFAULT_PORT, DEFAULT_ROOT } from "./constants.ts";

Deno.test("getUseArgumentKey", () => {
  const target = [
    "--root",
    "-p",
    "3000",
    "--port",
    "3001",
    "-p",
    "1234",
  ];

  assertObjectMatch(
    getUseArgumentKey({
      args: target,
      keys: ["-p", "--port"],
    }),
    {
      key: "p",
      valid: true,
    },
  );

  assertObjectMatch(
    getUseArgumentKey({
      args: target,
      keys: ["-r", "--root"],
    }),
    {
      key: "root",
      valid: true,
    },
  );

  assertObjectMatch(
    getUseArgumentKey({
      args: target,
      keys: ["--foo", "--bar"],
    }),
    {
      key: undefined,
      valid: false,
    },
  );
});

Deno.test("getUseArguments", () => {
  const denoArgsStub = sinon.stub(Deno, "args").value([
    "-p",
    "3000",
  ]);

  assertObjectMatch(getUseArguments(), {
    root: DEFAULT_ROOT,
    port: 3000,
  });

  denoArgsStub.value([
    "--port",
    "1234",
  ]);

  assertObjectMatch(getUseArguments(), {
    root: DEFAULT_ROOT,
    port: 1234,
  });

  denoArgsStub.value([
    "--port",
    "1234",
    "-p",
    "8000",
  ]);

  assertObjectMatch(getUseArguments(), {
    root: DEFAULT_ROOT,
    port: 8000,
  });

  denoArgsStub.value([
    "-r",
    "./root",
  ]);

  assertObjectMatch(getUseArguments(), {
    root: "./root",
    port: DEFAULT_PORT,
  });

  denoArgsStub.value([
    "--root",
    "./root",
  ]);

  assertObjectMatch(getUseArguments(), {
    root: "./root",
    port: DEFAULT_PORT,
  });

  denoArgsStub.value([
    "--root",
    "./root",
    "-r",
    "./root/sub",
  ]);

  assertObjectMatch(getUseArguments(), {
    root: "./root/sub",
    port: DEFAULT_PORT,
  });

  denoArgsStub.restore();
});
