
export function formatNumberWithCommas(x) {
    if (typeof x === 'number') {
        return x.toLocaleString();
    }
    return x; // or return a default value or an empty string
}

