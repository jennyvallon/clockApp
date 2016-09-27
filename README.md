# clockApp
Clock application with made in pure javascript with Start, Pause Resume and Reset Buttons<br>
<br>
<br>
This exercise was awesome!<br>
And by awesome I mean deceptively simple.<br> 
<br>
<br>
I completed it by creating a Clock constructor.<br> 
The Clock class manages the seconds, minutes and hours values and feeds them to the DOM dynamically using the update method<br>
as well as a pause state which is a boolean. These are kept in a state object whose default value is an empty object. To prevent the <br>
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
3.Adding properties when using prototype==>solution:add properties directly to constructor<br>
4.Biggest headache was use of setInterval & clearInterval<br>
I setInterval does not accept this as a parameter so this is set to the Window Object.
that is not what I wanted because it made my seconds method inaccessible within the setInterval.
I needed to change the context of <<this>> within the setInterval. To do this I 
had to change the setInterval native code to non-native code so that I would be able to
use the call function on setInterval, allowing me to set the context of this. I change
the native code dynamically when the document is ready. <br><br>
<i>setInterval.call(this, this.seconds, 1000);</i> <strong>line25</strong>
Starting from the outside going in using the now-available call method I set the 
context of this to the Clock instance which is calling the setInterval function(the second and third params are parameters that will be passed to the setInterval function as vCallback and nDelay respectively. 
<Br><br>
<i>var __nativeSI__=window.setInterval;<br>
    
window.setInterval = function (vCallback, nDelay) {
    var oThis = this; 
    var aArgs = Array.prototype.slice.call(arguments, 2);//turn arg object into array
    return __nativeSI__(vCallback instanceof Function ? function () {
        vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
};</i>
The this the oThis variable is referring to is the this context passed by the call method. The aArgs variable turns the argument passed to the setInterval function object into
an array to be consumed by the callback later on. <Br>
In the return if the callBack passed to the setInterval is a function then it will recieve the new this context(oThis) and it's arguements(aArgs) from the apply method, otherwise the setInterval function will behave normally.

Did it over a few hours.<br>


Note: what would make this more modular is structuring the update method so that it would,
take the appropriate DOM element as a param, so that way I could have multiple clocks on the same page.
I did not do that for the interest of time. But I wanted to make sure you knew that.