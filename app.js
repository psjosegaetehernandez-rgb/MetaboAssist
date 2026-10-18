// app.js - MetaboAssist 15.0

// --- DATOS MÓDULOS CLÍNICOS (Añadidos Farmacología y Psicoanálisis) ---
const bibliotecaClinica = {
    obesidad: { nombre: "Obesidad", medicina: "Enfermedad crónica multifactorial. Adiposidad visceral disfuncional. Evaluar comorbilidades.", nutricion: "Déficit calórico moderado. Priorizar densidad nutricional y proteínas.", kine: "Evaluar capacidad funcional. Preservar masa magra.", psico: "Abordar evitación experiencial (ACT). Intervención TCC+ACT.", evidencia: "Nivel A. TCC y ACT son de elección para atracones." },
    resistencia: { nombre: "Resistencia a la Insulina", medicina: "Fenómeno metabólico, no sinónimo de diabetes. Evaluar riesgo cardiometabólico.", nutricion: "Balance de macros, control de carga glucémica, fibra soluble.", kine: "El músculo consume glucosa. Entrenamiento de fuerza.", psico: "El cortisol crónico agrava la RI.", evidencia: "Ejercicio de fuerza tiene alta evidencia." },
    diabetes: { nombre: "Diabetes Tipo 2", medicina: "Hiperglucemia crónica. Control glucémico y evaluación de órganos blanco.", nutricion: "Control de carbohidratos, fibra, grasas saludables.", kine: "Ejercicio reduce glucosa. Cuidado pie diabético.", psico: "Diabetes distress. Promover adherencia.", evidencia: "ADA recomienda abordaje psicosocial integrado." },
    tca: { nombre: "Trastornos de la Conducta Alimentaria", medicina: "Grave riesgo médico (electrolitos, bradicardia). Requiere evaluación urgente.", nutricion: "Rehabilitación nutricional progresiva. Evitar dietas restrictivas.", kine: "Cuidado con hiperactividad compensatoria.", psico: "Distorsión corporal. Abordaje TCC-E.", evidencia: "Guías NICE y APA. TCC-E estándar de oro para bulimia." },
    estres: { nombre: "Estrés Crónico y Burnout", medicina: "Activación sostenida del eje HHA. Efectos: HTA, trastornos GI.", nutricion: "Evitar picoteo por ansiedad. Fomentar alimentación regular.", kine: "Movimiento modula el eje HHA.", psico: "Modelo Transaccional de Lazarus. Técnicas de regulación.", evidencia: "Lazarus y Folkman (1984). MINSAL (2022)." },
    farmacologia: {
        nombre: "Farmacología Metabólica",
        medicina: "Metformina: Reduce gluconeogénesis hepática, mejora sensibilidad a la insulina. GLP-1 (Ozempic): Retrasa vaciamiento gástrico, aumenta saciedad. Estatinas: Inhiben HMG-CoA, reducen LDL. Levotiroxina: Reemplazo hormonal en hipotiroidismo.",
        nutricion: "Metformina: Puede causar déficit de B12 a largo plazo. GLP-1: Náuseas iniciales, requerir ajuste de porciones. Estatinas: Evitar jugo de pomelo. Levotiroxina: Tomar en ayunas, esperar 30 min para comer.",
        kine: "Metformina: Puede reducir adaptaciones al ejercicio aeróbico. GLP-1: Riesgo de pérdida de masa muscular; el entrenamiento de fuerza es CRÍTICO. Estatinas: Pueden causar mialgias; monitorear tolerancia al ejercicio. Levotiroxina: El ejercicio mejora la sensibilidad.",
        psico: "Metformina: Impacto en el estado de ánimo (mejora leve). GLP-1: Cambios en la relación con la comida (pérdida de 'placer' oral). Estatinas: Adherencia y miedo a efectos secundarios. Levotiroxina: La fatiga por hipotiroidismo se confunde con depresión.",
        evidencia: "Guías ADA, ESC y Sociedad Chilena de Endocrinología. Abordaje centrado en el paciente."
    },
    psicoanalisis: {
        nombre: "Psicoanálisis del Cuerpo",
        medicina: "El síntoma físico (ej. obesidad, fatiga) es un texto a descifrar. No hay una correlación lineal entre lo orgánico y lo psíquico; el cuerpo es afectado por el lenguaje y el inconsciente.",
        nutricion: "La alimentación no es solo nutrición biológica; es un acto cargado de significado. El 'antojo' o la 'restricción' pueden ser manifestaciones de una pulsión no simbolizada.",
        kine: "El cuerpo en movimiento no es solo músculo y hueso. La inhibición psicomotriz o la somatización del estrés (ej. contracturas) son formas en que el inconsciente se hace presente en el cuerpo.",
        psico: "Conceptos clave: *Pulsión* (fuerza que busca satisfacción), *Cuerpo Imaginario* (la imagen que creemos tener) vs. *Cuerpo Real* (lo que se escapa a la imagen). La culpa no es solo TCC; es inconsciente (el superyó). El síntoma es una solución de compromiso.",
        evidencia: "Freud (El yo y el ello), Lacan (El estadio del espejo), Nasio (El cuerpo en psicoanálisis)."
    }
};

