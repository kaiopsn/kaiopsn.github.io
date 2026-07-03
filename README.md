# FinanceApp

Controle financeiro pessoal — gastos, orçamentos, metas, investimentos e relatórios.

**App no ar:** https://kaiopsn.github.io/

## Características

- 📱 **PWA instalável** — funciona como app no Android e iPhone ("Adicionar à tela inicial")
- 🔌 **100% offline** — Chart.js e fontes embutidos; nada depende de internet após o 1º acesso
- 🔒 **Privado** — todos os dados ficam no `localStorage` do aparelho; nada vai para servidores
- 🔄 **Auto-atualização** — o app detecta versões novas e mostra "Atualização disponível"

## Como publicar uma atualização

1. Edite os arquivos localmente
2. **Troque a linha `VERSION` no [`sw.js`](sw.js)** (ex.: `v49` → `v50`) — é isso que
   dispara o aviso de atualização nos aparelhos
3. Sincronize o `APP_VERSION` no `index.html` (opcional, é o rótulo visível)
4. `git add -A && git commit -m "..." && git push`
5. Ao abrir o app, aparece **"🔄 Nova versão disponível → Atualizar"**

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | O app inteiro (HTML + CSS + JS) |
| `sw.js` | Service worker — cache offline e versionamento |
| `manifest.json` | Manifesto PWA (nome, ícones, cores) |
| `chart.min.js` | Chart.js local (gráficos) |
| `fonts.css` + `fonts/` | Fontes Inter e Fraunces locais |
| `icon-*.png` | Ícones do app (Android/iOS/PWABuilder) |
