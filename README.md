# Árvore de palavras

## Descrição

Este projeto é uma aplicação web que permite ao usuário criar uma hierarquia de palavras, exibi-la de forma visual e salvar a estrutura em um arquivo JSON.

## Funcionalidades

- Adicionar múltiplos níveis de palavras.
- Exibir a hierarquia visualmente.
- Salvar a hierarquia como um arquivo JSON.
- Baixar o arquivo JSON gerado.

## Como Rodar

1. Clone o repositório:
`git clone <repo_url>`

2. Instale as dependências:
`npm install`

3. Inicie o servidor de desenvolvimento:
`npm run dev`

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Testes

Execute os testes com o comando:
`npm test`

## Exemplo de Uso

Se o usuário adicionar as seguintes palavras:

- Animais como categoria raiz.
- Mamíferos como subcategoria de Animais.
- Leões como palavra na subcategoria Mamíferos.

A estrutura gerada seria:

~~~ JSON
{
  "Animais": {
    "Mamíferos": [
      "Leões"
    ]
  }
}
~~~

### Caminho Personalizado

Caminho: No campo de caminho, o usuário pode especificar algo como "Animais.Mamíferos" para inserir uma palavra dentro de Mamíferos.
