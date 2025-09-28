
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
        # pi is partitioning index
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
    for j from low to high - 1:
        # If current element is smaller than the pivot
        if arr[j] < pivot:
            # Increment the pointer and swap elements
            i = i + 1
            swap arr[i] and arr[j]
    
    # Swap the pivot element with the greater element at i
    swap arr[i + 1] and arr[high]
    
    # Return the position from where partition is done
    return i + 1`,
        codeSnippet: `function quickSort(arr, low = 0, high = arr.length - 1) {
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
    
    
    for (let j = low; j < high; j++) {
        
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
        description: 'Kruskal\'s algorithm is a minimum-spanning-tree algorithm which finds an edge of the least possible weight that connects any two trees in the forest. It is a greedy algorithm that finds a minimum spanning tree for a connected weighted graph.',
        timeComplexity: 'O(E log V)',
        spaceComplexity: 'O(E + V)',
        visualization: initKruskalVisualization,
        pseudocode: `function kruskalMST(graph):
    result = []  # This will store the resultant MST
    i = 0  # An index variable, used for sorted edges
    e = 0  # An index variable, used for result[]
    
    # Step 1: Sort all the edges in non-decreasing order of their weight
    graph.edge = sorted(graph.edge, key=lambda item: item[2])
    
    parent = []
    rank = []
    
    # Create V subsets with single elements
    for node in range(graph.vertex):
        parent.append(node)
        rank.append(0)
    
    # Number of edges to be taken is equal to V-1
    while e < graph.vertex - 1:
        # Step 2: Pick the smallest edge and increment the index
        u, v, w = graph.edge[i]
        i = i + 1
        x = find(parent, u)
        y = find(parent, v)
        
        # If including this edge doesn't cause cycle,
        # include it in result and increment the index
        # of result for next edge
        if x != y:
            e = e + 1
            result.append([u, v, w])
            union(parent, rank, x, y)
    
    return result`,
        codeSnippet: `
function kruskalMST(graph) {
    const result = []; 
    let e = 0; 
    let i = 0; 
    
    
    graph.edge.sort((a, b) => a[2] - b[2]);
    
    const parent = [];
    const rank = [];
    
    
    for (let node = 0; node < graph.vertex; node++) {
        parent[node] = node;
        rank[node] = 0;
    }
    
    
    while (e < graph.vertex - 1 && i < graph.edge.length) {
        
        const [u, v, w] = graph.edge[i++];
        
        const x = find(parent, u);
        const y = find(parent, v);
        
        
        
        
        if (x !== y) {
            result[e++] = [u, v, w];
            union(parent, rank, x, y);
        }
    }
    
    return result;
}`
    },
    {
        id: 'prim-mst',
        name: "Prim's MST",
        description: 'Prim\'s algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. It starts with an arbitrary node and grows the spanning tree by adding the cheapest edge from the tree to another vertex.',
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
}`
    },
    {
        id: 'dijkstra',
        name: "Dijkstra's Shortest Path",
        description: 'Dijkstra\'s algorithm finds the shortest paths from a source vertex to all other vertices in a graph with non-negative edge weights. It uses a priority queue to select the vertex with the minimum distance from the source.',
        timeComplexity: 'O((V+E) log V)',
        spaceComplexity: 'O(V)',
        visualization: initDijkstraVisualization,
        pseudocode: `function dijkstra(graph, src):
    # Initialize distances as infinite and visited as false
    dist = [INF] * graph.vertex
    visited = [False] * graph.vertex
    dist[src] = 0  # Distance from source to itself is zero
    
    # Find shortest path for all vertices
    for count in range(graph.vertex - 1):
        # Pick the minimum distance vertex from the set of vertices
        # not yet processed. u is always equal to src in first iteration
        u = minDistance(dist, visited)
        
        # Mark the picked vertex as processed
        visited[u] = True
        
        # Update dist value of the adjacent vertices of the picked vertex
        for v in range(graph.vertex):
            # Update dist[v] only if not in visited, there is an edge from
            # u to v, and total weight of path from src to v through u is
            # smaller than current value of dist[v]
            if (not visited[v] and graph[u][v] > 0 and 
                dist[u] != INF and dist[u] + graph[u][v] < dist[v]):
                dist[v] = dist[u] + graph[u][v]
    
    return dist`,
        codeSnippet: `
function dijkstra(graph, src) {
    const dist = [];
    const visited = [];
    
    
    for (let i = 0; i < graph.vertex; i++) {
        dist[i] = Number.MAX_SAFE_INTEGER;
        visited[i] = false;
    }
    
    
    dist[src] = 0;
    
    
    for (let count = 0; count < graph.vertex - 1; count++) {
        
        
        const u = minDistance(dist, visited);
        
        
        visited[u] = true;
        
        
        for (let v = 0; v < graph.vertex; v++) {
            
            
            
            if (!visited[v] && graph[u][v] !== 0 && 
                dist[u] !== Number.MAX_SAFE_INTEGER && 
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    return dist;
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
        self.parent = [i for i in range(size)]
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
        this.parent = new Array(size);
        this.rank = new Array(size).fill(0);
        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
        }
    }
    
    find(u) {
        if (this.parent[u] !== u) {
            this.parent[u] = this.find(this.parent[u]);
        }
        return this.parent[u];
    }
    
    union(u, v) {
        const rootU = this.find(u);
        const rootV = this.find(v);
        
        if (rootU === rootV) return false;
        
        if (this.rank[rootU] > this.rank[rootV]) {
            this.parent[rootV] = rootU;
        } else if (this.rank[rootU] < this.rank[rootV]) {
            this.parent[rootU] = rootV;
        } else {
            this.parent[rootV] = rootU;
            this.rank[rootU]++;
        }
        
        return true;
    }
}

function kruskalMST(edges, numVertices) {
    const result = [];
    const uf = new UnionFind(numVertices);
    
    
    edges.sort((a, b) => a[2] - b[2]);
    
    for (const [u, v, weight] of edges) {
        if (uf.find(u) !== uf.find(v)) {
            uf.union(u, v);
            result.push([u, v, weight]);
            
            if (result.length === numVertices - 1) break;
        }
    }
    
    return result;
}`
    },
    {
        id: 'dijkstra',
        name: "Dijkstra's Algorithm",
        description: 'Dijkstra\'s algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.',
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V)',
        visualization: initDijkstraVisualization,
        codeSnippet: `function dijkstra(graph, start) {
    const distances = new Array(graph.length).fill(Infinity);
    const visited = new Set();
    distances[start] = 0;
    
    while (visited.size < graph.length) {
        const current = minDistance(distances, visited);
        visited.add(current);
        
        for (const [neighbor, weight] of graph[current]) {
            if (!visited.has(neighbor)) {
                const distance = distances[current] + weight;
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                }
            }
        }
    }
    
    return distances;
}

function minDistance(distances, visited) {
    let min = Infinity;
    let minIndex = -1;
    
    for (let i = 0; i < distances.length; i++) {
        if (!visited.has(i) && distances[i] <= min) {
            min = distances[i];
            minIndex = i;
        }
    }
    
    return minIndex;
}`
    },
    {
        id: 'prim',
        name: 'Prim\'s MST',
        description: 'Prim\'s algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. It starts with a single vertex and grows the MST by adding the next cheapest vertex to the existing tree.',
        timeComplexity: 'O(V²) with adjacency matrix, O(E log V) with min heap',
        spaceComplexity: 'O(V + E)',
        pseudocode: `function primMST(graph):
    n = number of vertices
    key = [∞] * n
    parent = [null] * n
    mstSet = [false] * n
    
    key[0] = 0
    parent[0] = -1
    
    for count = 0 to n-1:
        u = minKey(key, mstSet)
        mstSet[u] = true
        
        for v = 0 to n-1:
            if graph[u][v] > 0 and mstSet[v] == false and graph[u][v] < key[v]:
                parent[v] = u
                key[v] = graph[u][v]`,
        javascript: `function primMST(graph) {
    const n = graph.length;
    const parent = new Array(n).fill(-1);
    const key = new Array(n).fill(Infinity);
    const inMST = new Array(n).fill(false);
    
    key[0] = 0;
    
    for (let count = 0; count < n - 1; count++) {
        const u = minKey(key, inMST);
        inMST[u] = true;
        
        for (let v = 0; v < n; v++) {
            if (graph[u][v] > 0 && !inMST[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }
    
    
    const mst = [];
    for (let i = 1; i < n; i++) {
        mst.push([parent[i], i, graph[i][parent[i]]]);
    }
    
    return mst;
}

function minKey(key, inMST) {
    let min = Infinity;
    let minIndex = -1;
    
    for (let v = 0; v < key.length; v++) {
        if (!inMST[v] && key[v] < min) {
            min = key[v];
            minIndex = v;
        }
    }
    
    return minIndex;
}`
    },
    {
        id: 'dijkstra',
        name: 'Dijkstra\'s Algorithm',
        description: 'Dijkstra\'s algorithm finds the shortest paths from a source vertex to all other vertices in a graph with non-negative edge weights. It uses a priority queue to select the vertex with the minimum distance.',
        timeComplexity: 'O((V+E) log V) with min-heap',
        spaceComplexity: 'O(V + E)',
        pseudocode: `function dijkstra(graph, source):
    n = number of vertices
    dist = [∞] * n
    visited = [false] * n
    
    dist[source] = 0
    
    for i = 0 to n-1:
        u = minDistance(dist, visited)
        visited[u] = true
        
        for each neighbor v of u:
            if not visited[v] and dist[u] + graph[u][v] < dist[v]:
                dist[v] = dist[u] + graph[u][v]`,
        javascript: `function dijkstra(graph, source) {
    const n = graph.length;
    const dist = new Array(n).fill(Infinity);
    const visited = new Array(n).fill(false);
    
    dist[source] = 0;
    
    for (let i = 0; i < n - 1; i++) {
        const u = minDistance(dist, visited);
        visited[u] = true;
        
        for (let v = 0; v < n; v++) {
            if (!visited[v] && graph[u][v] !== 0 && 
                dist[u] !== Infinity && 
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    return dist;
}

function minDistance(dist, visited) {
    let min = Infinity;
    let minIndex = -1;
    
    for (let v = 0; v < dist.length; v++) {
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    
    return minIndex;
}`
    }
];


const algoItems = document.querySelectorAll('.algo-item');
const algoTitle = document.getElementById('algo-title');
const algoDescription = document.getElementById('algo-description');
const timeComplexity = document.getElementById('time-complexity');
const spaceComplexity = document.getElementById('space-complexity');
const codeContent = document.getElementById('code-content');
const prevButton = document.getElementById('prev-algo');
const nextButton = document.getElementById('next-algo');
const codeTabs = document.querySelectorAll('.code-tab');
const visualization = document.getElementById('visualization');


function initializeApp() {
    
    hljs.configure({
        languages: ['python', 'javascript'],
        ignoreUnescapedHTML: true
    });
    
    
    currentCodeLang = 'pseudocode';
    
    
    setActiveAlgorithm(0);
    
    
    const codeTabs = document.querySelectorAll('.code-tab');
    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const lang = tab.dataset.lang;
            setActiveCodeTab(lang);
        });
    });
    
    
    const prevButton = document.getElementById('prev-algo');
    const nextButton = document.getElementById('next-algo');
    
    if (prevButton) {
        prevButton.addEventListener('click', showPreviousAlgorithm);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', showNextAlgorithm);
    }
    
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showPreviousAlgorithm();
        } else if (e.key === 'ArrowRight') {
            showNextAlgorithm();
        }
    });
    
    
    applySyntaxHighlighting();
}


document.addEventListener('DOMContentLoaded', initializeApp);


function updateAlgorithmDetails() {
    const algorithm = algorithms[currentAlgoIndex];
    if (!algorithm) return;
    
    
    const nameElement = document.querySelector('.algo-name');
    const descElement = document.querySelector('.algo-description');
    const timeComplexityElement = document.querySelector('.time-complexity');
    const spaceComplexityElement = document.querySelector('.space-complexity');
    
    if (nameElement) nameElement.textContent = algorithm.name || 'Algorithm';
    if (descElement) descElement.textContent = algorithm.description || 'No description available.';
    if (timeComplexityElement) timeComplexityElement.textContent = algorithm.timeComplexity || 'N/A';
    if (spaceComplexityElement) spaceComplexityElement.textContent = algorithm.spaceComplexity || 'N/A';
    
    
    const pseudocodeElement = document.getElementById('pseudocode-content');
    const codeSnippetElement = document.getElementById('code-snippet-content');
    const codeContent = document.querySelector('.code-content');
    
    if (!pseudocodeElement || !codeSnippetElement || !codeContent) return;
    
    
    const pseudocode = algorithm.pseudocode || '
    pseudocodeElement.textContent = pseudocode;
    pseudocodeElement.className = 'language-python';
    
    
    const codeSnippet = algorithm.codeSnippet || '
    codeSnippetElement.textContent = codeSnippet;
    codeSnippetElement.className = 'language-javascript';
    
    
    if (currentCodeLang === 'pseudocode') {
        codeContent.textContent = pseudocode;
        codeContent.className = 'language-python';
    } else {
        codeContent.textContent = codeSnippet;
        codeContent.className = 'language-javascript';
    }
    
    
    applySyntaxHighlighting();
}


function applySyntaxHighlighting() {
    if (window.hljs) {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    } else {
        
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.style.color = '#E0E0E0';
            block.style.whiteSpace = 'pre';
            block.style.fontFamily = '\'Fira Code\', monospace';
            block.style.fontSize = '0.9375rem';
            block.style.lineHeight = '1.6';
            block.style.display = 'block';
            block.style.overflowX = 'auto';
            block.style.padding = '1rem';
            block.style.borderRadius = '0.5rem';
            block.style.backgroundColor = '#2d2d2d';
        });
    }
}


function setActiveCodeTab(lang) {
    currentCodeLang = lang;
    
    
    const codeTabs = document.querySelectorAll('.code-tab');
    codeTabs.forEach(tab => {
        if (tab.dataset.lang === lang) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    
    const algorithm = algorithms[currentAlgoIndex];
    if (!algorithm) return;
    
    
    const codeContent = document.querySelector('.code-content');
    if (!codeContent) return;
    
    if (lang === 'pseudocode') {
        codeContent.textContent = algorithm.pseudocode || '
        codeContent.className = 'language-python';
    } else {
        codeContent.textContent = algorithm.codeSnippet || '
        codeContent.className = 'language-javascript';
    }
    
    
    applySyntaxHighlighting();
}


function showNextAlgorithm() {
    if (currentAlgoIndex < algorithms.length - 1) {
        setActiveAlgorithm(currentAlgoIndex + 1);
    } else {
        
        setActiveAlgorithm(0);
    }
}


function showPreviousAlgorithm() {
    if (currentAlgoIndex > 0) {
        setActiveAlgorithm(currentAlgoIndex - 1);
    } else {
        
        setActiveAlgorithm(algorithms.length - 1);
    }
}


function setActiveAlgorithm(index) {
    if (index < 0 || index >= algorithms.length) return;
    
    currentAlgoIndex = index;
    const algorithm = algorithms[index];
    
    
    window.location.hash = algorithm.id;
    
    
    updateAlgorithmDetails();
    updateVisualization();
    
    
    setActiveCodeTab('pseudocode');
    
    
    const algoDetails = document.querySelector('.algo-details');
    if (algoDetails) {
        algoDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    
    updateNavigationButtons();
}


function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-algo');
    const nextButton = document.getElementById('next-algo');
    
    if (!prevButton || !nextButton) return;
    
    prevButton.disabled = currentAlgoIndex === 0;
    nextButton.disabled = currentAlgoIndex === algorithms.length - 1;
    
    
    prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
    nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    
    
    prevButton.style.cursor = prevButton.disabled ? 'not-allowed' : 'pointer';
    nextButton.style.cursor = nextButton.disabled ? 'not-allowed' : 'pointer';
    
    
    if (currentAlgoIndex === algorithms.length - 1) {
        nextButton.textContent = 'Back to Start';
        
        const newNextButton = nextButton.cloneNode(true);
        nextButton.parentNode.replaceChild(newNextButton, nextButton);
        newNextButton.addEventListener('click', () => setActiveAlgorithm(0));
    } else {
        nextButton.textContent = 'Next Algorithm';
        
        const newNextButton = nextButton.cloneNode(true);
        nextButton.parentNode.replaceChild(newNextButton, nextButton);
        newNextButton.addEventListener('click', showNextAlgorithm);
    }
}


function updateVisualization() {
    const algo = algorithms[currentAlgoIndex];
    
    
    visualization.innerHTML = '';
    
    
    const vizContainer = document.createElement('div');
    vizContainer.className = 'visualization-container';
    
    
    const header = document.createElement('div');
    header.className = 'visualization-header';
    header.innerHTML = `<h3>${algo.name} Visualization</h3>`;
    vizContainer.appendChild(header);
    
    
    const controls = document.createElement('div');
    controls.className = 'visualization-controls';
    controls.innerHTML = `
        <button id="step-btn" class="control-btn">Step</button>
        <button id="play-btn" class="control-btn primary">Play</button>
        <button id="reset-btn" class="control-btn">Reset</button>
        <div class="speed-control">
            <label>Speed:</label>
            <input type="range" id="speed-slider" min="100" max="2000" value="500" step="100">
        </div>
    `;
    vizContainer.appendChild(controls);
    
    
    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'canvas-container';
    const canvas = document.createElement('canvas');
    canvas.id = 'algo-canvas';
    canvas.width = 800;
    canvas.height = 400;
    canvasContainer.appendChild(canvas);
    vizContainer.appendChild(canvasContainer);
    
    
    const status = document.createElement('div');
    status.className = 'visualization-status';
    status.id = 'viz-status';
    status.textContent = 'Ready to visualize!';
    vizContainer.appendChild(status);
    
    visualization.appendChild(vizContainer);
    
    
    initVisualization(algo.id, canvas);
}


function initVisualization(algoId, canvas) {
    const ctx = canvas.getContext('2d');
    
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    
    switch(algoId) {
        case 'binary-search':
            initBinarySearchVisualization(ctx, canvas);
            break;
        case 'merge-sort':
            initMergeSortVisualization(ctx, canvas);
            break;
        case 'quick-sort':
            initQuickSortVisualization(ctx, canvas);
            break;
        case 'kruskal':
            initKruskalVisualization(ctx, canvas);
            break;
        case 'prim':
            initPrimVisualization(ctx, canvas);
            break;
        case 'dijkstra':
            initDijkstraVisualization(ctx, canvas);
            break;
    }
}


function initBinarySearchVisualization(ctx, canvas) {
    const array = [2, 4, 7, 10, 15, 20, 25, 30, 35, 40];
    const target = 25;
    let animationId = null;
    
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    
    const arrayStartX = 50;
    const arrayStartY = 150;
    const cellWidth = 60;
    const cellHeight = 50;
    
    function drawArray(left, right, mid) {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        
        for (let i = 0; i < array.length; i++) {
            
            ctx.strokeStyle = '#666';
            ctx.lineWidth = 2;
            ctx.strokeRect(arrayStartX + i * cellWidth, arrayStartY, cellWidth, cellHeight);
            
            
            if (i === left && i === right) {
                ctx.fillStyle = '#4CAF50';
                ctx.fillRect(arrayStartX + i * cellWidth, arrayStartY, cellWidth, cellHeight);
                ctx.fillStyle = 'white';
            } else if (i === left || i === right) {
                ctx.fillStyle = '#2196F3';
                ctx.fillRect(arrayStartX + i * cellWidth, arrayStartY, cellWidth, cellHeight);
                ctx.fillStyle = 'white';
            } else if (i === mid) {
                ctx.fillStyle = '#FF9800';
                ctx.fillRect(arrayStartX + i * cellWidth, arrayStartY, cellWidth, cellHeight);
                ctx.fillStyle = 'white';
            } else {
                ctx.fillStyle = 'white';
            }
            
            
            ctx.fillStyle = i === mid ? 'white' : '#333';
            ctx.fillText(array[i], arrayStartX + i * cellWidth + cellWidth/2, arrayStartY + cellHeight/2);
            
            
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.fillText(`[${i}]`, arrayStartX + i * cellWidth + cellWidth/2, arrayStartY + cellHeight + 20);
        }
        
        
        ctx.font = '14px Arial';
        ctx.fillStyle = '#2196F3';
        if (left === right) {
            ctx.fillText('left/right', arrayStartX + left * cellWidth + cellWidth/2, arrayStartY - 10);
        } else {
            ctx.fillText('left', arrayStartX + left * cellWidth + cellWidth/2, arrayStartY - 10);
            ctx.fillText('right', arrayStartX + right * cellWidth + cellWidth/2, arrayStartY - 10);
        }
        
        if (mid !== undefined) {
            ctx.fillStyle = '#FF9800';
            ctx.fillText('mid', arrayStartX + mid * cellWidth + cellWidth/2, arrayStartY - 30);
        }
        
        
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`Target: ${target}`, canvas.width/2, 50);
        
        
        const status = document.getElementById('viz-status');
        if (array[mid] === target) {
            status.textContent = `Found ${target} at index ${mid}!`;
        } else if (left > right) {
            status.textContent = `${target} not found in array`;
        } else if (array[mid] < target) {
            status.textContent = `${array[mid]} < ${target}, search right half`;
        } else {
            status.textContent = `${array[mid]} > ${target}, search left half`;
        }
    }
    
    
    function binarySearchVisualization() {
        let left = 0;
        let right = array.length - 1;
        let steps = [];
        
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            steps.push({left, right, mid});
            
            if (array[mid] === target) {
                break;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        
        let stepIndex = 0;
        const speed = document.getElementById('speed-slider').value;
        
        function nextStep() {
            if (stepIndex < steps.length) {
                const {left, right, mid} = steps[stepIndex];
                drawArray(left, right, mid);
                stepIndex++;
                setTimeout(nextStep, speed);
            }
        }
        
        nextStep();
    }
    
    
    function binarySearchVisualization() {
        let left = 0;
        let right = array.length - 1;
        let steps = [];
        
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            steps.push({left, right, mid});
            
            if (array[mid] === target) {
                break;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        
        let stepIndex = 0;
        const speed = document.getElementById('speed-slider').value;
        
        function animate() {
            if (stepIndex < steps.length) {
                const {left, right, mid} = steps[stepIndex];
                drawArray(left, right, mid);
                stepIndex++;
                animationId = setTimeout(animate, speed);
            }
        }
        
        
        if (animationId) {
            clearTimeout(animationId);
        }
        
        
        animate();
    }
    
    
    document.getElementById('step-btn').addEventListener('click', () => {
        
        alert('Step functionality will be implemented in the full version');
    });
    
    document.getElementById('play-btn').addEventListener('click', binarySearchVisualization);
    
    document.getElementById('reset-btn').addEventListener('click', () => {
        
        if (animationId) {
            clearTimeout(animationId);
            animationId = null;
        }
        drawArray(0, array.length - 1);
        document.getElementById('viz-status').textContent = 'Ready to visualize!';
    });
    
    
    document.getElementById('speed-slider').addEventListener('input', (e) => {
        const speed = 2100 - e.target.value; 
        if (animationId) {
            clearTimeout(animationId);
            binarySearchVisualization(); 
        }
    });
    
    
    requestAnimationFrame(() => {
        
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 40; 
        canvas.height = 300; 
        
        
        ctx = canvas.getContext('2d');
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        
        drawArray(0, array.length - 1);
    });
}


function initMergeSortVisualization(ctx, canvas) {
    let array = [];
    let isRunning = false;
    let speed = 500; 
    let animationId = null;
    
    
    const colors = {
        primary: '#7e22ce',
        secondary: '#9333ea',
        highlight: '#c084fc',
        text: '#1f2937',
        background: '#ffffff',
        border: '#e5e7eb',
        comparing: '#3b82f6',
        merging: '#10b981',
        default: '#e5e7eb'
    };

    
    function init() {
        generateArray();
        renderArray();
        setupEventListeners();
    }

    
    function generateArray() {
        if (isRunning) return;
        
        array = [];
        const size = 12; 
        const min = 30;  
        const max = 280; 
        
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        
        updateStatus('New array generated! Ready to sort.');
        renderArray();
    }

    
    function renderArray(comparing = [], merging = []) {
        if (!canvas) return;
        
        const barWidth = Math.min(40, (canvas.width - 20) / array.length - 2);
        const startX = (canvas.width - (barWidth + 2) * array.length) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        array.forEach((value, index) => {
            const x = startX + index * (barWidth + 2);
            const y = canvas.height - value - 20;
            
            
            if (merging.includes(index)) {
                ctx.fillStyle = colors.merging;
            } else if (comparing.includes(index)) {
                ctx.fillStyle = colors.comparing;
            } else {
                ctx.fillStyle = colors.primary;
            }
            
            
            ctx.fillRect(x, y, barWidth, value);
            
            
            ctx.strokeStyle = colors.border;
            ctx.strokeRect(x, y, barWidth, value);
            
            
            if (barWidth > 25) {
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(value, x + barWidth / 2, y - 5);
            }
        });
    }

    
    function updateStatus(text) {
        const statusElement = document.getElementById('viz-status');
        if (statusElement) {
            statusElement.textContent = text;
        }
    }

    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    
    async function mergeSort(left = 0, right = array.length - 1) {
        if (left >= right) return;
        
        const mid = Math.floor((left + right) / 2);
        
        updateStatus(`Dividing array: [${left}, ${mid}] and [${mid + 1}, ${right}]`);
        await sleep(speed);
        
        await mergeSort(left, mid);
        await mergeSort(mid + 1, right);
        await merge(left, mid, right);
    }

    
    async function merge(left, mid, right) {
        updateStatus(`Merging subarrays: [${left}, ${mid}] and [${mid + 1}, ${right}]`);
        
        
        for (let i = left; i <= right; i++) {
            renderArray([...Array(right - left + 1).keys()].map(x => x + left));
            await sleep(speed / 2);
        }

        const leftArr = array.slice(left, mid + 1);
        const rightArr = array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            
            renderArray([left + i, mid + 1 + j]);
            await sleep(speed);
            
            if (leftArr[i] <= rightArr[j]) {
                array[k] = leftArr[i];
                i++;
            } else {
                array[k] = rightArr[j];
                j++;
            }
            
            
            renderArray([], [k]);
            await sleep(speed / 2);
            k++;
        }
        
        while (i < leftArr.length) {
            array[k] = leftArr[i];
            renderArray([], [k]);
            await sleep(speed / 2);
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            array[k] = rightArr[j];
            renderArray([], [k]);
            await sleep(speed / 2);
            j++;
            k++;
        }
        
        
        renderArray();
    }

    
    async function startSort() {
        if (isRunning) return;
        
        isRunning = true;
        updateStatus('Starting merge sort...');
        
        
        document.getElementById('play-btn').disabled = true;
        document.getElementById('step-btn').disabled = true;
        document.getElementById('reset-btn').disabled = true;
        
        try {
            await mergeSort();
            updateStatus('Sorting complete! Array is now sorted.');
        } catch (error) {
            console.error('Sorting error:', error);
            updateStatus('An error occurred during sorting.');
        } finally {
            isRunning = false;
            document.getElementById('play-btn').disabled = false;
            document.getElementById('step-btn').disabled = false;
            document.getElementById('reset-btn').disabled = false;
        }
    }

    
    function setupEventListeners() {
        
        const playBtn = document.getElementById('play-btn');
        const newPlayBtn = playBtn.cloneNode(true);
        playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
        
        const stepBtn = document.getElementById('step-btn');
        const newStepBtn = stepBtn.cloneNode(true);
        stepBtn.parentNode.replaceChild(newStepBtn, stepBtn);
        
        const resetBtn = document.getElementById('reset-btn');
        const newResetBtn = resetBtn.cloneNode(true);
        resetBtn.parentNode.replaceChild(newResetBtn, resetBtn);
        
        
        newPlayBtn.addEventListener('click', startSort);
        newStepBtn.addEventListener('click', () => {
            updateStatus('Step-by-step mode not implemented yet.');
        });
        newResetBtn.addEventListener('click', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            isRunning = false;
            generateArray();
        });
        
        
        const speedSlider = document.getElementById('speed-slider');
        speedSlider.addEventListener('input', (e) => {
            speed = 2100 - e.target.value; 
        });
    }
    
    
    init();
}

function initQuickSortVisualization(ctx, canvas) {
    
    let array = [];
    let isRunning = false;
    let speed = 500; 
    let animationQueue = [];
    
    
    function initArray() {
        array = [];
        const size = 15; 
        const maxHeight = canvas.height * 0.8;
        
        for (let i = 0; i < size; i++) {
            array.push({
                value: Math.floor(Math.random() * (maxHeight - 20)) + 10,
                color: '#8B5CF6',
                pivot: false,
                comparing: false,
                sorted: false
            });
        }
        
        drawArray();
    }
    
    
    function drawArray() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width - 40) / array.length;
        const maxHeight = Math.max(...array.map(item => item.value));
        const scale = (canvas.height - 60) / maxHeight;
        
        array.forEach((item, index) => {
            const x = 20 + index * barWidth;
            const barHeight = item.value * scale;
            const y = canvas.height - 30 - barHeight;
            
            
            ctx.fillStyle = item.color;
            if (item.pivot) {
                ctx.fillStyle = '#EF4444'; 
            } else if (item.comparing) {
                ctx.fillStyle = '#F59E0B'; 
            } else if (item.sorted) {
                ctx.fillStyle = '#10B981'; 
            }
            
            ctx.fillRect(x, y, barWidth - 2, barHeight);
            
            
            ctx.fillStyle = '#1F2937';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.value, x + barWidth/2, canvas.height - 10);
        });
    }
    
    
    function updateStatus(text) {
        const statusElement = document.getElementById('viz-status');
        if (statusElement) {
            statusElement.textContent = text;
        }
    }
    
    
    async function quickSort(start = 0, end = array.length - 1) {
        if (start >= end) {
            if (start === end) {
                array[start].sorted = true;
                drawArray();
                await sleep(speed);
            }
            return;
        }
        
        const pivotIndex = await partition(start, end);
        array[pivotIndex].sorted = true;
        drawArray();
        await sleep(speed);
        
        await Promise.all([
            quickSort(start, pivotIndex - 1),
            quickSort(pivotIndex + 1, end)
        ]);
    }
    
    
    async function partition(start, end) {
        const pivotValue = array[end].value;
        let pivotIndex = start;
        
        
        array[end].pivot = true;
        drawArray();
        await sleep(speed);
        
        for (let i = start; i < end; i++) {
            
            array[i].comparing = true;
            drawArray();
            await sleep(speed/2);
            
            if (array[i].value < pivotValue) {
                
                [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
                pivotIndex++;
                drawArray();
                await sleep(speed);
            }
            
            
            array[i].comparing = false;
        }
        
        
        [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
        array[end].pivot = false;
        array[pivotIndex].sorted = true;
        drawArray();
        await sleep(speed);
        
        return pivotIndex;
    }
    
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    
    async function startSort() {
        if (isRunning) return;
        
        isRunning = true;
        updateStatus('Starting Quick Sort...');
        
        
        document.getElementById('play-btn').disabled = true;
        document.getElementById('step-btn').disabled = true;
        document.getElementById('reset-btn').disabled = true;
        
        try {
            await quickSort();
            updateStatus('Sorting complete! Array is now sorted.');
        } catch (error) {
            console.error('Sorting error:', error);
            updateStatus('An error occurred during sorting.');
        } finally {
            isRunning = false;
            document.getElementById('play-btn').disabled = false;
            document.getElementById('step-btn').disabled = false;
            document.getElementById('reset-btn').disabled = false;
        }
    }
    
    
    function reset() {
        isRunning = false;
        initArray();
        updateStatus('Ready to visualize Quick Sort');
    }
    
    
    function setupEventListeners() {
        const playBtn = document.getElementById('play-btn');
        const stepBtn = document.getElementById('step-btn');
        const resetBtn = document.getElementById('reset-btn');
        const speedSlider = document.getElementById('speed-slider');
        
        
        const newPlayBtn = playBtn.cloneNode(true);
        const newStepBtn = stepBtn.cloneNode(true);
        const newResetBtn = resetBtn.cloneNode(true);
        
        playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
        stepBtn.parentNode.replaceChild(newStepBtn, stepBtn);
        resetBtn.parentNode.replaceChild(newResetBtn, resetBtn);
        
        
        newPlayBtn.addEventListener('click', startSort);
        newResetBtn.addEventListener('click', reset);
        
        speedSlider.addEventListener('input', (e) => {
            speed = 1100 - e.target.value; 
        });
    }
    
    
    initArray();
    setupEventListeners();
    updateStatus('Ready to visualize Quick Sort');
}

function initKruskalVisualization(ctx, canvas) {
    drawPlaceholder(ctx, canvas, "Kruskal's MST");
}

function initPrimVisualization(ctx, canvas) {
    drawPlaceholder(ctx, canvas, "Prim's MST");
}

function initDijkstraVisualization(ctx, canvas) {
    drawPlaceholder(ctx, canvas, "Dijkstra's Algorithm");
}

function drawPlaceholder(ctx, canvas, algoName) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    ctx.fillStyle = '#666';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${algoName} Visualization`, canvas.width/2, canvas.height/2 - 20);
    
    ctx.font = '16px Arial';
    ctx.fillText('Interactive visualization coming soon!', canvas.width/2, canvas.height/2 + 20);
    
    
    document.getElementById('viz-status').textContent = 'Visualization not yet implemented';
}


document.addEventListener('DOMContentLoaded', () => {
    
    initializeApp();
    
    
    window.dispatchEvent(new Event('resize'));
});


window.addEventListener('resize', () => {
    const canvas = document.getElementById('algo-canvas');
    if (canvas) {
        const container = canvas.parentElement;
        const containerWidth = container.clientWidth;
        
        
        const aspectRatio = canvas.width / canvas.height;
        canvas.style.width = '100%';
        canvas.style.height = (container.clientWidth / aspectRatio) + 'px';
        
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        
        if (currentAlgoIndex >= 0 && currentAlgoIndex < algorithms.length) {
            const algoId = algorithms[currentAlgoIndex].id;
            initVisualization(algoId, canvas);
        }
    }
});
