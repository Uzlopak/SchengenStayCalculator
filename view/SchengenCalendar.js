'use strict';

var SchengenCalendar = function(options) {
	options = options || {};
	
	var _stayedDates = new DateSet();
	Object.defineProperty(this, 'stayedDates', {
		get: function () {
			return _stayedDates;
		},
		set: function (value) {
			_stayedDates = value;
		}
	});
	
	var _referenceDate = new Date();
	Object.defineProperty(this, 'referenceDate', {
		get: function () {
			return _referenceDate;
		},
		set: function (value) {
			_referenceDate = value;
		}
	});
	this.setTargetElement(options.targetElement);
	this.activateEventManaging();
	return this;
};

SchengenCalendar.prototype.initialize = function(options) {
	var today = new Date();
	options = options || {};
	var amountOfMonths = options.amountOfMonths || 6;
	for (var i = ((amountOfMonths - 1) * -1); i <= amountOfMonths + 1; i++) {
		var date = new Date(today.getUTCFullYear(), today.getUTCMonth() + i, 0);
		this.addMonth(date.getUTCMonth(), date.getUTCFullYear());
	}
	this.reset();
	this.markReferenceDate();
}

SchengenCalendar.prototype.reset = function() {
	var dateEntries = this.calendarElement.getElementsByTagName('LI');
	for (var i = 0; i < dateEntries.length; i += 1) {
		if (dateEntries[i].className.indexOf('day') !== -1) {
			dateEntries[i].childNodes[0].className = '';
			dateEntries[i].className = 'day';
		}
	}
}

SchengenCalendar.prototype.markReferenceDate = function() {
	var element = document.getElementById('date_' + StringHelper.pad(this.referenceDate.getUTCDate(),2) + '_' + StringHelper.pad(this.referenceDate.getUTCMonth(),2) + '_' + this.referenceDate.getUTCFullYear());
	if (element) {
		element.className = element.className + ' reference';
	}
}

SchengenCalendar.prototype.repaint = function() {
	this.reset();
	this.paintDates(this.stayedDates.values(), 'stay');
	this.processStayedDates();
	this.markReferenceDate();
}

SchengenCalendar.prototype.paintDates = function(dates, type) {
	var id = '';
	for (var i = 0; i < dates.length; i += 1) {
		id = 'date_' + StringHelper.pad(dates[i].getUTCDate(),2) + '_' + StringHelper.pad(dates[i].getUTCMonth(),2) + '_' + dates[i].getUTCFullYear();
		document.getElementById(id).className = 'day ' +  type;
	}
}

SchengenCalendar.prototype.drawTimePeriod = function(dates, color) {
	var id = '';
	var color = color + 'Border';
	var firstDate = dates[0];
	var lastDate = dates[dates.length-1];
	var calendar = this;
	var tmpDate;
	
	for (var i = 0; i < dates.length; i += 1) {
		
		id = 'date_' + StringHelper.pad(dates[i].getUTCDate(),2) + '_' + StringHelper.pad(dates[i].getUTCMonth(),2) + '_' + dates[i].getUTCFullYear();
		
		//first date has obviously left border
		if (i === 0) {
			document.getElementById(id).className += ' bL1 ' + color;
		}
		//first day of month has obviously left border
		if (dates[i].getUTCDate() === 1) {
			document.getElementById(id).className += ' bL1 ' + color;
		}

		//days in first month have obviously top border
		if (dates[i].getUTCMonth() === firstDate.getUTCMonth() &&
			dates[i].getUTCFullYear() === firstDate.getUTCFullYear()) {
			document.getElementById(id).className += ' bT1 ' + color;
		}
		
		if (!DateHelper.dateExists(((dates[i].getUTCMonth() === 0) ? dates[i].getUTCFullYear() : dates[i].getUTCFullYear() - 1),
								 ((dates[i].getUTCMonth() === 0) ? 11 : dates[i].getUTCMonth() - 1), 
								  dates[i].getUTCDate())) {
			document.getElementById(id).className += ' bT1 ' + color;
		}
		
		//days in last month have obviously bottom border
		if (dates[i].getUTCMonth() === lastDate.getUTCMonth() &&
			dates[i].getUTCFullYear() === lastDate.getUTCFullYear()) {
			document.getElementById(id).className += ' bB1 ' + color;
		}
		
		if (!DateHelper.dateExists(((dates[i].getUTCMonth() === 11) ? dates[i].getUTCFullYear() + 1 : dates[i].getUTCFullYear()),
				 ((dates[i].getUTCMonth() === 11) ? 0 : dates[i].getUTCMonth() + 1), 
				  dates[i].getUTCDate())) {
			document.getElementById(id).className += ' bB1 ' + color;
		}
		
		//last date has obviously right border
		if (i === dates.length - 1) {
			document.getElementById(id).className += ' bR1 ' + color;
		}
		//last day of month has obviously right border
		if (DateHelper.isLastDayOfMonth(dates[i])) {
			document.getElementById(id).className += ' bR1 ' + color;
		}
		
		//the complex stuff
		if (dates[i].getUTCDate() < firstDate.getUTCDate()) {
			if (firstDate.getUTCMonth() !== 11) {
				if (dates[i].getUTCMonth() === firstDate.getUTCMonth() + 1 &&
						dates[i].getUTCFullYear() === firstDate.getUTCFullYear()) {
					document.getElementById(id).className += ' bT1 ' + color;
				}
			} else {
				if (dates[i].getUTCMonth() === 0 &&
						dates[i].getUTCFullYear() === firstDate.getUTCFullYear() + 1) {
					document.getElementById(id).className += ' bT1 ' + color;
				}
			}
		}
		
		if (dates[i].getUTCDate() > lastDate.getUTCDate()) {
			if (lastDate.getUTCMonth() !== 0) {
				if (dates[i].getUTCMonth() === lastDate.getUTCMonth() - 1 &&
						dates[i].getUTCFullYear() === lastDate.getUTCFullYear()) {
					document.getElementById(id).className += ' bB1 ' + color;
				}
			} else {
				if (dates[i].getUTCMonth() === 11 &&
						dates[i].getUTCFullYear() === lastDate.getUTCFullYear() - 1) {
					document.getElementById(id).className += ' bB1 ' + color;
				}
			}
		}
	}
};

