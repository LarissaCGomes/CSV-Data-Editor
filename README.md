# 📊 CSV Data Editor

## 🚀 Visão Geral
O **CSV Data Editor** é uma aplicação web desenvolvida para facilitar a validação, correção e envio de arquivos `.csv` para um banco de dados PostgreSQL. O projeto atende laboratórios de sensoriamento remoto da qualidade da água no Brasil, que lidam com grandes volumes de dados coletados em campo.

---

## ✨ Funcionalidades Principais
- **Upload de arquivos CSV**
- **Validação automática** dos dados conforme um padrão predefinido
- **Identificação e marcação de erros** (ex.: formatação incorreta, tipo de dado incompatível, nomes de colunas errados)
- **Correção manual** dos erros detectados
- **Exibição dos dados em formato de tabela** (estilo Excel)
- **Geração de relatórios** sobre os erros encontrados e correções realizadas
- **Download e envio por e-mail** dos relatórios
- **Verificação final** dos dados corrigidos
- **Facilidade no envio dos dados para o banco PostgreSQL**

---

## 🛠️ Tecnologias Utilizadas
### Backend
- **Python** (API e validação de dados)
- **PostgreSQL** (Banco de Dados)

### Frontend
- **React** + **Vite** (Interface interativa)
- **Tailwind CSS** (Estilização)

### Outros
- **Docker** (Containerização)
- **GitHub Actions** (CI/CD)

---

## 🏗️ Estrutura do Projeto
```
📦 csv-data-editor  
├── 📂 backend               # Código (API, Banco de Dados)  
│   ├── 📂 models            # Definição das tabelas do PostgreSQL  
│   ├── 📂 routes            # Rotas da API  
│   ├── 📂 services          # Lógica de validação e correção de CSV  
│   ├── 📂 utils             # Funções auxiliares  
│   ├── requirements.txt     # Dependências do backend  
│
├── 📂 frontend              # Código do React + Vite  
│   ├── 📂 components        # Componentes reutilizáveis  
│   ├── 📂 pages             # Páginas principais  
│   ├── 📂 services          # Conexão com o backend  
│   ├── main.jsx             # Entrada do React  
│
├── 📂 database              # Scripts SQL para modelagem do banco  
│   ├── init.sql             # Criação de tabelas  
│
├── 📂 docs                  # Documentação do projeto  
│   ├── README.md            # Visão geral do projeto  
│   ├── API.md               # Documentação das rotas da API  
│
├── docker-compose.yml       # Configuração para rodar backend + frontend  
├── LICENSE                  # Licença do projeto  
└── README.md                # Descrição geral do repositório  
```

---

## 🚀 Como Rodar o Projeto
### 🖥️ Requisitos
- **Python 3.10+**
- **Node.js 18+**

### 🔧 Passo a Passo
#### 1️⃣ Clone o repositório
```bash
$ git clone https://github.com/seu-usuario/csv-data-editor.git
$ cd csv-data-editor
```

#### 2️⃣ Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e defina as configurações do banco de dados e servidor.

##### Frontend
```bash
$ cd frontend
$ npm install
$ npm run dev
```

---

## 📜 Licença
Este projeto está licenciado sob a **MIT License**. Sinta-se à vontade para usá-lo e contribuir! 🚀

