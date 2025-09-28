
let currentCodeLang = 'pseudocode';


const algorithms = [
    {
        id: 'binary-search',
        name: 'Binary Search',
        description: 'Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you\'ve narrowed down the possible locations to just one.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        visualization: initBinarySearchVisualization,
        pseudocode: `function binarySearch(arr, target):
    left = 0
    right = length(arr) - 1
    
    while left <= right:
        mid = floor((left + right) / 2)
        
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
        codeSnippet: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}`
    },
    {
        id: 'merge-sort',
        name: 'Merge Sort',
        description: 'Merge sort is a divide-and-conquer algorithm that works by dividing the unsorted list into n sublists, each containing one element, and then repeatedly merging sublists to produce new sorted sublists until there is only one sublist remaining.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        visualization: initMergeSortVisualization,
        pseudocode: `function mergeSort(arr):
    if length(arr) <= 1:
        return arr
    
    mid = floor(length(arr) / 2)
    left = mergeSort(arr[0..mid-1])
    right = mergeSort(arr[mid..])
    
    return merge(left, right)

function merge(left, right):
    result = []
    i = 0, j = 0
    
    while i < length(left) and j < length(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i = i + 1
        else:
            result.append(right[j])
            j = j + 1
    
    return result + left[i..] + right[j..]`,
        codeSnippet: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}`
    },
    {
        id: 'quick-sort',
        name: 'Quick Sort',
        description: 'Quick sort is a divide-and-conquer algorithm that works by selecting a pivot element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. It is a highly efficient sorting algorithm and is often the best choice for large datasets.',
        timeComplexity: 'O(n log n) average, O(n²) worst case',
        spaceComplexity: 'O(log n)',
        visualization: initQuickSortVisualization,
        pseudocode: `function quickSort(arr, low, high):
    if low < high:
        # pi is partitioning index, arr[pi] is now at right place
        pi = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)

