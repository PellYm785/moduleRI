function Animation(element) {
    this.element = element;
    this.defaultTop = element.offsetTop;
    this.defaultLeft = element.offsetLeft;
    this.timeouts = [];
    this.anim = -1;

    this.showSlideDown = function (speed, delay, opacity, top) {
        var context = this;

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
            this.cancelAnimation();
            this.anim = 0;
            opacity = 0;
            top = this.element.offsetTop - 10;
        }

        this.element.style.top = top + 'px';
        this.element.style.opacity = opacity;

        if (opacity < 1 && this.anim == 0) {
            this.timeouts.push(setTimeout(this.showSlideDown.bind(context), delay, null, delay, opacity + 0.1, top + 1));
        }
    }

    this.hideSlideUp = function (speed, delay, opacity, top) {
        var context  = this;

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

            opacity = this.element.style.opacity;
            top = this.element.offsetTop;
            this.cancelAnimation();
            this.anim = 1;
        }
        top--;
        opacity -= 0.1;

        this.element.style.top = top+'px';
        this.element.style.opacity = opacity;

        console.log(opacity);
        if (opacity > 0 && this.anim == 1) {
            this.timeouts.push(setTimeout(this.hideSlideUp.bind(context), delay,null, delay, opacity, top));
        }else if (opacity <= 0){
            this.element.style.display = 'none';
            this.element.style.top = this.defaultTop + 'px';
            this.element.style.left = this.defaultLeft + 'px';
        }
    }

    this.cancelAnimation = function () {
        this.anim = -1;
        this.timeouts.forEach(function(timeout){
            clearTimeout(timeout);
        });

        this.timeouts = [];
    }

}