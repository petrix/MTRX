export class Layer {
    constructor(container) {
        // create new Canvas element 
        this.canvas = document.createElement("canvas")
        this.context = this.canvas.getContext('2d')

        container.appendChild(this.canvas)

        this.fitToContainer(this.canvas)
        addEventListener('resize', () => this.fitToContainer(this.canvas))
    }
    fitToContainer(cnv) {
        this.w = this.canvas.width = this.canvas.clientWidth;
        this.h = this.canvas.height = this.canvas.clientHeight;
    }

}