// --- DATOS HUD ANATÓMICO (Mantenido) ---
const redAnatomica = {
    cerebro: { titulo: "Eje Hipotálamo-Hipófisis-Suprarrenal", badge: "Estrés Crónico", medicina: "El estrés activa el eje HHA, elevando el cortisol. Favorece la resistencia a la insulina.", nutricion: "El cortisol eleva la búsqueda de alimentos hiperpalatables.", kine: "El ejercicio de fuerza modula el eje HHA.", psico: "La TCC aborda los pensamientos automáticos de amenaza." },
    vago: { titulo: "Nervio Vago y Eje Intestino-Cerebro", badge: "Parasimpático", medicina: "Conecta el cerebro con el estómago. Regula la motilidad y microbiota.", nutricion: "La fibra y probióticos modulan el nervio vago.", kine: "Respiración diafragmática estimula el tono vagal.", psico: "El estrés inhibe la digestión. 'Mariposas en el estómago'." },
    ciatico: { titulo: "Nervio Ciático y Plexo Lumbosacro", badge: "Locomotor", medicina: "El nervio más grueso del cuerpo. Pasa por el piramidal.", nutricion: "La inflamación agrava el dolor neuropático.", kine: "Síndrome del Piramidal comprime el nervio. Estiramientos.", psico: "El estrés se somatiza en la musculatura lumbar." },
    pancreas: { titulo: "Páncreas y Resistencia a la Insulina", badge: "Metabolismo", medicina: "Regula la glucemia. RI previa a diabetes tipo 2.", nutricion: "Control de carga glucémica.", kine: "El músculo consume glucosa sin insulina.", psico: "El cortisol agrava la RI." },
    tiroides: { titulo: "Glándula Tiroides", badge: "Metabolismo Basal", medicina: "Regula tasa metabólica. Hipotiroidismo enmascara fatiga.", nutricion: "Requiere yodo y selenio.", kine: "Fatiga muscular por disfunción tiroidea.", psico: "Apatía se confunde con depresión." }
};

