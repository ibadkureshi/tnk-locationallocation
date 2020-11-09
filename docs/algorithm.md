# Track&Know: Genetic p-Median Algorithm

The underlying Genetic Algorithm (GA) used is essentially the one proposed by [Alp, O., Erkut, E., & Drezner, Z. (2003). An efficient genetic algorithm for the p-median problem. Annals of Operations research, 122(1-4), 21-42](https://doi.org/10.1023/A:1026130003508). We proceed first with a short explanation of the (uncapacitated) p-median problem and the GA's objective, then we present a  high-level overview of the steps in our GA, and finally provide a more detailed explanation of the algorithm.

### Definition of the p-median problem

Each (uncapacited) p-median problem consists of:

- A number of possible demand points *n* that are can be chosen by a candidate solution to the problem.
- A number of facilities *p* that are to be located/allocated in the above demand points (one facility per demand point).
- A distance function *d* that relates each pair of demand points to some distance (or cost).

A candidate solution would be a choice of *p* locations out of the *n* demand points, along with the associated demand-weighted distance of this candidate solution. As an example, assume the following p-median problem: 

> There are 3 demand points: *α* with demand 1, *β* with demand 10, and *γ* with demand 15; moreover, *p*=2. Finally, the distance function *d* is defined as follows:
>
> - *d(α,α)* = *d(β, β)* = *d(γ,γ)* = 0
> - *d(α,β)* = *d(β,γ)* = 3
> - *d(α,γ)* = 2
>
> Since *p*=2, any pair of demand points along with its associated demand-weighted distance is a candidate solution. For example, if the candidate solution is (*α*, *β*), i.e. *α* and *β* are chosen to allocate facilities at, the associated distance will be as follows:
>
> Demand point *α* will satisfy it's demand at the nearest facility to it, which since *d(α,α)*= 0, is *α*. Similarly, demand point *β* will satisfy it's demand at β, its nearest facility. However in the case of *γ*, as no facility is located at *γ*, its demand will be satisfied at *α*, since *d(α,γ)< d(β,γ)*. Therefore, the associated demand-weighted distance will be 30, since it will be *1x0*=*10x0* for *α* and *β* respectively, and *15x2*=*30* for *γ*.

The objective of the GA is to minimise this weighted distance by finding (or approximating) the optimal choice of *p* locations to locate/allocate the facilities. In the above example, it is easy to see that for *p*=2 the optimal solution is (*β*,*γ*) which results in a demand-weighted distance of 1.

### Overview of the GA

Given a problem consisting of *n* demand points, *p* facilities to be placed, and a distance function *d*, the algorithm proceeds as follows.

*Step 1:* Select an initial set of candidate solutions (the *initial population*) and a counter *T=T\**.

*Step 2:* From the population, compute the candidate solutions with the largest and smallest associated distances (the *worst* and *best* *members* of the population).

*Step 3:* Randomly select two candidate solutions out of the initial population (the *parents*).

*Step 4:* Using the parents, generate a -perhaps- new candidate solution (the *child*).

*Step 5:* If the child's associated distance is smaller than the worst member of the population, replace this member with the child.

*Step 6:* If no replacement occurred in Step 5, decrease the counter by 1. If a replacement was made in the population, reset the value of the counter to *T\**.

*Step 7:* While *T>0*, repeat steps 2 through 6. When *T=0* the best member of the (final) population is the (approximate) solution.

### GA - in detail

##### Choosing the initial population and setting the counter (Step 1)

##### Selecting the parents and generating a child (Steps 3 and 4)

