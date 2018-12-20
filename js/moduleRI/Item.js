function Item(text, details) {
    var textNode = document.createTextNode(text);
    const boutonDetails = '<svg class="button-details-ri" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><text x="10" y="17" font-family="Arial" font-size="13" stroke="#BABABA" fill="#BABABA">i</text><circle cx="12" cy="12" r="10" stroke="#BABABA" stroke-width="2" fill="none" /></svg>';    this.item = document.createElement('li');
    this.item.classList.add('item-ri');

    this.content = document.createElement('p');
    this.content.appendChild(textNode);

    this.item.appendChild(this.content);
    this.details = null;
    if (details) {
        this.details = document.createElement('div');
        this.details.classList.add('details-ri');

        this.item.innerHTML += boutonDetails;
        this.item.appendChild(this.details);

        this.details.innerHTML += details;
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