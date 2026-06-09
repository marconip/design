//TOOLTIP BOOTSTRAP
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});


//RODAPE DATA ANO
const anoAtual = new Date().getFullYear();
document.querySelector(".dataano").innerHTML = anoAtual;


//NAV TABS PASSAR AUTOMÁTICO
document.addEventListener("DOMContentLoaded", () => {
    const tabs = [...document.querySelectorAll('.nav-tabs .nav-link')];
    const content = document.querySelector('.tab-content');
    let timer, getIdx = () => tabs.findIndex(t => t.classList.contains('active'));

    const start = () => timer = timer || setInterval(() => {
        let next = (getIdx() + 1) % tabs.length;
        new bootstrap.Tab(tabs[next]).show();
    }, 3000);

    const stop = () => { clearInterval(timer); timer = null; };

    start();
    if (content) {
        content.addEventListener('mouseenter', stop);
        content.addEventListener('mouseleave', start);
    }
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

    const [img, cap, close, esq, dir] = ['.img-ampliada', '.img-caption', '.close', '.esquerda', '.direita'].map(s => div.querySelector(s));
    const toggleSeta = () => { esq.style.visibility = valor === 0 ? "hidden" : "visible"; dir.style.visibility = valor === imgs.length - 1 ? "hidden" : "visible"; };

    toggleSeta();
    setTimeout(() => img.classList.remove("anime-zoom"), 600);

    const fechar = () => {
        div.remove();
        document.querySelector('body').classList.remove('parar-rolagem');
        document.querySelector('.fixed-top').removeAttribute('style');
    };

    close.onclick = fechar;
    document.onkeydown = (e) => e.key === 'Escape' && fechar();

    document.querySelector('.menu-updown-show').style.top = "-113px";

    const mudarImg = (dir, classe) => {
        valor += dir;
        img.className = `img-ampliada ${classe}`;
        img.src = imgs[valor].src;
        cap.innerHTML = imgs[valor].alt;
        toggleSeta();
        setTimeout(() => img.classList.remove(classe), 600);
    };

    dir.onclick = () => valor < imgs.length - 1 && mudarImg(1, "anime-entrarDireita");
    esq.onclick = () => valor > 0 && mudarImg(-1, "anime-entrarEsquerda");
}));



//MENU FUNDO REMOVE AO CARREGAR PÁGINA + CARREGAMENTO PÁGINA
window.onload = function () {
    if (window.scrollY <= 300) {
        document.querySelector("nav").classList.add("menu-fundo");
    }
    //troca ícone do tema ao carregar página
    if (pagina.dataset.theme == "default") {
        tema.innerHTML = "<i class='bi bi-brightness-low-fill'></i>";
    } else {
        tema.innerHTML = "<i class='bi bi-brightness-low'></i>"
    }

    //idioma Carrega a preferência ao iniciar
    const savedLang = localStorage.getItem('user_lang') || 'pt';
    switchLang(savedLang);
};

//TEMA DARK E DEFAULT
let tema = document.querySelector('.temas')
let pagina = document.querySelector("body")

//Recuperar o tema ao carregar a página
const savedTheme = localStorage.getItem('theme') || 'default';
pagina.dataset.theme = savedTheme;

//Alternar e Salvar o tema no clique
tema.addEventListener('click', () => {
    let currentTheme = pagina.dataset.theme;
    let newTheme = currentTheme === 'default' ? 'dark' : 'default';

    //Aplica o novo tema no DOM (dataset)
    pagina.dataset.theme = newTheme;

    //Salva o novo tema no localStorage
    localStorage.setItem('theme', newTheme);

    //Troca icone de tema
    if (newTheme == "dark") {
        tema.innerHTML = "<i class='bi bi-brightness-low'></i>";
    } else {
        tema.innerHTML = "<i class='bi bi-brightness-low-fill'></i>";
    }
});


//MENU NA ROLAGEM MUDA ATIVO (sem click menu)
let sections = document.querySelectorAll('section');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 200;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            menuLink.forEach(n => n.classList.remove('actives'))
            document.querySelector('.nav-link[href*=' + id + ']').classList.add('actives');
        };
        //quando na primeira secção
        if (top <= 300) {
            menuLink.forEach(n => n.classList.remove('actives'));
            document.querySelector("nav").classList.add("menu-fundo");
        } else {
            document.querySelector("nav").classList.remove("menu-fundo");
        }
    });
};


