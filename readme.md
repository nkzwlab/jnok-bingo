# jnok-bingo

中澤大越研究室の研究室内ビンゴ大会用のビンゴゲームです。

## 環境構築

### フロントエンド

#### 要件

- Node.js

#### インストール

```bash
cd front
npm install
```

#### 起動

```bash
npm run dev
```

### バックエンド

#### 要件

- Deno

#### 起動

```bash 
deno run --allow-net --allow-read --allow-env server/main.ts
```
