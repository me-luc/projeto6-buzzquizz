const apiUrl = "https://mock-api.driven.com.br/api/v4/buzzquizz/";

const your_quizz = document.querySelector(".your_quizz");
const make_quizz = document.querySelector(".make_quizz");
const all_quizz = document.querySelector(".all_quizz");
const createQuizz = document.querySelector(".create-quizz");

/* ===== RENDERIZAR LISTA DE QUIZZES ===== */
function startQuizzes() {
  const promise = axios.get(`${apiUrl}quizzes`);

  //recebendo quizzes do srv
  promise.then(renderQuizzes);
  promise.catch(catchError);
}
function catchError(answer) {
  alert(answer.response);
}

startQuizzes();

//renderizar quizzes
function renderQuizzes(answer) {
  const quizzList = answer.data;

  renderMyQuizzes(quizzList);

  const quizzSpace = document.querySelector(".content_quizz");
  quizzSpace.innerHTML = "";

  for (let i = 0; i < quizzList.length; i++) {
    let quizz = quizzList[i];
    quizzSpace.innerHTML += `
            <div class="quizz-item" onclick="showQuizzPage(${quizz.id})">
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

function renderMyQuizzes(quizzList) {
  const idList = JSON.parse(localStorage.getItem("idList")) || [];

  const myQuizzList = quizzList.filter((quizz) => {
    return idList.includes(quizz.id);
  });

  const myQuizzSpace = document.querySelector(".area_quizz");
  myQuizzSpace.innerHTML = "";

  for (let i = 0; i < myQuizzList.length; i++) {
    let quizz = myQuizzList[i];
    myQuizzSpace.innerHTML += `
            <div class="quizz-item" onclick="showQuizzPage(${quizz.title})">
                <div class="image-bkg">
                    <p id="quizz-title">
                        ${quizz.title}
                    </p>
                </div>
            </div>
        `;
    const lastQuizz = myQuizzSpace.lastElementChild;
    lastQuizz.id = quizz.id;
    lastQuizz.style.backgroundImage = `url(${quizz.image})`;
    your_quizz.classList.remove("invisible");
    make_quizz.classList.add("invisible");
  }
}

function showQuizzPage(id) {
  const cont1 = document.getElementById("container_1");
  cont1.classList.add("invisible");
  const screenQuizz = document.querySelector(".show_quizz_conteiner");
  screenQuizz.classList.remove("invisible");
  document.querySelector("#container_5").classList.add("invisible");

  const promise = axios.get(`${apiUrl}quizzes/${id}`);

  //recebendo quizz específico do srv
  promise.then(renderQuizz);
  promise.catch(catchError);
}

function renderQuizz(response) {
  const tela = document.querySelector(".show_quizz_conteiner");
  const tela_title = document.querySelector(".q_quizz");

  const data_quizz = response.data;
  const data_quizz_questions = data_quizz.questions;

  tela.innerHTML = ""

  tela.innerHTML += `
  
  	<div class="title_quizz">
	  	<img class="image_title" alt="" src="${data_quizz.image}"></img>
  	  <p>${data_quizz.title}</p>
	</div>`;


  for (let i = 0; i < data_quizz_questions.length; i++) {
    data_quizz_questions[i].answers = data_quizz_questions[i].answers.sort(() => Math.random() - 0.5)

    tela.innerHTML = `
    <div class="question_quizz">
      <div class="q_quizz" style="background-color:${data_quizz_questions[i].color}";>
        <p>${data_quizz_questions[i].title}</p>
      </div>
      <div class="alternatives" id="alternatives-${i}">
        <div class="line_1">
          <div>
            <img class="alternative alternative_1" onclick="selectAlternative(this, ${i})" data-id="${data_quizz_questions[i].answers[0].isCorrectAnswer}" src="${data_quizz_questions[i].answers[0].image}" alt="">
            <p class="alternative-text">${data_quizz_questions[i].answers[0].text}</p>
          </div>
          <div>
            <img class="alternative alternative_2" onclick="selectAlternative(this, ${i})" data-id="${data_quizz_questions[i].answers[1].isCorrectAnswer}" src="${data_quizz_questions[i].answers[1].image}" alt="">
            <p class="alternative-text">${data_quizz_questions[i].answers[1].text}</p>
          </div>
        </div>
        <div class="line_2">
          <div>
            <img  class="alternative alternative_3" onclick="selectAlternative(this, ${i})" data-id="${data_quizz_questions[i].answers[2].isCorrectAnswer}" src="${data_quizz_questions[i].answers[2].image}" alt="">
            <p class="alternative-text">${data_quizz_questions[i].answers[2].text}</p>
          </div>
          <div>
            <img  class="alternative alternative_4" onclick="selectAlternative(this, ${i})" data-id="${data_quizz_questions[i].answers[3].isCorrectAnswer}" src="${data_quizz_questions[i].answers[3].image}" alt="">
            <p class="alternative-text">${data_quizz_questions[i].answers[3].text}</p>
          </div>
        </div>
      </div>
    </div>`;
  }
}

function selectAlternative(el, i) {
  const isCorrectAnswer = el.getAttribute('data-id');
  
  const alternatives = document.querySelectorAll(`#alternatives-${i} .alternative`);
  const alternativesText = document.querySelectorAll(`#alternatives-${i} .alternative-text`);
  for (let y = 0; y < alternatives.length; y++) {
    alternatives[y].classList.add('opacity');
    alternatives[y].removeAttribute('onclick');
    if (alternatives[y].getAttribute('data-id') == 'true') {
      alternatives[y].parentElement.lastChild.classList.add('color-green');
    } else {
      alternatives[y].parentElement.lastChild.classList.add('color-red');
    }
  }
  
  el.classList.remove('opacity');
}

const final_list = []; //lista question da api

function creat_quizz() {
  const main_div = document.getElementById("container_1");
  main_div.classList.add("invisible");
}
// abir formulario de perguntas
function toggle_pergunta(element) {
  const father = element.parentElement;
  father.classList.toggle("invisible");

  const pergunta = document.querySelectorAll(".pergunta_x");

  for (let i = 0; i < pergunta.length; i++) {
    if (father.id == pergunta[i].id) {
      pergunta[i].classList.toggle("invisible");
    }
  }
}

function toggle_nivel(element) {
  const father = element.parentElement;
  father.classList.toggle("invisible");

  const nivel = document.querySelectorAll(".nivel_x");

  for (let i = 0; i < nivel.length; i++) {
    if (father.id == nivel[i].id) {
      nivel[i].classList.toggle("invisible");
    }
  }
}

//mostrar perguntas na tela
function print_elements(qt_perguntas) {
  let tela = document.querySelector(".tela_perguntas");

  tela.innerHTML = "";

  let count = 0;

  for (let i = 0; i < qt_perguntas; i++) {
    count++;
    tela.innerHTML += `<div class="pergunta_x_box" id="p_${count}">
        <p>Pergunta ${count}</p>
        <ion-icon onclick="toggle_pergunta(this)" name="create-outline"></ion-icon>
    </div>
    <div class="pergunta_x invisible" id="p_${count}">
        <div class="pergunta">
            <p>Pergunta ${count}</p>
            <input class="input1" type="text" placeholder="Texto da pergunta">
            <input class="input2" type="text" placeholder="Cor de fundo da pergunta">
        </div>
        <div class="resposta_c">
            <p>Resposta correta</p>
            <input class="input3" type="text" placeholder="Resposta correta">
            <input class="input4" type="text" placeholder="URL da imagem">
        </div>
        <div class="respostas_i_1">
            <p>Respostas incorretas</p>
            <input class="input5" type="text" placeholder="Resposta errada 1">
            <input class="input6" type="text" placeholder="URL da imagem 1">
        </div>
        <div class="respostas_i_2">
            <input class="input7" type="text" placeholder="Resposta errada 2">
            <input class="input8" type="text" placeholder="URL da imagem 2">
        </div>
        <div class="respostas_i_3">
            <input class="input9" type="text" placeholder="Resposta errada 3">
            <input class="input10" type="text" placeholder="URL da imagem 3">
        </div>
    </div>`;
  }
}

print_elements();

function verify_color(color) {
  {
    if (color[0] != "#") return false;

    if (color.length > 7) return false;

    for (let i = 1; i < color.length; i++)
      if (
        !(
          (color[i] >= "0" && color[i] <= 9) ||
          (color[i] >= "a" && color[i] <= "z") ||
          color[i] >= "A" ||
          color[i] <= "Z"
        )
      )
        return false;

    return true;
  }
}

//verificar url
function verify_url(val) {
  if (val.includes("http://") || val.includes("https://")) {
    return true;
  } else {
    return false;
  }
}

//Verificar os requisitos e mandar o obj pros levels
function finish_questions() {
  let input_1 = document.querySelectorAll(".input1");
  let input_2 = document.querySelectorAll(".input2");
  let input_3 = document.querySelectorAll(".input3");
  let input_4 = document.querySelectorAll(".input4");
  let input_5 = document.querySelectorAll(".input5");
  let input_6 = document.querySelectorAll(".input6");
  let input_7 = document.querySelectorAll(".input7");
  let input_8 = document.querySelectorAll(".input8");
  let input_9 = document.querySelectorAll(".input9");
  let input_10 = document.querySelectorAll(".input10");

  const nLevels = document.querySelector(".input-space .nLevels");

  for (let i = 0; i < input_1.length; i++) {
    if (
      input_1[i].value.length > 20 &&
      verify_color(input_2[i].value) &&
      input_3[i].value.length > 0 &&
      verify_url(input_4[i].value) &&
      input_5[i].value.length > 0 &&
      verify_url(input_6[i].value) &&
      input_7[i].value.length > 0 &&
      verify_url(input_8[i].value)&&
      input_9[i].value.length > 0 &&
      verify_url(input_10[i].value)
    ) {
      jump_level_screen();
      final_list.push({
        title: input_1[i].value,
        color: input_2[i].value,
        answers: [
          {
            text: input_3[i].value,
            image: input_4[i].value,
            isCorrectAnswer: true,
          },
          {
            text: input_5[i].value,
            image: input_6[i].value,
            isCorrectAnswer: false,
          },
          {
            text: input_7[i].value,
            image: input_8[i].value,
            isCorrectAnswer: false,
          },
          {
            text: input_9[i].value,
            image: input_10[i].value,
            isCorrectAnswer: false,
          },
        ],
      });

      const cont4 = document.querySelector("#container_4");
      cont4.classList.remove("invisible");
      const screenQuestions = document.querySelector(".container_3");
      screenQuestions.classList.add("invisible");
      //==> CHAMAR FUNÇÃO PRA CRIAR NÍVEIS
      print_niveis(nLevels.value);
    } else {
      alert("A validação falhou!");
      break;
    }
  }
}

//função que deixa a tela de perguntas invisivel
function jump_level_screen() {
  let question_screen = document.querySelector(".container_3");
  question_screen.classList.add("invisible");
}

function showCreateQuizzPage() {
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

    const cont3 = document.querySelector(".container_3");
    cont3.classList.remove("invisible");
    const screenQuizz = document.querySelector(".create-quizz");
    screenQuizz.classList.add("invisible");
    //==> CHAMAR FUNÇÃO PRA CRIAR PERGUNTAS
    print_elements(nQuestions.value);
    break;
  }
}

