class Node {
    id: string;
    x: number;
    y: number;
    radius: number;
    fillColor: string;
    borderColor: string;
    image: string;

    constructor(
        id: string,
        x: number, 
        y: number, 
        radius: number, 
        image: string = '', 
        fillColor: string = 'white', 
        borderColor: string = 'black'
    ) {
        this.id = id;
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

    draw(canvasRef: React.RefObject<HTMLCanvasElement>, ctx: CanvasRenderingContext2D | null) {
        const canvasObj = canvasRef.current;
        if (canvasObj) {
            if (ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
                if (this.image) {
                    const image = new Image();
                    image.src = this.image;
                    image.onload = () => {
                        ctx.drawImage(image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
                    }
                } else {
                    ctx.fillStyle = this.fillColor || 'white';
                    ctx.fill();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = this.borderColor || '#003300';
                    ctx.stroke();
                }
    
            }
        }
    }

    contains(x: number, y: number) {
        return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < this.radius;
    }

    moveOnResize(oldCanvasHeight: number, oldCanvasWidth: number, canvasWidth: number, canvasHeight: number) {
        const xDiff = (canvasWidth - oldCanvasWidth) / 2;
        const yDiff = (canvasHeight - oldCanvasHeight) / 2;
        this.x += xDiff;
        this.y += yDiff;
    }
}

export default Node;