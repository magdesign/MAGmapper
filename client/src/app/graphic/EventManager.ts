import {DragHandler, DragHandlerTypes, IDragHandler} from "../material/DragHandler";
import {SpriteBuilder} from "../material/SpriteBuilder";
import {IVideoMaterial, VideoType} from "../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../material/VideoSceneHelper";
import {EventHandler, EventTypes} from "../event/EventHandler";
import {Scene, Sprite} from "three";
import {VideoCutter} from "./video/VideoCutter";
import {LocalStorage} from "../store/LocalStorage";
import {SceneManager} from "./SceneManager";
import {DragManager, IDragManager} from "./DragManager";
import {VideoMapper} from "./video/VideoMapper";


export class EventManager {


    public static init(videos: IVideoMaterial[], scene: Scene, renderer, camera, htmlVideo: HTMLVideoElement): void {

        let dragControls: IDragManager = DragManager.createDragManager(videos, camera, renderer);

        EventHandler.addEventListener(EventTypes.NewQuad, () => {
            DragManager.resetDragManager(dragControls);

            const newVideo = VideoMapper.create(htmlVideo, {x: 0, y: 0, z: 0});

            SceneManager.addVideoToScene(newVideo, scene);

            videos
                .filter((vid: IVideoMaterial): boolean => vid.type === VideoType.Cutter)
                .forEach((vid: IVideoMaterial) => {
                    VideoCutter.addVideoCutterOutlines(vid, newVideo);
                    SceneManager.addDragHandlesToScene(vid, scene);
                });

            videos.push(newVideo);
            dragControls = DragManager.createDragManager(videos, camera, renderer);
        });


        EventHandler.addEventListener(EventTypes.Save, () => {
            LocalStorage.save(videos);

        });

        EventHandler.addEventListener(EventTypes.Load, () => {
            DragManager.resetDragManager(dragControls);

            const saveState: IVideoMaterial[] = LocalStorage.load();

            const videoMapper: IVideoMaterial[] = saveState
                .filter((video) => video.type === VideoType.Mapper)
                .map((video) => VideoMapper.init(htmlVideo, video));

            const videoCutter = saveState
                .filter((video) => video.type === VideoType.Cutter)
                .map((cutter) => VideoCutter.init(htmlVideo, cutter, videoMapper));

            videos = videoMapper.concat(videoCutter);

            scene.children = [];
            DragManager.resetDragManager(dragControls);
            dragControls = DragManager.createDragManager(videos, camera, renderer);



            SceneManager.addToScene(videos, scene);

        });

        EventHandler.addEventListener(EventTypes.RemoveQuad, (event) => {
            const video: IVideoMaterial = event.detail.value;

            videos.filter((vid) => vid.id === video.id)
                .map((vid: IVideoMaterial) => {
                    scene.remove(vid.mesh);
                    vid.dragHandler.map((dh: IDragHandler) => {
                        scene.remove(dh.line);
                        dh.sprites.forEach((sprite: Sprite) => {
                            scene.remove(sprite);
                        });
                    });

                    VideoCutter.removeCutterItem(videos, vid, scene);

                });

            videos = videos.filter((vid) => vid.id !== video.id);
            dragControls = DragManager.createDragManager(videos, camera, renderer);
        });

        EventHandler.addEventListener(EventTypes.Cutter, (value) => {
            videos.forEach((video: IVideoMaterial) => {
                video.dragHandler.forEach((dh: IDragHandler) => {
                    switch (dh.type) {
                        case  DragHandlerTypes.Cutter:
                            DragHandler.visible(dh, value.detail.value);
                            VideoSceneHelper.changeVisibility(video.mesh, value.detail.value);
                    }
                });
            });
        });

        EventHandler.addEventListener(EventTypes.Wireframe, (value) => {
            videos.forEach((video: IVideoMaterial) => VideoSceneHelper.changeWireframe(video.mesh, value.detail.value));
        });

        EventHandler.addEventListener(EventTypes.Outlines, (value) => {
            videos.forEach((video: IVideoMaterial) => {
                video.dragHandler.forEach((dh: IDragHandler) => {
                    switch (dh.type) {
                        case  DragHandlerTypes.Mapper:
                            DragHandler.visible(dh, value.detail.value);
                            break;
                        case  DragHandlerTypes.Mover:
                        case  DragHandlerTypes.Delete:
                            SpriteBuilder.disable(dh.sprites, value.detail.value);
                            break;
                    }
                });
            });
        });
    }
}
