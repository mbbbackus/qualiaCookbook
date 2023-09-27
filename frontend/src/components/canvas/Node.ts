class Node {
    x: number;
    y: number;
    radius: number;
    fillColor: string;
    borderColor: string;
    image: string;

    constructor(x: number, y: number, radius: number, fillColor: string = 'white', borderColor: string = 'black', image: string = '') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
        this.image = image;
        // this.label = '';
        // this.id = '';
        // this.selected = false;
        // this.hovered = false;
    }

    contains(x: number, y: number) {
        return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < this.radius;
    }
}

export function drawNode(node:Node, canvasRef: React.RefObject<HTMLCanvasElement>, ctx: CanvasRenderingContext2D | null ):any {
    const canvasObj = canvasRef.current;
    if (canvasObj) {
        if (ctx) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.fillColor || 'white';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = node.borderColor || '#003300';
            ctx.stroke();
        }
    }
};

export default Node;