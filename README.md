# sendanor/typescript

Our enterprise library for TypeScript.

This git repository contains only the source code for a compile time use case. It is meant to be used as a git submodule in a NodeJS or webpack project.

See [sendanor/typescript-package](https://github.com/sendanor/typescript-package) for a full package example. Although, keep in mind, this repository is not intended to be used as a NPM package dependency.

## Index

 * [Install & maintain our library](#install--maintain-our-library)
   * [Checking out a project with git submodules](#checking-out-a-project-with-git-submodules)
   * [Updating upstream library code](#updating-upstream-library-code)
   * [Why git submodules, you may wonder?](#why-git-submodules-you-may-wonder)
 * [LogService](#logservice)
 * [Observer](#observer)
 * [Request](#request)
 * [RequestServer](#requestserver)
 * [CrudRepository](#crudrepository)
 * [ProcessUtils](#processutils)
   * [ProcessUtils.initEnvFromDefaultFiles()](#processutilsinitenvfromdefaultfiles)
   * [ProcessUtils.setupDestroyHandler(...)](#processutilssetupdestroyhandlershutdownhandler-errorhandler)

## Install & maintain our library

Run the installation commands from your project's root directory. Usually it's where your `package.json` is located.

For these sample commands we expect your source files to be located in `./src` and we'll use `./src/nor/ts` for location for our sub module.

Setup git submodule:

```shell
mkdir -p src/nor
git submodule add https://github.com/sendanor/typescript src/nor/ts
git config -f .gitmodules submodule.src/nor/ts.branch main
```

Next install our required dependencies (newest [lodash library](https://lodash.com/) and [reflect-metadata library](https://www.npmjs.com/package/reflect-metadata)):

```shell
npm install --save-dev lodash @types/lodash
npm install --save-dev reflect-metadata
```

If you're going to develop NodeJS app, you might want to install also types for NodeJS (this should be obvious though):

```shell
npm install --save-dev @types/node
```

### Checking out a project with git submodules

Git doesn't automatically clone your sub modules.

You'll need to command:

```shell
git clone --recurse-submodules git@github.com:sendanor/your-project.git your-project
```

...or:

```shell
git clone git@github.com:sendanor/your-project.git your-project
cd your-project
git submodule init
git submodule update
```

### Updating upstream library code

Later when you want to update your submodules, you may do:

```shell
git pull
git submodule update --remote
```

### Why git submodules, you may wonder?

NPM doesn't provide a good way to implement pure compile time typescript libraries.

We would have to compile our whole library in our bundle even though you probably don't use everything.

It wouldn't be possible to use compile time optimizations and other ENV based feature flags.

## LogService

Our simple wrapper for `console` which allows naming the log context.

```typescript
import LogService from "./src/nor/ts/LogService";

const LOG = LogService.createLogger("FooService");

export class FooService {
    run(arg: string) {
        LOG.debug("Did something: ", arg);
    }
}
```

## Observer

This is a simple observer implementation for implementing synchronous in-process events for a local service.

You'll use it like this:

```typescript
import Observer from "./src/nor/ts/Observer";

enum FooEvent {
    CHANGED = "FooService:changed",
}

class FooService {
    private static _data: any;
    private static _observer: Observer<FooEvent> = {};

    private static _data : any;
    private static _observer : Observer<FooEvent> = new Observer<FooEvent>("GeoIpService");

    public static getData () : any {
        return this._data;
    }

    public static on (name : FooEvent, callback : ObserverCallback<FooEvent>) : ObserverDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public static refreshData() {
        HttpService.doSomething()
            .then((response) => {
                this._data = response.data;

                this._observer.triggerEvent(FooEvent.CHANGED);
            })
            .catch((err) => {
                console.error("Error: ", err);
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

**_This implementation is very experimental._**

```typescript
import Request from "./src/nor/ts/Request";

export interface ListDTO<T> {
    pageNumber: number;
    pageSize: number;
    content: Array<T>;
}

@Request.mapping("/foo/users")
@Request.mapping("/users")
export class UserController {
    private readonly _userService: UserService;

    constructor(userService: UserService) {
        this._userService = userService;
    }

    @Request.mapping(Request.Method.GET, "/", "/list")
    getUserList(
        @Request.param("p", Request.ParamType.INTEGER)
        pageNumber: number = 0,
        @Request.param("l", Request.ParamType.INTEGER)
        pageSize: number = 10
    ): ListDTO<UserModel> {
        // const parsedPageNumber = pageNumber ? parseInt(pageNumber, 10) : 0;
        // const parsedPageSize   = pageSize   ? parseInt(pageSize, 10)   : 10;

        return {
            pageNumber: pageNumber,
            pageSize: pageSize,
            content: this._userService.getUserList(pageNumber, pageSize),
        };
    }
}
```

For the actual server implementing REST API, see next chapter.

## RequestServer

This project also includes a simple and pure NodeJS implementation for the REST server for [our Request annotations](#request):

```typescript
import RequestServer from "./nor/ts/RequestServer";
const server = new RequestServer("http://0.0.0.0:3000");
server.attachController(UserController);
server.start();
```

See also our [`ProcessUtils`](#processutils) for best practices implementing complete runtime support.

## CrudRepository

Spring Data like annotation mechanism for entities and simple CrudRepository implementation.

```typescript
import { Table, Entity, Id, Column } from "../nor/ts/crud-repository/Entity";

@Table("users")
export default class User extends Entity {
    @Id()
    @Column("id")
    public id?: string;

    @Column("name")
    public name: string;

    @Column("age")
    public age: number;

    ...
}
```

```typescript
import User from "../model/User";
import CrudRepository from "../nor/ts/crud-repository/CrudRepository";
import Persister from "../nor/ts/crud-repository/persistence/Persister";

export default class UserRepository extends CrudRepository<User> {
    constructor(persister: Persister) {
        super(new User(), persister);
    }
}
```

```typescript
import User from "../../model/User";
import UserRepository from "../../repository/UserRepository";
import PgPersister from "../../repository/persistence/PgPersister";

export class UserController {
    createUser(): UserDto {
        const userRepository = new UserRepository(new PgPersister());
        userRepository.save(new User(...));
        ...
    }
}
```

## ProcessUtils

### ProcessUtils.initEnvFromDefaultFiles()

This utility class includes a simple implementation for runtime `.env` file support.

```typescript
import ProcessUtils from "./nor/ts/ProcessUtils";

// Must be first import to define environment variables before anything else
ProcessUtils.initEnvFromDefaultFiles();
```

### ProcessUtils.setupDestroyHandler(shutdownHandler, errorHandler)

This utility function can be used to implement default shutdown handlers for the common runtime events.

It will hook into events `exit`, `SIGTERM`, `SIGINT`, `SIGUSR1`, `SIGUSR2` and `uncaughtException`.

The `shutdownHandler` will be called only once.

If an exception is thrown, the `errorHandler` will be called with the exception.

```typescript
import ProcessUtils from "./nor/ts/ProcessUtils";

const server = new Server();

server.start();

ProcessUtils.setupDestroyHandler( () => {
    server.stop();
}, (err : any) => {
    LOG.error('Error while shutting down the service: ', err);
});
```
