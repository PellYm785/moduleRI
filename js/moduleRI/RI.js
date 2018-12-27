function RI(containerId) {
    this.listSection = [];
    this.containerId = containerId;
    this.ri = document.createElement('ri');
    this.menu = document.createElement('menu-ri');
    this.content = document.createElement('content-ri');
    this.idSection = 0;

    this.ri.appendChild(this.menu);
    this.ri.appendChild(this.content);

    this.add = function (section) {
        if (!section instanceof Section) {
            throw 'It isn\'t Section object';
        }

        this.listSection.push(section);
        section.content.setAttribute('data-section-id', this.idSection);
        this.idSection++;
    };

    this.delete = function (section) {
        if (!this.listSection) {
            throw 'No items is set';
        }

        switch (typeof section) {
            case 'number':
                this.listSection.splice(section, 1);
                break;
            case 'object':
                if (section instanceof Section) {
                    var index = this.listSection.indexOf(section);
                    this.listSection.splice(section, index);
                } else {
                    throw 'It isn\'t Section object';
                }
                break;
            case 'string':
                var i = 0;
                var found = false;

                while (i < this.listSection.length && !found) {
                    if (this.listSection[i] === item) {
                        found = true;
                    }
                    i++;
                }
                if (found) {
                    this.listSection.splice(item, i);
                } else {
                    throw 'Section doesn\'t exist';
                }
                break;
        }
    }

    this.build = function () {
        if (!this.listSection) {
            throw 'No items is set';
        }

        var textNodemenu = null;
        var menuLi = null;
        var context = this;
        var container = document.getElementById(this.containerId);
        var firstMenuLi = null;
        var firstSection = null;
        var i = 0;

        this.listSection.forEach(function (section) {
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
                    var hiddenSection  = this.content.getElementsByClassName('displayed-section-ri')[0];
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

        container.appendChild(this.ri);

        this.listSection.forEach(function(section){
            section.listCategory.forEach(function(category){
                category.listItem.forEach(function (item) {
                    if (item.details) {
                        item.details.setParent(this.ri);
                    }
                }.bind(context));
            });
        });
    }
}