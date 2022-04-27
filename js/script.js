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
        let mailDiv = createElementWithClass('div', 'mail');

        let firstRow = createElementWithClass('div', 'first-row');

        let title = createElementWithClass('p', 'title');
        title.textContent = mail['messageTitle'];
        firstRow.appendChild(title);
        firstRow.innerHTML += '<i class="fa fa-circle icon"></i>';

        let secondRow = createElementWithClass('div', 'second-row');

        let sentBy = createElementWithClass('p', 'sent-by');
        sentBy.textContent = mail['sentBy'];

        let mailDate = createElementWithClass('p', 'mail-date');
        mailDate.textContent = mail['messageDeliveryDate'];

        secondRow.appendChild(sentBy);
        secondRow.appendChild(mailDate);
        mailDiv.appendChild(firstRow);
        mailDiv.appendChild(secondRow);

        mailList.appendChild(mailDiv);

        mailDiv.addEventListener('click', () => showMail(mail));
    });
}

function showMail(mail) {
    let mailPane = document.querySelector(".mail-pane");
    mailPane.innerHTML = "";

    let mailHeader = createElementWithClass("div", "mail-header");

    let mailFirstRow = createElementWithClass("div", "mail-first-row");
    let title = createElementWithClass("p", "title");
    title.textContent = mail['messageTitle'];
    mailFirstRow.appendChild(title);
    mailFirstRow.innerHTML += '<i class="fa fa-trash icon" title="Delete this mail"></i>';

    let secondRow = createElementWithClass("div", "second-row");
    let sentBy = createElementWithClass("p", "sent-by");
    sentBy.textContent = mail['sentBy'];
    let mailDate = createElementWithClass("p", "mail-date");
    mailDate.textContent = mail['messageDeliveryDate'];

    secondRow.appendChild(sentBy);
    secondRow.appendChild(mailDate);

    mailHeader.appendChild(mailFirstRow);
    mailHeader.appendChild(secondRow);

    mailPane.appendChild(mailHeader);

    let mailBody = createElementWithClass("div", "mail-body");
    mailBody.textContent = mail['messageBody'];

    mailPane.appendChild(mailBody);
}

function createElementWithClass(elementName, className) {
    let element = document.createElement(elementName);
    element.classList.add(className);
    return element;
}

init();
