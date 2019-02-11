'use strict';

var SchengenForm = function(options) {
	options = options || {};
	
	this.internalDatePairCounter = 0;
	
	if (options.targetElement) {
		this.settargetElement(options.targetElement);
	}
};

SchengenForm.prototype.settargetElement = function(element) {
	element.className = (element.className.length === 0) ? 'SchengenForm' : 'SchengenForm ' + element.className;

	var targetElement = document.createElement('form');
	
	var resetButton = document.createElement('button');
	resetButton.action = 'reset';
	resetButton.textContent = 'Reset';
	
	targetElement.appendChild(resetButton);
	
	this.targetElement = targetElement;
	element.appendChild(targetElement);
};


SchengenForm.prototype.addStayDates = function() {
	var currentNumber = this.internalDatePairCounter++;
	
	var beginElement = document.createElement('input');
	beginElement.id = 'beginOfStay_' + currentNumber;
	this.targetElement.appendChild(beginElement);
	

	var endElement = document.createElement('input');
	endElement.id = 'endOfStay_' + currentNumber;
	this.targetElement.appendChild(endElement);
	
	new Pikaday(
		    {
		        field: document.getElementById('beginOfStay_' + currentNumber),
		        firstDay: 1,
		        minDate: new Date(),
		        maxDate: new Date(2020, 12, 31),
		        yearRange: [2000,2020]
		    });
	new Pikaday(
		    {
		        field: document.getElementById('endOfStay_' + currentNumber),
		        firstDay: 1,
		        minDate: new Date(),
		        maxDate: new Date(2020, 12, 31),
		        yearRange: [2000,2020]
		    })
}