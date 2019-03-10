export class Indices {
    public static calcIndices(items: number): number[] {
        items--;
        let indices = [];

        const size = Math.pow(items, 2) + items - 1;

        for (let i = 0; i < size; i++) {
            indices = this.calcCube(indices, i, items + 1);
        }
        return indices;
    }

    private static calcCube(values: number[], start: number, width: number): number[] {
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
