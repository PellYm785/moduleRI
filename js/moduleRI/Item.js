function Item(text, details) {
    var textNode = document.createTextNode(text);

    const xmlns = "http://www.w3.org/2000/svg";
    const boutonDetails = '<text x="10" y="17" font-family="Arial" font-size="13" stroke="#BABABA" fill="#BABABA">i</text><circle cx="12" cy="12" r="10" stroke="#BABABA" stroke-width="2" fill="none" />';

    this.item = document.createElement('item-ri');
    this.content = document.createElement('p');
    this.boutonDetails = null;
    this.details = null;

    this.content.appendChild(textNode);
    this.item.appendChild(this.content);
    this.category = null;

    if (details) {
        this.boutonDetails = document.createElementNS(xmlns,'svg');

        this.boutonDetails.classList.add('button-details-ri');

        this.boutonDetails.setAttribute('height', 25);
        this.boutonDetails.setAttribute('width', 25);
        this.boutonDetails.innerHTML = boutonDetails;

        this.details = new Popup(this.boutonDetails, details);

        this.item.appendChild(this.boutonDetails);
    }

    this.setContent = function (text) {
        this.content.innerText = text;
    }

    this.addDetails = function (details) {
        if (!this.details) {
            this.details = new Popup(this.displayerButton);

            this.boutonDetails = document.createElementNS(xmlns,'svg');

            this.boutonDetails.classList.add('button-details-ri');

            this.boutonDetails.setAttribute('height', 25);
            this.boutonDetails.setAttribute('width', 25);

            this.item.appendChild(this.boutonDetails);
        }

        this.details.addContent(details);
    }


    this.deleteDetails = function () {
        if (!this.details) {
            throw 'No details is set'
        }

        this.boutonDetails.remove();
        this.details.remove();
        this.details = null;
    };
}
