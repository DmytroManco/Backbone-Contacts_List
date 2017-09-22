(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function addFriend(name, lastName, collection) {
	let friends = JSON.parse(localStorage.getItem('friends'));

	if(name === '' || lastName === ''){
		return;
	}

	for(let i = 0; i < friends.length; i++) {
		if(name === friends[i].name && lastName === friends[i].lastName) {
			name = '';
			lastName = '';
			return;
		}
	}

	let newFriend = {
		id: friends.length,
		name: name,
		lastName: lastName
	};

	collection.add(newFriend);
	friends.push(newFriend);
	localStorage.setItem('friends', JSON.stringify(friends));

}

module.exports = addFriend;
},{}],2:[function(require,module,exports){
let url = 'http://www.json-generator.com/api/json/get/cgmZpkYnYi?indent=2';
let app = require('./backboneApp');
let makeDataArr = require('./helper');

app.friendsView = new app.FriendsView();

if(!localStorage.getItem('friends')) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) return;

		if (xhr.status !== 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			let friends = makeDataArr(JSON.parse(xhr.responseText));
			localStorage.setItem('friends', JSON.stringify(friends));
			for(let i = 0; i < friends.length; i++) {
				app.friendsList.add(friends[i]);
			}
		}
	};
} else{
	let friends = JSON.parse(localStorage.getItem('friends'));
	for(let i = 0; i < friends.length; i++) {
		app.friendsList.add(friends[i]);
	}
}






},{"./backboneApp":3,"./helper":5}],3:[function(require,module,exports){
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
},{"./addFriend":1,"./deleteFriend":4,"./searchFilter":6}],4:[function(require,module,exports){
function deleteFriend() {
	let friends = JSON.parse(localStorage.getItem('friends'));

	for(let i = 0; i < friends.length;i++) {
		if(friends[i].id === this.model.get('id')) {
			friends.splice(friends.indexOf(friends[i]), 1);
		}
	}

	localStorage.setItem('friends', JSON.stringify(friends));
	this.model.destroy();
}

module.exports = deleteFriend;
},{}],5:[function(require,module,exports){
function makeDataArr(data) {
	let friends = [];

	for(let i=0; i < data.length; i++){
		if(data[i]['isActive']){
			data[i]['friends'].forEach(function(el) {
				friends.push(el);
			})
		}
	}

	friends.forEach(function(el) {
		let fullName = el.name;
		el.name = fullName.split(' ')[0];
		el.lastName = fullName.split(' ')[1];
	});

	return friends;
}

module.exports = makeDataArr;
},{}],6:[function(require,module,exports){
function search(fieldForSearch, input, element) {
	let filter = input.val().toLowerCase();
	let tr = element.getElementsByTagName('tr');
	let index = (fieldForSearch === 'name') ? 0 : 1;

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[index];
		if (td) {
			if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
}

module.exports = search;
},{}]},{},[2]);
