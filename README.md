# AIFA Project

Group project for assignment #1 of the Artificial Intelligence - Foundations and Applications course (AI61005).

### Project members:
* Parth Mane [19MF10022] @PartMan7
* Shivam Nayak [19HS20042] @AlphaGamer5
* Sagar Suman [19HS20040] @sagarsuman1299
* Siddhant Kumar [] @Siddhant-candy

## Project Description
We opted to take the third option in the given projects - Electric Vehicles.


# Usage
To download this repository, simply navigate to the command line and type ``sudo git clone https://github.com/PartMan7/AIFA.git``. Alternatively, you may click the green Download button at the top right of the screen and unzip the downloaded file. You may also view a live version of this page at http://partbot.partman.co.in/aifa.

The entire project is a single HTML file. Simply open it with any recent version of a modern browser (tested on Firefox and Chrome).
The project may be operated in two modes - `sample` and `user`. `Sample` mode runs on a pre-supplied sample (data may be seen in the file itself). Do note that in this mode, buttons and text inputs have no effect on the operation of the script. `User` mode, on the other hand, relies on a given user input - you will be required to manually enter all the details of the vehicles, nodes, and edges.

The script runs on the assumption that the user input data forms a valid graph, and will thus run and return an error if no solution can be reached. This error is _silent_ - it will not display anything on the page and will merely reset the animation. If you wish to view the error details, please open the browser console (via F12, or right-clicking -> Inspect Element -> Console). Additionally, it is highly recommended that the page be viewed on a computer screen no less than 1000 pixels wide or 500 pixels tall. This page is intended as a demonstration / proof of concept, and is not meant to support every browser / viewport configuration.

This script has zero external dependencies, and can be run without an internet connection after the initial download.

## Summary
The project can be broken into four major parts:

a) Base HTML / CSS

   This part is simply the skeleton of the code, and provides the elements for the user to interact with. It also formats the styles of all elements in the page.
   

b) JS - Interactivity

   This is the portion of the code that is responsible for manipulating and collecting user input. It handles the visibility settings of the form elements, collects the data the user has entered, and runs simple validation scripts. Functions: setNodes(), generate(), setevs(), run()
   
c) JS - Algorithm

   This is the core of the page - all of the processing and pathfinding occurs here. The details on how this works can be found below. Functions: heuristic(), algorithm()
   
d) JS - Animation

   This is the portion of the code that animates the results of the algorithm. It renders the results and the shortest path in a user-friendly animation, along with a menu describing positions and battery states. Functions: draw(), animate()
