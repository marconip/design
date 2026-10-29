//TOOLTIP BOOTSTRAP
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});


//MENU ADICIONA CLASSE NO MENU CLICADO
var menuLink = document.querySelectorAll(".nav-link");
var urlAncora = window.location.hash.substring(1);
function linkAction() {
    menuLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')
    //fecha menu mobile
    document.querySelector(".navbar-collapse").classList.remove("show")
}
menuLink.forEach(n => n.addEventListener('click', linkAction))


//MENU SELECIONA CONFORME ATUAL URL AO CARREGAR PÁGINA
window.onload = function () {
    menuLink.forEach(function (linques) {
        linques.classList.remove("active");
        if (linques.dataset.ancora == urlAncora) {
            linques.classList.add("active")
        }
    });
};


//MENU MUDA ATIVO NA ROLAGEM (sem click menu)
let sections = document.querySelectorAll('section');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 85;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        let menulista = document.querySelectorAll('.nav-link[href*=' + id + ']');
        if (top >= offset && top < offset + height) {
            menuLink.forEach(n => n.classList.remove('active'));
            menulista.forEach(n => n.classList.add('active'));
        };
        //quando tiver uma área acima da primeira secção
        if (top <= 300) {
            menuLink.forEach(n => n.classList.remove('active'))
        }
    });
};


//MENU MOBILE FIXAR NO TOPO QUANDO SCROLL PARA CIMA
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', function () {
    //atual posição de rolagem
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        //scrolled up
        document.querySelector('nav').classList.remove("menu-updown");
    } else {
        //scrolled down
        document.querySelector('nav').classList.add("menu-updown");
        document.querySelector(".navbar-collapse").classList.remove("show")
    }
    //atualizar posição de rolagem anterior
    prevScrollPos = currentScrollPos;
});


//IR PARA O TOPO, REMOVE DA URL O TITULO DO MENU
let whats = document.querySelector(".whats-flutuante");
let botSubir = document.querySelector(".subir");

window.addEventListener("scroll", (event) => {
    //sumir e aparecer
    let scroll = this.scrollY;
    if (scroll >= 1000) {
        botSubir.classList.add("aparecer");
        whats.setAttribute("id", "whatsapp-floating-button");

    } else {
        botSubir.classList.remove("aparecer");
        whats.removeAttribute("id");
    }
});
botSubir.onclick = function () {
    window.scrollTo(0, 0);
    menuLink.forEach(n => n.classList.remove('active'));
    history.pushState("", document.title, window.location.pathname + window.location.search);
};


//DETECTAR ALTURA DO SCROLL E INSERE A AÇÃO (menu nav cor)
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    let cartaoLogo = document.querySelector(".cartao-logo");
    let logoNav = document.querySelector(".logo-navegacao");
    let fundoNav = document.querySelector("nav");

    if (scroll >= 300) {
        logoNav.classList.add("aparece-logonav");
        fundoNav.classList.add("rolagem");
    } else {
        logoNav.classList.remove("aparece-logonav");
        fundoNav.classList.remove("rolagem");
    }
    //console.log(scroll) 
});


//HORARIO DE FUNCIONARIO
function atualizarStatus() {
    const agora = new Date();
    const dia = agora.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hora = agora.getHours() + agora.getMinutes() / 60;

    const tags = document.querySelectorAll('.open-close');

    // Se não encontrar nenhum elemento, interrompe a função
    if (tags.length === 0) return;

    let aberto = false;
    let mensagem = "";

    // Segunda a Sexta: 8h às 18h
    if (dia >= 1 && dia <= 5) {
        if (hora >= 8 && hora < 18) {
            aberto = true;
            mensagem = `<b style="color: green;">Estou disponível</b> até às 18h`;
        } else {
            mensagem = `<b style="color: red;">Hora do descanso</b> volto amanhã às 08h`;
        }
    }
    // Sábado: 8h às 13h
    else if (dia === 6) {
        if (hora >= 8 && hora < 13) {
            aberto = true;
            mensagem = `<b style="color: green;">Estou disponível</b> - até às 13h`;
        } else {
            mensagem = `<b style="color: red;">Hora do descanso</b> volto na segunda às 8h`;
        }
    }
    // Domingo
    else if (dia === 0) {
        mensagem = `<b style="color: red;">Dia de descanso</b> volto na segunda às 8h`;
    }

    // Aplica o conteúdo em cada uma das tags encontradas
    tags.forEach(tag => {
        tag.innerHTML = mensagem;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    atualizarStatus();
    setInterval(atualizarStatus, 300000); // Atualiza a cada 5 minutos
});


//COPIAR TEXTO
document.querySelectorAll('.copiar-enviar > span').forEach(span => {
    span.style.cursor = 'pointer'; // Transforma o cursor em mãozinha ao passar o mouse

    span.addEventListener('click', function () {
        // Encontra a tag <small> de dentro do span clicado
        const smallTag = this.querySelector('small');

        if (smallTag) {
            // Pega o texto e remove espaços em branco extras das pontas (.trim())
            const textoParaCopiar = smallTag.innerText.trim();

            // Copia o texto para a área de transferência
            navigator.clipboard.writeText(textoParaCopiar).then(() => {
                // Feedback visual opcional: altera o tooltip do Bootstrap se quiser
                console.log('Copiado com sucesso: ' + textoParaCopiar);
                alert('Copiado: ' + textoParaCopiar); // Você pode remover este alert se preferir
            }).catch(err => {
                console.error('Erro ao copiar: ', err);
            });
        }
    });
});


//AVISO COOKIES 
const cookieBanner = document.getElementById('cookieBanner');
const cookieBtn = document.getElementById('cookieBtn');
if (!localStorage.getItem('cookieAceito')) {
    // Se NÃO existir no "cache", remove a classe 'hidden' para mostrar o banner
    cookieBanner.classList.remove('hidden');
}
// Função ao clicar no botão
cookieBtn.addEventListener('click', () => {
    localStorage.setItem('cookieAceito', 'true');
    cookieBanner.classList.add('hidden');
});


//SERVIÇOS ABAS
document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".websites, .wordpress, .agencias");
    const conteudos = document.querySelectorAll(".servicos-conteudos > div");
    let indice = 0, timer = null, manual = false;

    function alternar(idx) {
        conteudos.forEach((c, i) => {
            c.classList.toggle("ativado", i === idx);
            c.style.display = i === idx ? "flex" : "none";
            botoes[i].classList.toggle("botao-ativo", i === idx);
        });
        indice = idx;
    }
    // Altera a função play para rodar o setInterval apenas se a tela for maior que 1200px
    const play = () => {
        if (!timer && !manual && window.innerWidth > 1200) {
            timer = setInterval(() => alternar((indice + 1) % botoes.length), 3000);
        }
    };

    const stop = () => { clearInterval(timer); timer = null; };
    botoes.forEach((b, i) => {
        b.addEventListener("click", () => { manual = true; stop(); alternar(i); });
    });
    [...botoes, ...conteudos].forEach(el => {
        el.addEventListener("mouseenter", stop);
        el.addEventListener("mouseleave", () => { manual = false; play(); });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 1200) {
            stop();
        } else {
            play();
        }
    });
    alternar(0); play();
});


