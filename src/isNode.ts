// Detects if we are in node or browser
// https://stackoverflow.com/a/35813135/58456
export function isNode() {
    return ((typeof process !== 'undefined') && (typeof process.versions.node !== 'undefined') );
}

