// Elementos HTML de la página
const textoMensajeUsuario = document.getElementById("texto_mensaje");     // Contenedor donde se escribe la pregunta
const botonGrabarAudio = document.getElementById("grabar_audio");         // Botón que habilita el modulo s2t

// Variables auxiliares para módulo s2t
let recognition;
let isRecognizing = false;

// Funcion para inciiar grabacion de audio
const iniciarGrabacion = () => {

	// Asignación de API de reconocimiento de voz
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	recognition = new SpeechRecognition();

	recognition.lang = "es-MX";							// Establece el iidioma en español (Mexico)
	recognition.interimResults = false; 		// Solo resultados finales, no intermedios
	recognition.continuous = true; 					// Finaliza despues de cada frase

	// Evento cuando se recibe un resultado de la transcripción
	recognition.addEventListener('result', e => {

		// Constante que almacena el texto transcrito de voz a texto
		const texto = e.results[e.results.length - 1][0].transcript.trim();

		// Solo se agrgara contenido si se identifica contenido en español
		if (texto.trim()) {
			// Constante que almacena el texto a agregar al campo de texto
			const nuevoContenido = texto.toLowerCase();
			// Validacion si el campo de texto esta vacio
			if (textoMensajeUsuario.value.trim() === '') textoMensajeUsuario.value = nuevoContenido;
			// Validacion si hay contenido y termina en un espacio
			else if (textoMensajeUsuario.value.trim().endsWith(' ')) textoMensajeUsuario.value += nuevoContenido;
			// Validacion si hay contenido y no termina en un espacio
			else textoMensajeUsuario.value += ' ' + nuevoContenido;
		}
	});

	// Evento que identidica cuando termina la frase que se esta grabando
	recognition.addEventListener('end', () => {

		// Funcionamiento similar de desktop en mobile (Reinicio de grabacion)
		// isRecognizing ? recognition.start() : botonGrabarAudio.innerText = 'Iniciar transcripción';

		if (isRecognizing) {
			isRecognizing = false;																		// Bandera que indica que se deja de grabar
			botonGrabarAudio.innerText = 'Iniciar transcripción';			// Texto del boton al dejar de grabar
		}
	});

	// Iniciar el reconocimiento de voz
	recognition.start();																				// Comienza el reconocimiento de voz
	isRecognizing = true;																				// Bandera que indica que se comienza a grabar
	botonGrabarAudio.innerText = 'Detener transcripción'; 			// Texto del boton al comenzar a grabar
};

// Funcion que detiene la grabacion del audio
const detenerGrabacion = () => {
	if (recognition) {
		recognition.stop();																				// Se detiene el reconocimiento de voz
		isRecognizing = false;																		// Bandera que indica que se deja de grabar
		botonGrabarAudio.innerText = 'Iniciar transcripción'; 		// Texto del boton al dejar de grabar
	}
};

const grabacion = (e) => {
	e.preventDefault(); 																				// Evitar comportamiento predeterminado en touch
	isRecognizing ? detenerGrabacion() : iniciarGrabacion();		// Validacion de bandera Grabar/Detener
};

// Eventos al interactuar con el boton
botonGrabarAudio.addEventListener('click', grabacion);			// Desktop
botonGrabarAudio.addEventListener('touchend', grabacion);		// Mobil
