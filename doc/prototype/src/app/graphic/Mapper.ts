export interface Dimension {
    x: number;
    y: number;
    z: number;
}


export class Mapper {

    public static calcIndices(items) {
        items--;
        let indices = [];
        const size = Math.pow(items, 2) + items - 1; 
    
        for (let i = 0; i < size; i++) {
            indices = this.calcCube(indices, i, items + 1);
        }
        return indices;
    }
    
    private static calcCube(values, start, width) {
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
}