SchengenCalendar.prototype.setTargetElement = function(element) {
	element.className = (element.className.length === 0) ? 'schengenCalendar'
			: 'schengenCalendar ' + element.className;

	var calendarElement = document.createElement('ul');
	calendarElement.onselectstart = function() {
		return false
	};

	this.calendarElement = calendarElement;
	element.appendChild(calendarElement);
};

SchengenCalendar.prototype.addMonth = function(month, year) {
	month = parseInt(month, 10);
	year = parseInt(year, 10);
	if (month > 11 || month < 0) {
		throw 'Month has to be between 0(=January) and 11(=December)';
	}
	var amountOfDaysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

	var legendElement = document.createElement('li');
	legendElement.className = 'legend';
	legendElement.textContent = StringHelper.pad(month+1,2) + '/' + StringHelper.pad(year,2);
	this.calendarElement.appendChild(legendElement);

	for (var day = 1; day <= amountOfDaysInMonth; day += 1) {
		var dayElement = document.createElement('li');
		dayElement.setAttribute('data-year', year);
		dayElement.setAttribute('data-month', month);
		dayElement.setAttribute('data-day', day);
		dayElement.className = 'day';
		dayElement.id = 'date_' + StringHelper.pad(day, 2) + '_' + StringHelper.pad(month,2) + '_' + year;

		var inlineElement = document.createElement('div');
		inlineElement.textContent = StringHelper.pad(day, 2);
		dayElement.appendChild(inlineElement);
		
		this.calendarElement.appendChild(dayElement);
	}
};

SchengenCalendar.prototype.activateEventManaging = function() {
	var calendar = this;
	var isBeingSelected = false;
	var startDate = void 0;
	var dates = new DateSet();
	var ctrlIsPressed = false;
	
	document.onkeydown = function (event) {
		ctrlIsPressed = event.ctrlKey;
	}

	document.onkeyup = function (event) {
		ctrlIsPressed = event.ctrlKey;
	}

	this.calendarElement.onmousedown = function(event) {
		if (event.target.tagName === 'DIV') {
			var year = event.target.parentElement.getAttribute('data-year');
			var month = event.target.parentElement.getAttribute('data-month');
			var day = event.target.parentElement.getAttribute('data-day');
			
			startDate = new Date(Date.UTC(year, month, day));
			isBeingSelected = true;
		}
	}

	this.calendarElement.onmousemove = function(event) {
		if (isBeingSelected) {
			if (event.target.tagName === 'DIV') {
				if (event.target.parentElement.getAttribute('data-day') !== null) {
					var year = event.target.parentElement.getAttribute('data-year');
					var month = event.target.parentElement.getAttribute('data-month');
					var day = event.target.parentElement.getAttribute('data-day');

					var date = new Date(Date.UTC(year, month, day));
					if (ctrlIsPressed) {
						calendar.paintDates(DateHelper.getDateRange(startDate, date), '');
					} else {
						calendar.paintDates(DateHelper.getDateRange(startDate, date), 'stay');
					}
					calendar.markReferenceDate();
				}
			} else {
				calendar.repaint();
			}
		}
	}
	this.calendarElement.oncontextmenu = function(event) {
		if(event.preventDefault != undefined)
			event.preventDefault();
		if(event.stopPropagation != undefined)
			event.stopPropagation();
	}

	this.calendarElement.onmouseup = function(event) {
		var action = 'select';
		if ((event.which && event.which == 3) || (event.button && event.button == 2) || ctrlIsPressed ) {
			action = 'deselect';			
		}
		if (isBeingSelected) {
			if (event.target.tagName === 'DIV') {
				var year = event.target.parentElement.getAttribute('data-year');
				var month = event.target.parentElement.getAttribute('data-month');
				var day = event.target.parentElement.getAttribute('data-day');

				var endDate = new Date(Date.UTC(year, month, day));

				if (action === 'select') {
					calendar.stayedDates = calendar.stayedDates.concat(DateHelper.getDateRange(startDate, endDate));
				} else {
					calendar.stayedDates = calendar.stayedDates.exclude(DateHelper.getDateRange(startDate, endDate));
				}
				startDate = void 0;
				calendar.repaint();
			} else {
				calendar.repaint();
			}
		}
		isBeingSelected = false;
		
		if(event.preventDefault != undefined)
			event.preventDefault();
		if(event.stopPropagation != undefined)
			event.stopPropagation();
	}
};

SchengenCalendar.prototype.processStayedDates = function() {
	if (this.stayedDates.values().length <= 90) {
		this.paintDates(this.stayedDates.values(), 'stay valid');
		return;
	}
	
	for (var i = 0; i < this.stayedDates.values().length; i++) {
		var curDate = this.stayedDates.values()[i];
		var element = document.getElementById('date_' + StringHelper.pad(curDate.getUTCDate(),2) + '_' + StringHelper.pad(curDate.getUTCMonth(),2) + '_' + curDate.getUTCFullYear());
		if (VO_610_2013.isDateValidByDateSet(curDate, this.stayedDates)) {
			element.className = element.className + ' valid';
		} else {
			element.className = element.className + ' invalid';
		}
	}		
	
};
