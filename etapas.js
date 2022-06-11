let etapas = [

    {
        // ETAPA DE VOTAÇÃO PARA PRESIDENTE
        titulo: 'PRESIDENTE',
        // CADA CANDIDATO POSSUI UM NÚMERO DE 5 DÍGITOS
        numeros: 5,
        // ARRAY DE OBJETOS CANDIDATOS:
        candidatos: [
            // OBJETO QUE REPRESENTA UM CANDIDATO:
            {
                // CADA CANDIDATO À PRESIDENCIA IRÁ CONTER AS SEGUINTES INFORMAÇÕES:
                nome: 'Cleobaldo da Costa',
                numero: '12345',
                vice: 'Jonas Pedro',
                partido: 'ABC',
                fotos: [ 
                    {url:'./imagens/presidente1.jfif', legenda: 'Presidente'}, 
                    {url: './imagens/vice_presidente1.jfif', legenda: 'Vice-Presidente',small: true}
                ]
            }
        ]




    },

    {
        titulo: 'PREFEITO',
        numeros: 2,
        candidatos: [
            {
                nome: 'Maria Beatriz',
                numero: '12',
                partido: 'DEF',
                fotos: [ 
                    {url:'./imagens/prefeita1.jpg', legenda: 'Prefeito(a)'}, 
                ]
            }
        ]




    }



]
