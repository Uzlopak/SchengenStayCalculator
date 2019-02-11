QUnit.test( "DateHelper: dateExists", function( assert ) {
	assert.equal(DateHelper.dateExists(2018,1,30), false, "The 30.02.2018 does not exist." );
});
QUnit.test( "DateHelper: isLastDayOfMonth", function( assert ) {
	assert.equal(DateHelper.isLastDayOfMonth(new Date(2018,1,27)), false, "27.02.2018 is not last day of month." );
	assert.equal(DateHelper.isLastDayOfMonth(new Date(2018,1,28)), true, "28.02.2018 is last day of month." );
	assert.equal(DateHelper.isLastDayOfMonth(new Date(2018,0,31)), true, "31.01.2018 is last day of month." );
});
QUnit.test( "DateHelper: getDateRange", function( assert ) {
	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,1))).length, 1, "DateRange from 01.01.2018 to 01.01.2018 contains one date." );
	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,1)))[0].getUTCFullYear(), 2018, "DateRange from 01.01.2018 to 01.01.2018 is only containing the date 01.01.2018." );
	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,1)))[0].getUTCMonth(), 0, "DateRange from 01.01.2018 to 01.01.2018 is only containing the date 01.01.2018." );
	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,1)))[0].getUTCDate(), 1, "DateRange from 01.01.2018 to 01.01.2018 is only containing the date 01.01.2018." );

	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,2))).length, 2, "DateRange from 01.01.2018 to 01.01.2018 contains one date." );
	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,2)))[0].getUTCFullYear(), 2018, "DateRange from 01.01.2018 to 01.01.2018 is only containing the date 01.01.2018." );
	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,2)))[0].getUTCMonth(), 0, "DateRange from 01.01.2018 to 01.01.2018 is only containing the date 01.01.2018." );
	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,2)))[0].getUTCDate(), 1, "DateRange from 01.01.2018 to 01.01.2018 is only containing the date 01.01.2018." );

	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,2)))[1].getUTCFullYear(), 2018, "DateRange from 01.01.2018 to 01.01.2018 is only containing the date 01.01.2018." );
	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,2)))[1].getUTCMonth(), 0, "DateRange from 01.01.2018 to 01.01.2018 is only containing the date 01.01.2018." );
	assert.equal(DateHelper.getDateRange(new Date(Date.UTC(2018,0,1)),new Date(Date.UTC(2018,0,2)))[1].getUTCDate(), 2, "DateRange from 01.01.2018 to 01.01.2018 is only containing the date 01.01.2018." );
});
QUnit.test( "DateHelper: addDays", function( assert ) {
	assert.equal(DateHelper.addDays(new Date(Date.UTC(2018,0,1)),1).getUTCFullYear(), 2018, "Adding one day to 01.01.2018 results into 02.01.2018" );
	assert.equal(DateHelper.addDays(new Date(Date.UTC(2018,0,1)),1).getUTCMonth(), 0, "Adding one day to 01.01.2018 results into 02.01.2018" );
	assert.equal(DateHelper.addDays(new Date(Date.UTC(2018,0,1)),1).getUTCDate(), 2, "Adding one day to 01.01.2018 results into 02.01.2018" );
});
QUnit.test( "DateHelper: isDateInDateArray", function( assert ) {
	assert.equal(DateHelper.isDateInDateArray(new Date(2018,0,1), [new Date(2018,0,2)]), false, "The 02.01.2018 is not in Array [01.01.2018]" );
	assert.equal(DateHelper.isDateInDateArray(new Date(2018,0,1), [new Date(2018,0,1)]), true, "The 02.01.2018 is in Array [01.01.2018]" );
});
QUnit.test( "DateHelper: sortDatesByDesc", function( assert ) {
	var dateArray = [new Date(2017,0,1), new Date(2019,0,1), new Date(2018,0,1)];
	
	var resultArray = DateHelper.sortDatesByDesc(dateArray);
	assert.equal(resultArray[0], dateArray[1] , "Passed!" );
	assert.equal(resultArray[1], dateArray[2] , "Passed!" );
	assert.equal(resultArray[2], dateArray[0] , "Passed!" );
});

QUnit.test( "DateHelper: isDateRangeIntersectingOtherDateRange", function( assert ) {
	
	assert.equal(DateHelper.isDateRangeIntersectingOtherDateRange({begin : new Date(2013,0,3), end: new Date(2013,0,5)},{begin : new Date(2013,0,4), end: new Date(2013,0,6)}), true , "Passed!" );
	assert.equal(DateHelper.isDateRangeIntersectingOtherDateRange({begin : new Date(2013,0,1), end: new Date(2013,0,2)},{begin : new Date(2013,0,4), end: new Date(2013,0,6)}), false , "Passed!" );
	assert.equal(DateHelper.isDateRangeIntersectingOtherDateRange({begin : new Date(2013,0,3), end: new Date(2013,0,5)},{begin : new Date(2013,0,5), end: new Date(2013,0,5)}), true , "Passed!" );
});