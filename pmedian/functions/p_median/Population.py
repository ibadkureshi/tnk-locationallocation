from math import factorial, ceil, log
from random import randint, sample
from .cost import cost, parallel_cost
import concurrent.futures as cf


class Population:

    def __init__(self, p_value, grid, distance_mx):
        """
        Initializes population's parameters (Alp et al. (2003), 4.3)
        Args:
            p_value: The p-value of the problem.
            grid: A list of MapBox objects.
            distance_mx: A NumPy array.
        """

        self.n_supply = len(distance_mx) - len(distance_mx[0])
        self.p_value = p_value

        # If selecting less locations than supply points, choose among supply points.
        if self.n_supply >= p_value:
            self.n = self.n_supply
            self.solution = "supply"
        # If selecting more locations than (non-zero) supply points, pick all supply points and choose the rest.
        elif self.n_supply > 0:
            self.n = len(grid)
            self.p_value -= self.n_supply
            self.solution = "mixed"
        # Otherwise choose only demand locations
        else:
            self.n = len(grid)
            self.solution = "demand"

        self.n_choose_p = factorial(self.n) / (factorial(self.p_value) * (factorial(self.n - self.p_value)))
        self.density = ceil(self.n / self.p_value)
        self.k = max(2, (ceil((self.n / 100) * (log(self.n_choose_p) / self.density))))
        self.stop = ceil(self.n * (self.p_value ** (1 / 2)))
        self.candidates = None
        self.best = None
        self.worst = None
        self.costs = {}
        self.grid = grid
        self.distances = distance_mx

    def initialize(self):
        """
        Performs initial draw of candidates (Alp et al. (2003), 4.4)
        Candidate cost, best (least expensive) and worst (most expensive) candidates are computed.
        """
        k_groups = []
        for i in range(1, self.k + 1):
            k_group = []
            start = 0
            end = self.n
            step = i
            for j in range(i):
                k_group.extend(list(range(start, end, step)))
                start += 1
            while len(k_group) % self.p_value > 0:
                random_number = randint(0, self.n - 1)
                if random_number not in k_group[-(len(k_group) % self.p_value):]:
                    k_group.append(random_number)
            k_groups.extend(k_group)
        if self.solution == "supply":
            offset = len(self.grid)
            k_groups = [k + offset for k in k_groups]
            self.candidates = [k_groups[i:i + self.p_value] for i in range(0, len(k_groups), self.p_value)]
        elif self.solution == "mixed":
            offset = len(self.grid)
            all_supply = list(range(offset, offset + self.n_supply))
            self.candidates = [k_groups[i:i + self.p_value] for i in range(0, len(k_groups), self.p_value)]
            for item in self.candidates:
                item.extend(all_supply)
        else:
            self.candidates = [k_groups[i:i + self.p_value] for i in range(0, len(k_groups), self.p_value)]

        self.candidates = [frozenset(c) for c in self.candidates]

        self.costs = {c: cost(c, self.grid, self.distances) for c in self.candidates}
        self.best = min(self.candidates, key=lambda t: self.costs[t])
        self.worst = max(self.candidates, key=lambda t: self.costs[t])

    def get_parents(self):
        """
        Randomly draw two candidates from the current population. (Alp et al. (2003), 4.5)

        Returns: list
        """
        return sample(self.candidates, 2)

    def get_child(self, parents):
        """
        Create a child (Alp et al. (2003), 4.6)

        Args:
            parents: A pair of solutions (list)

        Returns:
            A -perhaps- new solution (frozenset)
        """
        draft_child = set(parents[0] | parents[1])
        removable_genes = set(parents[0] ^ parents[1])

        p = self.p_value + self.n_supply if self.solution == "mixed" else self.p_value

        while len(draft_child) > p:
            gene_to_remove = min(removable_genes, key=lambda t: cost(draft_child - {t}, self.grid, self.distances))
            draft_child.discard(gene_to_remove)
            removable_genes.discard(gene_to_remove)
        return frozenset(draft_child)

    def get_children(self):
        parents = self.get_parents()
        child = self.get_child(parents)
        return child

    def update_candidates(self, child):
        """
        Updates the current population as follows. If the the child's cost is larger than that of the worst's candidate,
        then the former is added to the population and the latter removed. If in addition the child's cost is the new
        best candidate/solution, the stop counter is reset. (Alp et al. (2003), 4.8 and 4.9)

        Args:
            child: A solution (frozenset)
        """
        if child not in self.candidates:
            child_cost = cost(child, self.grid, self.distances)
            if child_cost < self.costs[self.worst]:
                if child_cost < self.costs[self.best]:
                    self.stop = ceil(self.n * (self.p_value ** (1 / 2))) + 1
                self.candidates.remove(self.worst)
                self.candidates.append(child)
                self.costs[child] = child_cost
                self.worst = max(self.candidates, key=lambda t: self.costs[t])
                self.best = min(self.candidates, key=lambda t: self.costs[t])
        self.stop -= 1
