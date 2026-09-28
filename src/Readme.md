## РЕГИСТРАЦИЯ
[POST](http://localhost:3000/register)

```json - body
{
    "username":"admin",
    "password":"admin"
}
```

## RETURN

```json
{
    "result": "OK"
}

{
    
  "id": 1,
  "usename": "admin",
  "password_hash": "$2b$10$rabT37pJ6hffl.pfWw0oJOSY7PMvNuXOYY2QvYP1NAmox0nLD275G"

}
```





## ЛОГИН
[POST](http://localhost:3000/login)

``` json - body
{
    "username":"admin",
    "password":"admin"
}
```

## RETURN

```json
"result": "успешный вход",
"data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzkwNTkzNDUxLCJleHAiOjE3OTMxODU0NTF9.PnIXKookjIjzdc0M6kkNgv5bmABCk6ju3Sef7BLWH3w",
    "refreshToken": "df75d432973d90ff0273477b0d843eb22727b6bac6ec09fef43e53458f6d62ae598e8cfe41f46fc62265122a23cfb8b3"
}
```