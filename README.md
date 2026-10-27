# 🚀 Projeto FrontEnd — Monitoramento Hidrológico (Cogmo Technology)

Aplicação FrontEnd desenvolvida em ReactJS para o gerenciamento, visualização de séries históricas e análise de dados de estações hidrológicas, níveis de rios e índices pluviométricos (precipitação), conforme desafio proposto pela Cogmo Technology no contexto do programa Bolsa Futuro Digital (BFD).

---

## 🌐 Deploy da Aplicação

* 🔗 **FrontEnd (produção):** [https://monitoramento-hidrologico.vercel.app/](https://monitoramento-hidrologico.vercel.app/)
* 🔗 **BackEnd (API REST):** [https://api-cogmo-hidro.vercel.app/](https://api-cogmo-hidro.vercel.app/)

---

## 📦 Repositórios do Projeto

* 🔗 **FrontEnd (ReactJS + Vite):** [https://github.com/silver-ward/monitoramento-hidrologico](https://github.com/silver-ward/monitoramento-hidrologico)
* 🔗 **BackEnd (Node.js + Express):** [https://github.com/silver-ward/backend-monitoramento-hidrologico](https://github.com/silver-ward/backend-monitoramento-hidrologico)

---

## 🧭 Visão Geral do Projeto

* **Domínio:** Monitoramento Hidrológico e Telemetria Meteorológica
* **Entidades principais:** Estação Hidrológica, Medições (Nível do Rio), Precipitação e Transmissão
* **Objetivo:** Desenvolver uma aplicação FrontEnd moderna e responsiva com foco em Data Visualization (gráficos interativos de séries temporais), consumo de API REST e excelente usabilidade de navegação
* **Persistência:** Realizada via BackEnd (API REST)

---

## 🧰 Tecnologias Utilizadas

### FrontEnd
* ReactJS
* Vite
* JavaScript (ES6+)
* CSS3 (Design System customizado em tons de roxo/rosa)
* Recharts (Data Visualization / Gráficos interativos)
* Lucide React / Tabler Icons

### BackEnd (Integração)
* Node.js
* Express
* API REST
* Deploy em Vercel / Render

---

## 🎯 Desafio Atendido (Monitoramento e Análise)

O projeto atende integralmente ao desafio proposto, contemplando:

* ✅ Visualização Geral da Estação (Nível Atual, Precipitação e Status)
* ✅ Gráficos de Tendência Rápida e Séries Históricas
* ✅ Tabela Analítica de Medições com Filtros Temporais e Climáticos
* ✅ Responsividade completa com Menu Lateral (Drawer/Hambúrguer) para Mobile
* ✅ Modal Institucional de Contato ("Vamos Conversar?")

---

## 📋 Requisitos Funcionais (RF)

### Estações e Navegação
* **RF01** — Selecionar Estação Hidrológica
* **RF02** — Exibir metadados da estação (Município, Corpo Hídrico, Cota de Alerta e Fuso Horário)
* **RF03** — Navegar entre as páginas através da barra superior (Visão Geral, Histórico de Medições, Consulta de Medições)
* **RF04** — Alternar entre janelas de tempo temporais (12 Horas, 24 Horas, 48 Horas)
* **RF05** — Atualizar dados manualmente via botão de refresh

### Métricas e Gráficos
* **RF06** — Visualizar cartão com Último Nível Registrado e Horário da Medição
* **RF07** — Visualizar cartão com Precipitação Recente (mm/h)
* **RF08** — Visualizar Estado de Transmissão e indicador de cota segura
* **RF09** — Visualizar gráfico de Tendência Rápida do Nível (Últimas 24h) na Visão Geral
* **RF10** — Consultar Série Histórica completa do Nível do Rio (metros) em gráfico de área
* **RF11** — Consultar Série Histórica de Precipitação (mm/h) em gráfico de barras independentes com tooltip

### Consulta Analítica e Interações
* **RF12** — Visualizar Tabela Analítica de Medições com contagem de registros
* **RF13** — Filtrar medições da tabela (Todos, Com Chuva, Sem Chuva)
* **RF14** — Ordenar listagem por data e horário
* **RF15** — Abrir modal de suporte e canal institucional ("Vamos Conversar?")

---

## ⚙️ Requisitos Não Funcionais (RNF)

* **RNF01** — Aplicação desenvolvida em ReactJS com Vite
* **RNF02** — Interface construída com Design System próprio (paleta roxo/rosa)
* **RNF03** — Comunicação assíncrona com BackEnd via API REST
* **RNF04** — Biblioteca Recharts para renderização de gráficos
* **RNF05** — Interface 100% responsiva (Desktop e Mobile)
* **RNF06** — Código organizado por componentes e responsabilidades (SPA)

---

## 🖼️ Telas da Aplicação

As telas abaixo ilustram as principais funcionalidades e a navegação do sistema.

### Tela 1 — Visão Geral (Dashboard Main)
Painel principal exibindo o seletor da estação ("Estação Foz do Vale"), metadados operacionais, seletor de janela de tempo, cards de métricas (Nível, Precipitação e Transmissão) e o gráfico de tendência rápida do nível do rio nas últimas 24h.

<img width="1019" alt="Visão geral" src="https://github.com/user-attachments/assets/7a065ef3-881d-4202-85a0-0dae01e867e3" />

### Tela 2 — Histórico de Medições (Gráficos Análiticos)
Página focada na análise profunda com gráficos interativos de área (Nível do Rio em metros - RF06) e gráfico de barras com tooltips (Série Histórica de Precipitação em mm/h - RF07).

<img width="1080" alt="Historico de medição" src="https://github.com/user-attachments/assets/75d4da60-2f31-40b1-9ff8-f4dff1a38aaf" />

### Tela 3 — Consulta Analítica de Medições
Listagem em tabela das medições registradas, permitindo ordenação rápida, visualização do estado (Seco/Chuva) e aplicação dos filtros climáticos ("Com Chuva", "Sem Chuva" e "Todos").

<img width="1080" alt="Consulta de medições" src="https://github.com/user-attachments/assets/34227f4b-97f0-458a-bc8e-902044a1eb56" />

### Tela 4 — Menu de Navegação e Responsividade (Mobile)
Interface adaptada para telas menores com menu suspenso tipo gaveta (Drawer), garantindo acesso prático a todas as páginas e ao botão de contato em dispositivos móveis.

<img width="1080" alt="Menu Mobile" src="https://github.com/user-attachments/assets/363f3246-3bbb-4dff-b7de-df65efe8e25c" />

### Tela 5 — Modal de Contato ("Vamos Conversar?")
Modal sobreposto acionado ao clicar no botão "Vamos Conversar?", disponibilizando o canal e-mail institucional para suporte técnico e informações gerais.

<img width="1080" alt="Modal Vamos Conversar" src="https://github.com/user-attachments/assets/0a429c50-2240-42f8-879f-194cca91219d" />

---

## 🔗 Integração com Backend

* **API Base:** `https://api-cogmo-hidro.vercel.app/v1`
* **Operações utilizadas:**
  * `GET /stations` — Listagem de estações hidrológicas
  * `GET /stations/:id/measurements` — Histórico e medições por janela de tempo (12h, 24h, 48h)
  * `GET /stations/:id/summary` — Indicadores de resumo e estado de transmissão

---

## 🖥️ Como Executar o Projeto Localmente

### Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu computador:
* [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
* [Git](https://git-scm.com/)
* Gerenciador de pacotes `npm` (incluído no Node.js)

### Passo a Passo de Instalação

1. **Clonar o repositório:**
```bash
git clone https://github.com/silver-ward/monitoramento-hidrologico.git

cd monitoramento-hidrologico

cp .env.example .env

npm install

npm run dev

npm run build

```bash
npm install
```

---

---

## ⚖️ Licença e Parcerias

Projeto desenvolvido por **Rebeca**, **Eduardo** e **Leonilson** para a **Cogmo Technology** no âmbito do programa **Bolsa Futuro Digital**, oferecido pelo **Instituto Hardware Brasil** nas dependências do **Instituto Federal de Brasília (IFB - Campus Taguatinga)**.



<img width="204" height="192" alt="hb" src="https://github.com/user-attachments/assets/543ed669-0d05-4532-b931-f4db93783d91" />
<img width="447" height="447" alt="bolsa" src="https://github.com/user-attachments/assets/8db20672-75cc-498d-b94f-8d4a264c28a1" />
<img width="308" height="225" alt="IFB" src="https://github.com/user-attachments/assets/b59d6ea4-0ab2-4efb-a5d1-c901497caa5b" />

