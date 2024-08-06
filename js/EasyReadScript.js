window.onload = function() {
    var timerElement = document.getElementById('timer');
    var startTime = new Date().getTime();
    var intervalId

    function updateTimer() {
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - startTime;

        var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        timerElement.textContent = hours + ':' + minutes + ':' + seconds;
    }

    intervalId = setInterval(updateTimer, 1000);
};





function redirectToEasyQuizpage() {
    window.location.href = "EasyQuiz.html";
}

clearInterval(intervalId);