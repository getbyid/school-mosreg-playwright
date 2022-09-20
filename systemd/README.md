# Запуск скриптов по расписанию через таймеры systemd

Установка таймера:

~~~shell
$ mkdir -p ~/.config/systemd/user
$ cp -v school-mosreg.* ~/.config/systemd/user/
$ systemctl --user enable school-mosreg.timer
$ systemctl --user start school-mosreg.timer
~~~

Проверка наличия и времени запуска всех таймеров:

~~~shell
$ systemctl --no-pager --user --all list-timers
~~~

Проверка журнала:

~~~shell
$ journalctl -n --user-unit school-mosreg.service
~~~ 

Удаление таймера:

~~~shell
$ systemctl --user stop school-mosreg.timer
$ systemctl --user disable school-mosreg.timer
~~~
