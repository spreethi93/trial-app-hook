/* eslint-disable ember/named-functions-in-promises */
const STAGED_SVG_FILES = process.argv.slice(2);
console.log('STAGED_SVG_FILES',STAGED_SVG_FILES);
if (!STAGED_SVG_FILES.length) {
  process.exit(0);
}

const inlineSVGSourceDirs = [
  'public/assets/inline-svg'
];

const FS = require('fs');
const SVGO = require('svgo');
const CONFIG = require('./config');

const svgo = new SVGO({
  plugins: CONFIG
});

let bytesToKB = (bytes) => (bytes / 1024).toFixed(3);

let diffInPerc = (a, b) => (100 - (a / b) * 100).toFixed(2);

/* eslint-disable-next-line */
console.log(`\x1b[33mWarning: Your SVG file(s) may have been optimised before committing! Visually validate in UI if everything still looks great before pushing.\nTo revert the last commit, run 'git reset HEAD~1'\x1b[0m\n`);

STAGED_SVG_FILES.forEach((filepath) => {
  FS.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    let sizeThen = bytesToKB(FS.statSync(filepath).size);
    let isInlineSVG = inlineSVGSourceDirs.some((el) => filepath.includes(el));

    if (sizeThen > 1 && isInlineSVG) { // SVGs greater than 1 kb shouldn't be inline
      /* eslint-disable-next-line */
      console.error(`\x1b[31mError: ${filepath} is too big for inline SVG. They should be 1 KiB or less.\nConsider uploading this to /assets/image/ dir. and using as an SVG image.\x1b[0m`);
      process.exit(1);
    }

    svgo.optimize(data, { path: filepath }).then((result) => {
      let relativePath = result.path.slice(result.path.lastIndexOf('/'));
      FS.writeFileSync(result.path, result.data);

      let sizeNow = bytesToKB(FS.statSync(filepath).size);
      /* eslint-disable-next-line */
      console.log(`Optimised ${relativePath} successfully! 🎉\n`,
        `${sizeThen} KiB - \x1b[32m${diffInPerc(sizeNow, sizeThen)}%\x1b[0m = ${sizeNow} KiB\n`);
    });
  });
});
