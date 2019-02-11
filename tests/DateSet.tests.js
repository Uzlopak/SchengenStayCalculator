QUnit.test( "DateSet: initialize", function( assert ) {
    var dateSet = new DateSet();
	
	assert.equal(Object.prototype.toString.call(dateSet.values()), "[object Array]", "DateSet getValue returns an array" );
	assert.equal(dateSet.values().length, 0, "DateSet is initialized with an empty array" );
});

QUnit.test( "DateSet: addDate", function( assert ) {
    var dateSet = new DateSet();
	
	dateSet.addDate(2019,0,1);
	assert.equal(dateSet.values().length, 1, "DateSet is has array with one value" );
});
