


function topRigth(vertices,  x, y) {
    const edge = vertices[vertices.length - 1];
    const edgebottom = vertices[0];
    const sizeX = edge.x - edgebottom.x;
    const sizeY = edge.y - edgebottom.y;

    const rX = x / edge.x;
    const rY = y / edge.y;

    for (let i = 0; i < vertices.length; i++) {
        const resx = calcX(vertices[i], sizeY, rX);
        const resy = calcY(vertices[i], sizeX, rY);

        vertices[i].x = resx;
        vertices[i].y = resy;
    }
    return vertices

}

function calcY(vertice, size, rel) {
    const factor = vertice.x / size;
    const newFactor = (rel - 1) * factor + 1;

    return vertice.y * newFactor;
}

function calcX(vertice , size, rel) {
    const factor = vertice.y / size;

    const newFactor = (rel - 1) * factor + 1;
    return vertice.x * newFactor;
}

export const Shift = {
    topRigth: topRigth,
};