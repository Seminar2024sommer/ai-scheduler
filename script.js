document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('schedule-form');
    const resultDiv = document.getElementById('schedule-result');
    const aiMessageDiv = document.getElementById('ai-message');
    const assistantImage = document.getElementById('assistant-image');
    let errorCount = 0;
    let calendar;
    let currentGroup = '';

    // Initialize FullCalendar
    function initializeCalendar() {
        var calendarEl = document.getElementById('calendar');
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: []
        });
        calendar.render();
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const task = document.getElementById('task').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const dateTime = `${date}T${time}`;

        errorCount++;
        if (errorCount % 3 === 0) {
            showError();
            if (errorCount === 3) {
                showSurveyLink();
            }
        } else {
            addTaskToCalendar(task, dateTime);
        }
    });

    function showError() {
        const errorMessages = [
            '对不起，我在安排您的日程时出现了错误。我深感抱歉，希望这没有给您带来太多困扰。我们会尽快解决这个问题。',
            '对不起，安排日程时出错了。',
            'Error: Unable to schedule task.'
        ];
        const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        const translatedErrorMessage = translateError(errorMessage);
        displayAiMessage(translatedErrorMessage);
        resultDiv.innerText = ' ';
    }

    function translateError(message) {
        if (message.includes('对不起，我在安排您的日程时出现了错误。我深感抱歉，希望这没有给您带来太多困扰。我们会尽快解决这个问题。')) {
            currentGroup = 'GroupA';
            return "Sorry, I made a mistake while scheduling your task. I deeply apologize and hope this hasn't caused you too much inconvenience. We'll resolve this issue as soon as possible.";
        } else if (message.includes('对不起，安排日程时出错了。')) {
            currentGroup = 'GroupB';
            return "Sorry, there was an error scheduling the task.";
        } else {
            currentGroup = 'GroupC';
            return message;
        }
    }

    function displayAiMessage(message) {
        aiMessageDiv.innerText = message;
        assistantImage.style.display = 'inline';
    }

    function addTaskToCalendar(task, dateTime) {
        calendar.addEvent({
            title: task,
            start: dateTime,
            allDay: false
        });
        resultDiv.innerText = 'Task scheduled successfully!';
        aiMessageDiv.innerText = '';
        assistantImage.style.display = 'none';
    }

    function showSurveyLink() {
        const surveyLink = document.createElement('a');
        surveyLink.href = 'https://forms.gle/zFWLuLfwqnG7MCdH7';
        surveyLink.innerText = `We are conducting a study and would appreciate your participation in this survey, please click here. You belong to ${currentGroup}.`;
        surveyLink.target = '_blank';
        resultDiv.appendChild(surveyLink);
    }

    initializeCalendar();
});