// --- DATOS VÍAS BIOLÓGICAS (Mantenido) ---
const bioDatabase = {
    hha: { titulo: "🧠 Eje Hipotálamo-Hipófisis-Suprarrenal (HHA) y Cortisol", descripcion: "La base neuroendocrina del estrés crónico.", pasos: [ { titulo: "1. Estrés Percibido", detalle: "Neuronas parvocelulares liberan CRH." }, { titulo: "2. Hipófisis Anterior", detalle: "La CRH estimula la liberación de ACTH." }, { titulo: "3. Corteza Suprarrenal", detalle: "La ACTH estimula la síntesis de Cortisol." }, { titulo: "4. Efecto Metabólico", detalle: "Gluconeogénesis, lipólisis y resistencia a la insulina." }, { titulo: "5. Retroalimentación Negativa", detalle: "En estrés crónico, esta señal falla, perpetuando el ciclo." } ] },
    insulina: { titulo: "⚖️ Fisiopatología de la Resistencia a la Insulina", descripcion: "Disfunción del transportador GLUT4 y lipotoxicidad.", pasos: [ { titulo: "1. Lipotoxicidad Visceral", detalle: "Grasa visceral libera ácidos grasos libres y citoquinas." }, { titulo: "2. Fallo en la Vía PI3K/Akt", detalle: "El GLUT4 no se transloca a la membrana celular." }, { titulo: "3. Compensación Pancreática", detalle: "Hiperinsulinemia para intentar normalizar la glucosa." }, { titulo: "4. Agotamiento y Apoptosis", detalle: "Estrés oxidativo y muerte de células beta. Diabetes Tipo 2." } ] },
    energia: { titulo: "⚡ Glucólisis y Ciclo de Krebs", descripcion: "El motor energético celular.", pasos: [ { titulo: "1. Glucólisis (Citosol)", detalle: "Glucosa a 2 Piruvatos + 2 ATP + 2 NADH." }, { titulo: "2. Descarboxilación del Piruvato", detalle: "Piruvato a Acetil-CoA en la mitocondria." }, { titulo: "3. Ciclo de Krebs", detalle: "Producción de NADH, FADH2 y CO2." }, { titulo: "4. Fosforilación Oxidativa", detalle: "Cadena transportadora de electrones produce ~30 ATP." } ] },
    microbiota: { titulo: "🦠 Eje Microbiota-Intestino-Cerebro", descripcion: "Cómo las bacterias intestinales modulan la inflamación.", pasos: [ { titulo: "1. Diversidad Microbiana", detalle: "Bacterias productoras de butirato mantienen la barrera intestinal." }, { titulo: "2. Permeabilidad Intestinal", detalle: "El estrés altera las uniones estrechas, causando inflamación." }, { titulo: "3. Señalización Vagal", detalle: "La microbiota produce neurotransmisores que estimulan el nervio vago." }, { titulo: "4. Impacto en el Apetito", detalle: "Altera la señalización de leptina y grelina." } ] }
};

// --- DATOS MIND MAP ---
const mindMapData = {
    estres: { titulo: "Estrés Percibido", desc: "El estrés crónico es el nodo central. Activa el eje HHA, elevando el cortisol y alterando la glucemia y la ingesta." },
    cortisol: { titulo: "Cortisol Elevado", desc: "Promueve la acumulación de grasa visceral y la resistencia a la insulina. También aumenta la búsqueda de alimentos hiperpalatables (azúcar/grasa)." },
    insulina: { titulo: "Resistencia a la Insulina", desc: "Las células musculares y hepáticas dejan de responder a la insulina. El páncreas compensa produciendo más insulina (hiperinsulinemia)." },
    emocional: { titulo: "Alimentación Emocional", desc: "Comer para regular emociones negativas (ansiedad, tristeza). Es una forma de evitación experiencial que a corto plazo alivia, pero a largo plazo genera culpa y aumento de peso." },
    grasa: { titulo: "Grasa Visceral y Obesidad", desc: "La grasa visceral es metabólicamente activa, secreta citoquinas inflamatorias (TNF-alfa, IL-6) que perpetúan la resistencia a la insulina y el estrés." }
};

