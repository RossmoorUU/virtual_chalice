#!/usr/bin/env node
// Guards the two ways this build has actually broken.
//
// 1. Absolute asset paths. Vite's default base is "/", which emits /assets/...;
//    served from rossmooruu.org/chalice/ that resolves against the site root
//    rather than the app, and 404s. base: "./" in vite.config.ts is what keeps
//    the paths relative, and this step fails if that is ever reverted.
// 2. References to files that are not in the build — the same class of breakage
//    the website repo checks for, and what let a stale bundle sit in dist/.
//
// External URLs (the Google Fonts preconnect) are not this app's problem and are
// skipped. Only src attributes and <link> hrefs are examined: index.html carries
// a deliberate "back to rossmooruu.org" anchor pointing at "/", which is a
// navigation link to the site root, not an asset reference.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const indexPath = join(DIST, "index.html");

if (!existsSync(indexPath)) {
  console.error(`::error::${indexPath} is missing — did the build run?`);
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");

const refs = [];
for (const tag of html.match(/<(?:script|link|img)\b[^>]*>/gi) ?? []) {
  const ref = tag.match(/\b(?:src|href)="([^"]+)"/i);
  if (ref) refs.push(ref[1]);
}

const problems = [];

for (const ref of refs) {
  if (/^(https?:)?\/\//.test(ref) || ref.startsWith("data:")) continue;

  if (ref.startsWith("/")) {
    problems.push(
      `${ref} is an absolute path — served from /chalice/ it resolves against ` +
        `the site root and 404s. base must stay "./" in vite.config.ts.`
    );
    continue;
  }

  if (ref.includes("..")) {
    problems.push(`${ref} escapes the build directory`);
    continue;
  }

  const target = join(DIST, ref.replace(/^\.\//, ""));
  if (!existsSync(target)) {
    problems.push(`${ref} is referenced by index.html but is not in the build`);
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`::error::${problem}`);
  process.exit(1);
}

console.log(
  `${indexPath}: ${refs.length} references, every one relative and present in the build`
);
