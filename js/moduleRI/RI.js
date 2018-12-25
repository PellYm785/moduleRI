/**
 *
 */
function RI(containerId) {
    this.sections = null;
    this.containerId = containerId;
    this.ri = document.createElement('ri');
    this.menu = document.createElement('menu-ri');
    this.content = document.createElement('content-ri');

    this.ri.appendChild(this.menu);
    this.ri.appendChild(this.content);
}

RI.prototype.add = function (section) {
    if (section instanceof Section) {
        if (this.sections) {
            this.sections.push(section);
        } else {
            this.sections = [section];
        }
    } else {
        throw 'It isn\'t Section object';
    }
};

RI.prototype.delete = function (section) {
    if (!this.sections) {
        throw 'No items is set';
    }

    switch (typeof section) {
        case 'number':
            this.sections.splice(section, 1);
            break;
        case 'object':
            if (section instanceof Section) {
                var index = this.sections.indexOf(section);
                this.sections.splice(section, index);
            } else {
                throw 'It isn\'t Section object';
            }
            break;
        case 'string':
            var i = 0;
            var found = false;

            while (i < this.sections.length && !found) {
                if (this.sections[i] === item) {
                    found = true;
                }
                i++;
            }
            if (found) {
                this.sections.splice(item, i);
            } else {
                throw 'Section doesn\'t exist';
            }
            break;
    }
}

RI.prototype.build = function () {
    if (!this.sections) {
        throw 'No items is set';
    }

    var textNodemenu = null;
    var menuLi = null;
    var context = this;
    var container = document.getElementById(this.containerId);
    var firstMenuLi = null;
    var firstSection = null;
    var i = 0;
    var riHeight = null;
    var riWidth = null;
    var riTop = null;
    var riLeft = null;
    var detailsList = null;

    this.sections.forEach(function (section) {
        textNodemenu = document.createTextNode(section.name);
        menuLi = document.createElement('li');

        menuLi.appendChild(textNodemenu);

        this.menu.appendChild(menuLi);
        menuLi.setAttribute('data-section-ri', i);

        menuLi.addEventListener('click', function (event) {
            let menuLi = event.currentTarget;
            var displayedSection = null;

            if (!menuLi.classList.contains('selected-menu-li-ri')) {
                var menuLiSelected = this.menu.getElementsByClassName('selected-menu-li-ri')[0];
                var hiddenSection = this.content.getElementsByClassName('displayed-section-ri')[0];
                menuLiSelected.classList.remove('selected-menu-li-ri');
                hiddenSection.classList.remove('displayed-section-ri');
            }

            menuLi.classList.add('selected-menu-li-ri');
            displayedSection = this.content.getElementsByTagName('section-ri')[menuLi.dataset['sectionRi']];
            displayedSection.classList.add('displayed-section-ri');
        }.bind(context));

        this.menu.appendChild(menuLi);
        this.content.appendChild(section.content);

        firstMenuLi = this.menu.getElementsByTagName('li')[0];
        firstSection = this.content.getElementsByTagName('section-ri')[0];
        firstMenuLi.classList.add('selected-menu-li-ri');
        firstSection.classList.add('displayed-section-ri');

        i++;
    }.bind(context));

    detailsList = this.ri.getElementsByTagName('details-ri');

    container.appendChild(this.ri);

    riHeight = this.ri.offsetHeight;
    riWidth = this.ri.offsetWidth;
    riTop = this.ri.offsetTop;
    riLeft = this.ri.offsetLeft;

    for(var i = 0; i<detailsList.length; i++){
        detailsList[i].style.top = (riTop + (riHeight - detailsList[i].offsetHeight) /2)+'px';
        detailsList[i].style.left = (riLeft + (riWidth - detailsList[i].offsetWidth) /2)+'px';
    }
}

