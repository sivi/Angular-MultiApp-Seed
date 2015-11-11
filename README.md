# README #

Framework for multiple client side AngularJS applications (as opposed to hallowed single app commitment of AngularJS team) with single NodeJS app on server side with Grunt build framework. Reworked from yeoman:angular-fullstack-generator generated project.

### What is this repository for? ###

* Quick summary

* Version: 0.0.1

* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up

One possibility is using npm
- npm install angular-multiapp-seed

though, at present it will end up in node_modules/build-test/ folder. Move it from there to the project root.

Or simply, download zip and unpack.

* Configuration
Open Gruntfile.js and edit values of "appFolders". These are names of your apps or at least names of folders that contain single app each.

* Dependencies
Minimal set AngularJS/NodeJS dependencies (24 of them) + development dependencies (57 of them). Run "npm install" in root folder.

* Database configuration
Mongo 3.x with mongoose

* How to run tests

* Deployment instructions
folder structure is expected to be following
/
|-/client
  |-/assets
  |-/components
  |-/shared
  |-/app1-folder (names to be set in Gruntfile.js !!!)
    |-index.html
    |-app.js
    |-/app1-application-subfolder1
    |-/app1-application-subfolder2
       .
       .
       .
  |-/app2-folder
  |-/app3-folder
    .
    .
    .
|-/server
|-Gruntfiles

  *NOTE* 
  

