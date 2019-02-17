import * as dat from 'dat.gui';

//Jan might piuk when he sees this code :-)
//Define an input from an external SourceBuffer, no idea if this is correct
let value = "video-slider movieposition"

//Define all things we want to control
//why do I need the this. ?
//do I need to make classes for each thing?

let controller = new function () {
    this.master = true;
    this.slave = status;
    this.selectcontent = status;
    this.position = value;
    this.resolution = 50;
    this.bezier = false;
    this.gridview = false;

}();

// create a gui element
let gui = new dat.GUI();

let f1 = gui.addFolder('Sync');

f1.add(controller, 'master').onChange(function () {
    this.master = (controller);
});
f1.add(controller, 'slave', ["slave1", "slave 2"]).onChange(function (newValue) {
    this.slave = (controller);
});


f1.close();

//add a folder, with the category f2
let f2 = gui.addFolder('Content Control');

//add content into Content Control folder f2
//how to I a white space to write it in two words like this: select content?


f2.add(controller, 'selectcontent', ["file 1", "file 2"]).onChange(function (newValue) {

    this.slave = (controller);

});

f2.add(controller, 'position', 1, 100).onChange(function () {

    this.position = (controller);

});
//leave the content control f2 folder open as default
f2.open();

//add a folder, with the category f3
let f3 = gui.addFolder('Resolution');

f3.add(controller, "bezier").onChange(function () {
    "igend opeppis hie ine"
    this.position = (controller);
});

f3.add(controller, "gridview").onChange(function () {
    "igend opeppis hie ine"
    this.position = (controller);
});


f3.add(controller, 'resolution', 10, 100, 10).onChange(function () {
    this.resolution = (controller);
});
f3.close();

