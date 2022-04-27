let data = new Map();

function init() {
    window.fetch('./data/mailData.json')
        .then(res => res.json()
            .then(resp => {
                resp.forEach(record => data.set(record['id'], record));
                // data = resp;
                updateCounts();
                appendAllMails('inbox');
                document.querySelector('.inbox.box-menu').addEventListener('click', () => appendAllMails());
                document.querySelector('.trash.box-menu').addEventListener('click', () => appendAllMails('trash'));
            }))
        .catch(err => console.log(err));
}

function updateCounts() {
    let inboxCount = document.querySelector('#inbox-count');
    inboxCount.textContent = [...data.values()].filter(e => e['isRead'] == false).length;
}

function appendAllMails(category = 'inbox') {
    let mailList = document.querySelector('.mail-list');
    mailList.innerHTML = '';

    let allMails = [];

    if (category == 'inbox') {
        allMails = [...data.values()].filter(m => m['isDelete'] == false);
    } else if (category == 'trash') {
        allMails = [...data.values()].filter(m => m['isDelete'] == true);
    }

    allMails.forEach(mail => {
        let mailDiv = createElementWithClass('div', 'mail');

        let firstRow = createElementWithClass('div', 'first-row');

        let title = createElementWithClass('p', 'title');
        title.textContent = mail['messageTitle'];
        firstRow.appendChild(title);
        if (!mail['isRead'])
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

        mailDiv.addEventListener('click', () => {
            showMail(mail);
            appendAllMails(category);
            updateCounts();
        });
    });
}

function showMail(mail) {
    data.get(mail['id'])['isRead'] = true;
    let mailPane = document.querySelector(".mail-pane");
    mailPane.innerHTML = "";

    let mailHeader = createElementWithClass("div", "mail-header");

    let mailFirstRow = createElementWithClass("div", "mail-first-row");
    let title = createElementWithClass("p", "title");
    title.textContent = mail['messageTitle'];
    mailFirstRow.appendChild(title);
    if(!mail['isDelete'])
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
    document.querySelector(".fa.fa-trash.icon").addEventListener('click', () => {
        data.get(mail['id'])['isDelete'] = true;
        mailPane.innerHTML = "";
        appendAllMails('inbox');
        updateCounts();
        trashCount();
    });
}

function createElementWithClass(elementName, className) {
    let element = document.createElement(elementName);
    element.classList.add(className);
    return element;
}

function trashCount() {
    let trashCount = document.querySelector('#trash-count');
    trashCount.textContent = [...data.values()].filter(e => e['isDelete'] == true).length;
}

init();
