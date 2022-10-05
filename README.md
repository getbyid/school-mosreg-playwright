# Расписание на неделю из Школьного портала Московской области

Школы в Московской области переведены на электронные дневники. Ученикам и родителям предлагается
смотреть расписание и оценки в специальном разделе областного портала https://uslugi.mosreg.ru/.
На практике пользоваться этим дневником не слишком удобно. Для входа надо дождаться прогрузки
довольно тяжёлой главной страницы портала (140 запросов, в сумме 12 Мб), покрутить карусель, найти
нужную плитку с формой логина и пароля. После входа надо аккуратно пробраться на нужную страницу и
сделать снимок экрана с домашним заданием, потому что дневник иногда бывает недоступен...

![Плитка с формой входа в дневник](/resources/login.png?raw=true)

Для автоматизации всей этой рутины применяется библиотека [Playwright](https://playwright.dev/).
Ежедневно (через таймер **systemd**) скрипт `index.js` делает снимок экрана дневника и выгружает
его для удобства просмотра на фотохостинг **imgbox**.

## Запись действий на странице

Заготовку для скрипта можно получить путём
[записи действий на нужной странице](https://playwright.dev/docs/codegen):

~~~shell
$ npx playwright codegen --device="Desktop Edge" uslugi.mosreg.ru
~~~

## Настройка

Образец файла настроек в файле `template.env`, скопируйте его рядом в файл `.env` и пропишите логин
ученика, пароль и прочее.

~~~shell
$ cp -n template.env .env
~~~

## Пример запуска

~~~shell
$ node index.js 
attempt 1 { x: -1730, y: 1247.28125, width: 260, height: 209 }
attempt 2 { x: -1410, y: 251.28125, width: 260, height: 209 }
attempt 3 { x: -1090, y: 251.28125, width: 260, height: 209 }
attempt 4 { x: -770, y: 251.28125, width: 260, height: 209 }
attempt 5 { x: -450, y: 251.28125, width: 260, height: 209 }
attempt 6 { x: -130, y: 251.28125, width: 260, height: 209 }
attempt 7 { x: 190, y: 251.28125, width: 260, height: 209 }
nextPage https://school.mosreg.ru/userfeed
URL https://schools.school.mosreg.ru/marks.aspx?school=10000........&tab=week
URL https://schools.school.mosreg.ru/marks.aspx?school=10000........&index=2&tab=period&homebasededucation=False
weekImage https://imgbox.com/........
~~~
