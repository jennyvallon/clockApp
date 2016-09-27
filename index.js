function Clock(){
    this.state=new Object;
}

Clock.prototype.getCurrentState=function(){
    return this.state;
};


Clock.prototype.init=function(){
    var clock=this.getCurrentState();
    clock.seconds=0;
    clock.minutes=0;
    clock.hours=0;
    clock.pause=true;
    this.update("seconds");
    this.update("minutes");
    this.update("hours");
    this.timerOn();
};

Clock.prototype.timerOn=function(){
    var clock=this.getCurrentState();
    var that=this;
    clock.secId=setInterval.call(this, this.seconds, 1000);
    clock.minId=setInterval.call(this, this.minutes, 60000);
    clock.hrId=setInterval.call(this, this.hours, 3600000);
    clock.pause=false;
};

Clock.prototype.increment=function(unit){
    var clock=this.getCurrentState();
    if(clock[unit]<59){
        clock[unit]++;
    }else{
        clock[unit]=00;   
    }
    this.update(unit);
};

Clock.prototype.start=function(){
    var clock=this.getCurrentState();
    if(Object.keys(clock).length === 0 && clock.constructor === Object){
        this.init();
        clock.pause=false;  
    }   
};

Clock.prototype.reset=function(){
    this.pause();
    this.init();
    
};

Clock.prototype.pause=function(){
    var clock=this.getCurrentState();
    if (clock.pause===false){
        clearInterval(clock.secId);
        clearInterval(clock.minId);
        clearInterval(clock.hrId);
        clock.pause=true;   
    }
};

Clock.prototype.resume=function(){
    var clock=this.getCurrentState();
    if (clock.pause===true){
        this.timerOn();
        clock.pause=false;
    }
};

Clock.prototype.seconds=function(){
    this.increment("seconds");
};

Clock.prototype.minutes=function(){
    this.increment("minutes");
};
Clock.prototype.hours=function(){
    this.increment("hours");
};

Clock.prototype.update=function(unit){
    var clock=this.getCurrentState();
    if(clock[unit]<10){
        document.getElementById(unit).innerHTML="0"+clock[unit];
    }else{
        document.getElementById(unit).innerHTML=clock[unit];
    }
};

var clock=new Clock();

document.addEventListener("DOMContentLoaded", function() {

    var __nativeSI__=window.setInterval;
    
    window.setInterval = function (vCallback, nDelay) {
        var oThis = this; 
        var aArgs = Array.prototype.slice.call(arguments, 2);//turn arg object into array
        return __nativeSI__(vCallback instanceof Function ? function () {
            vCallback.apply(oThis, aArgs);
        } : vCallback, nDelay);
    };
    
    document.getElementById("start").addEventListener("click", function(){clock.start();});
    document.getElementById("pause").addEventListener("click", function(){clock.pause();});
    document.getElementById("resume").addEventListener("click", function(){clock.resume();});
    document.getElementById("reset").addEventListener("click", function(){clock.reset();});
});