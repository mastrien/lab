# Guia: Deploy de App Vite no GitHub Pages

Este documento registra o processo realizado para publicar o projeto Vite (Arkeynist) dentro do repositório de laboratório no GitHub Pages. 

Ao contrário de projetos Vanilla (HTML, CSS e JS puros) que funcionam apenas "jogando" os arquivos na hospedagem, projetos criados com React + Vite precisam ser "construídos" (*buildados*) antes de irem pro ar.

## 1. O Problema das Rotas no Vite
Por padrão, o Vite assume que o seu projeto será hospedado na raiz de um domínio (exemplo: `https://meusite.com/`). Com isso, ele gera os arquivos apontando para caminhos absolutos na raiz, como `<script src="/assets/main.js">`.

Porém, no GitHub Pages (e em repositórios que agregam vários projetos como este), a URL normalmente é um subdiretório: `https://seu-usuario.github.io/lab/arkeynist/`. 
Se o Vite tentar procurar o script na raiz absoluta, ele vai procurar em `https://seu-usuario.github.io/assets/main.js`, não vai encontrar nada, e a tela ficará branca com erro 404 (Not Found).

### Como resolvemos?
Nós alteramos o arquivo `vite.config.ts` incluindo a propriedade `base`:
```typescript
export default defineConfig({
  base: './', // Transforma os caminhos absolutos em relativos!
  plugins: [react(), tailwindcss()],
})
```
Com isso, o arquivo gerado aponta para `./assets/main.js`, ou seja, "na mesma pasta onde este index.html está", o que funciona perfeitamente em qualquer domínio ou subdiretório. (Também ajustamos o link do `favicon.svg` no HTML pelo mesmo motivo).

## 2. A Pasta `dist` e o `.gitignore`
Quando rodamos o comando `npm run build`, o Vite compila todo o código React e TypeScript numa versão pura e super otimizada de HTML/JS/CSS e a coloca numa pasta chamada `dist/`.

Por padrão, a criação de projetos do Vite inclui a pasta `dist` no `.gitignore`. Isso acontece porque a forma mais profissional e moderna de publicar projetos é fazer o servidor (como a Vercel, Netlify ou Github Actions) rodar o build no próprio servidor, ou seja, você envia apenas o código fonte para o repositório.

### Como fizemos neste repositório?
Como a sua página do repositório `lab` é estática e agrupa vários links puros em HTML, nós adotamos uma estratégia mais simples e direta (chamada de commit de build):
1. Removemos a entrada `dist` do arquivo `.gitignore` do projeto Arkeynist.
2. Rodamos o comando `npm run build` localmente no terminal, gerando a pasta `dist/`.
3. Fizemos o commit de **todos** os arquivos, **incluindo** a pasta `dist/` gerada, pro repositório.
4. No arquivo `index.html` da raiz do repositório, configuramos o botão do Arkeynist para redirecionar para `./arkeynist/dist/`, pois é exatamente lá que está o `index.html` final que o Vite gerou para a web.

## 3. Resumo dos Passos Feitos
Sempre que for criar um novo projeto Vite e for subi-lo no repositório `lab`:
1. Vá no `vite.config.ts` e adicione `base: './'`.
2. Tire a pasta `dist` do `.gitignore`.
3. Rode `npm run build`.
4. Aponte o link principal para a pasta `dist/` desse projeto.
5. Faça o commit de tudo e dê push.

## Dica para o Futuro: GitHub Actions
Quando você tiver projetos maiores ou repositórios independentes para um único projeto, vale a pena estudar sobre **GitHub Actions**. O GitHub Actions permite que você crie um arquivo `.yml` que automatiza o build. Assim, você não precisaria nunca tirar o `dist` do gitignore nem rodar o build na sua máquina; bastaria dar *push* no código fonte e um robô do GitHub rodaria o Vite e criaria o site automaticamente!
