# Amigo Oculto

## Descrição
Esta é uma API back-end desenvolvida em Node.js e Express para facilitar a organização de eventos de Amigo Oculto. Ela oferece várias funções, incluindo:

- Criar usuário
- Criar grupo
- Entrar em grupo
- Permitir a entrada em seu grupo
- Sortear os amigos ocultos
- Mostrar seus amigos ocultos em vários grupos
- Mostrar grupos dos quais você é o dono
- Adicionar imagem ao grupo

## Instalação

Primeiro, instale as dependências necessárias com o seguinte comando:

```bash
npm i
```

Em seguida, crie uma pasta chamada `.env` e adicione a seguinte linha:

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Após a configuração do Prisma, envie o schema para o banco de dados com o comando:

```bash
npx prisma db push
```

Em seguida, gere o Prisma Client com:

```bash
npx prisma generate
```

Finalmente, inicialize o servidor com:

```bash
npm run dev
```

## Testes

Existem alguns testes prontos disponíveis em `./insomnia-tests/Insomnia_2023-12-15.json`. Você pode importá-los para o Insomnia e executá-los para testar a funcionalidade da API.

## Licença

Este projeto está licenciado sob a licença MIT.
