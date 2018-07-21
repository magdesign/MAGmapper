## MAGmapper
A Videomapper based on three.js<br />
Should run on any plattform using Chrome or Firefox.<br />

<br />
Next steps:

<br />

- Change BoxGeometry to BufferGeometryquad style surface like here: https://threejs.org/examples/#webgl_buffergeometry_indexed
- Make corners dragable, so when mouse + click on a corner, you can move its position
- Add circular markers to corners to see them better, something like the red dot here: https://threejs.org/examples/#webgl_interactive_lines
- Load custom Textures (images, image folders, videos) https://threejs.org/docs/#api/textures/VideoTexture
- Test spline planes, is it possible to use bezier handles on them?: https://threejs.org/examples/#webgl_geometry_nurbs
<br />
<br />

###Milestone1:
- Functional prototype of a quad surface with a video texture which can be distorted with dragging the corners. Corners get higlighted when mouse is near them (if possible).
<br />

###Milestone2:
- Add keyboard shortcuts (or overlay menu) to step thru video/image sources (changing sources).
- Shortcut to save the actual comp and to create a new comp.
- Define input texture size (similar to texture mode in ofxpimapper).

###Milestone3:
- Keyboard shortcut to create new quad and delete selected quad.
- Add more shapes like triangles, circles.
- Check if it is possible to grid up existing textures (like Warp function in  Mapio).
- Audio support (HDMI, Jack, Alsa)

###Milestone4:
- Remote control from another webbrowser (serving with lighttp, websockets, python server), the most lightweight version as possible.

###Milestone5:
- Play/Pause
- Adjust brightness contrast of input texture
- Image slide show with directory listener, blending, timer
- Webcam, RPi cam input

###Milestone6:
- Add generators: https://threejs.org/examples/?q=partic#canvas_particles_sprites
- Audio reactive FX