// --- DATOS PROTOCOLO (Mantenido) ---
const protocolData = [
    { fase: "Fase I: Evaluación y Psicoeducación", color: "#38bdf8", icon: "🔍", sesiones: [ { num: "1", titulo: "Entrevista Inicial y Establecimiento de Objetivos", objetivo: "Establecer alianza terapéutica, realizar evaluación inicial (PSS-14, BES, AAQ-II) y explicar el enfoque integrativo (TCC + ACT).", contenido: "Presentación y encuadre. Normalizar la dificultad de la pérdida de peso (no es falta de voluntad). Diferenciar objetivos de resultado vs. proceso.", tarea: "Realizar el Diario de Registro Diario (Anexo 1) anotando alimentos, emociones y pensamientos." }, { num: "2", titulo: "Psicoeducación sobre el Modelo ABC", objetivo: "Explicar el modelo ABC (Activador-Creencias-Consecuencias) e identificar pensamientos automáticos y distorsiones cognitivas.", contenido: "Aplicar el modelo ABC a un ejemplo de alimentación emocional. Identificar distorsiones como pensamiento dicotómico o sobregeneralización.", tarea: "Identificar y anotar 3 situaciones donde un pensamiento negativo influyó en la alimentación." }, { num: "3", titulo: "Psicoeducación sobre Estrés y Evitación Experiencial", objetivo: "Conectar el estrés con los patrones de ingesta e introducir el concepto de evitación experiencial (ACT).", contenido: "Explicar el eje HHA y el cortisol. Metáfora del elefante rosa y la paradoja de la evitación. Ejercicio experiencial 'La ola'.", tarea: "Registrar emociones asociadas a la comida. Preguntarse: '¿Estoy comiendo para evitar sentir algo?'" }, { num: "4", titulo: "Introducción a la Reestructuración Cognitiva y Defusión", objetivo: "Enseñar a identificar Pensamientos Automáticos Negativos (PAN) y practicar la defusión cognitiva.", contenido: "Formulario de reestructuración cognitiva. Diferencia entre reestructuración (cambiar contenido) y defusión (cambiar relación). Ejercicio de repetición de la palabra 'comida'.", tarea: "Completar formulario de reestructuración con 3 PAN. Practicar defusión con una palabra relacionada a la comida." } ] },
    { fase: "Fase II: Intervención Activa", color: "#34d399", icon: "⚡", sesiones: [ { num: "5", titulo: "Cuestionamiento de Creencias (Técnica ABC de Ellis)", objetivo: "Enseñar a disputar creencias irracionales y aplicar el modelo ABC a episodios de alimentación emocional.", contenido: "Disputa de creencias con 3 preguntas: Evidencia, Utilidad y Lógica. Introducción a la aceptación (ACT) con la metáfora del autobús.", tarea: "Aplicar el modelo ABC a un episodio de atracón y escribir la disputa. Practicar defusión." }, { num: "6", titulo: "Experimentos Conductuales para Probar Creencias", objetivo: "Diseñar experimentos para contrastar creencias disfuncionales y promover el aprendizaje experiencial.", contenido: "Ejemplo: 'Si como un trozo de tarta, engordaré 2 kilos'. Planificar comer una porción y registrar el peso real. Metáfora del pasajero incómodo.", tarea: "Realizar el experimento conductual y registrar resultados. Practicar la aceptación de una emoción incómoda." }, { num: "7", titulo: "Alimentación Consciente (Mindful Eating) - Parte 1", objetivo: "Introducir el mindfulness y practicar la alimentación consciente. Enseñar a distinguir hambre y saciedad.", contenido: "Ejercicio de comer una pasa con atención plena (observar, oler, saborear). Escala de hambre y saciedad (1-10).", tarea: "Realizar una comida al día con atención plena, sin distracciones (TV, móvil). Registrar la experiencia." }, { num: "8", titulo: "Alimentación Consciente - Parte 2 y Control de Estímulos", objetivo: "Profundizar en el mindful eating y enseñar estrategias de control de estímulos ambientales.", contenido: "Modificar el entorno (no comprar snacks, guardar comida en lugares poco accesibles). Ejercicio de defusión: 'pensamientos como hojas en un río'.", tarea: "Implementar 2 cambios en el entorno. Seguir con una comida consciente diaria." }, { num: "9", titulo: "Activación Conductual y Clarificación de Valores", objetivo: "Ampliar el repertorio de conductas placenteras no alimentarias y conectar con los valores (ACT).", contenido: "Identificar actividades incompatibles con comer. Ejercicio del funeral para clarificar valores. Conectar la alimentación saludable con los valores personales.", tarea: "Llevar a cabo el plan de actividades placenteras (Anexo 4) y registrar cómo se siente." }, { num: "10", titulo: "Reestructuración de Creencias Centrales sobre el Peso", objetivo: "Identificar y modificar creencias nucleares sobre el peso y la imagen corporal.", contenido: "Técnica de la flecha descendente: '¿y eso qué significa sobre ti?'. Cuestionamiento de creencias centrales (buscar evidencia objetiva). Ejercicio de autocompasión.", tarea: "Escribir una carta a sí mismo desde la perspectiva de un amigo compasivo." }, { num: "11", titulo: "Planificación de Comidas y Reestructuración de Reglas Dietéticas", objetivo: "Identificar reglas dietéticas rígidas, promover una alimentación flexible y diseñar un plan realista.", contenido: "Cuestionar reglas como 'no debo comer hidratos'. Explicar el efecto rebote. Defusión de reglas. Diseño de un plan de comidas semanal.", tarea: "Seguir el plan de comidas durante la semana y registrar dificultades. Defusión de una regla dietética." }, { num: "12", titulo: "Manejo de Situaciones de Alto Riesgo", objetivo: "Identificar situaciones de alto riesgo, entrenar en solución de problemas y desarrollar un plan de afrontamiento.", contenido: "Entrenamiento en solución de problemas (5 pasos). Metáfora del fuego: las emociones intensas se avivan si echas gasolina (comida).", tarea: "Aplicar la solución de problemas a una situación de riesgo. Practicar la aceptación de una emoción intensa." }, { num: "13", titulo: "Ejercicio Físico como Herramienta de Regulación Emocional", objetivo: "Reformular la percepción del ejercicio y promoverlo como regulador emocional.", contenido: "Explorar creencias sobre el ejercicio (¿castigo u obligación?). Conectar el ejercicio con los valores. Aceptación de sensaciones corporales durante el ejercicio.", tarea: "Realizar la actividad elegida al menos 3 veces y registrar el estado de ánimo antes/después." }, { num: "14", titulo: "Autocompasión y Manejo de la Culpa", objetivo: "Abordar la culpa y la vergüenza tras los deslices alimentarios e introducir la autocompasión.", contenido: "Normalizar la culpa. Ejercicio: escribir cómo se hablaría a un amigo que tuvo un desliz. Defusión de la autocrítica. Metáfora del ciclista.", tarea: "Practicar la autocompasión ante cualquier pensamiento autocrítico. Registrar un desliz y aplicar autocompasión." } ] },
    { fase: "Fase III: Consolidación y Prevención de Recaídas", color: "#fbbf24", icon: "🛡️", sesiones: [ { num: "15", titulo: "Revisión Global de Progresos", objetivo: "Evaluar cambios, revisar herramientas aprendidas e identificar áreas de refuerzo.", contenido: "Re-administrar cuestionarios iniciales (PSS, BES, AAQ-II). Revisar logros y celebrar avances. Identificar qué herramientas han sido más útiles.", tarea: "Reflexionar por escrito sobre los 3 logros más importantes y las 3 herramientas más útiles." }, { num: "16", titulo: "Identificación de Señales de Alarma y Plan de Prevención", objetivo: "Diferenciar caída de recaída, identificar señales de alarma y diseñar el Plan de Prevención (Anexo 6).", contenido: "Definir caída (desliz puntual) vs. recaída (vuelta al patrón). Identificar señales personales (dejar de registrar, aislarse). Diseñar el plan con contactos de apoyo y valores.", tarea: "Compartir el plan con una persona de confianza. Identificar una señal de alarma y practicar la respuesta." }, { num: "17", titulo: "Entrenamiento en Prevención de Recaídas (Continuación)", objetivo: "Practicar la respuesta ante situaciones de alto riesgo y ajustar el plan.", contenido: "Role-playing en sesión de una situación de alto riesgo (ej. una fiesta). Ajuste del plan ante posibles obstáculos. Ejercicio de disposición y compromiso.", tarea: "Ensayar mentalmente una situación de alto riesgo y aplicar el plan. Registrar cualquier señal de alarma." }, { num: "18", titulo: "Cierre de la Terapia Activa", objetivo: "Resumir logros, normalizar sentimientos de despedida y acordar el calendario de seguimiento.", contenido: "Repaso de habilidades adquiridas. Abordar la ansiedad por el fin de la terapia. Entregar certificado simbólico (opcional). Acordar seguimiento a 1 y 3 meses.", tarea: "Revisar el plan de mantenimiento a largo plazo. Continuar aplicando las herramientas." } ] },
    { fase: "Fase IV: Seguimiento", color: "#a78bfa", icon: "📅", sesiones: [ { num: "19", titulo: "Primera Sesión de Seguimiento (1 mes)", objetivo: "Revisar la aplicación del plan de prevención, valorar el progreso y ajustar objetivos.", contenido: "Evaluar estabilidad de los cambios. Revisar si se activaron señales de alarma y cómo se respondió. Reforzar autocuidado y autocompasión.", tarea: "Continuar con el registro diario (opcional) y el plan de actividades placenteras." }, { num: "20", titulo: "Segunda Sesión de Seguimiento (3 meses)", objetivo: "Evaluar estabilidad a largo plazo y establecer el plan de mantenimiento definitivo.", contenido: "Re-administrar cuestionarios de seguimiento. Identificar nuevas áreas de mejora. Establecer plan de mantenimiento a largo plazo (seguimiento anual).", tarea: "Cierre definitivo. Reforzar la autonomía y la autoeficacia del paciente." } ] }
];


