# MAGmapper
## Basic Idea
A Videomapper based on three.js</br>
Should run on any plattform using Chrome or Firefox.
See [example](https://mapper.jku.one/)

Feel free to contribute or donate :-)
If you are experinced and have useful inputs, please contact us: info_at_magdesign.ch

![Alt text](https://github.com/magdesign/MAGmapper/blob/master/doc/Layout/Layout_01_MappingMode.png?raw=true "Optional Title")


## To Do Tasklist

- [ ] Basic working prototype to find contributers
- [ ] Fundraising, make bountysources, promote on known vj channels
- [ ] Open a domain :-)

### Basics
- [x] Migrate to productive software version (better code, dashboard, comments, modular, typed sourcecode)
- [x] Play / Pause
- [x] Enable/Disable Wireframe mode
- [x] Center Point to move entire surface
- [ ] Handle to scale entire surface
- [x] Show mode: to hide handles
- [ ] Controller to increase/decrease resolution
- [ ] Add more quads, delete selected quad
- [x] Define uvw read input for texture coverage
- [x] Define UI/UX, when calling it must be an overlay
- [ ] Function to select [sources](https://threejs.org/docs/#api/textures/VideoTexture) (video, image, slideshow with sync, camera, colors, 3d objects, shadertoy code, clock, website input)
- [ ] Shortcuts
- [x] Define Shortcut List, [see here](https://github.com/magdesign/MAGmapper/blob/master/doc/Keymap.md)
- [ ] Save and load files
- [ ] Other surfaces triangles, spheres, hexagons


### Advanced
- [ ] Bezier function [check this](https://computergraphics.stackexchange.com/questions/3764/apply-distortion-to-b%C3%A9zier-surface?answertab=votes#tab-top) ight be based on [this](https://pomax.github.io/bezierjs/) and needs again a shit load of mathematical braining....
- [ ] Share timecode to sync multiple players
- [ ] List in UI to show all connected slaves
- [ ] Switch UI to control a defined client (mark them with colors)
- [ ] Grid warp
- [ ] Adjust brightness, contrast, rgb of output texture with [filters](https://threejs.org/examples/?q=filt#webgl_materials_texture_filters)
- [ ] Softedge blending on each surface.
- [ ] Audio reactive FX.

- [ ] much much more crazy stuff....


## Progress Update

We could also choose to load the video files from storge with the input type="file" tag, as seen [here](http://jsfiddle.net/dsbonev/cCCZ2/embedded/result,js,html,css/)  on the index page.</br>

For syncing multiple players with the same source, we would have to check this [approach](https://bocoup.com/blog/html5-video-synchronizing-playback-of-two-videos) or dig for other solutions.

These guys do [map](http://www.floz.fr/Tsuki8Projection-mapping-in-Japan) with three.js. 



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
