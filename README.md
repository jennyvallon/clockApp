# clockApp
Clock application with made in pure javascript with Start, Pause Resume and Reset Buttons<br>
<br>
<br>
This exercise was awesome!<br>
And by awesome I mean deceptively simple.<br> 
<br>
<br>
I completed it by creating a Clock prototype.<br> 
The Clock constructor provides the instance with a state property that manages the seconds, minutes, hours values and a pause property which is a boolean.. They are updated in the DOM dynamically using the <i>update</i> method<br>
The state object's default value is an empty object<br>
<br>
The clock instance is initialized by the start button which populates the state object with it's initial values and calls the <i>timerOn</i> function that instantiates the setIntervals that move the clock forward.<br>
<br>
The pause button uses clearInterval. Instances of setInterval are held in the state object.<Br>
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
<i>setInterval</i> does not accept <strong>this</strong> as a parameter so <strong>this</strong> is pointing to the Window Object.
that is not what I wanted because it made my <i>seconds</i> method inaccessible within the <i>setInterval</i>.
I needed to change the context of <strong>this</strong> within the <i>setInterval</i>. To do this I 
had to change the <i>setInterval</i> <strong>native code</strong> to <strong>non-native code</strong> so that I would be able to
use the <i>call</i> method on <i>setInterval</i>, allowing me to set the context of <strong>this</strong>. I change
the <strong>native code</strong> dynamically when the document is ready. <br><br>
<i>setInterval.call(this, this.seconds, 1000);</i> <strong>line25</strong><br>
Starting from the outside going in using the now-available <i>call</i> method I set the 
context of <strong>this</strong> to the <i>Clock</i> instance which is calling the <i>setInterval</i> function(the second and third params are parameters that will be passed to the <i>setInterval</i> function as <i>vCallback</i> and <i>nDelay</i> respectively. 
<Br><br>
<i>var __nativeSI__=window.setInterval;<br>
<br>
window.setInterval = function (vCallback, nDelay) {<br>
&nbsp;&nbsp;&nbsp;    var oThis = this; <br>
&nbsp;&nbsp;&nbsp;    var aArgs = Array.prototype.slice.call(arguments, 2);<br>
&nbsp;&nbsp;&nbsp;    return __nativeSI__(vCallback instanceof Function ? function () {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        vCallback.apply(oThis, aArgs);<br>
&nbsp;&nbsp;&nbsp;    } : vCallback, nDelay);<Br>
};</i><Br>
The <strong>this</strong> the <i>oThis</i> variable is referring to is the <strong>this</strong> context passed by the <i>call</i> method. The <i>aArgs</i> variable take the arguments of index 2 and higher passed to the <i>setInterval.call()</i>  into
an array to be consumed by the callback later on. <Br>
If the first argument passed to the <i>setInterval</i> is a function then the will be called with <i>apply()</i> receive the new <strong>this</strong> context(<i>oThis</i>) and it's parameters(<i>aArgs</i>), otherwise the <i>setInterval</i> function will behave normally.

Did it over a few hours.<br>


Note: what would make this more modular is structuring the update method so that it would,
take the appropriate DOM element as a param, so that way I could have multiple clocks on the same page.
I did not do that for the interest of time. But I wanted to make sure you knew that.