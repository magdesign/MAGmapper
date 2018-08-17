


function getSize(vertices, dimension) {
    const size = 3;
    return vertices[size + dimension] - vertices[dimension];
}



function calcRelation() {
    return difY / difX;
}

function topRigth(vertices,  x, y) {

    const itemsLength =  Math.sqrt(vertices.length);
    
    const topRightEdge = vertices[vertices.length - 1];
    const topLeftEdge = vertices[vertices.length - itemsLength - 1];
    const bottomRightEdge = vertices[itemsLength - 1];

    const deltaX = x - topRightEdge.x;
    const deltaY = y - topRightEdge.y;

    console.log(deltaY)
    console.log(deltaX)


    const length = topRightEdge.x -topLeftEdge.x;
    const heigth = topRightEdge.y -topLeftEdge.y;

    const rel = heigth /length


    for (let i = 0; i < vertices.length; i = i + 3) {
        const x = vertices[i];
        const y = vertices[i+1];

        const factor = x * rel / getElemetsLenth(vertices) + getSize(vertices, 1);
        vertices[i+1] = factor * y;
    }
    return vertices;
}

export const Shift = {
    topRigth: topRigth,
};