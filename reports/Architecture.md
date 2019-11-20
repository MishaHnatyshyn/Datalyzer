# Архітектура проетку

В цьому документі представлений опис архітектури проекту

## High-level архітектура

![Users](./images/High-level.png?raw=true)

Проект реалізовано у вигляді Web SPA, REST API сервісу та бази даних. Ці три складові є незалежними та деплояться окремо.

## Використані технологї

![Users](./images/Technologies.png?raw=true)

Для SPA було використано бібліотеку React для UI, в якості стейт-менеджера було використано Redux. Для написання стилів
використовується препроцесор SCSS. Застосунок збирається за допомою WebPack. Також для відображення
графіків було використанно сторонню бібліотеку, з потенційною можливістю в мабутньому використати 
власну.

Для Rest API було використано фреймворк Nest.js та TypesScript. Для зв'язку з базою даних використано бібліотеку TypeORM.

В якості СУБД використовується PostgreSQL.


## Детальна Архітектура API серверу

### Розбиття на модулі

![Users](./images/ApiStructure.png?raw=true)

API сервіс розбитий на 5 основних модулів та 2 службові.

До основних модулів входять:
 - User module (відповідає за роботу з користувачами: видалення, додавання, зміна)
 - DataModel module (відповідає за роботу з моделями: видалення, додавання, зміна)
 - Dashboard module (відповідає за роботу з дешбордами: видалення, створення, зміна, експорт в файл)
 - Report module  (відповідає за роботу з графіками: видалення, створення, зміна)
 - Connection module (відповідає за роботу з підключеннями до користувацьких бд: видалення, створення, зміна, менеджмент)

До службових модуів входять:
 - DataBase module (відповідає за постійний зв'язок з власною бд та її сутностями)
 - Auth module (відповідає за авторизацію, аутентифікацію та верифікацію користувачів)

### Розбиття модулів на шари абстракції

![Users](./images/ModuleStructure.png?raw=true)

П'ять основних модулів розділені на наступні шари абстракції: Controller layer, Business-logic layer, Data layer.
До Controller layer відносяться контроллери, що знаходяться в модулях. До Business-logic layer відносяться сервіси,
які реалізують необхідну логіку для модуля. До Data layer відносяться Repository сервіси, які надають інтерфейс
для роботи з даними, які зберігаються в БД, використовуючи патерн Repository.

## Детальна Архітектура Web застосунку

![Users](./images/WebApp.png?raw=true)

Функціонал веб застосунку розбитий на дві великі частини: платформа для адміна та платформа для звичайного користувача. 
Обидві платформи мають відповідний функціонал до вимог певного типу користувача. Також присутня певна частина спільного
функціоналу для всіх типів юзерів.