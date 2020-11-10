# Track&Know: Genetic p-Median Algorithm

The underlying Genetic Algorithm (GA) used is essentially the one proposed by [Alp, O., Erkut, E., & Drezner, Z. (2003). An efficient genetic algorithm for the p-median problem. Annals of Operations research, 122(1-4), 21-42](https://doi.org/10.1023/A:1026130003508). 

We proceed by first providing a short explanation of the (uncapacitated) p-median problem and the GA's objective, then  a  high-level overview of the steps in our GA, and finally a more detailed explanation of the algorithm.

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

##### Setting the population size

Given a problem consisting of *n* demand points and *p* facilities to be placed: 

```math
\begin{aligned}
&\text{Let } S \text{ equal }{n\choose p}\text{, the number of all possible solutions to the problem, and }w=\left\lceil\frac{n}{p}\right\rceil\text{, the rounded-up density}\\
&\text{of the problem. The population size then equals:}
\end{aligned}
```

```math
P(n,p) = w\cdot\max\left\{2, \left\lceil\frac{n}{100}\cdot\frac{\ln{S}}{w}\right\rceil\right\}
```

The advantages of this dynamic choice of population size are the following. First, although population size will increase with the number of possible solutions to the problem, this increase is logarithmic which help keep the population size manageable. Second, the population size being a multiple of *d*, and in addition always being larger than *2w*, implies that the population will consist of at least *2w* solutions, each containing *p* locations; in other words, the population will consist of at leat *2n* (perhaps repeating) locations, thus guarantying that each location can be represented at least twice in the initial population.

##### Setting the counter *T\**

```math
\begin{aligned}
&\text{Counter }T\text{ is initally set equal to }T^*=\left\lceil n\sqrt{p}\right\rceil\text{. Then, following each new generation of a candidate solution:}\\
&\text{If the population is not updated the value of }T\text{ is decreased by 1.}\\
&\text{If the population is updated the value of }T\text{ is set equal to }T^*.\\
\end{aligned}
```

##### Choosing the initial population

Let a problem consit of *n* demand points, *p* facilities to be placed, and an initial population size *P=kw, where *k>1* is an integer. 

We need to choose the locations for the *k* different groups that will consist of *d* members (initial solutions) each.
```math
\begin{aligned}
&\text{For set 1 of }k \text{ choose members by incrementing locations by 1, as follows.}\\
&\text{For the first member, choose locations }(1, 2, \dots, p).\\
&\text{For the second member,  choose locations }(p+1, p+2, \dots, 2p).\\
&\text{For the last member,  choose locations }(n-p +1,n-p+2,\dots, n).\\
\\
&\text{In general, for set }l\le k\text{ of }k \text{ choose members by incrementing locations by }l \text{, as follows.}\\
&\text{For the first member, choose locations }(1, 1+l, \dots, lp).\\
&\text{Once no more locations can be chosen, continue from location }l\text{ and keep incrementing locations by l.}\\
&\text{For the last member,  choose locations }(n-lp +1,\dots, n).\\
\\
&\text{If }w=\frac{n}{p} + 1\text{, then fill in the empty slots of each set by randomly choosing locations.}
\end{aligned}
```
For example, consider the problem with *n*=10, *p*=3, and *k*=2, impying that *w*=4.
```math
\begin{aligned}
&\text{For set 1 of }2 \text{ choose members by incrementing locations by 1.}\\
&\text{Specifically, choose }(1, 2, 3)\text{, }(4,5,6)\text{, }(7,8,9)\text{, and }(10, r_1, r_2)\text{, where }r_1 \text{ and }r_2\text{ are chosen at random and are}\\
&\text{not equal to 10 or each other.}\\
\\
&\text{For set 2 of }2 \text{ choose members by incrementing locations by 2.}\\
&\text{Specifically, choose }(1, 3, 5)\text{, }(7,9,2)\text{, }(4,6,8)\text{, and }(10, r_3, r_4)\text{, where }r_3 \text{ and }r_4\text{ are chosen at random and are}\\
&\text{not equal to 10 or each other.}\\
\end{aligned}
```

##### Selecting the parents and generating a child

Consider the problem with  *n*=10, *p*=3, and *k*=2, impying that *w*=4. By the above example the initial population will be:
```math
\begin{aligned}
&(1,2,3), (4,5,6), (7,8,9), (10, 2, 9), (1, 3, 5), (7, 9, 2), (4, 6, 8), (10, 4, 9)\text{ where the values for }r_1,\text{ } r_2, \text{ }r_3, \text{ and }r_4\\& \text{have been randomly chosen, are not equal to 10, } r_1\ne r_2\text{, and }r_3\ne r_4.
\end{aligned}
```
To generate a child-member candidate solution we first need to choose two parents-members candidate solutions at random. Then we need to:

1. Take the union of the parents location and obtain a *draft child*.
2. From the draft child's locations, call those that are present in both parents *fixed locations* and those are not *free locations*.
3. Using the distance function *d* of this problem, compute the weighted distance of the draft child's "candidate" solution. (Notice that the draft child being the union of its parents locations will contain more than *p* locations in total and hence not an actual candidate solution).
4. From the free locations, find the one that if removed from the draft child will cause the minimum increase in the weighted distance. Remove this free location.
5. If the new draft child contains exactly *p* locations, this is the "final" child and we are done. Otherwise, repeat the previous step until the draft child contains exactly *p* locations.

Considering the previous example, let candidate solutions (1, 2, 3) and (10, 2, 9) be the parents chosen at random. Then, the draft child will be (1, 2, 3, 10, 9) where location 10 is fixed, and all other locations are free.

Assume that *d(1, 2, 3, 10, 9) = 100*. Since this draft child contains 5 locations and *p*=3, we need to remove 2 locations. Now, assume that *d(2, 3, 10, 9) = 110*, *d(1, 3, 10, 9) = 105*, *d(1, 2, 10, 9) = 110*, *d(1, 2, 3, 9) = 150*, and *d(1, 2, 3, 10) = 180*. Clearly, by removing location 2 from the draft child results in the minimum weighted-distance increase. Therefore, the new draft child is now (1, 3, 10, 9). Since it containst 4 locations and *p=3*, we need to remove one further location. Assume that *d(3, 10, 9) = 110*, *d(1, 10, 9) = 120*, *d(1, 3, 9) = 150*, and *d(1, 3, 10) = 200*. Clearly, by removing location 1 from the draft child results in the minimum weighted-distance increase. Therefore, the new draft child is now (3, 10, 9). Since it containst 3 locations and *p=3*, we are done and this is the final child. 

