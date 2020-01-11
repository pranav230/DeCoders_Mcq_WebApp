function timer(){ 
  //duration of test in minutes
  //added 0.2 for processing delay correction
  var durationOfTest = 0.1 + 0.02;

  var countDownTime = new Date().getTime() + durationOfTest*60*1000;

  // Update the count down every 1 second
  var x = setInterval(function() {

    var now = new Date().getTime();

    //time left for the timer to terminate
    var timeLeft = countDownTime - now;
    document.getElementById("time_left").innerHTML="Time Left:" + timeLeft;

    var min = Math.floor((timeLeft % (1000*60*60)) / (1000*60));
    var sec = Math.floor((timeLeft % (1000*60)) / 1000);

    document.getElementById("timer_content").innerHTML = min + ":" + sec.toString().padStart(2,"0");

    // If the count down is finished, write some text
    if (timeLeft < 0) {
      clearInterval(x);
      document.getElementById("timer_content").innerHTML = "Finished";
      document.getElementById("time_left").innerHTML = "EXPIRED";
    }
  }, 1000);
}

var timer_btn = document.getElementById('timer_button');
if(timer_btn){
  timer_btn.addEventListener('click', timer);
}
else
  document.getElementById("time_left").innerHTML = "Button not found";