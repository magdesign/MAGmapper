import {Row} from "./mapper";
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



function topLeft(vertices, x, y) {

    const verticeSide = Math.sqrt(vertices.length);

    const topLeft = vertices[verticeSide - 1];
    const topRight = vertices[vertices.length - 1];

    const deltaX = topRight.x - topLeft.x;
    const deltaY = topRight.y - topLeft.y;

    const rely = deltaY / deltaX;

    const delta = Mapper.range(verticeSide)()
        .map((_, i) => (1 - i / (verticeSide - 1)) * deltaX)
        .map(delta => delta * rely);

    const base = Row.top(vertices)
        .map((top, i) => {
            return Row.bottom(vertices)
                .map(bottom=> (top.y - bottom.y) + delta[i]);
        })
        .reduce((p, c) => p.concat(c));


    console.log(base);


    const maxY = [];


    console.log("---res----");
    for (let i = 0; i < Math.sqrt(vertices.length); i++) {


        const reslt = i / verticeSide * rely;
        console.log(reslt);
    }

    return vertices
}


export const Shift = {
    topRigth,
    topLeft
};