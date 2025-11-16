Be3 Pacientes — Frontend (Angular)
Frontend Application for Patient Management — Corporate Delivery
1. Overview

Este repositório contém o frontend oficial do módulo de Pacientes do sistema Be3 Health.
A aplicação foi desenvolvida utilizando Angular 17 e PrimeNG, seguindo boas práticas de arquitetura, componentização, modularização e organização de código recomendadas para produtos corporativos.

Embora o desafio técnico fosse exclusivamente focado no frontend, foi desenvolvido também um backend em .NET, utilizado somente como serviço de apoio para permitir testes funcionais reais (CRUD completo).

🔗 Backend de apoio (opcional para execução):
https://github.com/antoniolispbr/be3-health-backend

2. Objetivos da Solução

A proposta deste projeto é demonstrar:

Implementação de interface moderna, responsiva e organizada

Arquitetura Angular consistente com padrões corporativos

Fluxos completos de CRUD com tratamento de erros

Consumo de APIs REST e integração real com backend

Clareza, simplicidade e escalabilidade no código

Domínio de PrimeNG, Angular Forms e gerenciamento de estado via Services

3. Tecnologias & Frameworks
Tecnologia	Versão	Utilização
Angular	17	Core da aplicação SPA
PrimeNG	17	Componentes UI corporativos
RxJS	—	Operações assíncronas e reatividade
TypeScript	—	Tipagem estática e robustez
PrimeFlex	—	Layout responsivo
HttpClient	—	Comunicação com o backend
Angular CLI	—	Automação e scaffolding
4. Arquitetura do Projeto

A aplicação segue uma estrutura organizada, facilitando manutenção, escalabilidade e evolução futura:

src/
├─ app/
│  ├─ core/                 # Serviços centrais, interceptors, providers globais
│  ├─ features/
│  │   └─ pacientes/        # Módulo principal do desafio
│  ├─ shared/               # Componentes e utilitários reaproveitáveis
│  ├─ app.routes.ts         # Sistema de rotas
│  └─ app.config.ts         # Configurações gerais da aplicação
│
├─ assets/                  # Arquivos estáticos
└─ environments/            # Configurações por ambiente (dev/prod)


Princípios aplicados:

Separação clara de responsabilidades

Componentes enxutos e reutilizáveis

Camada de serviço isolada para comunicação com API

Estrutura de módulos organizada conforme padrões de grandes empresas

5. Como Executar (Development Mode)
1. Instalar dependências
npm install

2. Subir o servidor de desenvolvimento
npm start


Aplicação disponível em:

http://localhost:4200


A aplicação possui live-reload automático ao alterar arquivos.

6. Integração com API

A URL base da API é configurada em:

src/environments/environment.ts


Exemplo:

export const environment = {
  apiBase: 'http://localhost:5001/api'
};


Todas as operações CRUD (listar, criar, editar e excluir pacientes) são executadas via HttpClient com tratamento apropriado de erros.

7. Build para Produção

Gerar build otimizado:

ng build


Os artefatos serão criados em:

dist/


A build é adequada para pipelines CI/CD corporativas.

8. Testes Automatizados (Opcional)

A solução é compatível com:

Testes unitários (Karma/Jasmine ou Jest)

Testes E2E com Cypress ou Playwright (caso adicionados)

Comando padrão:

ng test

9. Diferenciais Entregues

Este projeto apresenta os seguintes diferenciais, relevantes em contextos corporativos:

✔️ Integração real com backend

✔️ Código limpo, organizado e modular

✔️ Camadas bem definidas (UI / Service / Models)

✔️ Uso adequado de PrimeNG e Angular Forms

✔️ Arquitetura escalável pronta para evolução

✔️ Backend adicional em .NET criado proativamente

✔️ Documentação clara e aderente a padrões corporativos

10. Conclusão

O projeto cumpre integralmente os requisitos funcionais do desafio de frontend e entrega uma solução:

estável,

clara,

organizada,

escalável

e alinhada às práticas adotadas por empresas de médio e grande porte.

A inclusão de um backend completo em .NET demonstra autonomia, versatilidade e capacidade de aprendizado rápido, agregando valor ao processo de avaliação técnica.

Obrigado pela oportunidade!
👋
