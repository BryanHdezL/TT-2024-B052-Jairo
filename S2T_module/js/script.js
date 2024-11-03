const toggle_button = document.getElementById('toggle_button');
const convert_text = document.getElementById('convert_text');

let recognition;
let isRecognizing = false;

toggle_button.addEventListener('click', function() {
    if (!isRecognizing) {
        // Iniciar el reconocimiento de voz
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        recognition = new SpeechRecognition();
        recognition.lang = "es-MX";
        recognition.interimResults = true;
        recognition.continuous = true; // Mantener la escucha activa indefinidamente

        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            convert_text.value = transcript;
        });

        recognition.addEventListener('end', () => {
            if (isRecognizing) {
                recognition.start(); // Reiniciar el reconocimiento si está activo
            }
        });

        recognition.start();
        isRecognizing = true;
        toggle_button.innerText = 'Stop';
    } else {
        // Detener el reconocimiento de voz
        recognition.stop();
        isRecognizing = false;
        toggle_button.innerText = 'Start transcribing';
    }
});
