# Openmapper  [![Build Status](https://travis-ci.org/magdesign/MAGmapper.svg?branch=master)](https://travis-ci.org/magdesign/MAGmapper)


## Basic Idea
An opensource videomapper based on three.js</br>
Runs on any plattform using Chrome or Firefox.
See [example](https://mapper.jku.one/)

Feel free to contribute or donate :-) </br>

donation@openmapper.ch</br>
https://openmapper.ch</br>

If you are experinced and have useful inputs, please contact us: info_at_magdesign.ch

## Next important features

- [ ] remote access on mapper (the whole websockets/docker stuff)
- [ ] configure all the deploy stuff on server openmapper.dev
- [ ] curb mapper.jku.one to openmapper.dev
- [ ] hide menu by default (see comment in UiConfig.ts, https://github.com/dataarts/dat.gui/commit/d979883423e5fa4483d8cede5fbe8cc80e0ecd)
- [x] save current state
- [ ] Auto Snatch Draghandles
- [ ] Show only draghandles for selected quad, maybe use colors

## To Do Tasklist

- [ ] Fundraising, make bountysources, promote on known vj channels, find foundations
- [x] Basic working prototype to find contributers
- [x] Open a domain: openmapper.ch 

### Basics
- [ ] Save and load (video)files
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
- [ ] Function to select [sources](https://threejs.org/docs/#api/textures/VideoTexture) (video, image, slideshow with sync, camera, NDI, colors, 3d objects, shadertoy code, clock, website input)
- [X] Shortcuts
- [x] Define Shortcut List, [see here](https://github.com/magdesign/MAGmapper/blob/master/doc/Keymap.md)
- [ ] Create some sort of layers to change the behaviour of which surface is in front and which is back
- [ ] Other surfaces triangles, spheres, hexagons


### Advanced
- [ ] add [blending](https://threejs.org/examples/#webgl_materials_blending) function for each surface
- [ ] Softedge blending on each surface if possible with mouse if not with some sliders in the menu to adjust: left, right, top, button, worst case: create a workaround with blending a second material e.g. .png file with the opacity [function](https://threejs.org/examples/#webgl_materials_transparency)
- [ ] Bezier function [check this](https://computergraphics.stackexchange.com/questions/3764/apply-distortion-to-b%C3%A9zier-surface?answertab=votes#tab-top) ight be based on [this](https://pomax.github.io/bezierjs/) and needs again a shit load of mathematical braining....
- [ ] Share timecode to sync multiple players (websockets)
- [ ] List in UI to show all connected slaves
- [ ] Switch UI to control a defined client (mark them with colors)
- [ ] Grid warp
- [ ] Adjust brightness, contrast, rgb of output texture with [filters](https://threejs.org/examples/?q=filt#webgl_materials_texture_filters)
- [ ] Mapping converter to create mapping coordinates from a .svg file, similar to [this](https://github.com/magdesign/mapping-converter2)
- [ ] Audio reactive FX
- [ ] much much more crazy stuff....



## Usage

Node.js must be installed on the system.

### Install
```sh
$ npm install
```

### Start Local Instance
```sh
$ npm run start
```

### Run Tests
```sh
$ npm run test
```


### Build
```sh
$ npm run build
```

Open browser and type: localhost:8080
