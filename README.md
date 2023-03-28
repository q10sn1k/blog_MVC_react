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

`project`: корневая директория проекта.\
`client`: директория с клиентской частью приложения на React.js.\
`public`: статические файлы и index.html.\
`src`: исходный код клиентской части приложения.\
`components`: компоненты приложения.\
`Navbar.js`, Navbar.css: компонент навигационной панели и его стили.\
`Register.js`, Register.css: компонент регистрации и его стили.\
`Login.js`, Login.css: компонент авторизации и его стили.\
`PostList.js`, PostList.css: компонент списка постов и его стили.\
`PostForm.js`, PostForm.css: компонент формы создания поста и его стили.\
`Post.js`, `Post.css`: компонент отдельного поста и его стили.\
`App.js`, `App.css`: основной компонент приложения и его стили.\
`index.js`, `index.css`: точка входа в приложение и общие стили.\

`server`: директория с серверной частью приложения на Node.js.\
`config`: конфигурационные файлы.\
`db.js`: конфигурация подключения к базе данных MySQL.\
`controllers`: контроллеры приложения.\
`userController.js`: контроллер пользователей.\
`postController.js`: контроллер постов.\
`models`: модели приложения.\
`user.js`: модель пользователя.\
`post.js`: модель поста.\
`routes`: маршруты приложения.\
`userRoutes.js`: маршруты пользователей.\
`postRoutes.js`: маршруты постов.\
`app.js`: основной файл серверной части приложения.\
`.env`: файл с переменными окружения.\
`package.json`, `package-lock.json`: файлы с описанием зависимостей и настроек проекта для серверной части.\


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

# Серверная часть `разработка`

#1
создадим `config/db.js`: конфигурация подключения к базе данных MySQL.\

`.env`: файл с переменными окружения. укажем значения для коннекта с Базой Данных

далее пишем тест `db.test.js`

Для написания тестов в формате `describe` и `it` используется библиотека Mocha. \
Для запуска тестов необходимо установить эту библиотеку.

```
npm install mocha
```

добавим тест `db.test.js` в `package.json`

```json
{
  
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test-db": "mocha config/db.test.js"
  },
  
}
```

запустим тест

```
npm run test-db
```

В базе данных создадим таблицы `users` и `posts`

```sql
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

Добавим несколько тестовы постов

```sql
INSERT INTO posts (title, content)
VALUES ('Test post 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
       ('Test post 2', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'),
       ('Test post 3', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.');

```

Проверка

```sql
SELECT * FROM posts;
```

# 2

Создадим модель post

Создадим тест модели пост

добавим тест `post.test.js` в `package.json`


```json
{
  
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test-db": "mocha config/db.test.js",
    "test-model-post": "mocha models/post.test.js"
  }
  
}
```

запустим тест

```
npm run test-model-post
```
______________________

Создадим тест модели user

добавим тест `user.test.js` в `package.json`


```json
{
  
 "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test-db": "mocha config/db.test.js",
    "test-model-post": "mocha models/post.test.js",
    "test-model-user": "mocha models/user.test.js"
  }
  
}
```

запустим тест

```
npm run test-model-user
```


______________________

# 3
Создаем контроллеры в папке controllers.\
Файлы userController.js и postController.js для обработки запросов связанных с пользователями и постами.
