const apiUrl = "https://mock-api.driven.com.br/api/v4/buzzquizz/";

//para teste
for (let index = 0; index < 10; index++) {
	storeLocal(index + 100);
}
const obj = localStorage.getItem("idList");
const dados = JSON.stringify(obj);
console.log(dados);

/* ===== RENDERIZAR LISTA DE QUIZZES ===== */
function startQuizzes() {
	localStorage.setItem("nomes", "kik");
	const a = localStorage.getItem("nomes");
	alert(a);
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

function showCreateQuizzPage() {
	const your_quizz = document.querySelector(".your_quizz");
	const make_quizz = document.querySelector(".make_quizz");
	const all_quizz = document.querySelector(".all_quizz");
	const createQuizz = document.querySelector(".create-quizz");

	your_quizz.classList.add("invisible");
	make_quizz.classList.add("invisible");
	all_quizz.classList.add("invisible");
	createQuizz.classList.remove("invisible");
}

function checkBasicInfo() {
	//pegando seletores
	const title = document.querySelector(".input-space .title");
	const url = document.querySelector(".input-space .url");
	const nQuestions = document.querySelector(".input-space .nQuestions");
	const nLevels = document.querySelector(".input-space .nLevels");

	//checar se informações estão corretas
	while (true) {
		//TITULO MIN 20 E MAX 65 CARACTERES
		if (title.value === null && (title.value < 20 || title.value > 65)) {
			alert("Titulo deve ter no min 20 caracteres e no max 65");
			break;
		}

		//URL DA IMAGEM DEVE TER FORMATO URL
		//!ABC + A!BC
		if (
			url.value === null ||
			!(
				(url.value.includes("http://") && url.value.includes(".")) ||
				(url.value.includes("https://") && url.value.includes("."))
			)
		) {
			alert("URL inválida!");
			break;
		}

		//QT DE PERGUNTAS MIN 3
		if (nQuestions.value === null || nQuestions.value < 3) {
			alert("Quantidade de perguntas deve ser no min 3");
			break;
		}

		//QT DE NIVEIS MIN 2
		if (nLevels.value === null || nLevels.value < 2) {
			alert("Quantidade de niveis deve ser no min 2");
			break;
		}

		//==> CHAMAR FUNÇÃO PRA CRIAR PERGUNTAS
		createQuestions(nQuestions.value, nLevels.value);
		break;
	}
}

function createQuestions(questions, levels) {
	alert(`criar perguntas -> a ser implementado
	numero de perguntas -> ${questions}
	numero de niveis -> ${levels}`);
}
function storeLocal(id) {
	var idList = localStorage.getItem("idList");

	//verificar se key está vazia, se estiver adiciona items
	if (idList === null) {
		let arrStr = JSON.stringify([{ id: id }]);
		localStorage.setItem("idList", arrStr);
	} else {
		//caso nao esteja pega items anteriores e adiciona o novo
		var objList = JSON.parse(idList); //recebendo e transformando em array
		objList.push({ id: id });
		var objList = JSON.stringify(objList);
		localStorage.setItem("idList", objList);
	}
}
