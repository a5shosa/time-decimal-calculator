# Project setup log

ref: https://zenn.dev/yuki_tu/articles/01c7963eeb2876

```
$ docker-compose build
$ docker-compose run --rm front sh
$ # yarn create next-app --typescript
$ # cd time-decimal-calculator
$ # yarn add -D tailwindcss postcss autoprefixer cssnano
$ # yarn tailwindcss init -p
```

# Development

## Only execute first time (For Windows environment, if needed)

```
$ docker-compose run -w //app --rm front yarn install
$ docker-compose up
$ open http://localhost:3000/
```

## Second time onwards

```
$ docker-compose up
$ open http://localhost:3000/
```