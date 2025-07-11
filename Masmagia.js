// ========== FUNCIONALIDAD TEMA CLARO/OSCURO ========== //
const btnTema = document.getElementById("btnTema");
const body = document.body;
const destellos = document.createElement("div");
destellos.className = "destellos";
document.body.appendChild(destellos);

// Cambiar tema con efectos
btnTema.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    
    // Efectos visuales
    crearDestellos(15);
    mostrarTextoModo(isDark ? "NOX" : "LUMOS");
    updateThemeIcon(isDark);
});

// Crear destellos mágicos que desaparecen 
function crearDestellos(cantidad) {
    destellos.innerHTML = "";
    
    for (let i = 0; i < cantidad; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        
        // Posición y estilo aleatorio
        star.style.top = Math.random() * 100 + "vh";
        star.style.left = Math.random() * 100 + "vw";
        star.style.animationDelay = (Math.random() * 0.5) + "s";
        
        // Tamaño aleatorio entre 2px y 5px
        const size = Math.random() * 3 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        destellos.appendChild(star);
        
        // Desvanecer y eliminar 
        setTimeout(() => {
            star.style.opacity = '0';
            star.style.transform = 'scale(0)';
            setTimeout(() => star.remove(), 300);
        }, 1500 + Math.random() * 1000);
    }
    
    // Limpieza final por si acaso
    setTimeout(() => {
        destellos.querySelectorAll('.star').forEach(star => star.remove());
    }, 3000);
}

// Mostrar texto LUMOS/NOX
function mostrarTextoModo(texto) {
    const textoModo = document.createElement("div");
    textoModo.classList.add("modo-text", texto.toLowerCase());
    textoModo.textContent = texto;
    body.appendChild(textoModo);
    
    setTimeout(() => {
        textoModo.style.animation = "fadeOut 1s forwards";
        textoModo.addEventListener("animationend", () => textoModo.remove());
    }, 1000);
}

// Actualizar ícono del botón 
function updateThemeIcon(isDark) {
    const btn = document.getElementById("btnTema");
    if (!btn) return;

   
    const toggleKnob = btn.querySelector(".toggle-knob");
    if (toggleKnob) {
        toggleKnob.style.transform = isDark ? "translateX(26px)" : "translateX(2px)";
        toggleKnob.style.backgroundColor = isDark ? "#FFDB00" : "#D3A625";
        return;
    }

    
    const iconMoon = btn.querySelector(".fa-moon");
    const iconSun = btn.querySelector(".fa-sun");
    if (iconMoon && iconSun) {
        iconMoon.classList.toggle("d-none", isDark);
        iconSun.classList.toggle("d-none", !isDark);
    }
}

// Cargar tema al inicio
function cargarTemaInicial() {
    const savedTheme = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "enabled" || (!savedTheme && prefersDark)) {
        body.classList.add("dark-mode");
        document.documentElement.setAttribute("data-theme", "dark");
        updateThemeIcon(true);
    }
}

// ========== SOMBRERO SELECCIONADOR MEJORADO ========== //
document.addEventListener('DOMContentLoaded', function() {
    const sortingBtn = document.getElementById('sortingBtn');
    const hatMessage = document.getElementById('hatMessage');
    const sortingHat = document.getElementById('sortingHat');
    
    if (sortingBtn && hatMessage && sortingHat) {
        sortingBtn.addEventListener('click', function() {
            // Deshabilitar botón durante la animación
            sortingBtn.disabled = true;
            sortingBtn.textContent = "El sombrero está decidiendo...";
            
            // Animación del sombrero
            sortingHat.classList.add('hat-animation');
            hatMessage.textContent = "El sombrero está pensando...";
            
            
            const songVerses = [
                "Hmm... interesante...",
                "Veo coraje... pero también astucia...",
                "Difícil... muy difícil...",
                "¡Pero el sombrero nunca se equivoca!",
                "¡La decisión está hecha!"
            ];
            
            let currentVerse = 0;
            const songInterval = setInterval(() => {
                hatMessage.textContent = songVerses[currentVerse];
                currentVerse++;
                
                if (currentVerse >= songVerses.length) {
                    clearInterval(songInterval);
                    // Seleccionar casa después de la canción
                    setTimeout(() => {
                        selectHouse();
                        sortingHat.classList.remove('hat-animation');
                        sortingBtn.disabled = false;
                        sortingBtn.textContent = "¡Prueba otra vez!";
                    }, 2000);
                }
            }, 2000);
        });
    }
});

