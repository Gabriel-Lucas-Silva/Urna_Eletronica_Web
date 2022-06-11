// DECLARAÇÃO E INICIALIZAÇÃO DE VARIÁVEIS
let svp = document.querySelector ('.d1svp span')
let cargo = document.querySelector ('.d1cargo span')
let descricao = document.querySelector ('.d1info')
let instrucao = document.querySelector ('.d2')
let lateral = document.querySelector ('.d1d')
let numeros = document.querySelector ('.d1numero')

let etapaAtual = 0
let numero = ''
let vbranco = false
let tvotos = []


function comecar() {
    // SETA A CONFIGURAÇÃO PARA A ETAPA ATUAL, LIMPANDO AS VARIÁVEIS DE NÚMERO E DE VOTO EM BRANCO
    let configuracao = etapas[etapaAtual]
    numero = ''
    vbranco = false
    let numeroHtml = ''
    // SETA OS CAMPOS DE NÚMERO DE ACORDO COM A QUANTIDADE DE NÚMEROS QUE CONSTA NA CONFIGURAÇÃO
    for (let i=0; i<configuracao.numeros; i++) {
        if (i===0) {
            // O PRIMEIRO CAMPO DE NÚMERO POSSUI O ATRIBUTO (CLASSE CSS) "PISCA"
            numeroHtml = '<div class="numero pisca"></div>'
        }
        else {
            numeroHtml += '<div class="numero"></div>'
        }
    }
    
    // RETIRA O "SEU VOTO PARA" DA TELA
    svp.style.display = 'none';
    // EXIBE O TÍTULO DO CARGO PARA O QUAL O VOTO É SOLICITADO
    cargo.innerHTML = configuracao.titulo;
    // DEIXA A DESCRIÇÃO EM BRANCO
    descricao.innerHTML = ''
    // REMOVE AS INSTRUÇÕES DE VOTAÇÃO DA TELA
    instrucao.style.display = 'none'
    // DEIXA A LATERAL EM BRANCO
    lateral.innerHTML = ''
    // EXIBE OS CAMPOS DE NÚMERO NA TELA
    numeros.innerHTML = numeroHtml
}

function atualiza() {
    // SETA A CONFIGURAÇÃO PARA A ETAPA ATUAL
    let configuracao = etapas[etapaAtual]
    // SELECIONA, SE HOUVER, O CANDIDATO CUJO NÚMERO FOI DIGITADO PELO USUÁRIO
    let candidato = configuracao.candidatos.filter(
        (item)=>{
            if(item.numero === numero) {
                return true
            }
            else {
                return false
            }

        }
    )
    console.log("O candidato é", candidato)
    
    // SE FOI ENCONTRADO ALGUM CANDIDATO PARA O(S) NÚMERO(S) DIGITADO(S), A VARIÁVEL CANDIDATO RECEBE ESSE OBJETO (O 1º) E SÃO EXIBIDAS NA TELA SUAS INFORMAÇÕES, NA DESCRIÇÃO, E "SEU VOTO PARA"
    if (candidato.length>0) {
        candidato = candidato[0]
        svp.style.display = 'block'
        descricao.innerHTML = `
        Nome: ${candidato.nome}<br>
        Partido: ${candidato.partido}<br>`
        
        // SE O CANDIDATO POSSUIR A PROPRIEDADE "vice", OU SEJA, SE TIVER UM VICE, O NOME DESTE SERÁ EXIBIDO NA DESCRIÇÃO DA TELA
        if (candidato.vice !== undefined) {
            descricao.innerHTML += `Vice: ${candidato.vice}`
        }
        
        // EXIBE AS INTRUÇÕES DE VOTAÇÃO NA TELA
        instrucao.style.display = 'block'
        
        // INICIALIZA A VARIÁVEL DE FOTOS COMO VAZIA
        let fotosHtml = ''
        
        // CADA FOTO PERTENCENTE ÀS INFORMAÇÕES DO CANDIDATO A QUEM O VOTO SERÁ COMPUTADO SERÁ ADICIONADA DENTRO DE UMA TAG HTML E, POSTERIORMENTE, SERÁ COLOCADA NA VARIÁVEL DE FOTOS
        for (let i in candidato.fotos){
            
            // VERIFICA SE A FOTO DEVE FICAR MENOR QUE O TAMANHO PADRÃO, SE FOR O CASO, O ATRIBUTO (CLASSE CSS) "small" É ADICIONADO À TAG HTML
            if(candidato.fotos[i].small){
                // VARIÁVEL DE FOTOS RECEBE A TAG HTML COM A FOTO
                fotosHtml += `<div class="img small"><img src="${candidato.fotos[i].url}" height="125vw">${candidato.fotos[i].legenda}</div>`
            }
            
            else{
                fotosHtml += `<div class="img"><img src="${candidato.fotos[i].url}" height="155vw">${candidato.fotos[i].legenda}</div>`
            }
        }
        
        // EXIBE AS FOTOS DOS CANDIDATOS NA PARTE LATERAL DA TELA
        lateral.innerHTML = fotosHtml
    }
    
    // SE O VOTO DIGITADO NÃO CORRESPONDE A UM CANDIDATO, SÃO EXIBIDOS NA TELA "SEU VOTO PARA", AS INSTRUÇÕES DE VOTAÇÃO E A MENSAGEM INDICANDO QUE O VOTO SERÁ ANULADO
    else {
        svp.style.display = 'block'
        instrucao.style.display = 'block'
        descricao.innerHTML = '<div class="vnulobranco pisca">VOTO NULO</div>'
    }
}


