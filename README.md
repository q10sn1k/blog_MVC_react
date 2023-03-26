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
