let addFriend = require('./addFriend');
let deleteFriend = require('./deleteFriend');
let search = require('./searchFilter');

let app = {};

app.Friend = Backbone.Model.extend({
	defaults: {
		name: null,
		lastName: null
	}
});

app.FriendsList = Backbone.Collection.extend({
	model: app.Friend,
	url: '#'
});


app.friendsList = new app.FriendsList();

app.FriendView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#friend-template').html()),

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	initialize: function () {
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},

	events: {
		'click .delete': 'destroy'
	},

	destroy: function () {
		deleteFriend.call(this);
	}
});

app.FriendsView = Backbone.View.extend({
	el: '#container',
	initialize: function () {
		app.friendsList.on('add', this.addAll, this);
	},

	events: {
		'click #addFriends': 'createFriend',
		'keyup #search': 'searching'
	},

	createFriend: function(e){
		e.preventDefault();
		let name = $('#name').val();
		let lastName = $('#lastName').val();
		addFriend(name, lastName, app.friendsList);
	},

	addOne: function(friend){
		let view = new app.FriendView({model: friend});
		$('#tbody').append(view.render().el);
	},

	addAll: function(){
		this.$('#tbody').html('');
		app.friendsList.each(this.addOne, this);
	},

	searching: function () {
		let input = $('#search');
		let fieldForSearc = $('select').val();
		let tbody = document.getElementById('tbody');
		search(fieldForSearc, input, tbody);
	}

});

module.exports = app;