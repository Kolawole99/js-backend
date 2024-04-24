module.exports = {
    // this will check Typescript files
    '**/*.(ts)': () => 'bunx tsc --noEmit',

    // This will lint and format TypeScript and JavaScript files
    '**/*.(ts|js)': filenames => `bunx biome check --apply ${filenames.join(' ')}`,

    // this will Format MarkDown and JSON
    '**/*.(md|json)': filenames => `bunx biome check --apply ${filenames.join(' ')}`,
};
