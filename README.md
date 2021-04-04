# sendanor/typescript

Our enterprise library for TypeScript.

This git repository contains only the source code for a compile time use case. It is meant to be used as a git submodule in a NodeJS or webpack project.

See [sendanor/typescript-package](https://github.com/sendanor/typescript-package) for a full package example. Although, keep in mind, this repository is not intended to be used as a NPM package dependency.

## Releases

We don't have traditional releases. 

This project evolves directly to our git repository in an agile manner.

However, we can make releases for a commercial customer. One stable release is 16 000 € + taxes. The payment may include 
one month of agile development with the customer. It will also include one year of support for that release branch.

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

```typescript
import Request, {
    GetMapping, 
    PostMapping, 
    RequestBody, 
    ResponseEntity, 
    RequestHeader, 
    RequestParam,
    Headers
} from "./src/nor/ts/Request";

export interface ListDTO<T> {
    pageNumber: number;
    pageSize: number;
    content: Array<T>;
}

@RequestMapping("/foo/users")
@RequestMapping("/users")
export class UserController {
    private readonly _userService: UserService;

    constructor(userService: UserService) {
        this._userService = userService;
    }

    @GetMapping("/", "/list")
    public async getUserList(
        @RequestParam("p", Request.ParamType.INTEGER)
        pageNumber: number = 0,
        @RequestParam("l", Request.ParamType.INTEGER)
        pageSize: number = 10,
        @RequestHeader('accept', {defaultValue: '*/*'})
        accept: string
    ): Promise<ResponseEntity<ListDTO<UserModel>>> {
        
        // const parsedPageNumber = pageNumber ? parseInt(pageNumber, 10) : 0;
        // const parsedPageSize   = pageSize   ? parseInt(pageSize, 10)   : 10;

        return ResponseEntity.ok({
            pageNumber: pageNumber,
            pageSize: pageSize,
            content: await this._userService.getUserList(pageNumber, pageSize),
        });
        
    }

    @GetMapping("/items/{id}")
    public async getUserList(
        @PathVariable('id')
        id: string
    ): Promise<ResponseEntity<Json>> {
        
        return ResponseEntity.ok({
           itemId: id
        });
        
    }

    @PostMapping("/addUser")
    public async addUser (
        @RequestBody   user    : Json,
        @RequestHeader headers : Headers
    ) : Promise<ResponseEntity<Json>> {
        
        const host = headers.getHost();
        
        await this._userService.addUser(user);
        
        return ResponseEntity.ok({
            user: user,
            host: host
        });
        
    }
    
}
```

You can also use:

 * `@Request.mapping` instead of `@RequestMapping`,
 * `@Request.param` instead of `@RequestParam`,
 * `@Request.header` instead of `@RequestHeader`,
 * `@Request.body` instead of `@RequestBody`,
 * `@Request.getMapping(...)` instead of `GetMapping(...)` or `Request.mapping(Request.Method.GET, ...)`
 * `@Request.putMapping(...)` instead of `PutMapping(...)` or `Request.mapping(Request.Method.PUT, ...)`
 * `@Request.postMapping(...)` instead of `PostMapping(...)` or `Request.mapping(Request.Method.POST, ...)`
 * `@Request.deleteMapping(...)` instead of `DeleteMapping(...)` or `Request.mapping(Request.Method.DELETE, ...)`

For the actual server implementing REST API, see next chapter.

## RequestServer

This project also includes a simple and pure NodeJS implementation for the REST server implementing [our Request annotated controllers](#request):

```typescript
import RequestServer from "./nor/ts/RequestServer";
const server = new RequestServer("http://0.0.0.0:3000");
server.attachController(UserController);
server.start();
```

See also our [`ProcessUtils`](#processutils) for best practices implementing complete runtime support.

## CrudRepository

Spring Data like annotation mechanism for entities and simple `CrudRepository` implementation.

First define `User` class for your entities:

```typescript
import { Table, Entity, Id, Column } from "./nor/ts/repository/Entity";

@Table("users")
export default class User extends Entity {
    @Id()
    @Column("id")
    public id?: string;

    @Column("name")
    public name: string;

    @Column("age")
    public age: number;

    //...
}
```

...and a repository class for these entities:

```typescript
import User from "../model/User";
import CrudRepository, {Persister} from "./nor/ts/repository/CrudRepository";

export default class UserRepository extends CrudRepository<User> {

    constructor(persister: Persister) {
        super(new User(), persister);
    }
    
}
```

Then use it in your code:

```typescript
import User from "./model/User";
import UserRepository from "./UserRepository";
import PgPersister from "./nor/ts/repository/persisters/pg/PgPersister";

export class UserController {
    createUser(): UserDto {
        const userRepository = new UserRepository(new PgPersister());
        userRepository.save(new User(/*...*/));
        // ...
    }
}
```

You will also need to install `pg` module for `PgPersister`:

```shell
npm install --save pg @types/pg
```

We also have an identical `MySqlPersister`. In that case, install `mysql` module:

```shell
npm install --save mysql @types/mysql
```

We are also planning to implement `HttpPersister`, which would make it possible to use the API without a local dependency
for these modules. It would connect over an HTTP REST interface to a separate microservice with the real MySQL or 
PostgreSQL pool (including the dependency).

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
