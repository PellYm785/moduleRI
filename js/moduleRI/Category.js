function Category(name, img) {
    var nameNode = document.createTextNode(name);

    this.category = document.createElement('category-ri');
    this.icon = document.createElement('img');
    this.title = document.createElement('h2');
    this.list = document.createElement('ul');
    this.listItem = [];

    this.icon.setAttribute('src', img);
    this.title.appendChild(nameNode);

    this.category.appendChild(this.icon);
    this.category.appendChild(this.title);
    this.category.appendChild(this.list);
    this.section = null;
    this.idItem = 0;

    this.add = function(item){
        if(!item instanceof Item) {
            throw 'It isn\'t Item object';
        }

        item.item.setAttribute('data-item-id', this.idItem);
        item.category = this;

        this.listItem.push(item);
        this.list.appendChild(item.item);
        this.idItem++;
    };

    this.delete = function(item){
        if(!this.items){
            throw 'No items is set';
        }
        if(item instanceof Item) {
            throw 'It isn\'t Item object';
        }

        return this.list.removeChild(item);
    };

}