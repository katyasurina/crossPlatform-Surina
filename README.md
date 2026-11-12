## Технологічний стек і компетентності

> Drivo — кросплатформний застосунок автосалону: веб, мобільний і десктопний клієнти навколо спільного ядра `@drivo/core`.

### Архітектура за рівнями

| Рівень | Технології | Де реалізовано |
|---|---|---|
| 1. Платформи | Браузер (WebView), iOS / Android (Expo Go), Windows / macOS / Linux | [`lab1`](lab1), [`drivo-spa`](drivo-spa), [`drivo-mobile`](drivo-mobile), [`drivo-desktop`](drivo-desktop) |
| 2. Клієнтські технології | HTML/CSS/JS, React + Vite + Tailwind CSS, React Native + Expo, Electron (IPC, preload) | [`lab1`](lab1), [`drivo-spa`](drivo-spa), [`drivo-mobile`](drivo-mobile), [`drivo-desktop`](drivo-desktop), [`drivo-monorepo/packages/web`](drivo-monorepo/packages/web), [`drivo-monorepo/packages/desktop`](drivo-monorepo/packages/desktop) |
| 3. Спільний код | `@drivo/core` (валідація, `DrivoService`), адаптери сховища, npm workspaces, `node:test` | [`drivo-monorepo/packages/core`](drivo-monorepo/packages/core), [`drivo-monorepo`](drivo-monorepo/) |
| 4. Сервер і API | Node.js + Express (REST), Apollo Server (GraphQL + JWT), `server.js` | [`lab2`](lab2), [`graphql-auth-lab3`](graphql-auth-lab3), [`server.js`](drivo-monorepo/packages/web/server.js) |
| 5. База даних | MongoDB Atlas + Mongoose, localStorage, файл `drivo.json`, in-memory | [`lab2`](lab2), [`localStorageAdapter.js`](drivo-monorepo/packages/web/localStorageAdapter.js), [`fileStorageAdapter.js`](drivo-monorepo/packages/desktop/fileStorageAdapter.js) |

### Історія проєкту

| | |
|---|---|
| **Назва проєкту** | Drivo — кросплатформний застосунок автосалону |
| **Проблема** | Каталог авто та облік замовлень мають працювати в браузері, на смартфоні й на комп’ютері. Адміністратор керує каталогом і статусами, покупець переглядає та купує. |
| **Моя роль і внесок** | Єдина розробниця: усі клієнти, REST і GraphQL API, виділення спільного ядра, монорепозиторій, автотести. |
| **Обраний стек** | JavaScript на всіх рівнях — ядро без залежностей від DOM/Node можна повторно використовувати. React і React Native дають спільну модель компонентів. Electron переносить веб-інтерфейс на десктоп із доступом до файлів. Express — для простих ресурсів, GraphQL — для гнучких запитів і JWT. MongoDB зберігає документи, схожі на JS-об’єкти. |
| **Найскладніший виклик і рішення** | Різне зберігання даних (localStorage vs файл) та ізольований рендер-процес Electron. Рішення: контракт `load()` / `save()` у ядрі, власний адаптер у кожному клієнті, `preload.cjs` + IPC із перевіркою типів. |
| **Здобуті знання та вміння** | Підходи до кросплатформності; REST/GraphQL з автентифікацією; SPA, мобільні та десктопні клієнти; спільне ядро з адаптерами; монорепозиторій і тестування. |

### Що я знаю та вмію

- Будувати SPA на React (Vite, Tailwind CSS) і мобільні застосунки на React Native + Expo.
- Створювати безпечні Electron-застосунки: main / preload / renderer, IPC, робота з файлами.
- Проєктувати REST (Express + MongoDB) і GraphQL (Apollo + JWT) API.
- Виділяти бізнес-логіку в спільний пакет та підключати її через адаптери.
- Організовувати монорепозиторій на npm workspaces і покривати код тестами `node:test`.

### Запуск

```bash
cd drivo-monorepo
npm install
npm run start:web      # веб-клієнт, http://localhost:3000
npm run start:desktop  # Electron-клієнт
npm test               # тести всіх пакетів
```

### Посилання

[GitHub-репозиторій](https://github.com/katyasurina/crossPlatform-Surina)
