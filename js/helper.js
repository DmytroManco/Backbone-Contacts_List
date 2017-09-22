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