function storeLocal(id) {
  var idList = localStorage.getItem("idList");

  //verificar se key está vazia, se estiver adiciona items
  if (idList === null) {
    let arrStr = JSON.stringify([id]);
    localStorage.setItem("idList", arrStr);
  } else {
    //caso nao esteja pega items anteriores e adiciona o novo
    var objList = JSON.parse(idList); //recebendo e transformando em array
    objList.push(id);
    var objList = JSON.stringify(objList);
    localStorage.setItem("idList", objList);
  }
}

//mostrar perguntas na tela
function print_niveis(qt_niveis) {
  let tela = document.querySelector(".tela_niveis");

  tela.innerHTML = "";

  let count = 0;

  for (let i = 0; i < qt_niveis; i++) {
    count++;
    tela.innerHTML += `<div class="nivel_x_box" id="p_${count}">
        <p>Nível ${count}</p>
        <ion-icon onclick="toggle_nivel(this)" name="create-outline"></ion-icon>
    </div>
    <div class="nivel_x invisible" id="p_${count}">
        <div class="nivel">
            <p>Nível ${count}</p>
            <input class="nivel-input1" type="text" placeholder="Título do nível">
            <input class="nivel-input2" type="text" placeholder="% de acerto mínima">
            <input class="nivel-input3" type="text" placeholder="URL da imagem do nível">
						<textarea cols="30" rows="10" class="nivel-input4" placeholder="Descrição do nível"></textarea>
        </div>
    </div>`;
  }
}

