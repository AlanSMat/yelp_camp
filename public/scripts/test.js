//"use strict"

function variablesInThis(){
	this.person = "Elie";
}

//variablesInThis();

//console.log(this.person);

var person = {
	firstName: "Elie",
	sayHi: function() {
		return "Hi " + this.firstName;
	},
	determineContext: function(){
		return this === person;
	},
	dog: {
		dogName: "Diggy",		
		sayHello: function(){
			return "Hello " + this.firstName;
		},
		determineContext: function(){			
			return this === person;
		}
	}
}

var colt = {
	firstName: "Colt",
	sayHi: function(){
		return "Hi " + this.firstName;
	},
	addNumbers: function(a,b,c,d){		
		return this.firstName + " just calculated " + (a + b + c + d);
	}
}

var elie = {
	firstName: "Elie",	
}

var elieCalc = colt.addNumbers.bind(elie,1,2);
var x = elieCalc(3,4)
//console.log(x);

var colt = {
	firstName: "Colt",
	sayHi: function(){
		setTimeout(function(){
			console.log("Hi " + this.firstName);
		}.bind(this),1000)
	}	
}

function Dog(dogName, age) {
	this.dogName = dogName;
	this.age = age;
}

Dog.prototype.bark = function() {
	return this.dogName + " barked!";
};

var rusty = new Dog("Rusty", 3);
var fido = new Dog("Fido", 3);

console.log(rusty.bark());

//console.log(colt.sayHi());

function Vehicle(make, model, year) {
	this.make = make;
	this.model = model;
	this.year = year;
	this.numWheels = 4;
	this.isRunning = false;

	this.turnOn = function() {
		this.isRunning = true;
	}

	this.turnOff = function() {
		this.isRunning = false;
	}
}

Vehicle.prototype.honk = function() {
	if(this.isRunning) {
		return "Beep!";
	} else {
		return "Vehicle is off!";
	}
}

function Motorcycle(make, model, year) {
	Vehicle.call(this, make, model, year);
	this.numWheels = 2;
}

var vh = new Vehicle("Harley","Fatboy","2003");
vh.turnOn();
var honk = vh.honk();

//console.log(honk);

function counter() {
	var count = 0;
	return function() {
		return ++count;
	}
}

counter1 = counter();

console.log(counter1());