function clicou(n) {
    // DECLARA E INICIALIZA A SEGUINTE VARIÁVEL COM O ELEMENTO DOS CAMPOS DE NÚMERO QUE ESTÁ COM O ATRIBUTO (CLASSE CSS) "pisca"
    let elnumero = document.querySelector('.numero.pisca')
    
    // SE O CAMPO ESTIVER PREENCHIDO, O SEGUINTE SERÁ FEITO:
    if (elnumero !== null) {
        // INSERE NA TELA O NÚMERO CLICADO, ONDE O CAMPO ESTAVA PISCANDO, E O ADICIONA NA VARIÁVEL DE NÚMEROS
        elnumero.innerHTML = n
        numero = `${numero}${n}`
        
        // REMOVE O ATRIBUTO (CLASSE CSS) "PISCA" DO CAMPO DE NÚMERO
        elnumero.classList.remove ('pisca')
        
        // SE HOUVER UM PRÓXIMO CAMPO DE NÚMERO A SER PREENCHIDO, ELE RECEBERÁ O ATRIBUTO "PISCA"
        if (elnumero.nextElementSibling !== null ){
            elnumero.nextElementSibling.classList.add ('pisca')
        }
        // SE NÃO HOUVER, A FUNÇÃO "ATUALIZA" É CHAMADA
        else{
            atualiza()
        }
        
    
    }
}

function branco() {
    if(numero === '') {
        //SE O USUÁRIO AINDA NÃO TIVER DIGITADO ALGUM NÚMERO, A VARIÁVEL QUE ARMAZENA O BOOLEAN "VOTO EM BRANCO" É SETADA COMO VERDADEIRA, AS INSTRUÇÕES E O TIPO DE VOTO SÃO EXIBIDOS NA TELA, AGUARDANDO UMA TOMADA DE DECISÃO POR PARTE DO USUÁRIO
        vbranco = true,
        svp.style.display = 'block'
        instrucao.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="vnulobranco pisca">VOTO EM BRANCO</div>'
    }
    else {
        //SE O USUÁRIO TIVER DIGITADO ALGUM NÚMERO E, EM SEGUIDA, PRESSIONADO A TECLA "BRANCO", É EXIBIDA A MENSAGEM QUE PEDE QUE ELE PRESSIONE "CORRIGIR" ANTES DE VOTAR EM BRANCO
        alert('Para votar em BRANCO, pressione CORRIGE e, em seguida, BRANCO.')
    }
}

function corrige() {
    //SE O USUÁRIO APERTAR O BOTÃO "CORRIGE", A FUNÇÃO "COMECAR" É CHAMADA, OU SEJA, A ETAPA ATUAL É REINICIADA, RESETANDO A TELA
    comecar()
}

function confirma() {
    let vConfirmado = false
    let configuracao = etapas[etapaAtual]
    
    if (vbranco === true) {
        //SE A VARIÁVEL QUE ARMAZENA O BOOLEAN "VOTO EM BRANCO" ESTIVER COM O VALOR VERDADEIRO, O VOTO É CONFIRMADO E É ADICIONADO AO ARRAY DE VOTOS
        vConfirmado = true
        tvotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        })
        console.log('Confirmando como BRANCO')
    }
    else if (numero.length === configuracao.numeros) {
        //SE A QUANTIDADE DE NÚMEROS DIGITADOS FOR IGUAL À QUANTIDADE SOLICITADA PELA ETAPA, O VOTO É CONFIRMADO E É ADICIONADO AO ARRAY DE VOTOS
        vConfirmado = true
        tvotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
        console.log('Confirmando como '+numero)
    }
    
    if (vConfirmado) {
        //SE O VOTO DA ETAPA FOR CONFIRMADO, IRÁ AVANÇAR A ETAPA
        etapaAtual ++;
        if (etapas[etapaAtual] !== undefined) {
            //SE HOUVER UMA ETAPA SEGUINTE, CHAMA A FUNÇÃO "COMECAR" PARA RESETAR A TELA DA URNA E PROSSEGUIR COM A VOTAÇÃO
            comecar()
        }
        else{
            //SE NÃO HOUVER UMA PRÓXIMA ETAPA, LIMPA O CONTEÚDO DA TELA E EXIBE A MENSAGEM FINAL, ENCERRANDO A VOTAÇÃO
            console.log('FIM');
            let ftela = document.querySelector ('.tela');
            ftela.innerHTML = '';
            ftela.innerHTML = '<div class="fim">FIM</div><div class="votou pisca">VOTOU</div>';
            console.log(tvotos)
        }
    }
}

//CHAMA A FUNÇÃO "COMECAR" PARA INICIAR A VOTAÇÃO
comecar()
