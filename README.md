# MAGmapper
## Basic Idea
A Videomapper based on three.js</br>
Should run on any plattform using Chrome or Firefox.


##### Rpi support
With newest chromium browser we have full HW support for playing videos on Rpi.</br>
FullHD movies seem to run smooth in the browser, looping can be achieved when the video is set on a seperate html page. </br>
With this solution we could also choose to load the video files from storge with the input type="file" tag, as seen here: http://jsfiddle.net/dsbonev/cCCZ2/embedded/result,js,html,css/  </br>

For syncing multiple players with the same source, we would have to check this approach: https://bocoup.com/blog/html5-video-synchronizing-playback-of-two-videos or dig for other solutions.

These guys do [map](http://www.floz.fr/Tsuki8Projection-mapping-in-Japan) with three.js. 

## Testfiles

- [Testimage](https://pocketvj.com/video/PVJ_Testscreen.png)
- [Testvideo](https://pocketvj.com/video/PVJ_Testvideo2018.mp4)


## Reached so far:

- Basic understandment of Three.js structure.
- Draggable 3d object in browser.
- Fixed perspective transforms with the mathematical approach.


## Next Steps:

- Fix build file
- Make corners dragable, so when mouse + click on a corner, you can move its position
- Add circular markers to corners to see them better, something like the red dot [here](https://threejs.org/examples/#webgl_interactive_lines)
- Load custom [Textures](https://threejs.org/docs/#api/textures/VideoTexture) (images, image folders, videos, websites, ndi)
- Adding a [video](https://stackoverflow.com/questions/37884013/adding-video-as-texture-in-three-js) to a texture
- Make texture input source size and coverage selectable
- Test spline planes, is it possible to use bezier handles on [webgl_geometry_nurbs](https://threejs.org/examples/#webgl_geometry_nurbs)
- Add different shapes like circles, mesh wrap.

## Milestones
### Milestone1:
- Functional prototype of a quad surface with a video texture which can be distorted with dragging the corners. Corners get higlighted when mouse is near them.


### Milestone2:
- Add keyboard shortcuts (or overlay menu) to step thru video/image sources (changing sources).
- Shortcut to save the actual comp and to create a new comp.
- Define input texture size (similar to texture mode in ofxpimapper).

### Milestone3:
- Keyboard shortcut to create new quad and delete selected quad.
- Add more shapes like triangles, circles.
- Check if it is possible to grid up existing textures (like Warp function in  Mapio).
- Audio support (HDMI, Jack, Alsa).

### Milestone4:
- Remote control from another webbrowser (serving with lighttp, websockets, python server), the most lightweight version as possible.

### Milestone5:
- Play/Pause
- Adjust brightness contrast of input texture.
- Image slide show with directory listener, blending, timer.
- Webcam, RPi cam input, HDMi board input.
- Realtime Website input with refresh cycle.

### Milestone6:
- Sync various players with each other, or source from tcp-server.
- Automatic master slave detection (RJ45).

## Milestone7:
- Softedge blending.
- Add [generators](https://threejs.org/examples/?q=partic#canvas_particles_sprites)
- Audio reactive FX.


## Usage

### Install
```sh
$ npm install
```

### Serve
```sh
$ npm start
```

### Run Tests
```sh
$ mocha-webpack "test/**/*.js"
```


### Build
```sh
$ npm run build
```

