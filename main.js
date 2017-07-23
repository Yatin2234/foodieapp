var foodieApp = angular.module('foodieApp',[]);

//controller bnaya h....
foodieApp.controller('mainController',function($scope) {
	//what it will do.....
	$scope.restaurants = [{
	name: 'Farzi Cafe',
	address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
	location: 'Connaught Place',
	category: 'Casual Dining, Bar',
	vote: '4.2',
	cuisines: 'Modern Indian',
	cost: '2200',
	hours: '12 Noon to 1 AM (Mon-Sun)',
	image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
},
{
	name: 'Dominos',
	address: '12/24, Level 1, Block A , Big Bazzar, Baddi',
	location: 'Baddi',
	category: 'Pizza',
	vote: '4.7',
	cuisines: 'Italian',
	cost: '500',
	hours: '12 Noon to 12 AM (Mon-Sun)',
	image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_2XFEpZvUI_wAMAqEnnWoVr61jAej6k4VgzwRr-yONk2Es-h'
},
{
	name: 'Silver Spoon Restaurant & Banquet Hall barnala',
	address: 'White Wave Building, Opposite DC Complex, Handiaya Road, Barnala, Punjab 148101',
	location: 'Connaught Place',
	category: 'Family Restaurant',
	vote: '3.9',
	cuisines: 'Indian',
	cost: '1000',
	hours: '8 AM to 11 PM (Mon-Sun)',
	image: 'data:image/jpeg;base64,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'
},
{
	name: 'Pappu Dhaba',
	address: 'Old City, Bathinda, Punjab 151001',
	location: 'Bathinda',
	category: 'Casual Dining',
	vote: '4.3',
	cuisines: 'Indian',
	cost: '400',
	hours: '10 AM to 12 AM (Mon-Sun)',
	image: 'http://restaurant.business.brookes.ac.uk/images/slideshow/restaurant.jpg'
},
{
	name: 'Pizza Nation',
	address: ' Shop No. 25 A, City Center Complex, Patiala, Punjab 147001',
	location: 'Patiala',
	category: 'Pizza',
	vote: '4.4',
	cuisines: 'Italian',
	cost: '2200',
	hours: '11 AM to 11 PM (Mon-Sun)',
	image: 'https://media.timeout.com/images/101564675/630/472/image.jpg'
},
]

})