let niveisCreated = [];
function finish_quizz() {
  let input_1 = document.querySelectorAll(".nivel-input1");
  let input_2 = document.querySelectorAll(".nivel-input2");
  let input_3 = document.querySelectorAll(".nivel-input3");
  let input_4 = document.querySelectorAll(".nivel-input4");

  let minValue = 100;
  // Verifica se tem pelo menos 1 com 0% de acerto mínimo
  for (let i = 0; i < input_2.length; i++) {
    if (input_2[i].value < minValue) minValue = input_2[i].value;
  }

  if (minValue > 0) {
    alert("A validação falhou!");
    return false;
  }

  for (let i = 0; i < input_1.length; i++) {
    if (
      input_1[i].value.length < 10 ||
      input_2[i].value.length < 0 ||
      input_2[i].value.length > 100 ||
      !verify_url(input_3[i].value) ||
      input_4[i].value.length < 30
    ) {
      alert("A validação falhou!");
      return false;
    }
  }

  niveisCreated = [];

  for (let i = 0; i < input_1.length; i++) {
    niveisCreated.push({
      title: input_1[i].value,
      image: input_2[i].value,
      text: input_2[i].value,
      minValue: input_2[i].value,
    });
  }

  const titleQuizz = document.querySelector(".input-space .title").value;
  const urlQuizz = document.querySelector(".input-space .url").value;

  const quizzData = {
    title: titleQuizz,
    image: urlQuizz,
    questions: final_list,
    levels: niveisCreated,
  };

  createQuizzApi(quizzData);
}

// Cadastra o quizz
function createQuizzApi(data) {
  axios
    .post(`${apiUrl}quizzes`, data)
    .then((response) => {
      const id = response.data.id;
      storeLocal(id);

      document.querySelector("#container_4").classList.add("invisible");
      document.querySelector("#container_5").classList.remove("invisible");
      document.querySelector("#access_quizz").addEventListener("click", () => {
        showQuizzPage(id);
      });
    })
    .catch((error) => {
      alert(JSON.stringify(error.response));
    });
}

function backToHome() {
  startQuizzes();
  document.querySelector("#container_5").classList.add("invisible");
  all_quizz.classList.remove("invisible");
  createQuizz.classList.add("invisible");
}
