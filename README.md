# cloud-config-client

```
    npm i cloud-conf@latest -S

    import C from 'cloud-conf';
    await C.ready();            // will load process.cwd()/config.yml and merge process.cwd()/config.local.yml
    C.name
    C.env
    C.port
    .... and so on
```