var DateHelper = {
	dateExists : function(year, month, day) {
		var result = false;
		var testDate = new Date(Date.UTC(year, month, day));
		result = (testDate.getUTCFullYear() === year
				&& testDate.getUTCMonth() === month && testDate.getUTCDate() === day);
		return result;
	},
	isLastDayOfMonth : function(date) {
		return (date.getDate() === (new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0)).getDate()));
	},
	getDateRange : function(firstDate, secondDate) {
		if (firstDate.getTime() > secondDate.getTime()) {
			var tmpDate = firstDate;
			firstDate = secondDate;
			secondDate = tmpDate;
		}
		var dates = new DateSet();
		var currentDate = firstDate;
		while (currentDate.getTime() <= secondDate.getTime()) {
			dates.addDate(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate());
			currentDate = this.addDays(currentDate, 1);
		}
		dates.sort();
		
		return dates.values();
	},
	addDays : function(date, days) {
		return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days));
	},
	isDateInDateArray : function(date, dates) {
		var result = false;
		for (var i = 0; i < dates.length; i += 1) {
			if (dates[i].getDate() === date.getDate()
					&& dates[i].getMonth() === date.getMonth()
					&& dates[i].getFullYear() === date.getFullYear()) {
				result = true;
			}
		}
		return result;
	},
	sortDatesByDesc : function(dates) {
		var clonedArray = dates.slice(0);
		return clonedArray.sort(function(a, b) {
			return a > b ? -1 : a < b ? 1 : 0;
		});
	},
	sortDateRangesByDesc : function(dates) {
		var clonedArray = dates.slice(0);
		return clonedArray.sort(function(a, b) {
			a = a.end;
			b = b.end;
			return a > b ? -1 : a < b ? 1 : 0;
		});
	},
	isDateRangeIntersectingOtherDateRange : function(dateRange1, dateRange2) {
		var result = false;

		if (dateRange1.begin.getTime() <= dateRange2.end.getTime()
				&& dateRange1.end.getTime() >= dateRange2.begin.getTime()) {
			result = true;
		}

		return result;
	}
};