# sendanor/typescript

Our enterprise library for TypeScript.

## Install & maintain our library

This library is meant to be used as a git submodule in a NodeJS or webpack project.

Run the installation commands from your project's root directory. Usually it's where your `package.json` is located.

We also expect your source files to be located in `./src` and we'll use `./src/nor/ts` for location for our sub module.

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

This is only annotation library part. The actual server implementing REST API is not available from this module at the moment, but may be later.

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
