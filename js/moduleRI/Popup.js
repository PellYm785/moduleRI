function Popup(displayerButton, content, parent) {
    var context = this;
    const closeSvg = '<path style="fill:#aaa;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d=" M 11.374823,1.1413564 L 13.849862,3.6163952 L 9.9605151,7.5057412 L 13.849862,11.395089 L 11.374823,13.870128 L 7.4854771,9.9807801 L 3.5961301,13.870128 L 1.1210911,11.395089 L 5.0104381,7.5057412 L 1.1210911,3.6163952 L 3.5961301,1.1413564 L 7.4854761,5.0307032 L 11.374823,1.1413564 z "/>';

    this.displayerButton = displayerButton;
    this.displayedPopup = false;
    this.popup = document.createElement('popup');
    this.content = document.createElement('content-popup');
    this.close = document.createElementNS("http://www.w3.org/2000/svg", "svg");


    this.close.setAttribute('height', '15');
    this.close.setAttribute('width', '15');
    this.content.innerHTML = content;
    this.close.innerHTML = closeSvg;

    this.close.classList.add('close-popup');

    this.popup.appendChild(this.close);
    this.popup.appendChild(this.content);

    this.animation = new Animation(this.popup);
    this.parent = parent;

    document.body.appendChild(this.popup);

    this.displayerButton.addEventListener('click', function (event) {
        if (!this.displayedPopup) {
            this.displayedPopup = true;
            this.animation.showSlideDown('medium');
            this.parent.classList.add('popup-displayed');
        }
    }.bind(context));

    this.close.addEventListener('click', function () {
        if (this.displayedPopup) {
            this.displayedPopup = false;
            this.animation.hideSlideUp('medium');
            this.parent.classList.remove('popup-displayed');
        }
    }.bind(context));

    this.setContent = function (content) {
        this.content.innerHTML = content;
    }

    this.remove = function () {
        this.popup.remove();
    }

    this.setOriginPositionPopup = function (top, left) {
        this.popup.style.top = top + 'px';
        this.popup.style.left = left + 'px';
        this.animation.defaultTop = top;
        this.animation.defaultLeft = left;
    }

    this.setParent = function (parent) {
        this.parent = parent;

        var parentTop = this.parent.offsetTop;
        var parentLeft = this.parent.offsetLeft;
        var parentHeight = this.parent.offsetHeight;
        var parentWidth = this.parent.offsetWidth;

        this.setOriginPositionPopup(
            parentTop + (parentHeight - this.popup.offsetHeight) / 2,
            parentLeft + (parentWidth - this.popup.offsetWidth) / 2
        );
    }

}