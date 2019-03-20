
# MAGmapper  [![Build Status](https://travis-ci.org/magdesign/MAGmapper.svg?branch=master)](https://travis-ci.org/magdesign/MAGmapper)


## Basic Idea
A Videomapper based on three.js</br>
Should run on any plattform using Chrome or Firefox.
See [example](https://mapper.jku.one/)

Feel free to contribute or donate :-)</br>
https://magmapper.ch</br>

If you are experinced and have useful inputs, please contact us: info_at_magdesign.ch

![Alt text](https://github.com/magdesign/MAGmapper/blob/master/doc/Layout/Layout_01_MappingMode.png?raw=true "Optional Title")

## Next important fixes

- [ ] hide menu by default (see comment in UiConfig.ts)
- [ ] cutter in fullscreen
- [ ] save current state


## To Do Tasklist

- [x] Basic working prototype to find contributers
- [ ] Fundraising, make bountysources, promote on known vj channels
- [x] Open a domain: magmapper.ch

### Basics
- [x] Migrate to productive software version (better code, dashboard, comments, modular, typed sourcecode)
- [x] Play / Pause
- [x] Enable/Disable Wireframe mode
- [x] Center Point to move entire surface
- [ ] Handle to scale entire surface
- [x] Show mode: to hide handles
- [ ] Controller to increase/decrease resolution (15.3.2019)
- [x] Add more quads, delete selected quad (new branch)
- [x] Define uvw read input for texture coverage (cutter)
- [ ] Various colors for the various quads/cutter
- [x] Define UI/UX, when calling it must be an overlay
- [ ] Function to select [sources](https://threejs.org/docs/#api/textures/VideoTexture) (video, image, slideshow with sync, camera, colors, 3d objects, shadertoy code, clock, website input)
- [X] Shortcuts
- [x] Define Shortcut List, [see here](https://github.com/magdesign/MAGmapper/blob/master/doc/Keymap.md)
- [ ] Save and load files
- [ ] Other surfaces triangles, spheres, hexagons


### Advanced
- [ ] Bezier function [check this](https://computergraphics.stackexchange.com/questions/3764/apply-distortion-to-b%C3%A9zier-surface?answertab=votes#tab-top) ight be based on [this](https://pomax.github.io/bezierjs/) and needs again a shit load of mathematical braining....
- [ ] Share timecode to sync multiple players (websockets)
- [ ] List in UI to show all connected slaves
- [ ] Switch UI to control a defined client (mark them with colors)
- [ ] Grid warp
- [ ] Adjust brightness, contrast, rgb of output texture with [filters](https://threejs.org/examples/?q=filt#webgl_materials_texture_filters)
- [ ] Softedge blending on each surface.
- [ ] Audio reactive FX.

- [ ] much much more crazy stuff....



## Usage

Node.js must be installed on the system.

### Install
```sh
$ npm install
```

### Serve
```sh
$ npm run start
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
