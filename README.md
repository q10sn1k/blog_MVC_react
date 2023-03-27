Архитектура клиентской части

```
├── client
│   ├── public
│   │   └── ...
│   │   
│   │   
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.js
│   │   │   ├── Navbar.css
│   │   │   ├── Register.js
│   │   │   ├── Register.css
│   │   │   ├── Login.js
│   │   │   ├── Login.css
│   │   │   ├── PostList.js
│   │   │   ├── PostList.css
│   │   │   ├── PostForm.js
│   │   │   ├── PostForm.css
│   │   │   ├── Post.js
│   │   │   └── Post.css
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   │   
│   │   
│   │
│   ├── package.json
│   └── package-lock.json
│
├── server
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── userController.js
│   │   └── postController.js
│   │
│   ├── models
│   │   ├── user.js
│   │   └── post.js
│   │
│   ├── routes
│   │   ├── userRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── app.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

`project`: корневая директория проекта.
`client`: директория с клиентской частью приложения на React.js.
`public`: статические файлы и index.html.
`src`: исходный код клиентской части приложения.
components: компоненты приложения.
`Navbar.js`, Navbar.css: компонент навигационной панели и его стили.
`Register.js`, Register.css: компонент регистрации и его стили.
`Login.js`, Login.css: компонент авторизации и его стили.
`PostList.js`, PostList.css: компонент списка постов и его стили.
`PostForm.js`, PostForm.css: компонент формы создания поста и его стили.
`Post.js`, `Post.css`: компонент отдельного поста и его стили.
`App.js`, `App.css`: основной компонент приложения и его стили.
`index.js`, `index.css`: точка входа в приложение и общие стили.
`server`: директория с серверной частью приложения на Node.js.
`config`: конфигурационные файлы.
`db.js`: конфигурация подключения к базе данных MySQL.
`controllers`: контроллеры приложения.
`userController.js`: контроллер пользователей.
`postController.js`: контроллер постов.
`models`: модели приложения.
`user.js`: модель пользователя.
`post.js`: модель поста.
`routes`: маршруты приложения.
`userRoutes.js`: маршруты пользователей.
`postRoutes.js`: маршруты постов.
`app.js`: основной файл серверной части приложения.
`.env`: файл с переменными окружения.
`package.json`, `package-lock.json`: файлы с описанием зависимостей и настроек проекта для серверной части.


1. Создайте приложение реакт

```
npx create-react-app client
```

2. перейдите в директорию client и установите зависимости

```
npm install axios react-router-dom
```

3. Запуск

```
npm start
```

* Запуск теста
```
перейдите в директорию тестов компонента

сd client\src\components\tests

запустите тест компонента

Navbar:

npm test -- Navbar.test.js
```

_________________
_________________
_________________
