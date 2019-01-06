const commander = require('commander');
const baseDeDados = require('./baseDeDados');

async function principal() {
  commander
    .version('v1')
    .option('-n, --nome <valor>', 'Nome do herói.')
    .option('-p, --poder <valor>', 'Poder do herói.')
    .option('-c, --cadastrar', 'Cadastrar um herói.')
    .option('-l, --listar', 'Lista dados de um herói.')
    .option('-a, --atualizar <id>', 'Atualiza dados de um herói.')
    .option('-r, --remover', 'Remove um herói.')
    .option('-i, --id <valor>', 'ID do herói.')
    .parse(process.argv);

  const dados = {
    nome: commander.nome,
    poder: commander.poder
  };

  try {
    if (commander.cadastrar) {
      const resultado = await baseDeDados.cadastrar(dados);

      return resultado ?
        console.log('Herói cadastrado com sucesso! =)') :
        console.error('Não foi possível cadastrar o herói. :(');
    }

    if (commander.listar) {
      const resultado = await baseDeDados.listar(commander.id);
      console.log(resultado);
    }

    if (commander.remover) {
      const resultado = await baseDeDados.remover(commander.id);

      return resultado ?
      console.log('Herói(s) removido(s) com sucesso! =)') :
      console.error('Não foi possível remover o(s) herói(s). :(');
    }

    if (commander.atualizar) {
      const id = commander.atualizar;
      const modificacoes = JSON.parse(JSON.stringify(dados));
      const resultado = await baseDeDados.atualizar(id, modificacoes);

      return resultado ?
      console.log('Dados do herói atualizados com sucesso! =)') :
      console.error('Não foi possível atualizar os dados do herói. :(');
    }
  } catch (erro) {
    console.error(erro);
  }
}

principal();
