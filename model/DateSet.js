'use strict';

var DateSet = function(options) {
	options = options || {};
	var _dates = [];
	
	Object.defineProperty(this, '_dates', {
		get: function () {
			return _dates;
		},
		set: function (value) {
			_dates = value;
		}
	});
	return this;
};

var dateExists = DateHelper.dateExists;
var isDateInDateArray = DateHelper.isDateInDateArray;
var sortDateRangesByDesc = DateHelper.sortDatesByDesc;

DateSet.prototype.sort = function() {
	var newInstance = new DateSet();
	newInstance._dates =  sortDateRangesByDesc(this._dates.slice());
	return newInstance;
}

DateSet.prototype.addDate = function(year, month, day) {
	if (dateExists(year, month, day) === false) {
		return;
	}
	var date = new Date(Date.UTC(year, month, day));
	if (isDateInDateArray(date, this._dates) === false) {
		this._dates.push(date);
	}
};

DateSet.prototype.reset = function() {
	this._dates = [];
};

DateSet.prototype.values = function() {
	this.sort();
	return this._dates;
};

DateSet.prototype.reverse = function() {
	var newInstance = new DateSet();
	newInstance._dates = this._dates.slice().reverse();
	return newInstance;
};
DateSet.prototype.inDateSet = function(date) {
	var cmpArray = this._dates.slice();
	var result = false;
	
	for (var j = 0; j < cmpArray.length; j++) {
		if (cmpArray[j].getTime() === date.getTime()) {
			result = true;
			break;
		}
	}
	return result;
}

DateSet.prototype.exclude = function(parmDateSet) {
	var resultDateSet = new DateSet();
	resultDateSet._dates = this._dates.slice();

	function filterFunc(value) {
		var result = true;
		var cmpArray = [];
		
		if (parmDateSet instanceof DateSet) {
			cmpArray = parmDateSet._dates.slice();
		} else {
			cmpArray = parmDateSet.slice();
		}
		for (var j = 0; j < cmpArray.length; j++) {
			if (cmpArray[j].getTime() === value.getTime()) {
				result = false;
				break;
			}
		}
		return result;
	}
	resultDateSet._dates = resultDateSet._dates.filter(filterFunc);
	return resultDateSet;
}

DateSet.prototype.concat = function(parmDateSet) {
	var resultDateSet = new DateSet();
	resultDateSet._dates = this._dates.slice();
	
	if (parmDateSet instanceof DateSet) {
		resultDateSet._dates = resultDateSet._dates.concat(parmDateSet._dates.slice());
	} else {
		resultDateSet._dates = resultDateSet._dates.concat(parmDateSet.slice());
	}

	function uniq(a) {
		var seen = {};
		return a.filter(function(item) {
				return seen.hasOwnProperty(item.getTime()) ? false : (seen[item.getTime()] = true);
		});
	};
	resultDateSet._dates = uniq(resultDateSet._dates);
	
	resultDateSet.sort();
	return resultDateSet;
};