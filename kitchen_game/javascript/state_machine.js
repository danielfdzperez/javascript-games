/**
 * Class StateMachine
 *
 *
 * parameters
 * states      {Object} Is an object with the states. 
 */

function StateMachine(states){
	this.estates_name = []
	this.current_number_state = 0
	this.max_number_state = null
	this.current_satate = null
	this.estates = states
	this.initializeStateMachine()
}

StateMachine.prototype.initializeStateMachine = function(){
	for(var i in this.states)
		this.estates_name.push(i)
	this.current_satate = this.estates[this.estates_name[this.current_number_state]]
	this.max_number_state = this.estates_name.length
}

StateMachine.prototype.nextState = function(){
	
}