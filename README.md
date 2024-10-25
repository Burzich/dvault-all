# Debichыы - Vault Main

1) Проверьте, что у Вас установлен докер, а также openssl. В случае проблемы выполнения кода, сравните попробуйте полнсотью повторить эти версии

```bash
sergeyshkviro@sergeyshkviro-MS-7D48:~/Документы/vault_hack/dvault-all$ openssl version && docker --version
OpenSSL 3.0.2 15 Mar 2022 (Library: OpenSSL 3.0.2 15 Mar 2022)
Docker version 26.1.4, build 5650f9b
```

2) Проверьте, что у файла `./hello.sh` имеется флаг +x и выполните:

```bash
./hello.sh
```

Данная команда создаст необходимые сертификаты, а также запустит контейнеры. После окончания работы скрипта все соеденения с БД будут по SSL соеденению. Создастся контейнер в бэкендом `handle_vault`.
