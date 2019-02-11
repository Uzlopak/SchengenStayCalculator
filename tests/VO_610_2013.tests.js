QUnit.test( "VO_610_2013: calculateReferencePeriods", function( assert ) {
	//Source: http://www.info4alien.de/cgi-bin/forum/YaBB.cgi?num=1280220533/3#3
	var referencePeriod = VO_610_2013.calculateReferencePeriods([new Date(2014,2,16)]);
	assert.equal(referencePeriod[0].begin.getDate(), 18 , "ReferencePeriod ending on 16.03.2014 begins 18.09.2013" );
	assert.equal(referencePeriod[0].begin.getMonth(), 8 , "ReferencePeriod ending on 16.03.2014 begins 18.09.2013" );
	assert.equal(referencePeriod[0].begin.getFullYear(), 2013 , "ReferencePeriod ending on 16.03.2014 begins 18.09.2013" );

	var referencePeriod = VO_610_2013.calculateReferencePeriods([new Date(2014,2,17)]);
	assert.equal((referencePeriod[0].begin.getDate() === 19) &&
		     (referencePeriod[0].begin.getMonth() === 8) &&
		     (referencePeriod[0].begin.getFullYear() === 2013), true , "ReferencePeriod ending on 17.03.2014 begins 19.09.2013" );

	//Source:https://www.sem.admin.ch/sem/de/home/themen/einreise/aufenthaltsrechner/bsp-6.html
	var referencePeriod = VO_610_2013.calculateReferencePeriods([new Date(2014,2,1)]);
	assert.equal((referencePeriod[0].begin.getDate() === 3) &&
		     (referencePeriod[0].begin.getMonth() === 8) &&
		     (referencePeriod[0].begin.getFullYear() === 2013), true , "ReferencePeriod ending on 01.03.2014 begins 03.09.2013" );

});

QUnit.test( "VO_610_2013: calculate90DaysPeriod", function( assert ) {
	//Source: https://www.sem.admin.ch/sem/de/home/themen/einreise/aufenthaltsrechner/bsp-6.html
	var referencePeriod = VO_610_2013.calculate90DaysPeriod([new Date(2014,2,1)]);
	assert.equal((referencePeriod[0].begin.getDate() === 2) &&
			     (referencePeriod[0].begin.getMonth() === 11) &&
			     (referencePeriod[0].begin.getFullYear() === 2013), true , "90 Days Period ending on 01.03.2014 begins 18.09.2013" );	
});


QUnit.test( "VO_610_2013: amountOfDaysByDateRange", function( assert ) {
	//https://www.sem.admin.ch/sem/de/home/themen/einreise/aufenthaltsrechner/bsp-1.html
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2014,7,15), end: new Date(2014,8,30)}), 47, "Passed!" );
	
	//https://www.sem.admin.ch/sem/de/home/themen/einreise/aufenthaltsrechner/bsp-2.html
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2014,10,1), end: new Date(2014,10,30)}), 30, "Passed!" );
	
	//https://www.sem.admin.ch/sem/de/home/themen/einreise/aufenthaltsrechner/bsp-3.html
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2013,9,20), end: new Date(2013,10,4)}), 16, "Passed!" );
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2013,11,3), end: new Date(2014,1,4)}), 64, "Passed!" );
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2014,2,18), end: new Date(2014,2,26)}), 9, "Passed!" );

	//https://www.sem.admin.ch/sem/de/home/themen/einreise/aufenthaltsrechner/bsp-4.html
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2013,5,1), end: new Date(2013,6,13)}), 43, "Passed!" );
	
	//https://www.sem.admin.ch/sem/de/home/themen/einreise/aufenthaltsrechner/bsp-5.html
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2014,1,21), end: new Date(2014,3,20)}), 59, "Passed!" );
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2014,4,1), end: new Date(2014,5,9)}), 40, "Passed!" );

	//https://www.sem.admin.ch/sem/de/home/themen/einreise/aufenthaltsrechner/bsp-6.html
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2013,5,28), end: new Date(2013,7,9)}), 43, "Passed!" );
	assert.equal(VO_610_2013.amountOfDaysByDateRange({begin: new Date(2013,8,19), end: new Date(2014,2,1)}), 164, "Passed!" );
});
