function Item(text, details) {
    var textNode = document.createTextNode(text);
    var context = this;
    const xmlns = "http://www.w3.org/2000/svg";
    const boutonDetails = '<text x="10" y="17" font-family="Arial" font-size="13" stroke="#BABABA" fill="#BABABA">i</text><circle cx="12" cy="12" r="10" stroke="#BABABA" stroke-width="2" fill="none" />';

    this.item = document.createElement('item-ri');
    this.content = document.createElement('p');
    this.boutonDetails = null;
    this.details = null;
    this.animation = null;
    this.displayedDetails = false;

    this.content.appendChild(textNode);
    this.item.appendChild(this.content);
    this.category = null;

    if (details) {
        this.details = document.createElement('details-ri');
        this.boutonDetails = document.createElementNS(xmlns, 'svg');
        this.animation = new Animation(this.details);

        this.boutonDetails.classList.add('button-details-ri');

        this.boutonDetails.setAttribute('height', 25);
        this.boutonDetails.setAttribute('width', 25);
        this.boutonDetails.innerHTML += boutonDetails;

        this.item.appendChild(this.boutonDetails);
        document.body.appendChild(this.details);

        this.details.innerHTML += details;

        this.boutonDetails.addEventListener('click', function (event) {
                if (!this.displayedDetails) {
                    this.displayedDetails = true;
                    this.animation.showSlideDown('medium');
                }else {
                    this.displayedDetails = false;
                    this.animation.hideSlideUp('medium');
                }
        }.bind(context));
    }

    this.addContent = function (text) {
        this.content.innerText = text;
    }

    this.deleteContent = function () {
        this.content.innerText = "";
    }

    this.addDetails = function (details) {
        if (!this.details) {
            this.details = document.createElement('div');
            this.details.classList.add('details-ri');
            document.appendChild(this.details);
        }

        this.details.innerHTML += details;
    }

        this.addDetails = function (details) {
        if (!this.details) {
            this.details = document.createElement('div');
            this.details.classList.add('details-ri');
            document.body.appendChild(this.details);
        }

        this.details.innerHTML += details;
    };

    this.deleteDetails = function () {
        if (!this.details) {
            throw 'No details is set'
        }
        this.details.remove();
    };

    this.setOriginPositionPopup = function (top, left){
        if(this.details) {
            this.details.style.top = top + 'px';
            this.details.style.left = left + 'px';
            this.animation.defaultTop = top;
            this.animation.defaultLeft = left;
        }
    }
}
