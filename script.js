const apiUrl = "https://mock-api.driven.com.br/api/v4/buzzquizz/";

startQuizzes();

/* ===== RENDERIZAR LISTA DE QUIZZES ===== */
function startQuizzes() {
	//const promise = axios.get(`${apiUrl}quizzes`);
	const promise = axios.get(
		"https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
	);

	//recebendo quizzes do srv
	promise.then(renderQuizzes);
	promise.catch(catchError);
}
function catchError(answer) {
	alert(answer.response);
}

function renderQuizzes(answer) {
	const quizzList = answer.data;

	console.log(quizzList);

	const quizzSpace = document.querySelector(".content-quizz");
	quizzSpace.innerHTML = "";

	for (let i = 0; i < quizzList.length; i++) {
		let quizz = quizzList[i];
		quizzSpace.innerHTML += `
            <div class="quizz-item" onclick="showQuizPage(this)">
                <div class="image-bkg">
                    <p id="quizz-title">
                        ${quizz.title}
                    </p>
                </div>
            </div>
        `;
		const lastQuizz = quizzSpace.lastElementChild;
		lastQuizz.id = quizz.id;
		lastQuizz.style.backgroundImage = `url(${quizz.image})`;
	}
}

function showQuizPage(element) {
	alert("a ser implementado \nir pra quizz " + element.id);
}
