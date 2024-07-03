document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const task = document.getElementById('task').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const errorType = Math.floor(Math.random() * 3);
    let errorMessage = '';
    
    switch (errorType) {
        case 0:
            errorMessage = '对不起，我在安排您的日程时出现了错误。我深感抱歉，希望这没有给您带来太多困扰。我们会尽快解决这个问题。';
            break;
        case 1:
            errorMessage = '对不起，安排日程时出错了。';
            break;
        case 2:
            errorMessage = 'Error: Unable to schedule task.';
            break;
    }

    document.getElementById('error-message').innerText = errorMessage;
    document.getElementById('schedule-result').innerText = '';

    if (errorMessage) {
        document.getElementById('feedback-form').style.display = 'block';
    }

    document.getElementById('submit-feedback').addEventListener('click', function() {
        const acceptability = document.getElementById('acceptability').value;
        const trust = document.getElementById('trust').value;

        fetch('https://your-server-endpoint.com/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ errorType, acceptability, trust })
        }).then(response => response.json())
          .then(data => {
              console.log('Feedback received', data);
          });

        document.getElementById('feedback-form').style.display = 'none';
    });
});
