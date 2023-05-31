# Time / Decimal conversion

HH:MM time and decimal time can be converted to each other. Simple calculations are also supported. For example, in the case of 9:00-12:30, the difference in HH:MM format is 3:30, but the difference in decimal format is 3.5.

# Development

## devcontainer

NOTICE: Apple Silicon mac is too slow when launch and execute some commands in devcontainer.

### Only execute first time

```
* Install VSCode and "Dev Containers" extension by microsoft.com
```

### Second time onwards

```
* Click VSCode left-bottom button and select "Reopen in container"
* Enter within devcontainer
* Open Terminal
> # cd app
> # yarn
> # yarn dev
```

## Project setup log

ref: https://zenn.dev/yuki_tu/articles/01c7963eeb2876

```
$ docker-compose build
$ docker-compose run --rm front sh
$ # yarn create next-app --typescript
$ # cd time-decimal-calculator
$ # yarn add -D tailwindcss postcss autoprefixer cssnano
$ # yarn tailwindcss init -p
```

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

# Production deployment

## Available

- Render.com with Docker Deployment

## Environments

- `NEXT_PUBLIC_GA_ID` for Google Analytics (not required in development)
- `NEXT_PUBLIC_GADS_CLIENT` for Google AdSense