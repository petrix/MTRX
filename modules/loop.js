export class Loop {
    constructor(_update, _display) {
        this.update = _update;
        this.display = _display;

        this.deltaTime = 0;
        this.lastUpdate = 0;
        this.maxInterval = 40;

        this.animate = this.animate.bind(this);
        this.animate();
    }
    animate(currentTime = 0) {
        requestAnimationFrame(this.animate);
        this.deltaTime = currentTime - this.lastUpdate;
        if (this.deltaTime < this.maxInterval) {
            this.update(this.deltaTime / 1000);
            this.display();
        }

        this.lastUpdate = currentTime;
    }
}