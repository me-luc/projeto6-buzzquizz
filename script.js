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
//o numero dentro da lista obtido na ultima tela
const lista_qt_perguntas = [1];//quantidade de pergutas definidas pelo jogador
const final_list = [];//lista question da api

function creat_quizz(){
    const main_div = document.getElementById('container_1')
    main_div.classList.add('invisible')

}
// abir formulario de perguntas
function toggle_pergunta(element){

    const father = element.parentElement
    father.classList.toggle("invisible")
    console.log(father)

    const pergunta = document.querySelectorAll('.pergunta_x')

    for(let i = 0; i < pergunta.length; i++){
        if(father.id == pergunta[i].id){
            pergunta[i].classList.toggle('invisible')
            console.log(pergunta[i])
        }
    }

}

//mostrar perguntas na tela
function print_elements(){

    let tela = document.querySelector('.tela_perguntas')

    console.log(tela)

    tela.innerHTML = ""

    console.log(lista_qt_perguntas[0])

    

    let count = 0

    for(let i = 0; i < lista_qt_perguntas[0];i++){
        count ++
        tela.innerHTML += 
        
    `<div class="pergunta_x_box" id="p_${count}">
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
    </div>`
        
    }
    
}

print_elements()

function verify_color(color){
    {
        if (color[0] != '#')
            return false;
     
        if (color.length > 7)
            return false;
     
        for (let i = 1; i < color.length; i++)
            if (!((color[i] >= '0' && color[i] <= 9)
                  || (color[i] >= 'a' && color[i] <= 'z')
                  || (color[i] >= 'A' || color[i] <= 'Z')))
                return false;
     
        return true;
    }

}

function verify_url(val){

    if (val.includes('http://') || val.includes('https://')){
        return true
    }
    else{
        return false
    }
    
}


//Verificar os requisitos e mandar o obj pros levels
function finish_questions(){

    let input_1 = document.querySelectorAll('.input1')
    let input_2 = document.querySelectorAll('.input2')
    let input_3 = document.querySelectorAll('.input3')
    let input_4 = document.querySelectorAll('.input4')
    let input_5 = document.querySelectorAll('.input5')
    let input_6 = document.querySelectorAll('.input6')
    let input_7 = document.querySelectorAll('.input7')
    let input_8 = document.querySelectorAll('.input8')
    let input_9 = document.querySelectorAll('.input9')
    let input_10 = document.querySelectorAll('.input10')
    

    console.log(input_1)

    for(let i = 0; i < input_1.length;i++){
       if(input_1[i].value.length > 20
        && verify_color(input_2[i].value)
        && input_3[i].value.length > 0 
        && verify_url(input_4[i].value)
        && input_5[i].value.length > 0 
        && verify_url(input_6[i].value)
        && input_7[i].value.length > 0 
        && verify_url(input_8[i].value)
        && input_9[i].value.length > 0 
        && verify_url(input_10[i].value)
       ){
        jump_level_screen()
        final_list.push({
        title: input_1[i].value,
        color: input_2[i].value,
        answers: [
            {
                text: input_3[i].value ,
                image: input_4[i].value,
                isCorrectAnswer: true
            },
            {
                text: input_5[i].value,
                image: input_6[i].value,
                isCorrectAnswer: false
            },
            {
                text: input_7[i].value,
                image: input_8[i].value,
                isCorrectAnswer: false
            },
            {
                text: input_9[i].value,
                image: input_10[i].value,
                isCorrectAnswer: false
            }
        ]
        })
        }else{
            
            alert('A validação falhou!')
            
    

    }

}

}

//função que deixa a tela de perguntas invisivel
function jump_level_screen(){
    let question_screen = document.querySelector(".container_3");
    question_screen.classList.add('invisible')
    console.log(final_list)

}


