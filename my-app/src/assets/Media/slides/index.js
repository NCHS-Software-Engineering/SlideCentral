
function importAll(r) {
    return r.keys().sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ''), 10);
        const numB = parseInt(b.replace(/\D/g, ''), 10);
        return numA - numB;
    }).map(r);
}

export const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

function countAll(r) {
    return r.keys().length;
}

export const numberOfImages = countAll(require.context('./', false, /\.(png|jpe?g|svg)$/));