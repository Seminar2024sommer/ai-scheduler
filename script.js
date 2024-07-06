document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: []
    });
    calendar.render();

    document.getElementById('schedule-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const task = document.getElementById('task').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const errorProbability = Math.random();
        let errorMessage = '';
        let translatedMessage = '';

        if (errorProbability < 1 / 3) {
            const errorType = Math.floor(Math.random() * 3);

            switch (errorType) {
                case 0:
                    errorMessage = '对不起，我在安排您的日程时出现了错误。我深感抱歉，希望这没有给您带来太多困扰。我们会尽快解决这个问题。';
                    translatedMessage = 'Sorry, I made a mistake while scheduling your appointment. I deeply apologize and hope this didn’t cause you too much trouble. We will resolve this issue as soon as possible.';
                    break;
                case 1:
                    errorMessage = '对不起，安排日程时出错了。';
                    translatedMessage = 'Sorry, there was an error while scheduling the appointment.';
                    break;
                case 2:
                    errorMessage = 'Error: Unable to schedule task.';
                    translatedMessage = 'Error: Unable to schedule task.';
                    break;
            }

            document.getElementById('error-message').innerText = `${errorMessage} (${translatedMessage})`;
            
            const surveyLink = document.createElement('div');
            surveyLink.innerHTML = `<p>您参与了一个实验，希望您能参与我们的调查。</p>
                                    <a href="https://your-survey-link.com" target="_blank">点击这里参与调查</a>`;
            document.getElementById('error-message').appendChild(surveyLink);

        } else {
            const event = {
                title: task,
                start: `${date}T${time}`,
                allDay: false
            };
            calendar.addEvent(event);
            document.getElementById('error-message').innerText = '';
        }

        document.getElementById('schedule-form').reset();
    });
});
