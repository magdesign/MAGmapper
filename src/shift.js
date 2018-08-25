import {cube, Row} from "./mapper";
import {Mapper} from "./mapper";

function topRigth(vertices, x, y) {
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

function calcX(vertice, size, rel) {
    const factor = vertice.y / size;

    const newFactor = (rel - 1) * factor + 1;
    return vertice.x * newFactor;
}


const part = (part, size) => func => func(part / (size - 1));
const delta = (s, e) => e - s;

function topLeft(vertices, x, y) {

    const verticeSide = Math.sqrt(vertices.length);

    const topLeft = vertices[verticeSide - 1];
    const topRight = vertices[vertices.length - 1];
    const bottomLeft = vertices[0];

    const deltaY = Mapper.range(verticeSide)()
        .map((_, i) => part(i, verticeSide)(i => 1 - i) * (topRight.x - topLeft.x) * (y - topLeft.y) / (topRight.x - topLeft.x));

    const deltaX = Mapper.range(verticeSide)()
        .map((_, i) => part(i, verticeSide)(i => i) * (topLeft.y - bottomLeft.y) * (topLeft.x - x) / (topLeft.y - bottomLeft.y));

    const baseY = Row.top(vertices)
        .map((top, i) => {
            return Row.bottom(vertices)
                .map(bottom => ((top.y - bottom.y) + deltaY[i]) / (top.y - bottom.y))
                .map((rel, ir) => Object({rel: rel, delta: deltaY[ir]}))
        })
        .reduce((p, c) => p.concat(c))
        .map((value, i) => vertices[i].y * value.rel);


    const baseX = Row.left(vertices)
        .map((left) => {
            return Row.right(vertices)
                .map((right, ir) => ((right.x - left.x) + deltaX[ir]) / (right.x - left.x))
                .map((rel, ir) => Object({rel: rel, delta: deltaX[ir]}))
        })
        .reduce((p, c) => p.concat(c))
        .map((value, i) => value.rel * vertices[i].x - value.delta);

    return baseX.map((x,i)=> cube(x)(baseY[i]))
}


export const Shift = {
    topRigth,
    topLeft
};