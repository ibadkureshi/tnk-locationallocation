def cost(candidate, grid, distances_mx):
    """
    Calculate the cost of a (candidate) solution.

    Args:
        candidate: The solution (frozenset).
        grid: A list of MapBox objects.
        distances_mx: A NumPy array.
    Returns:
        The solution's cost (float).
    """
    c = sorted(candidate)
    c_cost = 0
    for i, sq in enumerate(grid):
        if i not in c and sq.demand > 0:
            j = c[distances_mx[c, i].argmin()]
            c_cost += sq.demand * distances_mx[j, i]
    return c_cost


def parallel_cost(candidate, grid, distances_mx, t):
    c_cost = cost(candidate, grid, distances_mx)
    return c_cost, t
