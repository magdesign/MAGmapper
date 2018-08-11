
export const Mapper = {
    calcVertices: calcVertices,
    calcUvs: calcUvs,
    calcIndices: calcIndices
};

function calcVertices(items) {
    let coords = [];
    for (let x = 0; x <= items; x++) {
        for (let y = 0; y <= items; y++) {
            coords.push(x, y, 0)
        }
    }
    return new Float32Array(coords);
}

function calcUvs(items) {
    let uvs = [];
    let size = 1;
    let part = size / items;

    for (let x = 0; x <= size; x = x + part) {
        for (let y = 0; y <= size; y = y + part) {
            uvs.push(x, y)
        }
    }
    return new Float32Array(uvs);
}

function calcIndices(items) {
    let indices = [];

    const part = 2;
    const size = Math.pow(items, 2);

    for (let index = 0; index < size; index = index + part) {
        indices = calcCube(indices, index);
    }
    return indices;
}

/**
 *
 * 6-7-8
 * 3-4-5
 * 0-1-2
 *
 *
 * itemsSize = 3
 * part = 2
 ** ** ** **
 * result:
 * 0,1,3
 * 1,4,3

    23
    01

    0,1,2
    1,2,3
 */
 function calcCube(values, bottomLeftPoint) {
    const part = 2;
    values.push(
        bottomLeftPoint,
        bottomLeftPoint + 1,
        bottomLeftPoint + part,
        bottomLeftPoint + 1,
        bottomLeftPoint + part,
        bottomLeftPoint + part + 1,

    );
    return values;
}