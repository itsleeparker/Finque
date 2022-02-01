exports.getGreetings = function(){
	let greeings = ['Welcome' , 'Hello There' , 'Nice to see you here'];
	let rand = Math.round(Math.random()*greeings.length-1);
	return greeings[rand];
}

exports.btnMessage = function(msg){
	if(msg == 'login'){
		return 'New Here Sign Up Now';
	}
	else{
		return 'Already Have an Account ? Login now';

	}
}
