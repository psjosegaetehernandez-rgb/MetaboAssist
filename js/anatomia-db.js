// js/anatomia-db.js
window.AnatomiaDB = {
    cerebro: {
        titulo: "Eje Hipotálamo-Hipófisis-Suprarrenal",
        sistema: "Sistema Nervioso Central / Endocrino",
        netterRef: "Láminas 147-148",
        textoUCA: "El hipotálamo produce CRH, que actúa sobre la hipófisis para liberar ACTH, llegando a la corteza suprarrenal para liberar cortisol.",
        conexionPsico: "El estrés crónico mantiene este eje hiperactivado, generando resistencia a la insulina y grasa visceral.",
        patologias: ["Síndrome de Cushing", "Burnout", "Ansiedad generalizada"]
    },
    vago: {
        titulo: "Nervio Vago (Par X)",
        sistema: "Sistema Nervioso Parasimpático",
        netterRef: "Láminas 126, 146 (Nervio Vago)",
        textoUCA: "El nervio vago desciende desde el bulbo raquídeo, inervando el corazón, pulmones y vísceras abdominales. Es el principal regulador del sistema parasimpático (descanso y digestión).",
        conexionPsico: "El eje intestino-cerebro es bidireccional. Un tono vagal bajo (por estrés) se asocia con inflamación y mala digestión. Las emociones alteran la motilidad intestinal.",
        patologias: ["Colon irritable", "Dispepsia funcional", "Reflujo gastroesofágico"]
    },
    ciatico: {
        titulo: "Nervio Ciático y Plexo Lumbosacro",
        sistema: "Sistema Nervioso Periférico",
        netterRef: "Láminas 162, 183 (Plexo Lumbosacro)",
        textoUCA: "El nervio ciático es el más voluminoso. Se origina en el plexo sacro, sale por el agujero ciático mayor (infrapiriforme) y desciende por la cara posterior del muslo.",
        conexionPsico: "El estrés y la tensión emocional se somatizan en la musculatura profunda. El Síndrome del Piramidal irrita el nervio ciático, causando dolor lumbar confundido con patología visceral.",
        patologias: ["Síndrome del Piramidal", "Lumbalgia por estrés", "Hernia discal"]
    },
    pancreas: {
        titulo: "Páncreas Endocrino",
        sistema: "Sistema Endocrino y Digestivo",
        netterRef: "Láminas 286-299",
        textoUCA: "Los Islotes de Langerhans secretan insulina (células beta) y glucagón (células alfa), regulando la glucemia.",
        conexionPsico: "El estrés crónico y la obesidad visceral agravan la resistencia a la insulina. El ejercicio de fuerza es clave.",
        patologias: ["Resistencia a la Insulina", "Diabetes Tipo 2", "Síndrome Metabólico"]
    },
    tiroides: {
        titulo: "Glándula Tiroides",
        sistema: "Sistema Endocrino",
        netterRef: "Láminas 74-76",
        textoUCA: "Produce tiroxina (T4) y triyodotironina (T3), regulando la tasa metabólica basal.",
        conexionPsico: "El hipotiroidismo puede enmascararse como fatiga, aumento de peso y apatía. Descartar causa orgánica antes de diagnosticar depresión.",
        patologias: ["Hipotiroidismo", "Hipertiroidismo", "Bocio"]
    }
};