import fs from "fs";
import { exec } from "child_process";

test("tsc-browser-app.json", (out) => {
	checkDts(out, false);
	checkJs(out, true);
	checkMap(out, true);
});
test("tsc-browser-lib.json", (out) => {
	checkDts(out, true);
	checkJs(out, true);
	checkMap(out, true);
});
test("tsc-node-app.json", (out) => {
	checkDts(out, false);
	checkJs(out, true);
	checkMap(out, true);
});
test("tsc-node-lib.json", (out) => {
	checkDts(out, true);
	checkJs(out, true);
	checkMap(out, true);
});
test("bundler-browser-app.json", (out) => {
	checkNoOutput(out);
});
test("bundler-browser-lib.json", (out) => {
	checkDts(out, true);
	checkJs(out, false);
	checkMap(out, false);
});
test("bundler-node-app.json", (out) => {
	checkNoOutput(out);
});
test("bundler-node-lib.json", (out) => {
	checkDts(out, true);
	checkJs(out, false);
	checkMap(out, false);
});

function test(tsconfig: string, validate: (outDir: string) => void): void {
	const localProject = mkLocalProject(tsconfig);
	exec(
		`pnpm exec tsc --project ${localProject} --outDir ${localProject}/dist`,
		(error, stdout, stderr) => {
			if (error || stderr || stdout) {
				console.error(`Issue with ${tsconfig}`, { stdout, stderr });
				process.exitCode = 1;
			}
			validate(localProject + "/dist");
			fs.rmSync(localProject, { recursive: true });
		},
	);
}

function mkLocalProject(tsconfig: string): string {
	const name = tsconfig.split(".")[0];
	const localProject = `test/${name}`;
	fs.mkdirSync(localProject);
	fs.writeFileSync(
		localProject + "/tsconfig.json",
		JSON.stringify({ extends: `../../${tsconfig}` }),
	);
	fs.writeFileSync(localProject + "/code.ts", "export const n: number = 1;");
	return localProject;
}

function checkNoOutput(outDir: string): void {
	if (fs.existsSync(outDir)) {
		throw Error("output was generated");
	}
}

function checkDts(outDir: string, shouldExist: boolean): void {
	if (fs.existsSync(outDir + "/code.d.ts") !== shouldExist) {
		throw Error("declarations " + shouldExist ? "missing" : "exist");
	}
}

function checkMap(outDir: string, shouldExist: boolean): void {
	if (fs.existsSync(outDir + "/code.js.map") !== shouldExist) {
		throw Error("source map " + shouldExist ? "missing" : "exists");
	}
}

function checkJs(outDir: string, shouldExist: boolean): void {
	if (fs.existsSync(outDir + "/code.js") !== shouldExist) {
		throw Error("js " + shouldExist ? "missing" : "exists");
	}
}
