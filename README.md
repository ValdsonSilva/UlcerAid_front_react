# 🖼️ UlcerAId Frontend

Interface web desenvolvida em React para o sistema **UlcerAId**, uma solução que auxilia profissionais de saúde na predição automatizada de úlceras em pés diabéticos, a partir do envio de imagens para análise.

Este frontend consome a [UlcerAId Node API](https://github.com/seurepositorio/UlcerAId-Node-API) e foi projetado com foco na usabilidade e eficiência para profissionais de enfermagem.

---

## 🌐 Funcionalidades

- Interface amigável e intuitiva
- Upload de imagem para predição de feridas
- Dashboard de controle
- Visualização de perfil do usuário
- Feedback visual de sucesso ou erro na análise
- Layout responsivo
- Sidebar com navegação fluida

---

## 🛠️ Tecnologias Utilizadas

- React.js
- Vite
- TailwindCSS
- React Icons
- Axios (para integração com a API)
- Prisma (no backend)
- API REST UlcerAId (Node.js + Python IA)

---

## 📁 Estrutura do Projeto

```bash
src/
├── assets/               # Imagens, ícones, etc.
├── components/           # Componentes reutilizáveis
│   ├── error/
│   ├── form/
│   ├── popups/
│   ├── sidebar/
├── pages/                # Páginas principais
│   ├── dashboard/
│   ├── login/
│   ├── perfil/
│   └── predicao/
├── context/              # Context API para controle global
├── services/             # Comunicação com API + hooks
│   ├── userHooks/
│   ├── api.js
│   └── imprimirPdf.js
```
🖥️ Como Rodar Localmente
1. Clone o repositório:
git clone https://github.com/seunome/UlcerAId-frontend.git](https://github.com/ValdsonSilva/UlcerAid_front_react.git

2. Acesse o diretório do projeto:
cd my-react-app

3. Instale as dependências:
npm install

4. Inicie o servidor:
npm run dev

📸 Página de Predição
A página de predição permite que o profissional:

Faça upload da imagem da ferida
Envie para o backend via rota /predict
Receba uma resposta com o resultado da análise (ferida ulcerada ou não)

