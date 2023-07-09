

const personagens = document.querySelectorAll('.personagem');

personagens.forEach(personagem => {
    personagem.addEventListener('mouseenter', () => {
       if(window.innerWidth < 450){
            window.scrollTo({top: 0, behavior: 'smooth'});
       }
       
        removerSelecaoDoPersonagem(personagem);
        personagem.classList.add('selecionado');

        alterarImagemPersonagemSelecionado(personagem); 
        alterarNomePersonagemSelecionado(personagem);
        alterarDescricaoPersonagemSelecionado(personagem);
    })
})

function alterarDescricaoPersonagemSelecionado(personagem) {
    const descricaoPersonagem = document.getElementById('descricao_personagem');
    descricaoPersonagem.innerText = personagem.getAttribute('data-description');
}

function alterarNomePersonagemSelecionado(personagem) {
    const nomePersonagem = document.getElementById('nome_personagem');
    nomePersonagem.innerText = personagem.getAttribute('data-name');
}

function alterarImagemPersonagemSelecionado(personagem) {
    const idPersonagem = personagem.attributes.id.value;
    const imagemPersonagemGrande = document.querySelector('.personagem_grande');
    imagemPersonagemGrande.src = ` ./src/imagens/card-${idPersonagem}.png `;
}

function removerSelecaoDoPersonagem(personagem) {
    const personagemSelecionado = document.querySelector('.selecionado');
    personagemSelecionado.classList.remove('selecionado');
    
}
