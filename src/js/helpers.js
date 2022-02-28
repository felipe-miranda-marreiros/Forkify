import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    /**
     * Guardamos o conteúdo da API em uma variável chamada response. O fetch é precedido de await.
     */
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    /**
     * Formatamos o conteúdo do fetch (que vem em string), em formato json(), conforme a variável abaixo.
     */
    const data = await response.json();

    /**
     * Se o conteúdo do response tiver algum erro, nós usamos o if abaixo para mostrar ao usuário o conteúdo do erro.
     *
     * response.ok é um valor booleano que apresenta true ou false. True significa que a conexão foi feita com sucesso e False ocorreu algum erro.
     *
     * data.message é o status do conteúdo da API.
     *
     */
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