// Función para selección de casa
function selectHouse() {
    const houses = [
        {
            name: "Gryffindor",
            color: "#AE0001",
            description: "¡Valentía y coraje! El sombrero te asigna a GRYFFINDOR!",
            traits: ["Valentía", "Audacia", "Caballerosidad"],
            founder: "Godric Gryffindor",
            animal: "🦁 León"
        },
        {
            name: "Slytherin",
            color: "#2A623D",
            description: "¡Ambición y astucia! El sombrero te asigna a SLYTHERIN!",
            traits: ["Ambición", "Determinación", "Astucia"],
            founder: "Salazar Slytherin",
            animal: "🐍 Serpiente"
        },
        {
            name: "Ravenclaw",
            color: "#222F5B",
            description: "¡Sabiduría e inteligencia! El sombrero te asigna a RAVENCLAW!",
            traits: ["Inteligencia", "Creatividad", "Sabiduría"],
            founder: "Rowena Ravenclaw",
            animal: "🦅 Águila"
        },
        {
            name: "Hufflepuff",
            color: "#FFDB00",
            description: "¡Lealtad y trabajo duro! El sombrero te asigna a HUFFLEPUFF!",
            traits: ["Lealtad", "Paciencia", "Justicia"],
            founder: "Helga Hufflepuff",
            animal: "🦡 Tejón"
        }
    ];
    
    const selectedHouse = houses[Math.floor(Math.random() * houses.length)];
    const hatMessage = document.getElementById('hatMessage');
    
    // Mostrar resultado con estilo
    hatMessage.innerHTML = `
        <div class="house-result" style="border-left: 5px solid ${selectedHouse.color}">
            <h3 style="color: ${selectedHouse.color}">${selectedHouse.name}</h3>
            <p>${selectedHouse.description}</p>
            <div class="house-details">
                <p><strong>Fundador:</strong> ${selectedHouse.founder}</p>
                <p><strong>Animal:</strong> ${selectedHouse.animal}</p>
                <p><strong>Cualidades:</strong> ${selectedHouse.traits.join(", ")}</p>
            </div>
        </div>
    `;
    
    // Efecto de confeti
    createHouseConfetti(selectedHouse.color);
}

function createHouseConfetti(color) {
    const sortingHatContainer = document.querySelector('.sorting-hat-container');
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = color;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = (Math.random() * 2) + 's';
        confettiContainer.appendChild(confetti);
    }
    
    sortingHatContainer.appendChild(confettiContainer);
    

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// ========== INICIALIZACIÓN ========== //
document.addEventListener('DOMContentLoaded', function() {
    // Tema
    cargarTemaInicial();
    
    // Tooltips y Popovers de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    // Efecto de carga de noticias
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Manejo de la alerta de cookies
    handleCookieConsent();
});

// ========== ALERTA DE COOKIES ========== //
function handleCookieConsent() {
    const cookieAlert = document.getElementById('cookieAlert');
    const acceptCookies = document.getElementById('acceptCookies');
    const rejectCookies = document.getElementById('rejectCookies');
    
    if (!cookieAlert || !acceptCookies || !rejectCookies) return;

    // Verificar si ya hay una preferencia guardada
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        cookieAlert.style.display = 'block';
    }

    
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieAlert.style.display = 'none';
    });

 
    rejectCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieAlert.style.display = 'none';
    });
}