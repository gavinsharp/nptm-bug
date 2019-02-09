# nptm-bug
`next-plugin-transpile-modules`+`next-compose-plugins` issue testcase

# Reproducing the issue
- `npm install`
- `npm run build`

Note the [webpack config override specified in `next.config.js`](https://github.com/gavinsharp/nptm-bug/blob/master/next.config.js#L12) is not run (build succeeds despite the `throw`).
```
$ npm run build

> nptm-bug@1.0.0 build /Users/gavin/dev/nptm-bug
> next build

[11:35:39 A.M.] Compiling server
[11:35:39 A.M.] Compiling client
[11:35:40 A.M.] Compiled server in 990ms
[11:35:40 A.M.] Compiled client in 1s

$
```

## Working variant
The [`working-config`](https://github.com/gavinsharp/nptm-bug/tree/working_config) branch shows an [alternate config](https://github.com/gavinsharp/nptm-bug/compare/working_config) that works as I would expect it to (the webpack config override does run, and in this case throws).
```
$ npm run build

> nptm-bug@1.0.0 build /Users/gavin/dev/nptm-bug
> next build

> Failed to build
custom webpack config
```

## Alternate attempt
The [`change-order`](https://github.com/gavinsharp/nptm-bug/tree/change_order) shows an [alternate config](https://github.com/gavinsharp/nptm-bug/compare/change_order) where I put `withTM` last in the `next-compose-plugins` input array. This breaks the `withSass` plugin:
```
$ npm run build

> nptm-bug@1.0.0 build /Users/gavin/dev/nptm-bug
> next build

[11:33:56 A.M.] Compiling server
[11:33:56 A.M.] Compiling client
[11:33:57 A.M.] Compiled server in 527ms
[11:33:58 A.M.] Compiled client in 1s
> Failed to build
{ Error: (client) ./pages/foo.scss 1:14
Module parse failed: Unexpected token (1:14)
You may need an appropriate loader to handle this file type.
> $primary-color: #333;
```
