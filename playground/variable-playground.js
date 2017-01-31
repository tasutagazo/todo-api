var person = {
	name: "Tobitung",
	age: 21
}



//array example
var array = [69,36];
// new array gets updated
function updated2(obj){
	// obj.push(22);
	obj = [11, 22, 33];
}
// new array does not get updated but get assigned new value
function updated(obj){
	obj[1] = 70;
}
updated2(array);
console.log(array);		
updated(array);
console.log(array);


