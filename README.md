# 🎲 Desafio Onfly: Conector n8n para Geração de Números Aleatórios

Este é um conector (`custom node`) para a plataforma n8n, desenvolvido como solução para o desafio técnico do processo seletivo de estágio da Onfly.

## 📄 Sobre o Projeto

O projeto consiste em um conector para o n8n que simplifica a geração de números aleatórios verdadeiros, utilizando a API pública do `random.org`.

O desenvolvimento foi guiado pelos seguintes princípios:

- **Ambiente Simples e Replicável:** Uso do Docker Compose para que qualquer pessoa possa executar o projeto com poucos comandos.
- **Código Robusto:** Implementação de validações e tratamento de erros para garantir uma experiência de usuário confiável.
- **Documentação Clara:** Um `README` completo e direto ao ponto para que o projeto seja fácil de entender, executar e testar.

## ✨ Funcionalidades Principais

- **Geração de Número Aleatório:** Conecta-se à API do `random.org` para buscar um número criptograficamente seguro.
- **Parâmetros Configuráveis:** Permite que o usuário defina um valor **mínimo** e **máximo** para o intervalo.
- **Validação de Entradas:** Garante que o valor mínimo não seja maior que o máximo.
- **Tratamento de Casos de Borda:** Retorna o próprio número se `mínimo` e `máximo` forem iguais. Isso garante o comportamento correto para um intervalo inclusivo e torna o nó mais eficiente.
- **Tratamento de Erros da API:** Captura e exibe erros de comunicação com a API de forma clara na interface do n8n.
- **Ícone Personalizado:** Um ícone SVG para fácil identificação do nó.

## 🛠️ Tecnologias Utilizadas

- **n8n:** Plataforma de automação de workflows.
- **Docker & Docker Compose:** Para criar e gerenciar o ambiente da aplicação (n8n + PostgreSQL).
- **PostgreSQL:** Banco de dados para a instância do n8n.
- **Node.js & TypeScript:** Para o desenvolvimento do conector.
- **Git & GitHub:** Para versionamento do código.

## 🚀 Como Executar Localmente

### Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) versão 22 (LTS) ou superior
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/guimeyer2/Onfly-N8N-Challenge.git
    cd Onfly-N8N-Challenge
    ```

2.  **Instale as dependências do custom node:**

    ```bash
    cd .n8n-custom
    npm install
    npm run build
    cd ..
    ```

3.  **Inicie os serviços:**
    Este comando inicia os containers do n8n e do PostgreSQL em segundo plano.

    ```bash
    docker-compose up -d
    ```

4.  **Acesse o n8n:**
    Aguarde um instante para os serviços iniciarem. A instância do n8n estará disponível no seu navegador em **[http://localhost:5678](http://localhost:5678)**.
    _(Na primeira vez, você precisará configurar uma conta de administrador)._

## 🧪 Como Usar o Conector no n8n

1.  Dentro da interface do n8n, crie um novo workflow.
2.  Clique no botão `+` para adicionar um novo nó.
3.  Na barra de busca, pesquise por "**Random**".
4.  Selecione o nó, defina os valores de "Minimum Value" e "Maximum Value".
5.  Clique em **"Execute step"** para ver o número aleatório gerado na aba "OUTPUT".

## 📁 Estrutura do Projeto

```
Onfly-N8N-Challenge/
├── 📄 docker-compose.yml          # Configuração Docker (N8N + PostgreSQL)
├── 📄 README.md                   # Esta documentação
└── 📁 .n8n-custom/                # Package do custom node
    ├── 📁 nodes/Random/
    │   ├── 🎲 Random.node.ts       # Implementação do node
    │   └── 🎨 icon.svg             # Ícone SVG personalizado
    ├── 📄 package.json             # Dependências e configuração npm
    ├── 📄 tsconfig.json            # Configuração TypeScript
    ├── 📄 gulpfile.js              # Build tasks
    └── 📁 dist/                    # Arquivos compilados
```

## 🐳 Configuração do Ambiente Docker

O projeto utiliza Docker Compose com:

### Serviços

- **N8N**: `n8nio/n8n:latest` (versão 1.85.4)
- **PostgreSQL**: `postgres:14`

### Variáveis de Ambiente

- `DB_TYPE=postgresdb`
- `DB_POSTGRESDB_HOST=postgres`
- `DB_POSTGRESDB_PORT=5432`
- `DB_POSTGRESDB_DATABASE=n8n`
- `DB_POSTGRESDB_USER=n8n`
- `DB_POSTGRESDB_PASSWORD=n8n`
- `N8N_CUSTOM_EXTENSIONS=/home/node/custom_nodes`

### Volume Mapping

- `./.n8n-custom:/home/node/custom_nodes` (Custom nodes)
- `db_data:/var/lib/postgresql/data` (Dados PostgreSQL)

## 🛠️ Comandos Úteis

### Desenvolvimento do Custom Node

```bash
# Navegar para a pasta do custom node
cd .n8n-custom

# Instalar dependências
npm install

# Build do projeto
npm run build

# Watch mode para desenvolvimento
npm run dev

# Linting
npm run lint

# Fix automático de lint
npm run lintfix

# Formatação de código
npm run format
```

### Gerenciamento Docker

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Reiniciar apenas o N8N
docker-compose restart n8n

# Ver logs em tempo real
docker-compose logs -f n8n

# Ver status dos containers
docker-compose ps
```

## 🔧 Detalhes Técnicos

### API Integration

O node utiliza o endpoint específico do Random.org:

```typescript
GET https://www.random.org/integers/?num=1&min={min}&max={max}&col=1&base=10&format=plain&rnd=new
```

### Validações Implementadas

- ✅ **min > max**: Erro com mensagem clara
- ✅ **min = max**: Retorna o valor diretamente (sem chamada à API)
- ✅ **Resposta da API**: Valida se o retorno é um número válido
- ✅ **Error Handling**: Try/catch com suporte a `continueOnFail()`

### Tecnologias do Custom Node

- **TypeScript** ^5.8.2
- **N8N Workflow** API
- **ESLint** para qualidade de código
- **Prettier** para formatação
- **Gulp** para build tasks

## 👤 Autor

**Guilherme Meyer**

- 📧 Email: guimeygui@gmail.com

---

## 📝 Licença

MIT

---
