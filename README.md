# 🌊 Dashboard de Monitoramento Hidrológico (Cogmo Technology)

Projeto desenvolvido pelos estudantes **Rebeca**, **Eduardo** e **Leonilson** no âmbito do programa **Bolsa Futuro Digital** no **IFB Campus Taguatinga**. 

Este repositório contém a solução frontend para o desafio proposto pela **Cogmo Technology**, consistindo em um dashboard interativo para consulta de estações de monitoramento hidrológico, exibição de medições recentes e análise de séries históricas[cite: 2, 3].

---

## 🎯 Sobre o Projeto
O objetivo principal é fornecer uma interface web responsiva e intuitiva para monitorar dados simulados de nível de rios e precipitação pluvial[cite: 3]. Como o foco da atividade é o desenvolvimento frontend, a aplicação consome dados simulados (mocks locais/JSON), dispensando a necessidade de um servidor backend complexo[cite: 2, 3].

### 📌 Principais Funcionalidades
* **Listagem e Seleção de Estações:** Permite alternar entre diferentes estações de monitoramento hidrológico disponíveis[cite: 4].
* **Cartões de Resumo (Statistics):** Exibição em tempo real da última medição de nível do rio (com unidade e horário) e precipitação horária[cite: 4].
* **Gráficos Dinâmicos:** Visualização de séries históricas separadas para nível da água e precipitação (evitando sobreposição de unidades distintas)[cite: 4, 5].
* **Filtros de Período:** Seleção de janelas temporais de **12, 24 ou 48 horas**[cite: 4].
* **Tabela de Dados Tabulares:** Consulta detalhada dos registros com opções de ordenação e filtros[cite: 4].
* **Tratamento de Estados:** Componentes visuais para carregamento (`Spin`), alertas de status operacional e tratamento para ausência de dados (`Empty`)[cite: 5].

---

## 🛠️ Tecnologias Utilizadas
A aplicação foi desenvolvida utilizando as seguintes tecnologias e bibliotecas:
* **ReactJS** (Biblioteca principal para construção de componentes e gestão de estados)[cite: 2, 3]
* **Vite** (Ferramenta de build e ambiente de desenvolvimento rápido)[cite: 8]
* **Ant Design (AntD)** (Biblioteca de componentes de interface de usuário)[cite: 2, 3]
* **Recharts** (Biblioteca para renderização dos gráficos de linhas e barras)[cite: 2, 3]
* **JavaScript (ES6+)** / **HTML5** / **CSS3**

---

## 📋 Requisitos Atendidos (Escopo do Desafio)

| Código | Requisito Funcional | Status |
| :--- | :--- | :--- |
| **RF01** | Listar as estações de monitoramento disponíveis | Concluído[cite: 4] |
| **RF02** | Permitir selecionar uma estação | Concluído[cite: 4] |
| **RF03** | Exibir rio e município da estação selecionada | Concluído[cite: 4] |
| **RF04** | Exibir a última medição de nível do rio (com unidade e horário) | Concluído[cite: 4] |
| **RF05** | Exibir a última medição de precipitação (com unidade e horário) | Concluído[cite: 4] |
| **RF06** | Apresentar gráfico histórico do nível do rio | Concluído[cite: 4] |
| **RF07** | Apresentar gráfico histórico de precipitação separado do nível | Concluído[cite: 4] |
| **RF08** | Permitir selecionar períodos de 12, 24 ou 48 horas | Concluído[cite: 4] |
| **RF09** | Informar quando não existirem dados disponíveis | Concluído[cite: 4] |
| **RF10** | Apresentar medições em tabela | Concluído[cite: 4] |
| **RF11** | Permitir ordenar e filtrar registros da tabela | Concluído[cite: 4] |

> *Nota importante:* Todas as estações, horários e medições exibidas no dashboard são estritamente simuladas para fins educacionais e de demonstração, sem finalidade operacional real[cite: 2, 5].

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o projeto na sua máquina:

1. **Pré-requisitos:**
   Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu computador.

2. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/monitoramento-hidrologico.git](https://github.com/SEU_USUARIO/monitoramento-hidrologico.git)
   cd monitoramento-hidrologico
