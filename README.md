# Testes de API bancária

Projeto de testes automatizados para endpoints de login e transferência bancária. Os testes enviam requisições para uma API em execução e validam os códigos HTTP e alguns dados das respostas.

## Requisitos

- Node.js e npm
- A API bancária em execução e acessível pela URL configurada em `BASE_URL`

## Bibliotecas

As dependências declaradas em `package.json` são:

| Biblioteca | Uso |
| --- | --- |
| [Mocha](https://mochajs.org/) | Executa os testes automatizados. |
| [Chai](https://www.chaijs.com/) | Fornece as asserções usadas para validar as respostas. |
| [Supertest](https://github.com/ladjs/supertest) | Envia requisições HTTP para a API. |
| [dotenv](https://github.com/motdotla/dotenv) | Carrega variáveis de ambiente a partir de um arquivo `.env`. |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | Gera o relatório HTML da execução dos testes. |

## Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto e informe a URL base da API:

```env
BASE_URL=http://localhost:3000
```

Substitua o endereço de exemplo pela URL e porta em que a API está disponível. O projeto usa `BASE_URL` para enviar as requisições.

As credenciais enviadas no login estão em `fixtures/postLogin.json`. Atualize esse fixture para usar credenciais válidas no ambiente de teste. Embora o teste de transferência leia `USERNAME` e `PASSWORD` do ambiente, o helper de autenticação atualmente monta o corpo do login a partir do fixture JSON; portanto, essas variáveis não substituem os valores do fixture.

Use apenas credenciais de teste e evite incluir credenciais reais ou sensíveis no repositório.

## Execução

Com a API disponível e a configuração pronta, execute todos os testes:

```bash
npm test
```

O comando usa o script `test` do `package.json`, executa os arquivos `test/**/*.test.js` com timeout de 200 segundos e gera um relatório Mochawesome em `mochawesome-report/mochawesome.html`.

## Testes cobertos

- **Login:** envio de credenciais ao endpoint `POST /login` e validação do status HTTP `200`.
- **Transferências:**
  - `POST /transferencias` com valor de R$ 10,00 ou superior, esperando status `201`.
  - `POST /transferencias` com valor abaixo de R$ 10,00, esperando status `422`.
  - `GET /transferencias/{id}`, validando o status e os dados esperados para o ID usado no teste.
  - `GET /transferencias?limite=10`, validando o limite e a quantidade de registros retornados.

Os testes de transferência pressupõem dados compatíveis já existentes na API, incluindo o registro consultado pelo ID utilizado no teste.
