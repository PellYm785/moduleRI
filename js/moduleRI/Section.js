function Section (name){
    this.name = name;
    this.content = document.createElement('section-ri');
    this.listCategory = [];
    this.idCategory = 0;
    this.ri = null;

    this.add = function(category){
        if(!category instanceof Category) {
            throw 'It isn\'t Category object';
        }

        this.listCategory.push(category);
        this.content.appendChild(category.category);
        this.idCategory++;
        category.section = this;
        category.category.setAttribute('data-category-id', this.idCategory);
    };

    this.delete = function(category){
        if(!this.categories){
            throw 'No categories is set';
        }

        if(!category instanceof Category) {
            throw 'It isn\'t Category object';
        }

        this.content.removeChild(category);
    };
}