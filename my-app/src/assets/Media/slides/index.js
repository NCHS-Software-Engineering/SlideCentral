
function importAll(r) {
    return r.keys().map(r);
}

export const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

function countAll(r) {
    return r.keys().length;
}

export const numberOfImages = countAll(require.context('./', false, /\.(png|jpe?g|svg)$/));