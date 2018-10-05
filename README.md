# MAGmapper
## Basic Idea
A Videomapper based on three.js</br>
Should run on any plattform using Chrome or Firefox.

See example here: https://mapper.jku.one/

Feel free to contribute or donate :-)


##### Rpi support
With newest chromium browser we have full HW support for playing videos on Rpi (??).</br>
FullHD movies seem to run smooth in the browser, looping can be achieved when the video is set on a seperate html page. </br>
With this solution we could also choose to load the video files from storge with the input type="file" tag, as seen here: http://jsfiddle.net/dsbonev/cCCZ2/embedded/result,js,html,css/  </br>

For syncing multiple players with the same source, we would have to check this approach: https://bocoup.com/blog/html5-video-synchronizing-playback-of-two-videos or dig for other solutions.

These guys do [map](http://www.floz.fr/Tsuki8Projection-mapping-in-Japan) with three.js. 


## Reached so far:

- Draggable object in browser.
- Fixed perspective transforms with the mathematical approach.
- Websockets integrated, enable/disable websocket button
- Show/Hide menu with ESC button
- Enable/Disable Wireframe mode



## Next Steps:

- Somehow RPi does not support EXT_texture_filter_anisotropic, need a function to disable it so it will run on PocketVJ.
- Video does not autoplay why? Its because if the resolution of the screeen is too big, if resolution is smaller than fullHD it works...
- Keyboard shortcut or menu button to show/hide handles.
- Load custom [Textures], choose video (https://threejs.org/docs/#api/textures/VideoTexture) (images, image folders, videos, websites, ndi)
- Make texture input source size and coverage selectable
- Add different shapes like circles, mesh wrap.
- Sync across various players.

## Milestones
### Milestone1 (reached):
- Functional prototype of a quad surface with a video texture which can be distorted with dragging the corners. Corners get higlighted when mouse is near them.


### Milestone2:
- Add keyboard shortcuts (or overlay menu) to step thru video/image sources (changing sources).
- Shortcut to save the actual comp and to create a new comp.
- Define input texture size (similar to texture mode in ofxpimapper).
- Sync video of one mapper with one on another unit (not the mapping surface, only the videofile).

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

Node.js must be installed on the system.

### Install
```sh
$ npm install
```

### Serve
```sh
$ npm start
```

### Websockets
```sh
$ npm run ws
```


### Run Tests
```sh
$ mocha-webpack "test/**/*.js"
```


### Build
```sh
$ npm run build
```

Open browser and type: localhost:8080
