'use strict';

var VO_610_2013 = {};

VO_610_2013.calculate180DaysPeriodBegin = function(date) {
	var durationOfPeriodInDays = 180;
	var periodStart;

	periodStart = DateHelper.addDays(date, 1 - durationOfPeriodInDays);
	return periodStart;
};

VO_610_2013.amountOfDaysByDateRange = function(dateRange) {
	// Get 1 day in milliseconds
	var one_day = 1000 * 60 * 60 * 24;

	// Convert both dates to milliseconds
	var date1_ms = dateRange.begin.getTime();
	var date2_ms = dateRange.end.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = date2_ms - date1_ms;

	// Convert back to days and return
	return Math.round(difference_ms / one_day) + 1;
}

VO_610_2013.isDateValidByDateSet = function(date, dateSet) {
	var durationOfPeriodInDays = 180;
	
	//it should not effect the validation if the date is not given
	if (dateSet.inDateSet(date) === false) {
		return true;
	}
	//Are there are up to 90 days, complete stay is logically valid
	
	if (dateSet.values().length <= 90) {
		return true;
	}

	//In the last 180 days there was equal or less than 90 days stay
	var periodStart = VO_610_2013.calculate180DaysPeriodBegin(date);
	var filterFunc = function (value) {
		return periodStart.getTime() <= value.getTime() &&
			   date.getTime() >= value.getTime();
	}
	var tmp = dateSet.values().filter(filterFunc);
	if (tmp.length <= 90) {
		return true;
	}	
	
	return false;
}

VO_610_2013.process = function (dateRanges) {
	dateRanges = DateHelper.sortDateRangesByDesc(dateRanges);
	var sumOfDays = 0;
	var latestDateRange = dateRanges[0];
	var referencePeriod = this.calculate180DaysPeriodBegin([latestDateRange.end])[0];
	
	for (var i = 0; i < dateRanges.length; i += 1) {
		if (DateHelper.isDateRangeIntersectingOtherDateRange(dateRanges[i], referencePeriod)) {
			if (dateRanges[i].begin.getTime() < referencePeriod.begin.getTime()) {
				sumOfDays += this.amountOfDaysByDateRange({begin: referencePeriod.begin,end: dateRanges[i].end});
			} else {
				sumOfDays += this.amountOfDaysByDateRange({begin: dateRanges[i].begin,end: dateRanges[i].end});
			}
		}
	}
	return sumOfDays;
	
}