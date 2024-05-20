## Testes unitários e de integração: Sistema de Gerenciamento de Alunos
---

Esse projeto é um estudo de como funcionam os testes unitários e de integração, que são peças fundamentais de qualquer sistema. 
Com eles é possível ter um melhor controle do que está sendo desenvolvido e verificar se cada pedaço do código está funcionando corretamente, assim o sistema como um todo.
Abaixo estão informações importantes que você precisará saber para executar o projeto!


### Instalação

#### Requisitos Prévios

Certifique-se de ter o Node.js e o MySQL ou Dbeaver instalados em sua máquina. No meu caso, utilizei o Dbeaver por ter mais familiaridade com ele, mas você
pode utilizar qualquer software de sua preferência que contenha o mysql.

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/danibenfica/Testes-Unitarios-E-De-Integracao.git
   ```

2. **Instalar Dependências:**
   ```bash
   cd Testes-Unitarios-E-De-Integracao
   yarn install
   ```

3. **Configurar o Banco de Dados:**
   - Crie um banco de dados MySQL chamado `dbaluno`.
   - Configure as credenciais do banco de dados no arquivo `knexfile.js` na raiz do projeto.

4. **Executar as Migrações:**
   ```bash
   npx knex migrate:latest
   ```

5. **Iniciar o Servidor:**
   ```bash
   yarn start
   ```

---

### Testes

#### Testes Unitários

Os testes unitários são realizados para testar unidades individuais de código, como funções e métodos, de forma isolada. Eles são implementados utilizando a biblioteca Jest.

1. **Executar Testes Unitários:**
   ```bash
   yarn test:unit
   ```

#### Testes de Integração

Os testes de integração garantem que diferentes partes do sistema funcionem corretamente juntas. Eles verificam se os componentes integrados se comunicam e se comportam conforme o esperado. Os testes de integração são realizados utilizando a biblioteca Supertest.

1. **Executar Testes de Integração:**
   ```bash
   yarn test:int
   ```
Para executar todos os testes, utilize o seguinte comando:

```bash
yarn test
```
Também é possível testar os endpoints da API em algum software como postman ou insomnia, abaixo estão exemplos de como você poderá testar cada rota:

### Exemplos

1. **Listar todos os alunos:**
   ```http
   GET http://localhost:3000/aluno
   ```

2. **Buscar um aluno por ID:**
   ```http
   GET http://localhost:3000/aluno/1
   ```

3. **Cadastrar um novo aluno:**
   ```http
   POST http://localhost:3000/aluno
   Content-Type: application/json

   {
       "nome": "Nome do Aluno",
       "cpf": "123.456.789-00"
   }
   ```

4. **Atualizar dados de um aluno:**
   ```http
   PUT http://localhost:3000/aluno/1
   Content-Type: application/json

   {
       "nome": "Novo Nome do Aluno"
   }
   ```

5. **Deletar um aluno:**
   ```http
   DELETE http://localhost:3000/aluno/1
   ```
Neste caso, utilizamos a porta 3000, mas você pode utilizar a porta de sua preferência modificando no arquivo server.ts neste trecho de código:

```
app.listen(suaPortaAqui, () => {
  console.log('Servidor conectado!');
});
```

Abaixo, está uma explicação mais detalhada do que são os testes unitários e de integração e de como são utilizados.
E claro, também há exemplos de como você pode criar seu próprio teste no projeto!

Os testes unitários e os testes de integração são duas abordagens fundamentais para garantir a qualidade e robustez do software, mas diferem em seus objetivos e escopos:

1. **Testes Unitários**:
   - Os testes unitários são responsáveis por verificar unidades individuais de código, como funções, métodos ou classes, de forma isolada.
   - Eles são executados sem depender de outras partes do sistema e não interagem com recursos externos, como bancos de dados ou serviços da web.
   - O principal objetivo dos testes unitários é garantir que cada unidade de código funcione corretamente de acordo com suas especificações, verificando seu comportamento esperado em diferentes cenários.
   - Esses testes são rápidos de serem executados e fornecem feedback imediato sobre a integridade das unidades de código testadas.
  
## Mock
  
Um "mock" é um objeto simulado que substitui uma dependência real durante a execução de testes de unidade. Ele simula o comportamento da dependência real, permitindo que o código 
seja testado de forma isolada, sem depender de recursos externos ou de outras partes do sistema. Os mocks são usados para imitar o comportamento de objetos ou componentes que não 
são essenciais para o teste em questão, mas são necessários para que o código seja executado.

**O que ele faz:**
- Um mock reproduz o comportamento de uma dependência real, permitindo que os testes de unidade sejam executados sem depender de recursos externos.
- Ele permite que os desenvolvedores controlem e prevejam o comportamento da dependência simulada, definindo retornos específicos para chamadas de métodos e verificando interações com o mock durante o teste.

**Exemplo no projeto:**

No arquivo `aluno.model.spec.ts` os mocks são usados para simular o comportamento do serviço de banco de dados (`knexService`).

```typescript
import { Aluno } from "../aluno.model";
import { KnexService } from "../../service/knex";

