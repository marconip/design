//TOOLTIP BOOTSTRAP
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});


//RODAPE DATA ANO
const anoAtual = new Date().getFullYear();
document.querySelector(".dataano").innerHTML = anoAtual;


//MENU FUNDO REMOVE AO CARREGAR PÁGINA + CARREGAMENTO PÁGINA
window.onload = function () {
    if (window.scrollY <= 300) {
        document.querySelector("nav").classList.add("menu-fundo");
    }

    //troca ícone do tema ao carregar página
    if (pagina.dataset.theme == "dark") {
        tema.innerHTML = "<i class='bi bi-cloud-moon-fill'></i>";
    }
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
        tema.innerHTML = "<i class='bi bi-cloud-moon-fill'></i>";
    } else {
        tema.innerHTML = "<i class='bi bi-cloud-sun-fill'></i>";
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
            menuLink.forEach(n => n.classList.remove('active'))
            document.querySelector('.nav-link[href*=' + id + ']').classList.add('active');
        };
        //quando na primeira secção
        if (top <= 300) {
            menuLink.forEach(n => n.classList.remove('active'));
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
        document.querySelector(".navbar-collapse").classList.remove("show")
    }
    //atualizar posição de rolagem anterior
    prevScrollPos = currentScrollPos;
});


//MENU CLICADO ADICIONA CLASSE NO MENU 
var menuLink = document.querySelectorAll(".nav-link");
var urlAncora = window.location.hash.substring(1);

function linkAction() {
    menuLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active');
    //fecha menu mobile
    document.querySelector(".navbar-collapse").classList.remove("show")
    //remove url id
    setTimeout(() => {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }, 600);
}
menuLink.forEach(n => n.addEventListener('click', linkAction));


//IR PARA O TOPO, REMOVE DA URL O TITULO DO MENU
let botSubir = document.querySelector(".subir");
window.addEventListener("scroll", (event) => {
    //sumir e aparecer
    let scroll = this.scrollY;
    if (scroll >= 992) {
        botSubir.classList.add("aparecer")
        tema.classList.add("temas-esconde");
    } else {
        botSubir.classList.remove("aparecer")
        tema.classList.remove("temas-esconde");
    }
});
botSubir.onclick = function () {
    window.scrollTo(0, 0);
    menuLink.forEach(n => n.classList.remove('active'));
};


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

// Obtém a URL atual, remove .html e atualiza a barra de endereços
if (window.location.href.indexOf(".html") > -1) {
    const newUrl = window.location.href.replace(".html", "");
    window.history.replaceState({}, "", newUrl);
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