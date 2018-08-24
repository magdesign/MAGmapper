import {Row} from "./mapper";
import {Mapper} from "./mapper";

function topLeft(vertices, x, y) {
    const edge = vertices[vertices.length - Math.sqrt(vertices.length)];
    const edgebottom = vertices[Math.sqrt(vertices.length) - 1];


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


function topLeft(vertices, x, y) {

    const verticeSide = Math.sqrt(vertices.length);

    const bottomLeft = vertices[0];
    const topLeft = vertices[verticeSide - 1];


    const bottomRight = vertices[vertices.length - verticeSide];
    const topRight = vertices[vertices.length - 1];

    const deltaX = topRight.x - topLeft.x;
    const deltaY = topRight.y - topLeft.y;


    const rely = deltaY / deltaX;


    const delta = Mapper.range(verticeSide)()
        .map((_, i) => (1 - i / (verticeSide - 1)) * deltaX)
        .map(delta => delta * rely);



    const base = Row.top(vertices)
        .map(verticeTop => {
            return Row.bottom(vertices)
                .map(verticeBottom => verticeTop.y - verticeBottom.y)
                .reduce((p,c) => [c]);
        })
        .reduce((p, c) => p.concat(c))
        .map((b , i) => Mapper.range(verticeSide)()
            .map((_, i) => (1 - i / (verticeSide - 1)) * deltaX)
            .map(delta => delta * rely)[i] + b);

    const relations = Row.top(vertices)
        .map((val,i )=> base[i] / val.y);
    console.log(relations);


    const maxY = [];


    console.log("res----_");
    for (let i = 0; i < Math.sqrt(vertices.length); i++) {


        const reslt = i / verticeSide * rely;
        console.log(reslt);
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

export const Shift = {
    topRigth: topRigth,
    topLeft
};