function partition(arr, low, high):
    # Choose the rightmost element as pivot
    pivot = arr[high]
    
    # Pointer for greater element
    i = low - 1
    
    # Traverse through all elements
    # compare each element with pivot
    for j = low to high - 1:
        # If current element is smaller than the pivot
        if arr[j] < pivot:
            # Increment the pointer of smaller element
            i = i + 1
            swap(arr[i], arr[j])
    
    swap(arr[i + 1], arr[high])
    return i + 1`,
        codeSnippet: `function quickSort(arr, low, high) {
    if (low < high) {
        
        const pi = partition(arr, low, high);
        
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    
    const pivot = arr[high];
    
    
    let i = low - 1;
    
    
    
    for (let j = low; j <= high - 1; j++) {
        
        if (arr[j] < pivot) {
            
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }
    }
    
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    
    return i + 1;
}`
    },
    {
        id: 'kruskal-mst',
        name: "Kruskal's MST",
        description: 'Kruskal\'s algorithm is a greedy algorithm that finds a minimum spanning tree for a connected weighted graph. It finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.',
        timeComplexity: 'O(E log E)',
        spaceComplexity: 'O(V + E)',
        visualization: initKruskalVisualization,
        pseudocode: `function kruskalMST(graph):
    # Sort all the edges in non-decreasing order of their weight
    sorted_edges = sort(graph.edges, key=lambda edge: edge.weight)
    
    # Initialize parent array for union-find
    parent = [i for i in range(V)]
    
    # Initialize result
    result = []
    e = 0  # index variable for sorted_edges
    i = 0  # index variable for result[]
    
    # Number of edges to be taken is equal to V-1
    while e < V - 1 and i < len(sorted_edges):
        # Pick the smallest edge and increment the index for next iteration
        u, v, w = sorted_edges[i]
        i += 1
        
        x = find(parent, u)
        y = find(parent, v)
        
        # If including this edge doesn't cause cycle, include it in result
        # and increment the index of result for next edge
        if x != y:
            e += 1
            result.append([u, v, w])
            union(parent, x, y)
    
    return result`,
        codeSnippet: `function kruskalMST(edges, V) {
    
    edges.sort((a, b) => a[2] - b[2]);
    
    const parent = [];
    const result = [];
    
    
    for (let i = 0; i < V; i++) {
        parent[i] = i;
    }
    
    let e = 0; 
    let i = 0; 
    
    
    while (e < V - 1 && i < edges.length) {
        const [u, v, w] = edges[i++];
        
        const x = find(parent, u);
        const y = find(parent, v);
        
        
        if (x !== y) {
            result.push([u, v, w]);
            union(parent, x, y);
            e++;
        }
    }
    
    return result;
}


function find(parent, i) {
    if (parent[i] === i) return i;
    return find(parent, parent[i]);
}


function union(parent, x, y) {
    const xset = find(parent, x);
    const yset = find(parent, y);
    parent[xset] = yset;
}`
    },
    {
        id: 'prim-mst',
        name: "Prim's MST",
        description: 'Prim\'s algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. It starts with a single vertex and grows the MST by adding the next cheapest vertex to the existing tree.',
        timeComplexity: 'O(E log V)',
        spaceComplexity: 'O(V + E)',
        visualization: initPrimVisualization,
        pseudocode: `function primMST(graph):
    # Initialize key values to infinity and MST set to false
    key = [INF] * graph.vertex
    parent = [None] * graph.vertex
    mstSet = [False] * graph.vertex
    
    # Start with first vertex
    key[0] = 0
    parent[0] = -1  # First node is always root of MST
    
    # The MST will have V vertices
    for count in range(graph.vertex - 1):
        # Pick the minimum distance vertex from the set of vertices
        # not yet included in MST
        u = minKey(key, mstSet)
        mstSet[u] = True
        
        # Update key values of adjacent vertices
        for v in range(graph.vertex):
            # Update the key only if graph[u][v] is smaller than key[v]
            if graph[u][v] > 0 and mstSet[v] == False and key[v] > graph[u][v]:
                key[v] = graph[u][v]
                parent[v] = u
    
    return parent`,
        codeSnippet: `
function primMST(graph) {
    const parent = [];
    const key = [];
    const mstSet = [];
    
    
    for (let i = 0; i < graph.vertex; i++) {
        key[i] = Number.MAX_SAFE_INTEGER;
        mstSet[i] = false;
    }
    
    
    key[0] = 0; 
    parent[0] = -1; 
    
    
    for (let count = 0; count < graph.vertex - 1; count++) {
        
        
        const u = minKey(key, mstSet);
        
        
        mstSet[u] = true;
        
        
        
        
        for (let v = 0; v < graph.vertex; v++) {
            
            
            
            if (graph[u][v] > 0 && mstSet[v] === false && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }
    
    return parent;
}



function minKey(key, mstSet) {
    let min = Number.MAX_SAFE_INTEGER;
    let minIndex = -1;
    
    for (let v = 0; v < key.length; v++) {
        if (mstSet[v] === false && key[v] < min) {
            min = key[v];
            minIndex = v;
        }
    }
    
    return minIndex;
}`
    },
    {
        id: 'dijkstra',
        name: "Dijkstra's Shortest Path",
        description: 'Dijkstra\'s algorithm finds the shortest paths from a source vertex to all other vertices in a graph with non-negative edge weights. It uses a priority queue to select the vertex with the minimum distance from the source.',
        timeComplexity: 'O((V+E) log V)',
        spaceComplexity: 'O(V)',
        visualization: initDijkstraVisualization,
        pseudocode: `function dijkstra(graph, start):
    # Initialize distances with infinity and mark all nodes as unvisited
    distances = [INFINITY] * V
    distances[start] = 0
    visited = [False] * V
    
    # Priority queue to get the node with the minimum distance
    pq = [(0, start)]
    
    while pq:
        # Get the node with the smallest distance
        current_dist, u = heappop(pq)
        
        # If we've already processed this node, skip it
        if visited[u]:
            continue
            
        visited[u] = True
        
        # Check all neighbors of the current node
        for v, weight in graph[u]:
            if not visited[v]:
                # Calculate new distance
                new_dist = current_dist + weight
                
                # If we found a shorter path to v, update it
                if new_dist < distances[v]:
                    distances[v] = new_dist
                    heappush(pq, (new_dist, v))
    
    return distances`,
        codeSnippet: `function dijkstra(graph, start) {
    const V = graph.length;
    const distances = new Array(V).fill(Number.MAX_SAFE_INTEGER);
    const visited = new Array(V).fill(false);
    const pq = new PriorityQueue((a, b) => a[0] - b[0]);
    
    distances[start] = 0;
    pq.enqueue([0, start]);
    
    while (!pq.isEmpty()) {
        const [currentDist, u] = pq.dequeue();
        
        if (visited[u]) continue;
        visited[u] = true;
        
        for (const [v, weight] of graph[u]) {
            const newDist = currentDist + weight;
            
            if (newDist < distances[v]) {
                distances[v] = newDist;
                pq.enqueue([newDist, v]);
            }
        }
    }
    
    return distances;
}`
    },
    {
        id: 'union-find',
        name: 'Union-Find (Disjoint Set)',
        description: 'A data structure that keeps track of elements which are split into one or more disjoint sets. It provides near-constant-time operations to add new sets, to merge existing sets, and to determine whether elements are in the same set.',
        timeComplexity: 'O(α(n)) per operation',
        spaceComplexity: 'O(n)',
        pseudocode: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        x_root = self.find(x)
        y_root = self.find(y)
        
        if x_root == y_root:
            return  # Already in the same set
            
        # Union by rank
        if self.rank[x_root] < self.rank[y_root]:
            self.parent[x_root] = y_root
        elif self.rank[x_root] > self.rank[y_root]:
            self.parent[y_root] = x_root
        else:
            self.parent[y_root] = x_root
            self.rank[x_root] += 1`,
        codeSnippet: `class UnionFind {
    constructor(size) {
        this.parent = Array.from({length: size}, (_, i) => i);
        this.rank = new Array(size).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);  
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const xRoot = this.find(x);
        const yRoot = this.find(y);
        
        if (xRoot === yRoot) {
            return;  
        }
        
        
        if (this.rank[xRoot] < this.rank[yRoot]) {
            this.parent[xRoot] = yRoot;
        } else if (this.rank[xRoot] > this.rank[yRoot]) {
            this.parent[yRoot] = xRoot;
        } else {
            this.parent[yRoot] = xRoot;
            this.rank[xRoot]++;
        }
    }
}`
    }
];


