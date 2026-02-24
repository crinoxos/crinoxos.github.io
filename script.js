// ===== VARIABLES GLOBALES =====
let currentSlide = 0;
let autoSlideInterval;

// ===== DATOS PARA EL CARRUSEL =====
const razones = [
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Resultados desde la primera clase',
    desc: 'No esperes semanas. Notarás el progreso desde el primer día.'
  },
  {
    icon: 'fa-solid fa-brain',
    title: 'Diagnóstico constante',
    desc: 'Identifico tus fortalezas y debilidades para enfocarnos en lo que realmente importa.'
  },
  {
    icon: 'fa-solid fa-heart',
    title: 'Trato personalizado y cercano',
    desc: 'Pregunta una y otra vez. Me encanta explicar hasta que lo entiendas.'
  },
  {
    icon: 'fa-solid fa-calendar-check',
    title: 'Horario flexible',
    desc: 'Tardes entre semana y mañanas/tardes de fin de semana.'
  },
  {
    icon: 'fa-solid fa-puzzle-piece',
    title: 'Método práctico',
    desc: 'Enfocado en resolución de problemas y razonamiento lógico.'
  },
  {
    icon: 'fa-solid fa-trophy',
    title: '15+ años de experiencia',
    desc: 'Alto rendimiento demostrado con cientos de alumnos.'
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'Preparación intensiva',
    desc: 'Especialista en exámenes y comprensión lógica.'
  },
  {
    icon: 'fa-solid fa-magic',
    title: 'Polivalente',
    desc: 'Descifro cualquier asignatura, incluso si no la conozco bien.'
  }
];

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
  cargarCarrusel();
  iniciarAutoSlide();
  configurarObservadorHover();
});

// ===== FUNCIONES DEL CARRUSEL =====
function cargarCarrusel() {
  const track = document.getElementById('carruselTrack');
  const dotsContainer = document.getElementById('carruselDots');
  
  // Limpiar contenedores
  track.innerHTML = '';
  dotsContainer.innerHTML = '';
  
  // Crear tarjetas
  razones.forEach((razon, index) => {
    const card = document.createElement('div');
    card.className = 'carrusel-card';
    card.innerHTML = `
      <i class="${razon.icon}"></i>
      <h3>${razon.title}</h3>
      <p>${razon.desc}</p>
    `;
    track.appendChild(card);
    
    // Crear dots
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.onclick = () => irASlide(index);
    dotsContainer.appendChild(dot);
  });
  
  actualizarDots();
}

function moverCarrusel(direccion) {
  const track = document.getElementById('carruselTrack');
  const cardWidth = track.children[0]?.offsetWidth || 300;
  const scrollAmount = cardWidth + 20; // 20 es el gap
  
  track.scrollBy({
    left: direccion * scrollAmount,
    behavior: 'smooth'
  });
  
  // Actualizar slide actual aproximadamente
  currentSlide = Math.min(
    Math.max(currentSlide + direccion, 0),
    razones.length - 1
  );
  actualizarDots();
}

function irASlide(index) {
  const track = document.getElementById('carruselTrack');
  const cardWidth = track.children[0]?.offsetWidth || 300;
  
  track.scrollTo({
    left: index * (cardWidth + 20),
    behavior: 'smooth'
  });
  
  currentSlide = index;
  actualizarDots();
}

function actualizarDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function iniciarAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const track = document.getElementById('carruselTrack');
    const maxScroll = track.scrollWidth - track.clientWidth;
    
    if (track.scrollLeft >= maxScroll - 10) {
      // Si llegamos al final, volvemos al principio
      track.scrollTo({ left: 0, behavior: 'smooth' });
      currentSlide = 0;
    } else {
      moverCarrusel(1);
    }
    actualizarDots();
  }, 5000); // Cambia cada 5 segundos
}

function detenerAutoSlide() {
  clearInterval(autoSlideInterval);
}

function reanudarAutoSlide() {
  iniciarAutoSlide();
}

function configurarObservadorHover() {
  const carrusel = document.querySelector('.carrusel-track');
  if (carrusel) {
    carrusel.addEventListener('mouseenter', detenerAutoSlide);
    carrusel.addEventListener('mouseleave', reanudarAutoSlide);
  }
}

// ===== FUNCIONES DEL MODAL =====
function openModal() {
  document.getElementById('modal').style.display = 'block';
  // Limpiar campos
  document.getElementById('modalName').value = '';
  document.getElementById('modalLevel').value = '';
  document.getElementById('modalSubject').value = '';
  document.getElementById('modalProfile').value = '';
  document.getElementById('modalSchedule').value = '';
}

function openModalWithData(nivel) {
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modalLevel').value = nivel;
  document.getElementById('modalName').value = '';
  document.getElementById('modalSubject').value = '';
  document.getElementById('modalProfile').value = '';
  document.getElementById('modalSchedule').value = '';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function openTerminos() {
  document.getElementById('modalTerminos').style.display = 'block';
}

function closeTerminos() {
  document.getElementById('modalTerminos').style.display = 'none';
}

// ===== FUNCIÓN DE WHATSAPP =====
function sendWhatsApp() {
  const name = document.getElementById('modalName').value;
  const level = document.getElementById('modalLevel').value;
  const subject = document.getElementById('modalSubject').value;
  const profile = document.getElementById('modalProfile').value;
  const schedule = document.getElementById('modalSchedule').value;
  
  // Validación básica
  if (!name || !level || !subject || !schedule) {
    alert('Por favor, completa todos los campos obligatorios (Nombre, Nivel, Asignatura y Horario)');
    return;
  }
  
  const phone = '34644719635'; // Nuevo número
  
  const message = `Hola Oscar, soy ${name}.

📚 Nivel académico: ${level}
📖 Asignatura(s): ${subject}
📊 Perfil del alumno: ${profile || 'No especificado'}
⏰ Disponibilidad: ${schedule}

Quedo a la espera de tu respuesta. ¡Gracias!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  closeModal();
}

// ===== CERRAR MODAL AL HACER CLICK FUERA =====
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  const modalTerminos = document.getElementById('modalTerminos');
  
  if (event.target === modal) {
    closeModal();
  }
  if (event.target === modalTerminos) {
    closeTerminos();
  }
}
