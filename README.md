# MAGmapper
## Basic Idea
A Videomapper based on three.js</br>
Should run on any plattform using Chrome or Firefox.

See example here: https://mapper.jku.one/

Feel free to contribute or donate :-)
If you are experinced and have useful inputs, please contact us: info_at_magdesign.ch


## Progress Update
We tried:</br>
</br>

- to reduce the resolution of our three.js mapper to 5x5 triangles, but video still stutters</br>
=> three.js will never work without stutters since we have no HW acceleration in Chromium
</br>

- to make mapping distortion with processing, this works up to a resolution of 5x5 quads, but is very laggy to handle, still requires X window and when video is distorted with "stairs". 
</br>

- to run mapper with python and openCV, cv2, it runs, but we get some artefacts in playing video.
</br>

- pi3d runs, but does it support video?
</br>

- tested gstreamer since we thought it supports the hw acceleration, but gst-launch is crap.
</br>

The thing is that we need hardware acceleration to decode a video, then we need opnGL or better something performant which does not require X to warp/distort the video texture.

#### RPi support
Runs on Stretch with newest Chromium, but we dont have enough ressources to display it without stutters. 
RPi does not support EXT_texture_filter_anisotropic.
After testing with WPE: https://wpewebkit.org, the https://mapper.jku.one/ does not run, following errors: 
```CONSOLE WARN THREE.WebGLRenderer: EXT_texture_filter_anisotropic extension not supported.
** (WPEWebProcess:21): CRITICAL **: gst_video_frame_map_id: assertion 'GST_IS_BUFFER (buffer)' failed

** (WPEWebProcess:21): CRITICAL **: gst_video_frame_map_id: assertion 'GST_IS_BUFFER (buffer)' failed
WARNING: WebProcess crashed: restarting it ...
```
 

We could also choose to load the video files from storge with the input type="file" tag, as seen here: http://jsfiddle.net/dsbonev/cCCZ2/embedded/result,js,html,css/  on the index page.</br>

For syncing multiple players with the same source, we would have to check this approach: https://bocoup.com/blog/html5-video-synchronizing-playback-of-two-videos or dig for other solutions.

These guys do [map](http://www.floz.fr/Tsuki8Projection-mapping-in-Japan) with three.js. 


## Reached so far:

- Draggable object in browser.
- Fixed perspective transforms with the mathematical approach.
- Websockets integrated, enable/disable websocket button, remote controllalble
- Show/Hide menu with ESC button
- Enable/Disable Wireframe mode


## Next Steps:

- Video does not autoplay why? Its because if the resolution of the screeen is too big, if resolution is smaller than fullHD it works...
- Keyboard shortcut or menu button to show/hide handles.
- Button to add another Quad or remove the selcted one (make shapes selectable).
- Load custom [Textures], choose video (https://threejs.org/docs/#api/textures/VideoTexture) (images, image folders, videos, websites, ndi)
- Make texture input source size and coverage selectable
- Add different shapes like circles, mesh wrap.
- Sync across various players.

## Milestones

- Add keyboard shortcuts (or overlay menu) to step thru video/image sources (changing sources).
- Shortcut to save the actual comp and to create a new comp.
- Define input texture size (similar to texture mode in ofxpimapper).
- Sync video of one mapper with an another unit (not the mapping surface, only the videofile).
- Automatic master slave detection (RJ45).
- Keyboard shortcut to create new quad and delete selected quad.
- Add more shapes like triangles, circles.
- Check if it is possible to grid up existing textures (like Warp function in Mapio).
- Audio support (HDMI, Jack, Alsa).
- Play/Pause.
- Adjust brightness, contrast, rgb of input texture.
- Image slide show with directory listener, blending, timer.
- Webcam, RPi cam input, HDMi board input.
- Realtime Website input with refresh cycle, filed to type in url.
- Softedge blending on each surface.
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
