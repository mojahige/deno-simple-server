import { serve, serveDir } from "./deps.ts";
import { getUseArguments } from "./helper.ts";

const { root, port } = getUseArguments();

function handler(request: Request) {
  return serveDir(request, {
    fsRoot: root,
  });
}

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);

await serve(handler, { port });
