

export enum RenderTypes{
    Edges,
    Uv,
    None
}

/** Singleton 
 * 
 */
export class DataService{

    private static _service: DataService;
    private _positions: number[];

    // will be set to false everytime the position getter is called
    private _update: boolean = false;


    get update(): boolean{
        return this._update;
    }

    get positions(): any {
        this._update = false;
        return this._positions;
    }
    set positions(positions) {
        this._update = true;
        this._positions= positions;
    }

    public static get Service(): DataService {
        return this._service || (this._service = new this());
    }
}