document.addEventListener("DOMContentLoaded",()=>{
    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector("#question");
    const formAnswers = document.querySelector("#formAnswers");

    const quizData = [
        {
            question: "Якого кольору бургер бажаєте?",
            answers: [
                { title: "Стандарт", img: "./image/burger.png" },
                { title: "Чорний", img: "./image/burgerBlack.png" }
            ]
        }
    ];

    let currentQuestionIndex = 0;

    btnOpenModal.addEventListener("click", ()=>{
        modalBlock.classList.add('d-block');
        showQuestion(currentQuestionIndex);
        })

    closeModal.addEventListener("click", ()=>{
        modalBlock.classList.remove("d-block");
        })
    
    const showQuestion = function(index) {
        const currentData = quizData[index];

        questionTitle.textContent = currentData.question;

        formAnswers.innerHTML = "";

        currentData.answers.forEach((answer, i) => {
            const burgerTitle = answer.title;
            const burgerImg = answer.img;
            const answerId = `answerItem${i + 1}`;

            formAnswers.innerHTML += `
                <div class="answers-item d-flex flex-column">
                  <input type="radio" id="${answerId}" name="answer" class="d-none">
                  <label for="${answerId}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${burgerImg}" alt="burger">
                    <span>${burgerTitle}</span>
                  </label>
                </div>
            `;
        });
    };
});