document.addEventListener('DOMContentLoaded', () => {
    // Navegación
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            views.forEach(view => view.classList.remove('active'));
            item.classList.add('active');
            document.getElementById(`view-${item.getAttribute('data-target')}`).classList.add('active');
        });
    });

    // Inicializar Módulos
    mostrarOrgano('cerebro');
    cargarBio('hha', document.querySelector('.bio-menu-btn'));
    cargarPatologia('obesidad', document.querySelector('.path-tab'));
    renderizarProtocolo();
    mostrarNodo('estres'); // Inicializar Mind Map

    // Panel Paciente
    const notesArea = document.getElementById('clinical-notes');
    if (notesArea) {
        const savedNotes = localStorage.getItem('metaboassist_clinical_notes_v15');
        if (savedNotes) notesArea.value = savedNotes;
        notesArea.addEventListener('input', () => {
            localStorage.setItem('metaboassist_clinical_notes_v15', notesArea.value);
        });
    }
    const hungerSlider = document.getElementById('hungerSlider');
    const hungerValue = document.getElementById('hungerValue');
    const satietySlider = document.getElementById('satietySlider');
    const satietyValue = document.getElementById('satietyValue');
    if(hungerSlider) {
        hungerSlider.addEventListener('input', (e) => hungerValue.textContent = e.target.value);
        satietySlider.addEventListener('input', (e) => satietyValue.textContent = e.target.value);
    }
});