//PORTFOLIO FILTROS
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-menu li');
    const filterItems = document.querySelectorAll('.filter-item li');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Atualiza a classe do botão ativo
            document.querySelector('.filter-menu .current').classList.remove('current');
            button.classList.add('current');

            const target = button.getAttribute('data-target');

            filterItems.forEach(item => {
                const itemCategory = item.getAttribute('data-item');

                if (target === 'all' || target === itemCategory) {
                    // 1. Mostra o elemento no display
                    item.style.display = 'block';
                    // 2. Pequeno delay para o navegador processar o display antes de aplicar o zoom in
                    setTimeout(() => {
                        item.classList.remove('zoom-out');
                    }, 500);
                } else {
                    // 1. Aplica o efeito de zoom out
                    item.classList.add('zoom-out');

                    // 2. Esconde do display apenas após o término da animação (300ms)
                    setTimeout(() => {
                        if (item.classList.contains('zoom-out')) {
                            item.style.display = 'none';
                        }
                    }, 500); // Deve ser o mesmo tempo do CSS transition
                }
            });
        });
    });
});


//AMPLIAR IMAGEM
const qualquerImg = document.querySelectorAll(".portfolio img");
const imgs = Array.from(qualquerImg);

qualquerImg.forEach(f => f.addEventListener('click', function () {
    document.querySelector('body').classList.add('parar-rolagem');
    let valor = imgs.indexOf(this);
    const div = document.createElement('div');
    div.className = 'modal-imgzoom';
    div.style.display = "flex";
    div.innerHTML = `<div class="box-imagem">
    <img src="${this.src}" class="img-ampliada anime-zoom"></div>
    <h5 class="img-caption">${this.alt}</h5>
    <i class="bi bi-x-square-fill close"></i>
    <i class="bi bi-arrow-left-square-fill esquerda"></i>
    <i class="bi bi-arrow-right-square-fill direita"></i>`;
    document.body.appendChild(div);

    // Selecionado o .box-imagem junto com os outros elementos
    const [boxImagem, img, cap, close, esq, dir] = ['.box-imagem', '.img-ampliada', '.img-caption', '.close', '.esquerda', '.direita'].map(s => div.querySelector(s));
    const toggleSeta = () => { esq.style.visibility = valor === 0 ? "hidden" : "visible"; dir.style.visibility = valor === imgs.length - 1 ? "hidden" : "visible"; };

    toggleSeta();
    setTimeout(() => img.classList.remove("anime-zoom"), 600);

    document.querySelector('.fixed-top').style.top = "-113px";

    const fechar = () => {
        div.remove();
        document.querySelector('body').classList.remove('parar-rolagem');
        document.querySelector('.fixed-top').removeAttribute('style');
    };

    close.onclick = fechar;
    document.onkeydown = (e) => e.key === 'Escape' && fechar();

    const mudarImg = (dir, classe) => {
        valor += dir;
        img.className = `img-ampliada ${classe}`;
        img.src = imgs[valor].src;
        cap.innerHTML = imgs[valor].alt;

        boxImagem.scrollTop = 0;
        boxImagem.scrollLeft = 0;

        toggleSeta();
        setTimeout(() => img.classList.remove(classe), 600);
    };

    dir.onclick = () => valor < imgs.length - 1 && mudarImg(1, "anime-entrarDireita");
    esq.onclick = () => valor > 0 && mudarImg(-1, "anime-entrarEsquerda");
}));