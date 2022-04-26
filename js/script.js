let data = [];

function init() {
    window.fetch('./data/mailData.json')
        .then(res => res.json()
            .then(resp => {
                data = resp;
                updateCounts();
                appendAllMails();
            }))
        .catch(err => console.log(err));
}

function updateCounts() {
    let inboxCount = document.querySelector('#inbox-count');
    inboxCount.textContent = data.length;
}

function appendAllMails() {
    let mailList = document.querySelector('.mail-list');
    mailList.innerHTML = '';

    data.forEach(mail => {
        let mailDiv = document.createElement('div');
        mailDiv.classList.add('mail');
        
        let firstRow = document.createElement('div');
        firstRow.classList.add('first-row');
        
        let title = document.createElement('p');
        title.classList.add('title');
        title.textContent = mail['messageTitle'];
        firstRow.appendChild(title);
        firstRow.innerHTML += '<i class="fa fa-circle icon"></i>';

        let secondRow = document.createElement('div');
        secondRow.classList.add('second-row');
        
        let sentBy = document.createElement('p');
        sentBy.classList.add('sent-by');
        sentBy.textContent = mail['sentBy'];

        let mailDate = document.createElement('p');
        mailDate.classList.add('mail-date');
        mailDate.textContent = mail['messageDeliveryDate'];

        secondRow.appendChild(sentBy);
        secondRow.appendChild(mailDate);
        mailDiv.appendChild(firstRow);
        mailDiv.appendChild(secondRow);

        mailList.appendChild(mailDiv);
    });
}

function showMail(mail) {
    
}

init();