// --- LÓGICA DEL HUD ANATÓMICO ---
function mostrarOrgano(organoKey) {
    const dataClinica = redAnatomica[organoKey];
    const dataAnatomica = window.AnatomiaDB[organoKey]; 
    if(!dataClinica || !dataAnatomica) return;
    document.querySelectorAll('.organ-list li').forEach(li => li.classList.remove('active'));
    document.querySelectorAll('.organ-list li').forEach(li => {
        if(li.getAttribute('onclick').includes(organoKey)) li.classList.add('active');
    });
    document.querySelectorAll('.hotspot').forEach(o => o.classList.remove('active'));
    const hotspot = document.getElementById(`hotspot-${organoKey}`);
    if(hotspot) hotspot.classList.add('active');

    document.getElementById('data-title').innerText = dataClinica.titulo;
    document.getElementById('data-badge').innerText = dataClinica.badge;
    document.getElementById('data-grid').innerHTML = `
        <div class="data-card med"><h4><span>🩺</span> Medicina</h4><p>${dataClinica.medicina}</p></div>
        <div class="data-card nut"><h4><span>🥗</span> Nutrición</h4><p>${dataClinica.nutricion}</p></div>
        <div class="data-card kin"><h4><span>🏃</span> Kinesiología</h4><p>${dataClinica.kine}</p></div>
        <div class="data-card psi"><h4><span>🧠</span> Psicología</h4><p>${dataClinica.psico}</p></div>
    `;
    document.getElementById('ana-sistema').innerText = dataAnatomica.sistema;
    document.getElementById('ana-ref').innerText = `📚 ${dataAnatomica.netterRef}`;
    document.getElementById('ana-texto').innerText = dataAnatomica.textoUCA;
    document.getElementById('ana-psico').innerText = dataAnatomica.conexionPsico;
    const ulPatologias = document.getElementById('ana-patologias');
    ulPatologias.innerHTML = '';
    dataAnatomica.patologias.forEach(pat => {
        const li = document.createElement('li'); li.innerText = pat; ulPatologias.appendChild(li);
    });
}
function cambiarVistaDatos(vista) {
    document.getElementById('btn-view-clinica').classList.toggle('active', vista === 'clinica');
    document.getElementById('btn-view-anatomica').classList.toggle('active', vista === 'anatomica');
    document.getElementById('data-clinica').classList.toggle('active', vista === 'clinica');
    document.getElementById('data-anatomica').classList.toggle('active', vista === 'anatomica');
}

