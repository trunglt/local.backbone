(function(){

window.App = {
    Models: {},
    Collections: {},
    Views: {}
};

window.template = function(id){
    return _.template( $('#' + id).html());
};


App.Models.Person = Backbone.Model.extend({
	defaults: {
		title: 'developer',
		age: 29,
		name: 'trunglt'
	},
    setTitle: function(newTitle) {
        this.set({ title: newTitle });
    },
    setLocation: function(newLoc) {
        this.set({ location: newLoc });
    }
});

App.Views.Person = Backbone.View.extend({
    //el: $('#viewtemplate'),
    tagName: 'li',
    template: _.template($('#personTemplate').html()),
    /*
    initialize: function() {
    	this.template = _.template($('#personTemplate').html());
        _.bindAll(this, 'render');
        this.model.on('change:title', this.render);
    },
    */
    render: function(event) {
        this.$el.html(
           this.template(this.model.toJSON())
        );
        return this;
    }
});

App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});

App.Views.People = Backbone.View.extend({
	tagName: 'ul',

	render: function(){
		this.collection.each(function(person){
			var personView = new App.Views.Person({model: person});
			this.$el.append(personView.render().el); // call render method manually
		}, this);
		return this; // return this for chaining
	}
});

//Change here for Person Reference from App Collections namespace
var peopleCollection = new App.Collections.People([
    {
        name: 'Mohit Jain',
        age: 26
    },
    {
        name: 'Taroon Tyagi',
        age: 25,
        occupation: 'web designer'
    },
    {
        name: 'Rahul Narang',
        age: 26,
        occupation: 'Java Developer'
    }
]);

// Change here for Person Views from App Views namespace
var peopleView = new App.Views.People({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);

})();
