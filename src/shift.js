function shift(size, bottomLeft, topLeft, bottomRight, topRight) {

    const leftX = getDeltaSide(size, bottomLeft.x, topLeft.x);
    const rightX = getDeltaSide(size, bottomRight.x, topRight.x);

    const bottomY = getDeltaSide(size, topLeft.y, topRight.y);
    const topY = getDeltaSide(size, bottomLeft.y, bottomRight.y);

    let resultX = [];
    let resultY = [];
    for (let i = 0; i < size; i++) {
        resultX.push(getDeltaSide(size, leftX[i], rightX[i]));
        resultY.push(getDeltaSide(size, topY[i], bottomY[i]));
    }

    resultY = resultY.reduce((a, b) => a.concat(b));
    resultX = parse(size, resultX);
    const result = [];
    for (let i = 0; i < resultX.length; i++) {
        result.push(Object({
            x: resultX[i], 
            y: resultY[i], 
            z: 0
        }))
    }
    return result
}

function getDeltaSide(size, start, end) {
    let result = [];

    const part = end - start;

    for (let i = 0; i < size; i++) {
        result.push(part * i / (size - 1) + start);
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
    shift
};