// --- LÓGICA VÍAS BIOLÓGICAS ---
function cargarBio(key, btnElement) {
    document.querySelectorAll('.bio-menu-btn').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');
    const data = bioDatabase[key];
    let html = `<div class="bio-header"><h3>${data.titulo}</h3><p class="bio-desc">${data.descripcion}</p></div><div class="bio-flow-vertical">`;
    data.pasos.forEach(paso => {
        html += `<div class="bio-step-item"><h4>${paso.titulo}</h4><p>${paso.detalle}</p></div>`;
    });
    html += `</div>`;
    document.getElementById('bio-display').innerHTML = html;
}

// --- LÓGICA MÓDULOS CLÍNICOS ---
function cargarPatologia(key, btnElement) {
    document.querySelectorAll('.path-tab').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');
    const data = bibliotecaClinica[key];
    
    // Si es Psicoanálisis, usamos un color púrpura especial
    const isPsy = key === 'psicoanalisis';
    const psyClass = isPsy ? 'psy-mode' : 'psi';
    
    document.getElementById('clinical-dashboard').innerHTML = `
        <div class="discipline-card med"><h3>🩺 Medicina</h3><p>${data.medicina}</p></div>
        <div class="discipline-card nut"><h3>🥗 Nutrición</h3><p>${data.nutricion}</p></div>
        <div class="discipline-card kin"><h3>🏃 Kinesiología</h3><p>${data.kine}</p></div>
        <div class="discipline-card ${psyClass}"><h3>🛋️ Psicología / Psicoanálisis</h3><p>${data.psico}</p><div class="evidence-badge">📚 Evidencia: ${data.evidencia}</div></div>
    `;
}

