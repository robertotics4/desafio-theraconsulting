# Todo List - API de Gerenciamento de Pedidos e Produtos

## ✅ Planejamento
- [x] Ler a descrição do desafio para entender os requisitos.
- [x] Escolher banco de dados (relacional ou não relacional).
- [x] Configurar o ambiente de desenvolvimento.

---

## 🏗️ Desenvolvimento

### **1. Configurações Iniciais**
- [x] Criar um novo projeto NestJS.
- [x] Configurar o banco de dados (relacional ou não relacional).
- [x] Criar a estrutura inicial de camadas (Controller, Service, Repository).
- [x] Configurar e testar conexão com o banco de dados.

---

### **2. Funcionalidades - Produtos**
#### **Controller**
- [x] Criar endpoints para:
  - [x] Criar um produto.
  - [x] Listar produtos.
  - [x] Editar produto.
  - [x] Deletar produto.

#### **Service**
- [x] Implementar regras de negócio:
  - [x] Validação dos campos obrigatórios.
  - [x] Atualizar estoque.
  
#### **Repository**
- [x] Implementar manipulação do banco:
  - [x] Inserção.
  - [x] Consulta.
  - [x] Atualização.
  - [x] Remoção.

---

### **3. Funcionalidades - Pedidos**
#### **Controller**
- [x] Criar endpoints para:
  - [x] Criar um pedido.
  - [x] Listar pedidos.

#### **Service**
- [x] Implementar regras de negócio:
  - [x] Calcular `total_pedido`.
  - [x] Verificar disponibilidade no estoque.
  - [x] Atualizar o estoque após conclusão do pedido.
  - [x] Alterar status do pedido (Pendente, Concluído, Cancelado).

#### **Repository**
- [x] Implementar manipulação do banco:
  - [x] Inserção.
  - [x] Consulta.

---

### **4. Middleware**
- [x] Criar middleware para log de requisições:
  - [x] Registrar o método HTTP, endpoint, e data/hora.

---

### **5. Autenticação (Extra)**
- [x] Implementar autenticação com JWT.
  - [x] Rota para login.
  - [x] Middleware para proteger rotas.

---

### **6. Documentação**
- [x] Configurar Swagger para documentação da API:
  - [x] Listar endpoints.
  - [x] Adicionar exemplos de payload e responses.

---

### **7. Docker**
- [x] Criar um Dockerfile.
- [x] Criar um arquivo docker-compose.yml:
  - [x] Configurar o banco de dados e a aplicação.

---

## 🧪 Testes
- [x] Escrever testes unitários:
  - [x] Testar Service de Produtos.
  - [x] Testar Service de Pedidos.

---

## 🛠️ Refinamento
- [x] Revisar o código para aderência aos princípios do SOLID.
- [x] Testar manualmente todas as funcionalidades da API.
- [x] Melhorar mensagens de erro e validações.

---

## ✅ Entrega
- [ ] Garantir que o README.md contenha:
  - [ ] Instruções para rodar a aplicação.
  - [ ] Exemplos de uso da API.
- [ ] Subir o código para o repositório (ex.: GitHub).
- [ ] Testar a aplicação em ambiente Docker.
