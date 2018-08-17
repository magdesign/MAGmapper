const range = length =>  f => Array
    .from({length},
        (_, i) => f !== undefined ? f(i) : i
    );

const cube = x => y => Object({x, y, z: 0});


const cartesis = length => fSize => range(length)()
    .map(x => cube(fSize(x)))
    .map(func => range(length)(y => func(fSize(y))))
    .reduce((p, c) => p.concat(c));


const transform = vertices => vertices
    .map(cube => [cube.x, cube.y, cube.z])
    .reduce((p, c) => p.concat(c));

function calcVertices(length, size) {
    let coords = [];
    const part = size / length;
    for (let x = 0; x <= length; x = x + part) {
        const cubey = cube(x);
        for (let y = 0; y <= length; y = y + part) {
            coords.push(cubey(y));
        }
    }
    return coords;
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
    const size = Math.pow(items, 2) + items - 1; // for every ending there must be an additional step

    for (let i = 0; i < size; i++) {
        indices = calcCube(indices, i, items + 1);
        // console.log("indices => " + indices + " i => " + i + " item => " + items + " size => " + size);
    }
    return indices;
}


function calcCube(values, start, width) {
    if (start !== width - 1) {
        values.push(
            start,
            start + width,
            start + 1,
            start + 1,
            start + width,
            start + width + 1,
        );
    }
    return values;
}

export const Mapper = {
    cartesis,
    calcVertices: calcVertices,
    calcUvs: calcUvs,
    calcIndices: calcIndices,
    calcCube: calcCube,
    transform
};