// --- LÓGICA PROTOCOLO (ACORDEÓN) ---
function renderizarProtocolo() {
    const container = document.getElementById('protocol-accordion');
    let html = '';
    protocolData.forEach((fase, indexFase) => {
        html += `
            <div class="phase-group ${indexFase === 0 ? 'active' : ''}" id="phase-${indexFase}">
                <div class="phase-header" onclick="togglePhase(${indexFase})">
                    <h3><span class="phase-icon">${fase.icon}</span> ${fase.fase}</h3>
                    <span class="phase-toggle">▼</span>
                </div>
                <div class="phase-content">
        `;
        fase.sesiones.forEach((sesion, indexSesion) => {
            const sessionId = `session-${indexFase}-${indexSesion}`;
            html += `
                <div class="session-card" id="${sessionId}">
                    <div class="session-title" onclick="toggleSession('${sessionId}')">
                        <h4><span class="s-badge">Sesión ${sesion.num}</span> ${sesion.titulo}</h4>
                        <span class="s-arrow">▶</span>
                    </div>
                    <div class="session-details">
                        <div class="detail-block objective"><h5>🎯 Objetivo</h5><p>${sesion.objetivo}</p></div>
                        <div class="detail-block content"><h5>📖 Contenido Clínico</h5><p>${sesion.contenido}</p></div>
                        <div class="detail-block task"><h5>📝 Tarea para Casa</h5><p>${sesion.tarea}</p></div>
                    </div>
                </div>
            `;
        });
        html += `</div></div>`;
    });
    container.innerHTML = html;
}
function togglePhase(index) { document.getElementById(`phase-${index}`).classList.toggle('active'); }
function toggleSession(sessionId) { document.getElementById(sessionId).classList.toggle('active'); }

// --- LÓGICA CALCULADORAS ---
function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const talla = parseFloat(document.getElementById('talla').value);
    const res = document.getElementById('res-imc');
    
    if (!peso || !talla || talla <= 0) {
        res.innerText = "Por favor, ingresa valores válidos.";
        res.style.color = "var(--accent-red)";
        return;
    }
    
    const imc = peso / (talla * talla);
    let clasificacion = "";
    let color = "";
    
    if (imc < 18.5) { clasificacion = "Bajo peso"; color = "var(--accent-cyan)"; }
    else if (imc >= 18.5 && imc < 25) { clasificacion = "Normal"; color = "var(--accent-green)"; }
    else if (imc >= 25 && imc < 30) { clasificacion = "Sobrepeso"; color = "var(--accent-amber)"; }
    else if (imc >= 30 && imc < 35) { clasificacion = "Obesidad Grado I"; color = "#f97316"; }
    else if (imc >= 35 && imc < 40) { clasificacion = "Obesidad Grado II"; color = "var(--accent-red)"; }
    else { clasificacion = "Obesidad Grado III (Mórbida)"; color = "var(--accent-red)"; }
    
    res.innerHTML = `IMC: <strong>${imc.toFixed(1)}</strong> kg/m² - ${clasificacion}`;
    res.style.color = color;
}

function calcularHOMA() {
    const glucemia = parseFloat(document.getElementById('glucemia').value);
    const insulina = parseFloat(document.getElementById('insulina').value);
    const res = document.getElementById('res-homa');
    
    if (!glucemia || !insulina) {
        res.innerText = "Por favor, ingresa valores válidos.";
        res.style.color = "var(--accent-red)";
        return;
    }
    
    // Fórmula HOMA-IR: (Glucemia en mg/dL * Insulina en µU/mL) / 405
    const homa = (glucemia * insulina) / 405;
    
    let clasificacion = "";
    let color = "";
    
    if (homa < 2.5) { clasificacion = "Sensibilidad normal"; color = "var(--accent-green)"; }
    else if (homa >= 2.5 && homa < 3.8) { clasificacion = "Resistencia a la Insulina temprana"; color = "var(--accent-amber)"; }
    else { clasificacion = "Resistencia a la Insulina establecida"; color = "var(--accent-red)"; }
    
    res.innerHTML = `HOMA-IR: <strong>${homa.toFixed(2)}</strong> - ${clasificacion}`;
    res.style.color = color;
}

// --- LÓGICA MIND MAP ---
function mostrarNodo(key) {
    const data = mindMapData[key];
    document.getElementById('mm-info').innerHTML = `
        <strong style="color: var(--accent-cyan); font-size: 1.1rem;">${data.titulo}</strong><br>
        <p style="margin-top: 8px;">${data.desc}</p>
    `;
}