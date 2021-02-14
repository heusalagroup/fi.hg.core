# @sendanor/typescript

Our enterprise library for TypeScript.

## Install

This library is meant to be used as a git submodule in a NodeJS or webpack project.

Run the installation commands from your project's root directory. Usually it's where your `package.json` is located. 

We also expect your source files to be located in `./src` and we'll use `./src/nor/ts` for location for our sub module.

Setup git submodule:

```shell
mkdir -p src/nor
git submodule add https://github.com/sendanor/typescript src/nor/ts
```

Next install our only required dependency (newest [lodash library](https://lodash.com/)):

```shell
npm install --save-dev lodash @types/lodash
```

If you're going to develop NodeJS app, you might want to install also types for NodeJS (this should be obvious though):

```shell
npm install --save-dev @types/node
```

### Why git submodules, you may wonder? 

NPM doesn't provide a good way to implement pure compile time typescript libraries. 

We would have to compile the whole library in our bundle even though you probably don't use everything.

## LogService

Our simple wrapper for `console` which allows naming the log context.

```typescript
import LogService from "./src/nor/ts/LogService"

const LOG = LogService.createLogger('FooService');

export class FooService {
    
    run (arg : string) {
        LOG.debug('Did something: ', arg);
    }
    
}
```

## Observer

This is a simple observer implementation for implementing synchronous in-process events for a local service.

You'll use it like this:

```typescript
import Observer from "./src/nor/ts/Observer"

enum FooEvent {
    CHANGED = "FooService:changed"
}

class FooService {

    private static _data : any;
    private static _observer : Observer<FooEvent> = {};

    public static getData () : any {
        return this._data;
    }

    public static on (name : FooEvent, callback) : ObserverDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public static refreshData () {

        HttpService.doSomething().then((response) => {

            this._data = response.data;

            this._observer.triggerEvent(FooEvent.CHANGED);

        }).catch(err => {
            console.error('Error: ', err);
        });

    }

}

FooService.on(FooEvent.CHANGED, () => {

    const currentData = FooService.getData();
    // ...

});

FooService.refreshData();

```

## Request

HTTP request mapping annotations for TypeScript in the same style as in Java's Spring @RequestMapping.

This is only annotation library part. The actual server implementing REST API is not available from this module at the moment, but may be later.

***This implementation is very experimental.***

```typescript
import Request from "./src/nor/ts/Request"

export interface ListDTO<T> {

    pageNumber : number;
    pageSize   : number;
    content    : Array<T>;

}

@Request.mapping('/foo/users')
@Request.mapping('/users')
export class UserController {

    private readonly _userService : UserService;

    constructor (userService : UserService) {
        this._userService = userService;
    }

    @Request.mapping(Request.Method.GET, '/', '/list')
    getUserList (
        @Request.param('p', Request.ParamType.INTEGER)
            pageNumber : number = 0,
        @Request.param('l', Request.ParamType.INTEGER)
            pageSize : number = 10
    ) : ListDTO<UserModel> {

        // const parsedPageNumber = pageNumber ? parseInt(pageNumber, 10) : 0;
        // const parsedPageSize   = pageSize   ? parseInt(pageSize, 10)   : 10;

        return {
            pageNumber: pageNumber,
            pageSize: pageSize,
            content: this._userService.getUserList(pageNumber, pageSize)
        };

    }

}

```
