const range = length => f => Array
    .from({length: length},
        (_, i) => f !== undefined ? f(i) : i
    );

const cube = x => y => Object({x, y, z: 0});

const edges = vertices => vertices.filter((_, i) =>
    i === 0 ||
    i === Math.sqrt(vertices.length) - 1 ||
    i === vertices.length - Math.sqrt(vertices.length) ||
    i === vertices.length - 1
);

const top = vertices => filterRows(vertices)((index, part, length) => index === length * (part + 1) - 1);
const bottom = vertices => filterRows(vertices)((index, part, length) => index === length * part);
const left = vertices => filterRows(vertices)((index, part, length) => index === part);
const right = vertices => filterRows(vertices)((index, part, length) => index === length * (length - 1) + part);

const filterRows = vertices => func => vertices
    .filter((_, index) => rowCheckup(index, vertices.length, func));

const rowCheckup = (index, length, func) =>
    range(Math.sqrt(length))()
        .map(part => func(index, part, Math.sqrt(length)))
        .reduce((a, b) => a || b);

export const Row = {
    top,
    bottom,
    left,
    right
};

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
    edges,
    uv,
    vertices,
    transform,
    calcIndices: calcIndices,
    calcCube: calcCube,
    range
};