describe('Unit Aluno model suite', () => {
    it('deve retornar a listagem de alunos', async () => {

        // Criando um mock para o serviço de banco de dados
        const knexServiceMock: KnexService = {
            obterConexao: jest.fn().mockReturnValue({
                select: jest.fn().mockReturnValueOnce([])
            })
        };

        // Passando o mock como argumento para a instância de Aluno
        const aluno = new Aluno(knexServiceMock);

        // Executando o método que desejamos testar
        const response = await aluno.getAll();

        // Verificando se o método retorna o valor esperado
        expect(response).toBeTruthy();
        expect(response.length).toBe(0);
    });

});
```

Neste exemplo:
- Criamos um mock para o serviço de banco de dados `KnexService`, fornecendo implementações simuladas para os métodos necessários.
- Utilizamos esse mock ao instanciar a classe `Aluno` nos testes, em vez de usar a implementação real do serviço de banco de dados.
- Isso nos permite controlar e prever o comportamento do serviço de banco de dados durante os testes, garantindo que os testes sejam executados de forma isolada e confiável.

2. **Testes de Integração**:
   - Os testes de integração verificam a interação entre diferentes partes do sistema, garantindo que elas funcionem corretamente em conjunto.
   - Eles podem envolver a comunicação com bancos de dados, serviços externos, APIs ou outros sistemas, além de verificar a integração entre componentes internos do sistema.
   - O objetivo dos testes de integração é identificar problemas que surgem quando várias partes do sistema são combinadas, garantindo que elas se comuniquem e cooperem adequadamente.
   - Esses testes são mais lentos que os testes unitários, pois podem exigir configuração e acesso a recursos externos, além de cobrir uma gama mais ampla de funcionalidades.
  
  Exemplo:
  
1. **Teste: GET /aluno**
   - Este teste verifica se o endpoint GET `/aluno` retorna um código de status 200 e se o conteúdo da resposta está no formato JSON.
   - Espera-se também que a resposta contenha uma propriedade `data` que é uma lista de alunos com comprimento igual a 12, ou seja, há 12 alunos cadastrados no sistema.
   Exemplo:
   ```typescript
   it('GET /aluno', async () => {
       const response = await request('http://localhost:3000')
           .get('/aluno')

       expect(response.status).toBe(200)
       expect(response.headers['content-type']).toMatch('application/json')
       expect(response.body.data).toHaveLength(12)
   })
   ```

### Como criar seu próprio teste:

Você pode criar seus próprios testes a partir dos arquivos que já estão no projeto, por exemplo, vamos criar um novo teste de integração que deleta um aluno 
que não existe no sistema. Para isso, precisaremos de um id inválido. Vamos supor que há 7 membros cadastrados e iremos deletar o de id 8.

```typescript

it('##DELETE /deletar aluno com ID inexistente', async () => {
    const response = await request('http://localhost:3000')
        .delete('/aluno/8')

    expect(response.status).toBe(404)
    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.body.mensagem).toBe('Aluno não encontrado!')
})

```


Agora faremos também com um teste unitário. Neste caso, simularemos o cadastro de um aluno com dados inválidos. Enviaremos um array vazio para o banco de dados simulado.


```typescript
it('deve retornar erro ao salvar um aluno com dados inválidos', async () => {
    let knexServiceMock: any
    
    const knexMock = () => {
        return {
            insert: jest.fn().mockReturnValueOnce([]) // Simula falha na inserção
        }
    }

    knexServiceMock = {
        obterConexao: jest.fn(() => knexMock)
    }
    const aluno = new Aluno(knexServiceMock)
    const response = await aluno.dbaluno({
        // Dados inválidos
    })
    expect(response).toBeFalsy()
})
```

Os testes unitários e de integração desempenham papéis essenciais no desenvolvimento de software, garantindo a qualidade, confiabilidade e robustez do sistema como um todo. 
Ao seguir as práticas recomendadas e integrar testes adequados em seu fluxo de desenvolvimento, você pode identificar e corrigir problemas precocemente, reduzindo custos e 
melhorando a experiência do usuário.

Além disso, a utilização de mocks em testes unitários proporciona um ambiente controlado para testar unidades de código sem depender de recursos externos, 
facilitando a identificação e correção de bugs.

Ao criar seus próprios testes, lembre-se de considerar uma variedade de cenários, incluindo casos de sucesso, casos de borda e falhas, para garantir que seu sistema 
seja capaz de lidar com diferentes situações de forma eficaz e consistente.
