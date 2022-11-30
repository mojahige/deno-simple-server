import { findArgumentValue, generateArgumentKeys } from "./helper.ts";
import { asserts, parse } from "./deps.ts";

const { assertEquals } = asserts;

Deno.test("generateArgumentKeys", () => {
  assertEquals(
    generateArgumentKeys(
      {
        denoArguments: ["-r", "--root", "--foo"],
        availableKeys: ["-r", "--root"],
      },
    ),
    ["root", "r"],
  );

  assertEquals(
    generateArgumentKeys(
      {
        denoArguments: ["-r", "1234", "--root", "3000"],
        availableKeys: ["-r", "--root"],
      },
    ),
    ["root", "r"],
  );

  assertEquals(
    generateArgumentKeys(
      {
        denoArguments: ["-r", "1234", "--root", "3000"],
        availableKeys: ["--root", "-r"],
      },
    ),
    ["root", "r"],
  );

  assertEquals(
    generateArgumentKeys(
      {
        denoArguments: ["-r", "1234", "--root", "3000"],
        availableKeys: ["-r"],
      },
    ),
    ["r"],
  );
});

Deno.test("findArgumentValue", () => {
  assertEquals(
    findArgumentValue(
      {
        parsedArgs: parse(["-p", "1234", "--port", "3000"]),
        keys: ["p", "port"],
        defaultValue: 8080,
      },
    ),
    1234,
  );

  assertEquals(
    findArgumentValue(
      {
        parsedArgs: parse(["-p", "1234", "--port", "3000"]),
        keys: ["port", "p"],
        defaultValue: 8080,
      },
    ),
    3000,
  );

  assertEquals(
    findArgumentValue(
      {
        parsedArgs: parse(["-p", "1234", "--port", "3000", "-p", "5173"]),
        keys: ["p", "port"],
        defaultValue: 8080,
      },
    ),
    5173,
  );

  assertEquals(
    findArgumentValue(
      {
        parsedArgs: parse(["-p", "1234", "--port", "3000", "-p", "5173"]),
        keys: ["foo"],
        defaultValue: 8080,
      },
    ),
    8080,
  );
});
