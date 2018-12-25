function Item(text, details) {
    var textNode = document.createTextNode(text);
    var context = this;
    const xmlns = "http://www.w3.org/2000/svg";
    const boutonDetails = '<text x="10" y="17" font-family="Arial" font-size="13" stroke="#BABABA" fill="#BABABA">i</text><circle cx="12" cy="12" r="10" stroke="#BABABA" stroke-width="2" fill="none" />';

    this.item = document.createElement('item-ri');
    this.content = document.createElement('p');
    this.boutonDetails = null;
    this.details = null;

    this.content.appendChild(textNode);
    this.item.appendChild(this.content);


    if (details) {
        this.details = document.createElement('details-ri');
        this.boutonDetails = document.createElementNS(xmlns, 'svg');
        this.animation = new Animation(this.details);

        this.boutonDetails.classList.add('button-details-ri');

        this.boutonDetails.setAttribute('height', 25);
        this.boutonDetails.setAttribute('width', 25);
        this.boutonDetails.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.boutonDetails.innerHTML += boutonDetails;

        this.item.appendChild(this.boutonDetails);
        this.item.appendChild(this.details);

        this.details.innerHTML += details;

        this.boutonDetails.addEventListener('click', function (event) {
                this.animation.showSlideDown('medium');
            }.bind(context)
        );
    }
}

Item.prototype.addContent = function (text) {
    this.content.innerText = text;
};

Item.prototype.deleteContent = function () {
    this.content.innerText = "";
};

Item.prototype.addDetails = function (details) {
    if (!this.details) {
        this.details = document.createElement('div');
        this.details.classList.add('details-ri');
        this.item.appendChild(this.details);
    }

    this.details.innerHTML += details;
};

Item.prototype.deleteDetails = function () {
    if (!this.details) {
        throw 'No details is set'
    }
    this.details.remove();
};

