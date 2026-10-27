# Monitoramento Hidrológico

Interface web de monitoramento de dados hidrológicos simulados de nível de rios e precipitação pluvial. Possibilita a visualização de medições recentes e análise de séries históricas.

<img alt="Demonstração desktop" src="./img/demo-desktop.gif" width="400" align="center">
<img alt="Demonstração mobile" src="./img/demo-mobile.gif" width="400" align="center">

---

## 📌 Funcionalidades
* **Listagem e Seleção de Estações:** Permite alternar entre diferentes estações de monitoramento hidrológico disponíveis.
* **Cartões de Resumo (Statistics):** Exibição em tempo real da última medição de nível do rio (com unidade e horário) e precipitação horária.
* **Gráficos Dinâmicos:** Visualização de séries históricas separadas para nível da água e precipitação (evitando sobreposição de unidades distintas).
* **Filtros de Período:** Seleção de janelas temporais de **12, 24 ou 48 horas**.
* **Tabela de Dados Tabulares:** Consulta detalhada dos registros com opções de ordenação e filtros.
* **Tratamento de Estados:** Componentes visuais para carregamento (`Spin`), alertas de status operacional e tratamento para ausência de dados (`Empty`).

---

## 🛠️ Desenvolvimento
A aplicação foi desenvolvida utilizando as seguintes tecnologias e bibliotecas:
* **ReactJS** (Biblioteca principal para construção de componentes e gestão de estados)
* **Vite** (Ferramenta de build e ambiente de desenvolvimento rápido)
* **Ant Design (AntD)** (Biblioteca de componentes de interface de usuário)
* **Recharts** (Biblioteca para renderização dos gráficos de linhas e barras)
* **JavaScript** / **HTML** / **CSS**

### 📋 Requisitos Funcionais:

| Código | Funcionalidade | Status |
| :--- | :--- | :--- |
| **RF01** | Listar as estações de monitoramento disponíveis | ☑ |
| **RF02** | Permitir selecionar uma estação | ☐ |
| **RF03** | Exibir rio e município da estação selecionada | ☐ |
| **RF04** | Exibir a última medição de nível do rio (com unidade e horário) | ☐ |
| **RF05** | Exibir a última medição de precipitação (com unidade e horário) | ☐ |
| **RF06** | Apresentar gráfico histórico do nível do rio | ☐ |
| **RF07** | Apresentar gráfico histórico de precipitação separado do nível | ☐ |
| **RF08** | Permitir selecionar períodos de 12, 24 ou 48 horas | ☐ |
| **RF09** | Informar quando não existirem dados disponíveis | ☐ |
| **RF10** | Apresentar medições em tabela | ☐ |
| **RF11** | Permitir ordenar e filtrar registros da tabela | ☐ |

---

## ⚙ Instalação

1. **Pré-requisitos:**
   Certifique-se de ter o [Node.js](https://nodejs.org/) instalado no ambiente de execução.

2. **Clonar o repositório:**
   ```
   git clone [https://github.com/silver-ward/monitoramento-hidrologico.git](https://github.com/silver-ward/monitoramento-hidrologico.git)
   cd monitoramento-hidrologico
   ```

## Licença

Projeto desenvolvido por Rebeca, Eduardo e Leonilson para a Cogmo Technology no âmbito do programa Bolsa Futuro Digital, oferecido pelo Instituto Hardware Brasil nas dependências do Instituto Federal de Brasília.

<img src="./img/hbr-logo.png" width="100" align="center"> <img src="./img/ifb-test.webp" width="100" align="center"> <img src="./img/cogmo-logo.png" width="100" align="center">