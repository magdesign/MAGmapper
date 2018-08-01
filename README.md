# MAGmapper
## Basic Idea
A Videomapper based on three.js
Should run on any plattform using Chrome or Firefox.

We should use [maptasticjs](https://github.com/glowbox/maptasticjs).
Looks great and has the basic functions.

## Omxplayer
We have to figure out if it is possible to load a video with omxplayer within a website in an iframe,
with this we could gain fully HW support on RPi and could use the omxplayer-sync script to sync multiple players.

These guys are talking about [omxplayer support](https://www.raspberrypi.org/forums/viewtopic.php?t=40860)
and I tryed it, without success so far. What do they put into homepage.html?
<br>
    <iframe src="file:///homepage.html?cmd=omxplayer%20--win%200,0,1920,1080%20/home/pi/video.mp4" width="2px" height="2px" frameborder="0"></iframe>
</br>


## However
With newest chromium browser we have full HW support for playing videos.</br>
FullHD movies seem to run smooth in the browser, looping can be achieved when the video is set on a seperate html page and then this html is loaded in the iframe src= tag of the mapper html page. </br>
With this solution we could also choose to load the video files from storge with the input type="file" tag, as seen here: http://jsfiddle.net/dsbonev/cCCZ2/embedded/result,js,html,css/  </br>
this works on the online demo, but could not make it to work offline, I guess there is some kind of .js library missing </br>

For syncing multiple players with the same source, we would have to check this approach: https://bocoup.com/blog/html5-video-synchronizing-playback-of-two-videos.



These guys do [map](http://www.floz.fr/Tsuki8Projection-mapping-in-Japan) with three.js. 

## Testfiles
- [Testimage](https://pocketvj.com/video/PVJ_Testscreen.png)
- [Testvideo](https://pocketvj.com/video/PVJ_Testvideo2018.mp4)


Its in the very early developement stage, reached so far:

- Basic understandment of Three.js structure.
- Draggable 3d object in browser.

## Next Steps:

- Change BoxGeometry to [BufferGeometryquad](https://threejs.org/examples/#webgl_buffergeometry_indexed) style surface like in the example here:
- Make corners dragable, so when mouse + click on a corner, you can move its position
- Add circular markers to corners to see them better, something like the red dot [here](https://threejs.org/examples/#webgl_interactive_lines)
- Load custom [Textures](https://threejs.org/docs/#api/textures/VideoTexture) (images, image folders, videos)
- Adding a [video](https://stackoverflow.com/questions/37884013/adding-video-as-texture-in-three-js) to a texture
- Test spline planes, is it possible to use bezier handles on [webgl_geometry_nurbs](https://threejs.org/examples/#webgl_geometry_nurbs)

## Milestones
### Milestone1:
- Functional prototype of a quad surface with a video texture which can be distorted with dragging the corners. Corners get higlighted when mouse is near them (if possible).


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
- Webcam, RPi cam input.

### Milestone6:
- Add [generators](https://threejs.org/examples/?q=partic#canvas_particles_sprites)
- Audio reactive FX.
- Sync various players with each other, or source from tcp-server.


## Usage

### Install
```sh
$ npm install
```

### Serve
```sh
$ npm start
```

### Build
```sh
$ npm run build
```

