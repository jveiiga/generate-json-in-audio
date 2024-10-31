// Armazenar referências dos áudios em execução
const audioElements = {};

// Função para gerar a lista de áudios
function gerarListaDeAudios(audiosComData) {
    const audioListDiv = document.getElementById('audioList');
    audioListDiv.innerHTML = ''; // Limpa a lista anterior

    audiosComData.forEach(audio => {
        const audioItem = document.createElement('div');
        audioItem.classList.add('audio-item');
        audioItem.innerHTML = `
            <span>${audio.name}</span>
            <span class="play-button" onclick="reproduzirAudio('${audio.id}', '${audio.data}')"> ▶ Reproduzir</span>
            <span class="pause-button" onclick="pausarAudio('${audio.id}')"> ❚❚ Pausar</span>
            <a class="download-button" href="${audio.data}" download="${audio.name.trim()}.mp3"> ⬇ Baixar</a>
        `;
        audioListDiv.appendChild(audioItem);
    });
}

// Função para reproduzir áudio
function reproduzirAudio(audioId, audioData) {
    // Verifica se já existe um áudio em execução e pausa se necessário
    if (audioElements[audioId]) {
        audioElements[audioId].pause(); // Pausa o áudio atual
    }

    if (audioData) {
        const audioElement = new Audio(audioData);
        audioElements[audioId] = audioElement; // Armazena a referência do áudio
        audioElement.play()
            .then(() => {
                console.log(`Reproduzindo: ${audioId}`);
            })
            .catch(err => {
                console.error('Erro ao reproduzir áudio:', err);
            });
    } else {
        console.error('O áudio não contém dados.');
    }
}

// Função para pausar áudio
function pausarAudio(audioId) {
    if (audioElements[audioId]) {
        audioElements[audioId].pause(); // Pausa o áudio se estiver em execução
        console.log(`Pausando: ${audioId}`);
    } else {
        console.error('Nenhum áudio em execução para pausar.');
    }
}

// Função para carregar o JSON e gerar áudio
function carregarJsonEGerarAudio() {
    fetch('dados.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.audiosIndex && data.audiosIndex.length > 0) {
                // Mapeia os dados de objectsList pelo ID
                const audioDataMap = {};
                data.objectsList.forEach(object => {
                    if (object.data) {
                        audioDataMap[object.id] = object.data; // Mapeia pelo ID
                    }
                });

                // Adiciona a chave data nos objetos de audiosIndex
                const audiosComData = data.audiosIndex.map(audio => ({
                    ...audio,
                    data: audioDataMap[audio.id] || null // Adiciona data, se disponível
                }));

                gerarListaDeAudios(audiosComData); // Gera a lista de áudios
            } else {
                console.error('Nenhum áudio encontrado no JSON.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// Carrega os áudios ao carregar a página
carregarJsonEGerarAudio();