QUnit.test( "SchengenCalendar: setTargetElement", function( assert ) {
	var calendarElement = document.createElement('DIV');
	var calendar = new SchengenCalendar({targetElement: calendarElement});
	
	assert.equal(calendar.calendarElement, calendarElement.childNodes[0], "The ul-element is correctly set into the internal variable." );
});

QUnit.test( "SchengenCalendar: addMonth", function( assert ) {
	var expectedResult = '<ul><li class="legend">10/2017</li><li data-year="2017" data-month="9" data-day="1" class="day" id="date_01_09_2017"><div>01</div></li><li data-year="2017" data-month="9" data-day="2" class="day" id="date_02_09_2017"><div>02</div></li><li data-year="2017" data-month="9" data-day="3" class="day" id="date_03_09_2017"><div>03</div></li><li data-year="2017" data-month="9" data-day="4" class="day" id="date_04_09_2017"><div>04</div></li><li data-year="2017" data-month="9" data-day="5" class="day" id="date_05_09_2017"><div>05</div></li><li data-year="2017" data-month="9" data-day="6" class="day" id="date_06_09_2017"><div>06</div></li><li data-year="2017" data-month="9" data-day="7" class="day" id="date_07_09_2017"><div>07</div></li><li data-year="2017" data-month="9" data-day="8" class="day" id="date_08_09_2017"><div>08</div></li><li data-year="2017" data-month="9" data-day="9" class="day" id="date_09_09_2017"><div>09</div></li><li data-year="2017" data-month="9" data-day="10" class="day" id="date_10_09_2017"><div>10</div></li><li data-year="2017" data-month="9" data-day="11" class="day" id="date_11_09_2017"><div>11</div></li><li data-year="2017" data-month="9" data-day="12" class="day" id="date_12_09_2017"><div>12</div></li><li data-year="2017" data-month="9" data-day="13" class="day" id="date_13_09_2017"><div>13</div></li><li data-year="2017" data-month="9" data-day="14" class="day" id="date_14_09_2017"><div>14</div></li><li data-year="2017" data-month="9" data-day="15" class="day" id="date_15_09_2017"><div>15</div></li><li data-year="2017" data-month="9" data-day="16" class="day" id="date_16_09_2017"><div>16</div></li><li data-year="2017" data-month="9" data-day="17" class="day" id="date_17_09_2017"><div>17</div></li><li data-year="2017" data-month="9" data-day="18" class="day" id="date_18_09_2017"><div>18</div></li><li data-year="2017" data-month="9" data-day="19" class="day" id="date_19_09_2017"><div>19</div></li><li data-year="2017" data-month="9" data-day="20" class="day" id="date_20_09_2017"><div>20</div></li><li data-year="2017" data-month="9" data-day="21" class="day" id="date_21_09_2017"><div>21</div></li><li data-year="2017" data-month="9" data-day="22" class="day" id="date_22_09_2017"><div>22</div></li><li data-year="2017" data-month="9" data-day="23" class="day" id="date_23_09_2017"><div>23</div></li><li data-year="2017" data-month="9" data-day="24" class="day" id="date_24_09_2017"><div>24</div></li><li data-year="2017" data-month="9" data-day="25" class="day" id="date_25_09_2017"><div>25</div></li><li data-year="2017" data-month="9" data-day="26" class="day" id="date_26_09_2017"><div>26</div></li><li data-year="2017" data-month="9" data-day="27" class="day" id="date_27_09_2017"><div>27</div></li><li data-year="2017" data-month="9" data-day="28" class="day" id="date_28_09_2017"><div>28</div></li><li data-year="2017" data-month="9" data-day="29" class="day" id="date_29_09_2017"><div>29</div></li><li data-year="2017" data-month="9" data-day="30" class="day" id="date_30_09_2017"><div>30</div></li><li data-year="2017" data-month="9" data-day="31" class="day" id="date_31_09_2017"><div>31</div></li></ul>';
	var calendarElement = document.createElement('DIV');
	var calendar = new SchengenCalendar({targetElement: calendarElement});
	calendar.addMonth(9, 2017);
	
	assert.equal(calendarElement.innerHTML, expectedResult, "Add the month of October 2017 to the calendar" );
});

/*
QUnit.test( "SchengenCalendar: drawTimePeriod", function( assert ) {
	var calendarElement = document.createElement('DIV');
	var calendar = new SchengenCalendar({targetElement: calendarElement});
	
	calendarElement.id = 'testDiv';
	calendarElement.style.height = 0;
	calendarElement.style.width = 0;
	calendarElement.style.display = 'none';
	
	document.body.appendChild(calendarElement);
	calendar.addMonth(9, 2017);
	calendar.drawTimePeriod([new Date(2017, 9, 29),new Date(2017, 9, 30)], 'black');
	assert.equal(calendarElement.childNodes[0].getElementsByTagName( 'li' )[28].className , 'day', "28.10.2017 has no borders" );
	
	assert.ok(calendarElement.childNodes[0].getElementsByTagName( 'li' )[29].className.indexOf('bT1') !== -1, "29.10.2017 has top border" );
	assert.ok(calendarElement.childNodes[0].getElementsByTagName( 'li' )[29].className.indexOf('bB1') !== -1, "29.10.2017 has bottom border" );
	assert.ok(calendarElement.childNodes[0].getElementsByTagName( 'li' )[29].className.indexOf('bL1') !== -1, "29.10.2017 has left border" );
	assert.ok(calendarElement.childNodes[0].getElementsByTagName( 'li' )[29].className.indexOf('bR1') === -1, "29.10.2017 has no right border" );

	assert.ok(calendarElement.childNodes[0].getElementsByTagName( 'li' )[30].className.indexOf('bT1') !== -1, "30.10.2017 has top border" );
	assert.ok(calendarElement.childNodes[0].getElementsByTagName( 'li' )[30].className.indexOf('bB1') !== -1, "30.10.2017 has bottom border" );
	assert.ok(calendarElement.childNodes[0].getElementsByTagName( 'li' )[30].className.indexOf('bL1') === -1, "30.10.2017 has no left border" );
	assert.ok(calendarElement.childNodes[0].getElementsByTagName( 'li' )[30].className.indexOf('bR1') !== -1, "30.10.2017 has right border" );

	assert.equal(calendarElement.childNodes[0].getElementsByTagName( 'li' )[31].className , 'day', "31.10.2017 has no borders" );
	
	document.body.removeChild(calendarElement);
});
*/
QUnit.test( "SchengenCalendar: reset", function( assert ) {
	var calendarElement = document.createElement('DIV');
	var calendar = new SchengenCalendar({targetElement: calendarElement});
	
	calendarElement.id = 'testDiv';
	calendarElement.style.height = 0;
	calendarElement.style.width = 0;
	calendarElement.style.display = 'none';
	
	document.body.appendChild(calendarElement);
	calendar.addMonth(9, 2017);
	calendar.drawTimePeriod([new Date(2017, 9, 29),new Date(2017, 9, 30)], 'black');

	calendar.reset();

	assert.equal(calendarElement.childNodes[0].getElementsByTagName( 'li' )[29].className , 'day', "30.10.2017 has no borders" );
	assert.equal(calendarElement.childNodes[0].getElementsByTagName( 'li' )[30].className , 'day', "30.10.2017 has no borders" );
	
	document.body.removeChild(calendarElement);
});