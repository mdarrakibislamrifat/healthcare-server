import type { Server } from "http";
import app from "./app.js";

const port = 3000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`Healthcare Server is running on http://localhost:${port}`);
  });
}

main();
