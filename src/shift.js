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


const calcPart = (part, size) => func => func(part / (size - 1));

const delta = (side, start, end) => f => Mapper.range(side)()
    .map((_, i) => calcPart(i, side)(f))
    .map(part => part * (start - end));

function topLeft(vertices, x, y) {

    const verticeSide = Math.sqrt(vertices.length);

    const deltaY = delta(verticeSide, y, vertices[verticeSide - 1].y)(i => 1 - i);
    const deltaX = delta(verticeSide, vertices[verticeSide - 1].x, x)(i => i);

    const baseY = Row.top(vertices)
        .map((top, i) => {
            return Row.bottom(vertices)
                .map(bottom => top.y - bottom.y)
                .map(delta => (delta + deltaY[i]) / delta)
                .map((rel, ir) => Object({rel: rel, delta: deltaY[ir]}))
        })
        .reduce((p, c) => p.concat(c))
        .map((value, i) => vertices[i].y * value.rel);


    const baseX = Row.left(vertices)
        .map((left) => {
            return Row.right(vertices)
                .map((right) => right.x - left.x)
                .map((delta, ir) => (delta + deltaX[ir]) / delta)
                .map((rel, ir) => Object({rel: rel, delta: deltaX[ir]}))
        })
        .reduce((p, c) => p.concat(c))
        .map((value, i) => value.rel * vertices[i].x - value.delta);

    return baseX.map((x, i) => cube(x)(baseY[i]))
}

// todo finish implementation
function bottomLeft(vertices, x, y) {

    const verticeSide = Math.sqrt(vertices.length);

    const bottomRight = Row.end(Row.bottom(vertices));
    const bottomLeft = Row.start(Row.bottom(vertices));
    const topLeft = Row.start(Row.top(vertices));

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

    return baseX.map((x, i) => cube(x)(baseY[i]))
}


const lineParts = (size, p1, p2) => Mapper
    .range(size)()
    .map(() => p2 - p1)
    .map((delta, i) => calcPart(i, size)(i => i) * delta);

const shift2 = (size, p1, p2, p3, p4) => {
    const leftdelta = lineParts(size, p1.x, p2.x)
        .map((_, i) => calcPart(i, size)(i => i))
        .map((part) => part * (p2.x - p1.x))
        .map((val, i) => Object({x: val, y: lineParts(size, p1.y, p2.y)[i]}));

    const rightdelta = Mapper.range(size)(i => i)
        .map((_, i) => calcPart(i, size)(i => i))
        .map((part) => part * (p4.x - p3.x) + p3.x)
        .map((val, i) => Object({x: val, y: lineParts(size, p1.x, p3.x)[i]}));

    const x = rightdelta.map(right => leftdelta
        .map(left => right.x - left.x)
        .map((value, i) => value * calcPart(i, size)(i => i)))
        .reduce((a, b) => a.concat(b));

    const bottomdelta = lineParts(size, p1.y, p3.y)
        .map((_, i) => calcPart(i, size)(i => i))
        .map((part) => part * (p3.y - p1.y))
        .map((val, i) => Object({y: val, x: lineParts(size, p1.x, p3.x)[i]}));

    const topdelta = Mapper.range(size)(i => i)
        .map((_, i) => calcPart(i, size)(i => i))
        .map((part) => part * (p4.y - p2.y) + p2.y)
        .map((val, i) => Object({y: val, x: lineParts(size, p2.y, p4.y)[i]}));

    const y = topdelta
        .map(top => bottomdelta
            .map(bottom => top.y - bottom.y)
            .map((value, i) => value * calcPart(i, size)(i => i)))
        .reduce((a, b) => a.concat(b));

    const parsedX = Mapper.range(size)()
        .map((_,i) => Row.row(x,i))
        .map((val,i) => val );

    const resultX = parse(size, parsedX);

    const result= [];
    for (let i = 0; i < resultX.length; i++) {
        result.push(Object({x: resultX[i], y: y[i], z:0}))
    }

    return result;
};

function shift(size, bottomLeft,topLeft, bottomRight, topRight) {

    const leftX = getDeltaSide(size, bottomLeft.x, topLeft.x)
    const rightX = getDeltaSide(size, bottomRight.x, topRight.x)

    const bottomY = getDeltaSide(size, topLeft.y, topRight.y);
    const topY = getDeltaSide(size, bottomLeft.x, bottomRight.y);


    let resultX = [];
    let resultY = [];
    for (let i = 0; i < size; i++) {
        resultX.push(getDeltaSide(size,leftX[i],rightX[i]));
        resultY.push(getDeltaSide(size,topY[i],bottomY[i]));
    }

    resultY= resultY.reduce((a,b) => a.concat(b))

    resultX = parse(size, resultX);
    const result= [];
    for (let i = 0; i < resultX.length; i++) {
        result.push(Object({x: resultX[i], y: resultY[i], z:0}))
    }
    console.log(result)
    return result
}

function getDeltaSide(size, start, end) {
    let result = [];

    const part = end - start;

    for (let i = 0; i < size; i++) {
        result.push(part * i/ (size-1) + start);
    }

    return result;
}

function parse(size, parsedX) {
    const result = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            result.push(parsedX[j][i])
        }
    }
    return result;
}

export const Shift = {
    topRigth,
    topLeft,
    bottomLeft,
    shift
};