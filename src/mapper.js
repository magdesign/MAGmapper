const range = length => f => Array
    .from({length: length},
        (_, i) => f !== undefined ? f(i) : i
    );

const cube = x => y => Object({x, y, z: 0});

const cartesis = length => fSize => range(length)()
    .map(x => cube(fSize(x)))
    .map(func => range(length)(y => func(fSize(y))))
    .reduce((p, c) => p.concat(c));

const vertices = (size, length) => cartesis(size)(i => length / (size - 1) * i);
const uv = size => cartesis(size)(i => 1 / (size - 1) * i);

export const transform = vertices =>
    new Float32Array(vertices
        .map(cube => [cube.x, cube.y, cube.z])
        .reduce((p, c) => p.concat(c)));

function calcIndices(items) {
    items--;
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

    uv,vertices,
    transform,
    calcIndices: calcIndices,
    calcCube: calcCube,
};
