
export const Mapper = {
    calcVertices: calcVertices,
    calcUvs: calcUvs,
    calcIndices: calcIndices,
    calcCube: calcCube,
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
    /*    let indices = [];

    const size = Math.pow(items, 2);

    for (let index = 0; index < size; index = index++) {
        indices = calcCube(indices, index);
    }*/

    let indices = [];
    const size = Math.pow(items, 2)+ items - 1;


    for (let i = 0; i < size; i++) {
        indices = calcCube(indices, i ,items + 1);
        console.log("indices => "+ indices+ " i => " +i  +" item => "+items + " size => " + size);
    }
    return indices;
}

 function calcCube(values, start, width) {
    if(start !== width - 1){
        values.push(
            start,
            start + 1,
            start + width,
            start + 1,
            start + width,
            start + width + 1,
        );
    }
    return values;
}