//MENU (EXIBE/ESCONDE) FIXAR NO TOPO QUANDO SCROLL PARA CIMA
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', function () {
    //atual posição de rolagem
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        //scrolled subindo
        document.querySelector('nav').classList.remove("menu-updown");
        document.querySelector('nav').classList.add("menu-updown-show");

        //esconde menu quando mouse sai do hover
        const navegacao = document.querySelector("nav");
        navegacao.addEventListener("mouseenter", function (event) {
            document.querySelector("nav").classList.add("menu-updown-show");
            document.querySelector("nav").classList.remove("menu-updown");
        })
        navegacao.addEventListener("mouseleave", function (event) {
            if (window.scrollY > 300) {
                document.querySelector("nav").classList.remove("menu-updown-show");
                document.querySelector("nav").classList.add("menu-updown");
            }
        })

    } else {
        //scrolled baixando
        document.querySelector('nav').classList.remove("menu-updown-show");
        document.querySelector('nav').classList.add("menu-updown");
        document.querySelector(".navbar-collapse").classList.remove("show");
    }
    //atualizar posição de rolagem anterior
    prevScrollPos = currentScrollPos;
});


//MENU CLICADO ADICIONA CLASSE NO MENU 
var menuLink = document.querySelectorAll(".nav-link");

function linkAction() {
    menuLink.forEach(n => n.classList.remove('actives'))
    this.classList.add('actives');
    //fecha menu mobile
    document.querySelector(".navbar-collapse").classList.remove("show")
    //remove url id
    setTimeout(() => {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }, 600);
}
menuLink.forEach(n => n.addEventListener('click', linkAction));

//PEGA URL ATUAL E REMOVE .html E ATUALIZA A BARRA DE ENDEREÇO
if (window.location.href.indexOf(".html") > -1) {
    const newUrl = window.location.href.replace(".html", "");
    window.history.replaceState({}, "", newUrl);
}
//REMOVE ID HOME AO CLICK NA LOGO
document.querySelector(".logo").onclick = function () {
    setTimeout(() => {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }, 600);
}


//VALIDAÇÃO DE FORMULÁRIO
let formNome = document.querySelector('input.nome')
let formTel = document.querySelector('input.tel')
let textArea = document.querySelector('textarea')

formNome.addEventListener('focusout', () => {
    if (formNome.value !== "") {
        formNome.classList.add("form-dark");
    }
});
formTel.addEventListener('focusout', () => {
    if (formTel.value !== "") {
        formTel.classList.add("form-dark");
    }
});
textArea.addEventListener('focusout', () => {
    if (textArea.value !== "") {
        textArea.classList.add("form-dark");
    }
});


//MASCARA TELEFONE COM JQUERY.MASK
$('.cpf').mask('000.000.000-00');
$('.cep').mask('00000-000');
$('.tel').mask('(00) 00000-0000');
$('.cel').mask('00 0 0000 0000');

function mascara(t, mask) {
    var i = t.value.length;
    var saida = mask.substring(1, 0);
    var texto = mask.substring(i)
    if (texto.substring(0, 1) != saida) {
        t.value += texto.substring(0, 1);
    }
};


/////OWL CAROUSEL
$('.owl-carousel').owlCarousel({
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    loop: true,
    nav: true,
    dots: false,
    margin: 0,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 3,
        },
        1200: {
            items: 4,
        }
    }
});

//TRADUÇÃO IDIOMA
function switchLang(lang) {
    // Altera o atributo data-lang na tag <body>
    document.body.setAttribute('data-lang', lang);

    // Salva a preferência
    localStorage.setItem('user_lang', lang);
}




///////////MOSTRA LARGURA TELA QUANDO MUDA DE TAMANHO
/* function logWindowWidth() {
  const windowWidth = window.innerWidth;
  console.log('Largura Tela atual: ' + windowWidth + 'px');
}
logWindowWidth();
window.addEventListener('resize', logWindowWidth); 

////////CAMINHO URL COM E SEM ID
console.log("Current Path:", window.location.pathname);
console.log("Current Hash/ID Link:", window.location.hash);
*/