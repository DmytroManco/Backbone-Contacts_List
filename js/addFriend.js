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