This project ultimately boils down to one question - how do we run a state-search algorithm when one of our axes is continuous? So far, whenever we've applied an algorithm, we've used simple discrete states along the lines of motion between points on a grid, or finite moves in a game. However, when a continuous factor like time is added to the midst, all our preconceived algorithms stop working - simply because we have no way to generate an infinite number of states corresponding to every point in time.

So the question is, how do we deal with it?

There's various approaches we can take. One way, for example, is to avoid this state generation completely, and instead focus on converting an illegal solution into a legal one. Since we can very easily obtain an illegal solution from our heuristic function and then stagger vehicle times until it becomes valid, this method is guaranteed to return a valid solution - and indeed, that is the logic behind the Simple Staggered Algorithm. This also runs in very efficient time, as the cost for state generation is simply a single run of the heuristic, and each step towards making the solution legal only runs the heuristic once more. Due to this, our net cost is simply (k + 1) * heuristic expense, where k is the number of 'collisions' between vehicles at charging stations. Furthermore, this method has negligible memory costs, since the only data stored in memory is a single Dijkstra's run of points in addition to the memory required to store the information regarding the graph and vehicles.

However, it is very easy to point out multiple cases in which this would not be the fastest solution. After all, if you're making a vehicle wait for it's chance to charge, couldn't it just as easily have gone on a slightly longer edge that would allow it to charge and thus take less overall time? Here we introduce the Significant Times Algorithm.

The STA runs by converting a continuous quantity (time to spend charging at a station) into a discrete quantity (time required in charging to given cost) by imposing a single constraint: vehicles will only charge enough to travel along a given edge. While this does result in a slight loss in optimality (for example, if a vehicle could have the optimal path by charging 15 on two cities to cover three edges costing 10 battery each), it is far more advanced than the previously mentioned SSA.

However, the STA has significant costs - not only is there a large amount of nodes that are constantly being explored, but there is also a vast amount of data associated with each state. Here, a state is defined as the configuration of the vehicles - since the cities / edges do not change, our graph remains constant. To represent the state, each vehicle has the following attributes recorded: specified vehicle properties (such as speed and maximum battery capacity), current battery, current position, and status. Since these states are all separate from each other, changes in one should not affect the others - but since these are objects, we need to first clone the state to generate a new one. The problems of both state storage and state references are somewhat addressed by a STATE object that provides methods for both parsing and serialization (ie, converting state to and from a string). This was written from scratch by me, and is over a dozen times faster than JavaScript's internal JSON serializer.

With state storage and desync now addressed, we now have another question - in each state, some vehicles are in motion while others are charging. However, if we simply pass the state at the end of the edge charge into our open queue, we will have vehicles that are frozen in time between these states. To address this, I added a timeTravel function that operates on the beginning of the provided state, and converts it to the *next significant state in time* instead of directly parsing the traveled edge.

Now, since we will be operating on hundreds of thousands of nodes, efficiency is important. Because of this, I wrote a JavaScript implementation of a priority queue with some additional features, like internal g-value-comparison for node overwriting and a LIFO queue so that the first returned solution is always optimal.

It is to be noted that the only reason the first returned solution is optimal is due to the fact that our used heuristic is *admissible*. In order for a heuristic to be admissible, it must always return a value smaller than (or equal to) the actual cost. In mathematical terms, this can be represented as H(x) <= H\*(x). Our heuristic meets this, which can be proved by simple logic: since H\*(x) in this case is the solution to the case with a constraint, and H(x) is a solution to the same problem without the constraint, any valid solution for H\*(x) would also be valid for H(x). Since our H(x) will always have a possible route as the optimal solution, our heuristic must be admissible.

___


While programming this, the first step I did was to implement the heuristic function. Since I have some previous experience in programming basic searching algorithms like Dijkstra, this step was over fairly quickly.

The next step was to add in rudimentary graphics. Since I had been informed that I would be required to implement graphics if I wrote my submission in JavaScript, this was a necessary step. At this point, I simply added the basic menu interface and a blank canvas element for drawing. These elements remained relatively unchanged throughout the whole process.

After this came the hard part - implementing a proper search algorithm. I went through many possible options, such as quantizing time by taking small finite intervals for iterations - before finally settling down on a significant-times-based implementation. Attempting to implement this took the better part of a week, and even as of the day of submission, there are one or two programming oversights that have not been properly rectified. This method was also incredibly heavy on my PC - as my PC is a fairly outdated model with subpar hardware, it overheated while running and I ended up needing to reinstall my operating system to get it running again.

After that fiasco, I immediately implemented a killcounter - whenever the script generated more than a predefined number of nodes, it would throw an exceptin and automatically terminate. This was also very useful during debugging.

TThe next step was to properly animate the results of a generated solution - and this was fairly hard. Since I had practically no experience before in manipulating CANVAS elements, I had to learn the entire DOM from scratch, along with the entire implementation of animation systems. I was successful in this, leading to the animations that you can view on the final result.

However, given that time was low at this point, I decided to implement an SSA so that there would be a valid solution for a given scenario, even if not perfectly optimal. This was implemented within a few hours, so I decided to move on to documentation - and here we are.

All of my code in the corresponding files, including my shoddy demonstration of the STA. You may also view the code history and progress of the code by browsing through the commits.



I would sincerely like to thank w3schools for their CANVAS tutorials and MDN for their impeccable language documentation.

I would also like to thank the vehicles for driving safely and ensuring that their batteries have enough power left to cover edges, so that they don't break down midway.

And of course, I'd like to thank our professors ~~without whom this project would never have happened in the first place~~.

    Parth Mane
    19MF10022