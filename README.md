# clockApp
Clock application with made in pure javascript with Start, Pause Resume and Reset Buttons<br>
<br>
<br>
This exercise was awesome!<br>
<br>
I completed it by creating a Clock "class".<br> 
The Clock class manages the seconds, minutes and hours values and feeds them to the DOM dynamically<br>
as well as a pause state which is a boolean. These are kept in a state object whose default value is an empty object<br>
<br>
The clock is initialized by the start button which populates the state object with it's initial values and calls the timerOn function that instantiates the setIntervals that move the clock forward.<br>
<br>
Pause uses clearInterval. Instances of setInterval are held in the state object.<Br>
<br>
Resume reuses the timerOn function which serves as the setIntervals init function.<br>
<br>
Restart reuses the pause() then init()functions to clear the current setInterval and then reset all values and restart the process all over again.<br>
<br>
Seconds,Minutes and Hours values are incremented using a reused function called increment that accesses their value in the state object and increments by one and also calls an update function that changes the value in the DOM. This is what the setInterval is calling.



I then created an instance of Clock and 
added event Listeners to the buttons and attached the Clock instance methods to them.<br>
<br>
During the exercise here were my issues:<br>
1.how to increment the clock.<br>
==>a.My first thought was to only automate the incrementing of the seconds or<br>
==>b.Increment all the values together<br>
2.Showing leading zeros in values less than 10::<i>was easy to solve</i><br>
3.Adding properties to a prototype(was rusty with that, but had to look it up.)<br>
4.Biggest headache was use of setInterval & clearInterval<br>
==>a.First the pause button wouldn't work<br>
==>b.Then the clock would tick double-time<br>
==>c.The pause button made it tick faster<br>
But then I figured out I needed to have one instance of setInterval--period.<br>
Then figured out how to lay out the code so that it can manage the setInterval Ids with as little code as possible.<br>
<br>
<br>
Did it over a few hours.<br>


TO-DO: Remove moving parts (Clock.state) from prototype and add to constructor so that all instances of Clock are not acting on the same
same instance of literal values.