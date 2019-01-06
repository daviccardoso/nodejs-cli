const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class BaseDeDados {
  constructor() {
    this.NOME_ARQUIVO = 'herois.json';
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
    return JSON.parse(arquivo.toString());
  }

  async gravarDadosArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo();
    const dadosFinal = [
      ...dados,
      {
        id: Date.now(),
        ...heroi
      }
    ];

    return await this.gravarDadosArquivo(dadosFinal);
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo();
    return dados.filter(heroi => id ? heroi.id === parseInt(id) : true);
  }

  async remover(id) {
    if (!id) {
      return await this.gravarDadosArquivo([]);
    }
    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex(heroi => heroi.id === parseInt(id));

    if (indice === -1) throw new Error('O usuário informado não existe.');
    dados.splice(indice, 1);
    return await this.gravarDadosArquivo(dados);
  }

  async atualizar(id, dadosAtualizados) {
    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex(heroi => heroi.id === parseInt(id));

    if (indice === -1) throw new Error('O usuário informado não existe.');

    const registroAtualizado = {
      ...dados[indice],
      ...dadosAtualizados
    };

    dados.splice(indice, 1);
    return await this.gravarDadosArquivo([...dados, registroAtualizado]);
  }
}

module.exports = new BaseDeDados();
