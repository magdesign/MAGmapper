export const Shift = {
    top: top,
};

/**
 *
 * @param vertices
 * @param dimension x = 0
 *                  y = 1
 *                  z = 2
 * @returns {*}
 */
function getSize(vertices, dimension) {
    const size = 3;
    return vertices[size + dimension] - vertices[dimension];
}

function calcRelation(leftX, leftY, rightX, rightY) {
    const difX = rightX - leftX;
    const difY = rightY - leftY;

    return difY / difX;
}

function getElemetsLenth(vertices) {
    return Math.sqrt(vertices.length / 3) - 1;
}

function top(vertices, leftX, leftY, rightX, rightY) {
    const rel = calcRelation(leftX, leftY, rightX, rightY);


    for (let i = 0; i < vertices.length; i = i + 3) {
        const x = vertices[i];
        const y = vertices[i+1];

        const factor = x * rel / getElemetsLenth(vertices) + getSize(vertices, 1);
        vertices[i+1] = factor * y;
    }
    return vertices;
}

