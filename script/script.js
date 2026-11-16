document.addEventListener("DOMContentLoaded", () => {
    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector("#question");
    const formAnswers = document.querySelector("#formAnswers");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
    const sendButton = document.querySelector("#send");

    const questions = [
        {
            question: "Якого кольору бургер?",
            answers: [
                { title: 'Стандарт', url: './image/burger.png' },
                { title: 'Чорний', url: './image/burgerBlack.png' }
            ],
            type: 'radio'
        },
        {
            question: "З якого м'яса котлета?",
            answers: [
                { title: 'Курка', url: './image/chickenMeat.png' },
                { title: 'Яловичина', url: './image/beefMeat.png' },
                { title: 'Свинина', url: './image/porkMeat.png' }
            ],
            type: 'radio'
        },
        {
            question: "Додаткові інгредієнти?",
            answers: [
                { title: 'Помідор', url: './image/tomato.png' },
                { title: 'Огірок', url: './image/cucumber.png' },
                { title: 'Салат', url: './image/salad.png' },
                { title: 'Цибуля', url: './image/onion.png' }
            ],
            type: 'checkbox'
        },
        {
            question: "Додати соус?",
            answers: [
                { title: 'Часниковий', url: './image/sauce1.png' },
                { title: 'Томатний', url: './image/sauce2.png' },
                { title: 'Гірчичний', url: './image/sauce3.png' }
            ],
            type: 'radio'
        }
    ];

    btnOpenModal.addEventListener("click", () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener("click", () => {
        modalBlock.classList.remove("d-block");
    });
    
    const playTest = () => {
        let numberQuestion = 0;
        const finalAnswers = {}; 

        const renderAnswers = (index) => {
            formAnswers.innerHTML = ""; 
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" value="${answer.title}" class="d-none">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="burger">
                        <span>${answer.title}</span>
                    </label>
                `;
                formAnswers.appendChild(answerItem);
            });
        };
        
        const renderQuestions = (indexQuestion) => {
            switch (true) {
                case indexQuestion < questions.length:
                    questionTitle.textContent = questions[indexQuestion].question;
                    renderAnswers(indexQuestion);

                    if (indexQuestion === 0) {
                        prevButton.classList.add('d-none');
                    } else {
                        prevButton.classList.remove('d-none');
                    }

                    nextButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    break;

                case indexQuestion === questions.length:
                    questionTitle.textContent = "Введіть ваш номер телефону:";
                    formAnswers.innerHTML = `
                        <div class="input-group-prepend w-100 mb-2">
                          <span class="input-group-text" id="NumberPhone">Телефон</span>
                        </div>
                        <input type="text" class="form-control" id="phoneInput" placeholder="+38 (0XX) XXX-XXXX" aria-label="Phone">
                    `;
                    prevButton.classList.remove('d-none');
                    nextButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    break;

                case indexQuestion > questions.length:
                    questionTitle.textContent = "";
                    formAnswers.innerHTML = "<h4 class='text-center text-success'>Дякуємо за вибір! Наш менеджер Вам зателефонує.</h4>";
                    prevButton.classList.add('d-none');
                    nextButton.classList.add('d-none');
                    sendButton.classList.add('d-none');

                    setTimeout(() => {
                        modalBlock.classList.remove("d-block");
                    }, 2000);
                    break;
            }
        };

        renderQuestions(numberQuestion);

        const checkAnswers = () => {
            const inputs = [...formAnswers.querySelectorAll('input')];
            
            if (numberQuestion < questions.length) {
                const selected = inputs.filter(input => input.checked).map(input => input.value);
                if (selected.length > 0) {
                    finalAnswers[`${numberQuestion}_${questions[numberQuestion].question}`] = selected.join(', ');
                }
                return true;
            } else if (numberQuestion === questions.length) {
                const phoneInput = document.querySelector("#phoneInput");
                if (phoneInput) {
                    const resultFormatted = formattedPhone(phoneInput.value);
                    
                    if (resultFormatted === 'Формат неправильний!') {
                        alert('Будь ласка, введіть правильний номер телефону!');
                        phoneInput.focus();
                        return false; 
                    }

                    finalAnswers["Phone"] = resultFormatted;
                }
                return true;
            }
            return true;
        };

        function formattedPhone(phone) {
            let clean = phone.trim();
            if (clean.charAt(0) === '+') {
                clean = clean.slice(1);
            }

            for (let i = 0; i < clean.length; i++) {
                if (clean.charAt(i) < '0' || clean.charAt(i) > '9') {
                    return 'Формат неправильний!';
                }
            }

            if (clean.length === 10 && clean.slice(0, 1) === '0') {
                clean = '38' + clean;
            } else if (clean.length === 11 && clean.slice(0, 2) === '80') {
                clean = '3' + clean;
            } else if (clean.length === 12 && clean.slice(0, 3) === '380') {
                // OK
            } else {
                return 'Формат неправильний!';
            }

            let operator = clean.slice(2, 5); 
            let part1 = clean.slice(5, 8);    
            let part2 = clean.slice(8, 12); 

            return '+38 (' + operator + ') ' + part1 + '-' + part2;
        }

        prevButton.onclick = () => {
            if (numberQuestion > 0) {
                numberQuestion--;
                renderQuestions(numberQuestion);
            }
        };

        nextButton.onclick = () => {
            if (checkAnswers()) {
                numberQuestion++;
                renderQuestions(numberQuestion);
            }
        };

        sendButton.onclick = () => {
            if (checkAnswers()) {
                numberQuestion++; 
                renderQuestions(numberQuestion);
                console.log("Фінальний результат:", finalAnswers);
            }
        };
    };
});
