
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let nodes = [];
let edges = [];
let isRunning = false;
let animationSpeed = 800; 


function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    draw();
}


resizeCanvas();
window.addEventListener('resize', resizeCanvas);


class Node {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.color = '#8B5CF6';
        this.distance = Infinity;
        this.visited = false;
        this.parent = null;
    }

    draw() {
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.id, this.x, this.y);
    }
}


class Edge {
    constructor(node1, node2, weight) {
        this.node1 = node1;
        this.node2 = node2;
        this.weight = weight;
        this.color = '#A78BFA';
        this.width = 2;
        this.inMST = false;
    }

    draw() {
        
        ctx.beginPath();
        ctx.moveTo(this.node1.x, this.node1.y);
        ctx.lineTo(this.node2.x, this.node2.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();

        
        const midX = (this.node1.x + this.node2.x) / 2;
        const midY = (this.node1.y + this.node2.y) / 2;
        
        
        ctx.fillStyle = 'white';
        ctx.fillRect(midX - 15, midY - 10, 30, 20);
        
        
        ctx.fillStyle = '#4B5563';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.weight, midX, midY);
    }
}


function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    edges.forEach(edge => edge.draw());
    
    
    nodes.forEach(node => node.draw());
}


function generateGraph() {
    if (isRunning) return;
    
    
    nodes = [];
    edges = [];
    
    
    const numNodes = 6 + Math.floor(Math.random() * 3);
    const nodePositions = [];
    
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;
    
    for (let i = 0; i < numNodes; i++) {
        
        const angle = (i / numNodes) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius * (0.7 + Math.random() * 0.6);
        const y = centerY + Math.sin(angle) * radius * (0.7 + Math.random() * 0.6);
        
        nodes.push(new Node(x, y, String.fromCharCode(65 + i)));
    }
    
    
    for (let i = 0; i < nodes.length; i++) {
        
        if (i < nodes.length - 1) {
            const weight = Math.floor(Math.random() * 20) + 1;
            edges.push(new Edge(nodes[i], nodes[i + 1], weight));
        }
        
        
        for (let j = i + 2; j < nodes.length; j++) {
            if (Math.random() < 0.4) { 
                const weight = Math.floor(Math.random() * 20) + 1;
                edges.push(new Edge(nodes[i], nodes[j], weight));
            }
        }
    }
    
    
    resetVisualization();
    
    
    document.getElementById('status').textContent = 
        `Generated graph with ${nodes.length} nodes and ${edges.length} edges.`;
}


function clearGraph() {
    if (isRunning) return;
    
    nodes = [];
    edges = [];
    draw();
    
    document.getElementById('status').textContent = 
        'Graph cleared. Click "Generate Graph" or click on canvas to add nodes.';
}


function resetVisualization() {
    if (isRunning) return;
    
    nodes.forEach(node => {
        node.color = '#8B5CF6';
        node.distance = Infinity;
        node.visited = false;
        node.parent = null;
    });
    
    edges.forEach(edge => {
        edge.color = '#A78BFA';
        edge.width = 2;
        edge.inMST = false;
    });
    
    draw();
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function setRunning(running) {
    isRunning = running;
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (!btn.id.includes('reset')) {
            btn.disabled = running;
        }
    });
}


async function runKruskal() {
    if (isRunning || nodes.length === 0) return;
    
    setRunning(true);
    resetVisualization();
    document.getElementById('status').textContent = "Running Kruskal's MST Algorithm...";
    
    
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    const mst = [];
    const parent = {};
    
    
    nodes.forEach(node => parent[node.id] = node.id);
    
    
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    
    function union(x, y) {
        const px = find(x);
        const py = find(y);
        if (px !== py) {
            parent[px] = py;
            return true;
        }
        return false;
    }
    
    
    for (let edge of sortedEdges) {
        
        edge.color = '#EC4899';
        edge.width = 4;
        draw();
        
        document.getElementById('status').textContent = 
            `Checking edge ${edge.node1.id}-${edge.node2.id} (weight: ${edge.weight})`;
        await sleep(animationSpeed);
        
        if (union(edge.node1.id, edge.node2.id)) {
            
            edge.color = '#10B981';
            edge.width = 4;
            edge.inMST = true;
            mst.push(edge);
            
            document.getElementById('status').textContent = 
                `Added edge ${edge.node1.id}-${edge.node2.id} to MST`;
        } else {
            
            edge.color = '#EF4444';
            document.getElementById('status').textContent = 
                `Edge ${edge.node1.id}-${edge.node2.id} would create cycle - rejected`;
        }
        
        draw();
        await sleep(animationSpeed);
        
        
        if (!edge.inMST) {
            edge.color = '#A78BFA';
            edge.width = 2;
        }
        
        if (mst.length === nodes.length - 1) break;
    }
    
    const totalWeight = mst.reduce((sum, edge) => sum + edge.weight, 0);
    document.getElementById('status').textContent = 
        `Kruskal's MST completed! Total weight: ${totalWeight}`;
    
    setRunning(false);
}


