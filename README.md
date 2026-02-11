# 📊 ClarezaFy - Inteligência Financeira para Microempreendedores

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
  <img src="https://img.shields.io/badge/Power%20BI-F2C811?style=for-the-badge&logo=microsoftpowerbi&logoColor=black" />
</p>

> **"Números claros, decisões lucrativas."**

O **ClarezaFy** é uma aplicação Full-Stack desenvolvida para resolver um problema real de pequenos negócios: a falta de visão clara sobre lucro real e ponto de equilíbrio. Diferente de planilhas complexas, ele oferece uma interface intuitiva com sincronização em nuvem e relatórios automáticos.

---

## 🚀 Demonstração
🔗 **Acesse o projeto online:** [https://clarezafy.netlify.app](https://clarezafy.netlify.app)

---

## ✨ Funcionalidades Principais

### 🔒 Segurança e Acesso
* **Sistema de Login (Supabase Auth):** Cada usuário possui sua conta individual e protegida.
* **Recuperação de Senha:** Fluxo completo via e-mail para redefinição de credenciais.
* **Validação de Senha Forte:** Checklist em tempo real para garantir senhas seguras (Padrão de Mercado).
* **Olho Mágico:** Opção de visualizar a senha durante a digitação para evitar erros.

### 💰 Gestão Financeira
* **CRUD Completo:** Adicione, visualize, edite e remova faturamentos e custos (fixos e variáveis).
* **Sincronização em Nuvem (Supabase DB):** Dados persistentes salvos automaticamente no PostgreSQL.
* **Análise de Longo Prazo:** Gráficos interativos mostram a evolução financeira mês a mês.
* **Cálculos Automáticos:** Margem de lucro e Ponto de Equilíbrio calculados instantaneamente.

### 📄 Exportação e Portabilidade
* **Gerador de PDF:** Relatórios profissionais formatados para impressão ou envio.
* **Integração com Planilhas:** Botão "Importar para Planilha" que gera um arquivo CSV pronto para Excel ou Google Sheets.
* **Backup Manual:** Exportação e Importação de dados via JSON.

### 🎨 Experiência do Usuário (UX)
* **Multilíngue:** Suporte completo para Português (BR) e Inglês (US).
* **Moedas:** Alternância entre Real (R$), Dólar ($) e Euro (€).
* **Dark Mode:** Suporte nativo para tema claro e escuro.
* **Feedback Visual:** Notificações (Toasts) para todas as ações do usuário.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React.js:** Biblioteca principal para construção da interface.
* **Tailwind CSS:** Framework utilitário para design responsivo e moderno.
* **Recharts:** Visualização de dados com gráficos de linha interativos.
* **Lucide React:** Ícones minimalistas para melhor navegação.

### Backend & Database
* **Supabase (PostgreSQL):** Banco de dados relacional para armazenamento de configurações e dados financeiros dos usuários.
* **Supabase Auth:** Gerenciamento de sessões, login social e segurança.

### Engenharia de Dados & BI
* **Power BI:** O projeto foi arquitetado para fornecer dados estruturados (via CSV/Banco), permitindo análises avançadas de BI e Forecast.

---

## 📈 Arquitetura do Projeto

1. **Entrada:** O usuário preenche os dados no App React.
2. **Processamento:** O React valida e envia os dados para o Supabase.
3. **Persistência:** O PostgreSQL armazena o JSON de configurações de cada usuário de forma isolada (RLS Policies).
4. **Saída:** O usuário consome relatórios em PDF, Planilhas ou Dashboard de BI.

---
