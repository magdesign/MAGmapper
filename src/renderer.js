import {VideoBar} from "./videobar";
import {Shift} from "./shift";
import {Mapper} from "./mapper";
import {DragHandle} from "./draghandle";
import {
    BufferGeometry,
    BufferAttribute,
    LoadingManager,
    MeshBasicMaterial,
    Mesh,
    VideoTexture,
    LinearFilter,
    ClampToEdgeWrapping
} from "three"


export const EventType = {
    video: "video",
    drag: "drag"
};


function renderMappingWithWebSocket(mapper, config, eventType) {
    const points = getEdgePoints(mapper.scene);
    renderMapping(mapper, points, config);

    if (config.webSocketConnectionToggle) {
        const body = JSON.stringify({points, config, video: VideoBar.loadSetting(), eventType: eventType});
        mapper.webSocket.send(body);
    }
}

function renderMapping(mapper, points, config) {
    let mapping = calcMapping(config.size, config.length);
    let vert = Shift.shift(config.size, points.bottomLeft, points.topLeft, points.bottomRight, points.topRight);
    let geometry = buildBufferGeometry(vert, mapping.uvs, mapping.indices);

    mapper.scene.children[0] = buildVideoMesh(geometry, config);
    mapper.renderer.render(mapper.scene, mapper.camera);
}

function createMapper(config) {
    const mapping = calcMapping(config.size, config.length);

    let geometry = buildBufferGeometry(mapping.vertices, mapping.uvs, mapping.indices);
    let mapperMesh = buildVideoMesh(geometry, config);

    const handler = Mapper
        .edges(mapping.vertices)
        .map(coordinates => DragHandle.makeSprite(coordinates.x, coordinates.y));

    const scene = Array.concat([mapperMesh], handler);

    return {
        handler,
        scene
    };
}

export const Renderer = {
    renderMappingWithWebSocket,
    renderMapping,
    createMapper
};

function getEdgePoints(scene) {
    return {
        bottomLeft: scene.children[1].position,
        topLeft: scene.children[2].position,
        bottomRight: scene.children[3].position,
        topRight: scene.children[4].position
    };
}

function buildBufferGeometry(vertices, uvs, indices) {
    let geometry = new BufferGeometry();
    geometry.setIndex(indices);
    geometry.addAttribute('position', new BufferAttribute(Mapper.transform(vertices), 3));
    geometry.addAttribute('uv', new BufferAttribute(Mapper.transform(uvs), 3));
    return geometry;
}

//buildMesh
function buildVideoMesh(geometry, config) {
    let manager = new LoadingManager();
    manager.onProgress = (item, loaded, total) => {
        console.log(item, loaded, total);
    };

    let video = document.getElementById('video');

    const texture = new VideoTexture(video);

    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
    texture.minFilter = LinearFilter;

    return new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: config.wireframe}))
}

function calcMapping(size, length) {
    return {
        vertices: Mapper.vertices(size, length),
        uvs: Mapper.uv(size),
        indices: Mapper.calcIndices(size)
    }
}
