Be3 Pacientes — Frontend (Angular)
🧩 Sobre o projeto

Este repositório contém o frontend do sistema Be3 Pacientes, desenvolvido em Angular 17 + PrimeNG.

O objetivo deste projeto é demonstrar domínio de:

Arquitetura Angular moderna

Componentização

Uso de serviços e HttpClient

Validações de formulários

Boas práticas de UX/UI

Integração real com API backend

Para possibilitar testes reais e fluxo completo de CRUD, um backend em .NET foi criado especialmente para este desafio, atuando apenas como apoio (não fazia parte do escopo original do teste).

➡️ Backend de apoio ao projeto:
https://github.com/antoniolispbr/be3-health-backend

🚀 Tecnologias Utilizadas

Angular 17

PrimeNG 17

RxJS

TypeScript

Angular Forms (Template-Driven ou Reactive, dependendo da tela)

HttpClient

PrimeFlex / CSS

📂 Estrutura do Projeto
src/
│
├─ app/
│  ├─ core/            # Serviços centrais
│  ├─ features/
│  │   └─ pacientes/   # Módulo principal deste desafio
│  ├─ shared/          # Componentes utilitários
│  └─ app.routes.ts
│
├─ assets/
└─ environments/

▶️ Como executar
1. Instale dependências
npm install

2. Suba o servidor de desenvolvimento
npm start


Aplicação disponível em:

http://localhost:4200


A cada alteração, o Angular recarregará automaticamente.

🔗 Integração com Backend

Este frontend se comunica com o backend em .NET através de chamadas REST.

A URL padrão da API está configurada no arquivo:

src/environments/environment.ts


Exemplo esperado:

export const environment = {
  apiBase: 'http://localhost:5001/api'
};

📦 Build de Produção

Gera os artefatos otimizados:

ng build


Arquivos gerados ficarão em:

dist/

🧪 Testes

Caso necessário:

Testes unitários
ng test

Testes end-to-end

(somente se adicionados pacotes como Cypress, Playwright ou Protractor)

ng e2e

🌟 Diferenciais Entregues

Integração completa com backend real

Arquitetura organizada em módulos

Separação clara de camadas (serviços, páginas, modelos)

Uso extensivo de PrimeNG com foco em boa UX

Códigos limpos e organizados

Controle de estado simples e eficiente via Angular Services

✔️ Conclusão

Este projeto entrega:

Todas as funcionalidades propostas para o desafio de frontend

Integração real com API

Boas práticas de UI/UX com PrimeNG

Código organizado, limpo e escalável

Backend adicional em .NET como plus para demonstrar visão full-stack e autonomia

Obrigado pela oportunidade! 🙌
