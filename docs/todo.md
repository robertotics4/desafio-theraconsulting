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
- [ ] Criar endpoints para:
  - [ ] Criar um produto.
  - [ ] Listar produtos.
  - [ ] Editar produto.
  - [ ] Deletar produto.

#### **Service**
- [ ] Implementar regras de negócio:
  - [ ] Validação dos campos obrigatórios.
  - [ ] Atualizar estoque.
  
#### **Repository**
- [ ] Implementar manipulação do banco:
  - [ ] Inserção.
  - [ ] Consulta.
  - [ ] Atualização.
  - [ ] Remoção.

---

### **3. Funcionalidades - Pedidos**
#### **Controller**
- [ ] Criar endpoints para:
  - [ ] Criar um pedido.
  - [ ] Listar pedidos.

#### **Service**
- [ ] Implementar regras de negócio:
  - [ ] Calcular `total_pedido`.
  - [ ] Verificar disponibilidade no estoque.
  - [ ] Atualizar o estoque após conclusão do pedido.
  - [ ] Alterar status do pedido (Pendente, Concluído, Cancelado).

#### **Repository**
- [ ] Implementar manipulação do banco:
  - [ ] Inserção.
  - [ ] Consulta.

---

### **4. Middleware**
- [ ] Criar middleware para log de requisições:
  - [ ] Registrar o método HTTP, endpoint, e data/hora.

---

### **5. Autenticação (Extra)**
- [ ] Implementar autenticação com JWT.
  - [ ] Rota para login.
  - [ ] Middleware para proteger rotas.

---

### **6. Documentação**
- [ ] Configurar Swagger para documentação da API:
  - [ ] Listar endpoints.
  - [ ] Adicionar exemplos de payload e responses.

---

### **7. Docker**
- [x] Criar um Dockerfile.
- [x] Criar um arquivo docker-compose.yml:
  - [x] Configurar o banco de dados e a aplicação.

---

## 🧪 Testes
- [ ] Escrever testes unitários:
  - [ ] Testar Service de Produtos.
  - [ ] Testar Service de Pedidos.

---

## 🛠️ Refinamento
- [ ] Revisar o código para aderência aos princípios do SOLID.
- [ ] Testar manualmente todas as funcionalidades da API.
- [ ] Melhorar mensagens de erro e validações.

---

## ✅ Entrega
- [ ] Garantir que o README.md contenha:
  - [ ] Instruções para rodar a aplicação.
  - [ ] Exemplos de uso da API.
- [ ] Subir o código para o repositório (ex.: GitHub).
- [ ] Testar a aplicação em ambiente Docker.
