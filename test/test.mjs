import { exec } from "child_process";

test("test/node.json");
test("test/browser.json");

function test(tsconfig) {
  exec(`pnpm exec tsc --project ${tsconfig}`, (error, stdout, stderr) => {
    if (error || stderr || stdout) {
      console.error(`Issue with ${tsconfig}`);
      process.exitCode = 1;
      return;
    }
  });
}
