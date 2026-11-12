## Технологічний стек і компетентності

> Drivo — кросплатформний застосунок автосалону: веб, мобільний і десктопний клієнти навколо спільного ядра `@drivo/core`.

### Архітектура за рівнями

| Рівень | Технології | Де реалізовано |
|---|---|---|
| 1. Платформи | Браузер (WebView), iOS / Android (Expo Go), Windows / macOS / Linux | [`packages/web`](packages/web), [`packages/desktop`](packages/desktop) <!-- ПЕРЕВІРТЕ ШЛЯХ до мобільної теки --> |
| 2. Клієнтські технології | HTML/CSS/JS, React + Vite + Tailwind CSS, React Native + Expo, Electron (IPC, preload) | [`packages/web`](packages/web), [`packages/desktop`](packages/desktop), [`drivo-mobile`](drivo-mobile) <!-- ПЕРЕВІРТЕ ШЛЯХ --> |
| 3. Спільний код | `@drivo/core` (валідація, `DrivoService`), адаптери сховища, npm workspaces, `node:test` | [`packages/core`](packages/core) |
| 4. Сервер і API | Node.js + Express (REST), Apollo Server (GraphQL + JWT), `server.js` | [`graphql-auth-lab3`](graphql-auth-lab3) <!-- ПЕРЕВІРТЕ ШЛЯХ; додайте теку REST API з ЛР №2 -->, [`packages/web/server.js`](packages/web/server.js) |
| 5. База даних | MongoDB Atlas + Mongoose, localStorage, файл `drivo.json`, in-memory | [`packages/web/localStorageAdapter.js`](packages/web/localStorageAdapter.js), [`packages/desktop/fileStorageAdapter.js`](packages/desktop/fileStorageAdapter.js) |

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
npm install
npm run start:web      # веб-клієнт, http://localhost:3000
npm run start:desktop  # Electron-клієнт
npm test               # тести всіх пакетів
```

### Посилання

[GitHub-репозиторій](https://github.com/katyasurina/crossPlatform-Surina)
