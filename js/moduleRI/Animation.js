function Animation(element) {
    this.element = element;
    this.timeouts = [];
}

Animation.prototype.showSlideDown = function (speed, delay, opacity, top) {
    if (speed) {
        switch (speed) {
            case 'fast':
                delay = 5;
                break;
            case 'medium':
                delay = 25;
                break;
            case 'slow':
                delay = 50;
                break;
        }

        this.element.style.display = 'block';
        opacity = 0;
        top = this.element.offsetTop - 10;

        this.timeouts.forEach(function(timeout){
            clearTimeout(timeout);
        });
    }

    this.element.style.top = top + 'px';
    this.element.style.opacity = opacity;

    if (opacity < 1) {
        this.timeouts.push(setTimeout(this.showSlideDown, delay,null, delay, opacity + 0.1, top + 1));
    }
}