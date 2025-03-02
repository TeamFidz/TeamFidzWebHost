var CountDownTimer = function (element, options) {
    var endtime = options.endtime,
        zero = options.zero,
        onlyHours = options.onlyHours;

    function getTimeRemaining(endtime) {
        var remainingTimes = endtime - Date.now();
        var seconds = ~~((remainingTimes / 1000) % 60);
        var minutes = ~~((remainingTimes / 1000 / 60) % 60);
        var hours = ~~((remainingTimes / (1000 * 60 * 60)) % 24);
        var days = ~~(remainingTimes / (1000 * 60 * 60 * 24));

        var ModifyDays = onlyHours === 'only-hours' ? null : days;
        var ModifyHours =
            onlyHours === 'only-hours' ? days * 24 + hours : hours;
        var addZero = function (unit) {
            unit = '' + (unit || 0);
            return zero === 'with-zero'
                ? unit.length < 2
                    ? '0' + unit
                    : unit
                : unit;
        };

        return {
            remainingTimes,
            days: ModifyDays,
            hours: addZero(ModifyHours),
            minutes: addZero(minutes),
            seconds: addZero(seconds),
        };
    }

    function initilizeCounter() {
        var daysDiv = element.querySelector('.days');
        var daysText = element.querySelector('.days-text');
        var daysSeparator = element.querySelector('.days-separator');
        var hoursDiv = element.querySelector('.hours');
        var minutesDiv = element.querySelector('.minutes');
        var secondsDiv = element.querySelector('.seconds');
        var counterWrapper = element.querySelector('.wrapper');
        var finishText = element.querySelector('.finish-text');

        updateCounter();
        var timeinterval = setInterval(updateCounter, 1000);
        function updateCounter() {
            var timeRemaining = getTimeRemaining(endtime);
            var hasFinish = endtime < Date.now();

            var days = timeRemaining.days,
                hours = timeRemaining.hours,
                minutes = timeRemaining.minutes,
                seconds = timeRemaining.seconds,
                remainingTimes = timeRemaining.remainingTimes,
                visibility = days === null ? 'none' : 'flex';

            daysDiv.style.display = visibility;
            daysText.style.display = visibility;
            counterWrapper.style.display = hasFinish ? 'none' : 'flex';
            finishText.style.display = hasFinish ? 'block' : 'none';

            if (daysSeparator) {
                daysSeparator.style.display = visibility;
            }

            if (daysDiv) {
                daysDiv.innerText = days;
            }
            hoursDiv.innerText = hours;
            minutesDiv.innerText = minutes;
            secondsDiv.innerText = seconds;

            if (remainingTimes <= 0) {
                clearInterval(timeinterval);
            }
        }
        const destroy = () => {
            clearInterval(timeinterval);
        };

        return { destroy };
    }

    return initilizeCounter();
};
// Select the countdown element
const countdownElement = document.querySelector(".dorik-counterdown-f2l7xutt");

// Define countdown options
const options = {
  endtime: new Date("2025-04-07T00:00:00").getTime(), // Convert the string to a Date object and then to milliseconds
  zero: 'with-zero',  // Whether to show zero values or not ('with-zero' or 'without-zero')
  onlyHours: false     // Whether to display only hours
};

// Call the CountDownTimer function
if (countdownElement) {
  CountDownTimer(countdownElement, options);
} else {
  console.error("Countdown element not found.");
}
