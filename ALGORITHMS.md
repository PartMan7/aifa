# Algorithms

The algorithms used in the project can be broadly broken into three functions: 


### 1. Heuristic Function (H)
As with any state-space-search problem, we require an admissible heuristic function to minimize memory costs. For our case, the heuristic function was simple - H(state) is simply the solution to our given problem with the constraint of `only one vehicle charging in a city at a time`. This results in a much simpler function - since now vehicles no longer have any interactions, we can calculate the costs of each vehicle individually. This cost is determined by (minimum distance from start to end) / (vehicle speed) + (total required battery - initial battery) / (charging rate). In simpler terms, it's the sum of the times required for both traveling and charging. From here, the heuristic is simply the maximum of these values. For this project, I have used Dijkstra's algorithm to calculate the minimum distance from start to end. However, it is of note that vehicles with low maximum battery capacities and discharging speeds can never cover longer edges. Dijkstra's algorithm was modified accordingly to trim these edges.

Time complexity: O(n<sup>2</sup> * v)

### 2. Simple Staggered Algorithm (SSA)
Now, as we have seen, our heuristic is nothing but the solution to the case when the charging constraint is removed. This can be extended into _a_ solution (not necessarily optimal) by simply queueing the vehicles that would have charged at the same time. After all of the paths are generated for the heuristic, a while loop runs. All points at which a vehicle would be charging at the same time and place are shifted by the time required for the other vehicle to charge. Naturally, the choice of vehicle to 'stagger' also dictates the total time - to minimize this, we once again run the heuristic to find out which vehicle has more required time left. This vehicle is given priority during charging.

Time complexity: O(n<sup>2</sup> * v)

### 3. Significant Times Algorithm (SGA)
This algorithm, like the previous algorithm, is not guaranteed to generate the fastest possible outcome. However, it comes very, very close to doing so. This algorithm can be thought of as an A-star algorithm, where we have an open priority queue and iterate over the node with the minimum f-value. However, in this problem, a significant question arises - how would we generate the child nodes? In writing the STA, as the name indicates, child nodes were generated on the basis of *significant times*.

In simple terms, a significant time is basically the minimum time required to charge the vehicle until it can travel on a chosen edge from the current city. Therefore, every time a vehicle parks at a city, it generates x + 1 child nodes, where x is the number of edges from that city.


For more information on the implementation of these functions, refer to (this file)[THOUGHTS.md].


<sub>In time complexities, n represents the number of cities, while v represents the number of vehicles.</sub>