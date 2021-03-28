# AIFA Project

Group project for assignment #1 of the Artificial Intelligence - Foundations and Applications course (AI61005).

### Project members:
* Parth Mane [19MF10022] @PartMan7
* Shivam Nayak [19HS20042] @AlphaGamer5
* Sagar Suman [19HS20040] @sagarsuman1299
* Siddhant Kumar [19CH10052] @Siddhant-candy

## Project Description
We opted to take the third option in the given projects - Electric Vehicles.


# Usage
To download this repository, simply navigate to the command line and type ``sudo git clone https://github.com/PartMan7/AIFA.git``. Alternatively, you may click the green Download button at the top right of the screen and unzip the downloaded file. You may also view a live version of these pages at http://partbot.partman.co.in/aifa/simple or http://partbot.partman.co.in/aifa/heuristic.

The entire project can be run as a single HTML file. Simply open the file with any recent version of a modern browser (tested on Firefox and Chrome).
The project may be operated in two modes - `sample` and `user`. `Sample` mode runs on a pre-supplied sample (data may be seen in the file itself). Do note that in this mode, buttons and text inputs have no effect on the operation of the script. `User` mode, on the other hand, relies on a given user input - you will be required to manually enter all the details of the vehicles, nodes, and edges.

The script runs on the assumption that the user input data forms a valid graph, and will thus run and return an error if no solution can be reached. This error is _silent_ - it will not display anything on the page and will merely reset the animation. If you wish to view the error details, please open the browser console (via F12, or right-clicking -> Inspect Element -> Console). Additionally, it is highly recommended that the page be viewed on a computer screen no less than 1000 pixels wide or 500 pixels tall. This page is intended as a demonstration / proof of concept, and is not meant to support every browser / viewport configuration.

This script has zero external dependencies, and can be run without an internet connection after the initial download.

Different files run different algorithms. These are **heuristic.html** (which demonstrates the heuristic function), **simple.html** (which runs the simple staggered algorithm), and **index.html** (which runs the significant times algorithm). Please note that the advanced searching algorithm is not complete.

## Summary
The project can be broken into four major parts:

a) Base HTML / CSS

   This part is simply the skeleton of the code, and provides the elements for the user to interact with. It also formats the styles of all elements in the page.
   

b) JS - Interactivity

   This is the portion of the code that is responsible for manipulating and collecting user input. It handles the visibility settings of the form elements, collects the data the user has entered, and runs simple validation scripts. Functions: setNodes(), generate(), setevs(), run()
   
c) JS - Algorithm

   This is the core of the page - all of the processing and pathfinding occurs here. The details on how this works can be found [here](ALGORITHMS.md). Functions: heuristic(), algorithm()
   
d) JS - Animation

   This is the portion of the code that animates the results of the algorithm. It renders the results and the shortest path in a user-friendly animation, along with a menu describing positions and battery states. Functions: draw(), animate()


### Usage

After opening the file in your browser, you will be presented with a popup. If you wish to view the provided sample case, click Yes. Otherwise, click Cancel.

If you used the sample case, you may view the animation again by either clicking the Run button or refreshing the page. If you wish to manually create a scenario, simply refresh the page and click Cancel on the sample box.

Manually entering the information is done in five steps: 
* Enter in the number of nodes and click `Set`.
* Fill in the edge values. Values can only be positive numbers or the `-` character (which represents no edge). Once done, click the `Generate map!` button to view the graph. This will display the graph on the left side of the page, and will also open the vehicles menu. If you wish to edit these values after filling in later data, you may do so simply by entering the data and again clicking `Generate map!`.
* Enter in the number of vehicles and click `Set`.
* In the fields that pop up below, enter in the information of all the vehicles. The fields are named appropriately. Note that you may need to scroll to view all the fields.
* Once you're done, hit the `Run` button. It will begin the animation of the solution the code has found. You may re-run this animation by waiting until it ends and then again clicking `Run`.

If you wish to view the path without animation, open the console and run the following code: ```js
Object.values(info.EVs).map(vehicle => [vehicle.name, ...vehicle.route]);
```

The output of this will be a nested array, with each outer array representing a vehicle and each internal array containing every 'event' in the vehicle's path. Events may be of three types - charge, wait, and travel. The information associated with each event is also provided. Additionally, the timestamp of each event can also be seen.


For my thought processes and approach while attempting this problem, refer to [this](THOUGHTS.md).
