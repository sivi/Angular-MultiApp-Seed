# README #

Framework for multiple client side AngularJS applications (as opposed to hallowed single app commitment of AngularJS team) with single NodeJS app on server side with Grunt build framework. Reworked from yeoman:angular-fullstack-generator generated project.


 Version: 0.0.1

## Set up

One possibility is using npm
- npm install angular-multiapp-seed

though, at present it will end up in node_modules/build-test/ folder. Move it from there to the project root.

Or simply, download zip and unpack.

Configuration
Open Gruntfile.js and edit values of "appFolders". These are names of your apps or at least names of folders that contain single app each.

## Dependencies
Minimal set AngularJS/NodeJS dependencies (24 of them) + development dependencies (57 of them). Run "npm install" in root folder.

## Database configuration
Mongo 3.x with mongoose


## Deployment instructions

  folder structure is expected to be following
         
     /  (root folder: package.json, Gruntfile.js, . . .)                                                       
     |-/client                                                 
     |-/assets                                                 
     |-/components                                             
     |-/shared                                                 
     |-/server                                                 
     |-/GruntFiles                                             
     |-/app1-folder (names to be set in Gruntfile.js !!!)      
     | |-index.html                                            
     | |-app.js                                                
     | |-/app1-application-subfolder1                          
     | |-/app1-application-subfolder2                          
     | |      .                                                   
     | |      .                                                  
     | |      .                                                 
     |-/app2-folder                                            
     |-/app3-folder                                            
         .                                                     
         .                                                     
         .                                                     

  **NOTE**
   Each application folder contains **index.html** and **app.js** (literally named so). If you prefer different names or positions, you need to edit Gruntfile.js and entire set of files in Gruntfiles/configs/ folder. Not a small feat, though.

Build configuration is split among multiple files: Gruntfile.js at project root, and files under GruntFiles folder. "configs" contains editing of configuration, "tasks" editing of tasks definitions. There are some cheating tasks which modify configuration in runtime since "**useminPrepare**" does not permit multiple apps, and does not permit app.js to be located anywhere except client root. Similar problem is with "**ngTemplates**" task.

Each app after build will contain all bower components unless you exclude "wiredep" task.