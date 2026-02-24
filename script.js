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
  
  track.innerHTML = '';
  dotsContainer.innerHTML = '';
  
  razones.forEach((razon, index) => {
    const card = document.createElement('div');
    card.className = 'carrusel-card';
    card.innerHTML = `
      <i class="${razon.icon}"></i>
      <h3>${razon.title}</h3>
      <p>${razon.desc}</p>
    `;
    track.appendChild(card);
    
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
  const scrollAmount = cardWidth + 20;
  
  track.scrollBy({
    left: direccion * scrollAmount,
    behavior: 'smooth'
  });
  
  currentSlide = Math.min(Math.max(currentSlide + direccion, 0), razones.length - 1);
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
      track.scrollTo({ left: 0, behavior: 'smooth' });
      currentSlide = 0;
    } else {
      moverCarrusel(1);
    }
    actualizarDots();
  }, 5000);
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

// ===== FUNCIONES DEL MODAL PRINCIPAL (clases) =====
function openModal() {
  document.getElementById('modal').style.display = 'block';
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

function sendWhatsApp() {
  const name = document.getElementById('modalName').value;
  const level = document.getElementById('modalLevel').value;
  const subject = document.getElementById('modalSubject').value;
  const profile = document.getElementById('modalProfile').value;
  const schedule = document.getElementById('modalSchedule').value;
  
  if (!name || !level || !subject || !schedule) {
    alert('Por favor, completa todos los campos obligatorios (Nombre, Nivel, Asignatura y Horario)');
    return;
  }
  
  const phone = '34644719635';
  const message = `Hola Oscar, soy ${name}.

📚 Nivel académico: ${level}
📖 Asignatura(s): ${subject}
📊 Perfil del alumno: ${profile || 'No especificado'}
⏰ Disponibilidad: ${schedule}

Quedo a la espera de tu respuesta. ¡Gracias!`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  closeModal();
}

// ===== FUNCIONES PARA MODAL DE TÉRMINOS =====
function openTerminos() {
  document.getElementById('modalTerminos').style.display = 'block';
}

function closeTerminos() {
  document.getElementById('modalTerminos').style.display = 'none';
}

// ===== FUNCIONES PARA MODAL DE EQUIPO =====
function openModalEquipo() {
  document.getElementById('modalEquipo').style.display = 'block';
  document.getElementById('equipoNombre').value = '';
  document.getElementById('equipoFormacion').value = '';
  document.getElementById('equipoExperiencia').value = '';
  document.getElementById('equipoDisponibilidad').value = '';
}

function closeModalEquipo() {
  document.getElementById('modalEquipo').style.display = 'none';
}

function sendWhatsAppEquipo() {
  const nombre = document.getElementById('equipoNombre').value;
  const formacion = document.getElementById('equipoFormacion').value;
  const experiencia = document.getElementById('equipoExperiencia').value;
  const disponibilidad = document.getElementById('equipoDisponibilidad').value;
  
  if (!nombre || !formacion || !disponibilidad) {
    alert('Por favor, completa los campos obligatorios (Nombre, Formación y Disponibilidad)');
    return;
  }
  
  const phone = '34644719635';
  const message = `Hola Oscar, me interesa formar parte de tu equipo docente.

👤 Nombre: ${nombre}
🎓 Formación: ${formacion}
📝 Experiencia: ${experiencia || 'No especificada'}
⏰ Disponibilidad: ${disponibilidad}

Quedo a la espera de tu respuesta.`;
  
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  closeModalEquipo();
}

// ===== FUNCIONES PARA MODAL DE QUEJAS =====
function openModalQuejas() {
  document.getElementById('modalQuejas').style.display = 'block';
  document.getElementById('quejasNombre').value = '';
  document.getElementById('quejasMensaje').value = '';
}

function closeModalQuejas() {
  document.getElementById('modalQuejas').style.display = 'none';
}

function sendWhatsAppQuejas() {
  const nombre = document.getElementById('quejasNombre').value;
  const mensaje = document.getElementById('quejasMensaje').value;
  
  if (!mensaje) {
    alert('Por favor, escribe tu queja o sugerencia');
    return;
  }
  
  const phone = '34644719635';
  const nombreTexto = nombre ? `Nombre: ${nombre}` : 'Anónimo';
  
  const message = `📢 QUEJA O SUGERENCIA

${nombreTexto}

Mensaje: ${mensaje}`;
  
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  closeModalQuejas();
}

// ===== FUNCIONES PARA ENLACES PEQUEÑOS =====
function openTrabajaConmigo() {
  const phone = '34644719635';
  const message = `Hola Oscar, me interesa formar parte de tu equipo docente.

Mi formación: 
Mi experiencia: 
Disponibilidad: `;
  
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function openFAQ() {
  const faqSection = document.querySelector('.faq-section');
  if (faqSection) {
    faqSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== CERRAR MODALES AL HACER CLICK FUERA =====
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  const modalTerminos = document.getElementById('modalTerminos');
  const modalEquipo = document.getElementById('modalEquipo');
  const modalQuejas = document.getElementById('modalQuejas');
  
  if (event.target === modal) closeModal();
  if (event.target === modalTerminos) closeTerminos();
  if (event.target === modalEquipo) closeModalEquipo();
  if (event.target === modalQuejas) closeModalQuejas();
}

// ===== CERRAR MODALES CON TECLA ESC =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
    closeTerminos();
    closeModalEquipo();
    closeModalQuejas();
  }
});
