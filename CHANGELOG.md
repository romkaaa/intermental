# CHANGELOG

# 1.5

- Frontend переписан на material-ui и typescript
- Не доделан draftsUploader и ReadBookByHash

# 1.4

- Вместо `dataclasses` используются `attrs`
- Все операции с blockchain "обернуты" в `try/except`
- Функция `check_json_data` вынесена в отдельный файл `/api/helpers/check_json_data.py`
- Для поиска теперь нужно отправлять `POST`, а не `GET` запрос
- Добавлен валидатор для `book keywords`
- Можно прочитать `book note` по ipfs хешу `GET /note/note_ipfs_hash`
- Добавлена система ошибок в `errors.py`
- Вынесены часто используемые валидаторы(check_book_name, check_book_password) в `/api/validator.py`
- Рефакторинг кода

# 1.3

Переписан почти весь код

# 0.0.7

Добавлено:

- static/page.html
- static/index.html

# 0.0.6

Исправлено:

- наведен порядок в файловой структуре

# 0.0.5

Добавлено:

- static

Удалено:

- web
  Исправлено:
- Переход с materializecss на более качественный css фреймворк semantic ui
- Изменение дизайна

## 0.0.4

Добавлено:

- web

Исправлено:

- api/controller отдача только записей пользователя
- api/controller отдача количества записей пользователя для создания пагинации

## 0.0.3

Исправлено:

- api/controller ввод ограничений для получения записей
- api/models получение записей по ограничению пользователя
- api/models вывод информации пользователя, а также количество его записей

## 0.0.2

Исправлено:

- lib/blockchain в связке с IPFS

## 0.0.1

Добавлено:

- lib/blockchain

Исправлено:

- Структура и расположение файлов проекта