async function runPrim() {
    if (isRunning || nodes.length === 0) return;
    
    setRunning(true);
    resetVisualization();
    document.getElementById('status').textContent = "Running Prim's MST Algorithm...";
    
    const mst = [];
    const inMST = new Set();
    
    
    const startNode = nodes[0];
    startNode.color = '#EF4444';
    inMST.add(startNode);
    draw();
    
    document.getElementById('status').textContent = `Starting with node ${startNode.id}`;
    await sleep(animationSpeed);
    
    while (inMST.size < nodes.length) {
        let minEdge = null;
        let minWeight = Infinity;
        
        
        for (let edge of edges) {
            const node1InMST = inMST.has(edge.node1);
            const node2InMST = inMST.has(edge.node2);
            
            if (node1InMST !== node2InMST && edge.weight < minWeight) {
                minWeight = edge.weight;
                minEdge = edge;
            }
        }
        
        if (minEdge) {
            
            minEdge.color = '#EC4899';
            minEdge.width = 4;
            
            const newNode = inMST.has(minEdge.node1) ? minEdge.node2 : minEdge.node1;
            newNode.color = '#F59E0B';
            
            draw();
            document.getElementById('status').textContent = 
                `Adding edge ${minEdge.node1.id}-${minEdge.node2.id} (weight: ${minEdge.weight})`;
            await sleep(animationSpeed);
            
            
            minEdge.color = '#10B981';
            minEdge.inMST = true;
            newNode.color = '#EF4444';
            inMST.add(newNode);
            mst.push(minEdge);
            
            draw();
            await sleep(animationSpeed);
        }
    }
    
    const totalWeight = mst.reduce((sum, edge) => sum + edge.weight, 0);
    document.getElementById('status').textContent = 
        `Prim's MST completed! Total weight: ${totalWeight}`;
    
    setRunning(false);
}


async function runDijkstra() {
    if (isRunning || nodes.length === 0) return;
    
    setRunning(true);
    resetVisualization();
    document.getElementById('status').textContent = "Running Dijkstra's Shortest Path Algorithm...";
    
    const startNode = nodes[0];
    startNode.distance = 0;
    startNode.color = '#EF4444';
    
    const unvisited = new Set(nodes);
    
    draw();
    document.getElementById('status').textContent = `Starting from node ${startNode.id}`;
    await sleep(animationSpeed);
    
    while (unvisited.size > 0) {
        
        let currentNode = null;
        let minDistance = Infinity;
        
        for (let node of unvisited) {
            if (node.distance < minDistance) {
                minDistance = node.distance;
                currentNode = node;
            }
        }
        
        if (!currentNode || currentNode.distance === Infinity) break;
        
        currentNode.color = '#F59E0B';
        currentNode.visited = true;
        unvisited.delete(currentNode);
        
        draw();
        document.getElementById('status').textContent = 
            `Visiting node ${currentNode.id} (distance: ${currentNode.distance})`;
        await sleep(animationSpeed);
        
        
        for (let edge of edges) {
            let neighbor = null;
            if (edge.node1 === currentNode) neighbor = edge.node2;
            else if (edge.node2 === currentNode) neighbor = edge.node1;
            
            if (neighbor && !neighbor.visited) {
                const newDistance = currentNode.distance + edge.weight;
                
                
                edge.color = '#EC4899';
                edge.width = 4;
                draw();
                await sleep(animationSpeed / 2);
                
                if (newDistance < neighbor.distance) {
                    neighbor.distance = newDistance;
                    neighbor.parent = currentNode;
                    
                    
                    edge.color = '#10B981';
                    
                    document.getElementById('status').textContent = 
                        `Updated distance to ${neighbor.id}: ${newDistance}`;
                } else {
                    edge.color = '#A78BFA';
                    edge.width = 2;
                }
                
                draw();
                await sleep(animationSpeed / 2);
            }
        }
    }
    
    
    nodes.forEach(node => {
        if (node.parent) {
            const pathEdge = edges.find(e => 
                (e.node1 === node && e.node2 === node.parent) ||
                (e.node2 === node && e.node1 === node.parent)
            );
            if (pathEdge) {
                pathEdge.color = '#10B981';
                pathEdge.width = 4;
            }
        }
    });
    
    draw();
    document.getElementById('status').textContent = 
        "Dijkstra's algorithm completed! Green edges show shortest paths from the start node.";
    
    setRunning(false);
}


generateGraph();


canvas.addEventListener('click', (e) => {
    if (isRunning) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    
    const clickedNode = nodes.find(node => {
        const dx = node.x - x;
        const dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) < 25;
    });
    
    if (!clickedNode && nodes.length < 15) { 
        const newNode = new Node(x, y, String.fromCharCode(65 + nodes.length));
        nodes.push(newNode);
        
        
        nodes.forEach(node => {
            if (node !== newNode) {
                const dx = node.x - newNode.x;
                const dy = node.y - newNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200 && Math.random() < 0.7) {
                    const weight = Math.floor(Math.random() * 20) + 1;
                    edges.push(new Edge(node, newNode, weight));
                }
            }
        });
        
        draw();
        document.getElementById('status').textContent = 
            `Added node ${newNode.id}. Total: ${nodes.length} nodes.`;
    }
});
