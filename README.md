# deno-simple-server 🦕

🧪WIP

## Use

```shell
deno run \
> --allow-net --allow-read \
> --import-map=https://raw.githubusercontent.com/mojahige/deno-simple-server/master/import_map.json \
> https://raw.githubusercontent.com/mojahige/deno-simple-server/master/src/mod.ts \
> -p 1234 \
> -r ./example
```

## Arguments

| Command | Description | Default |
| --- | --- | --- |
| `-p` or `--port` |　You can specify a port.| 8080 |
| `-r` or `--root` | 　You can specify the directory to serve. | `./` |
