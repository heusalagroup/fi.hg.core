**Join our [Discord](https://discord.gg/UBTrHxA78f) to discuss about our software!**

# HG data

This library is our Spring Data inspired annotation framework for 
implementing CRUD style entities and relational repositories for pure 
TypeScript.

Code under this core library does not require any external dependencies.

See also:

* [`fi.hg.pg`](https://github.com/heusalagroup/fi.hg.pg) -- The PostgreSQL
  persister
* [`fi.hg.mysql`](https://github.com/heusalagroup/fi.hg.mysql) -- The MySQL
  persister

### It doesn't have any runtime dependencies

### We don't have traditional releases

We don't have traditional releases.  This project evolves directly to our git 
repository in an agile manner.

This git repository contains only the source code for compile time use case. It 
is meant to be used as a git submodule in a NodeJS or webpack project.

### License

Copyright (c) Heusala Group Oy. All rights reserved. Licensed under the MIT 
License (the "[License](../LICENSE)");

## Installing & using our library

Run the installation commands from your project's root directory. Usually it's 
where your `package.json` is located.

For these sample commands we expect your source files to be located in `./src` 
and we'll use `./src/fi/hg/NAME` for location for our sub modules.

### The core library (includes memory-only support)

```shell
mkdir -p src/fi/hg
git submodule add git@github.com:heusalagroup/fi.hg.core.git src/fi/hg/core
git config -f .gitmodules submodule.src/fi/hg/core.branch main
npm install --save-dev lodash @types/lodash reflect-metadata @types/node
```

### For PostgreSQL support

```shell
git submodule add git@github.com:heusalagroup/fi.hg.pg.git src/fi/hg/pg
git config -f .gitmodules submodule.src/fi/hg/pg.branch main
npm install --save pg @types/pg
```

### For MySQL support

```shell
git submodule add git@github.com:heusalagroup/fi.hg.mysql.git src/fi/hg/mysql
git config -f .gitmodules submodule.src/fi/hg/mysql.branch main
npm install --save mysql @types/mysql
```

## Documentation

### Entity class example

First define a class for your entity -- we'll create `User` class:

```typescript
@Table("users")
export class User extends Entity {

    @Id()
    @Column("id")
    public id?: string;

    @Column("name")
    public name: string;

    @Column("email")
    public email: string;

    @Column("age")
    public age: number;

    //...
}
```

### Repository interface example

Then create a repository interface for your entities:

```typescript
export interface UserRepository extends CrudRepository<User, string> {

    findAllByEmail   (email : string) : Promise<User[]>;
    findByEmail      (email : string) : Promise<User | undefined>;
    countByEmail     (email : string) : Promise<number>;
    existsByEmail    (email : string) : Promise<boolean>;
    deleteAllByEmail (email : string) : Promise<void>;
    
}
```

**Note!** *You don't need to implement these methods.*

The framework does that under the hood for you. 

In fact, these methods will always be created -- even if you don't declare them 
in your interface. Declaration is only necessary for TypeScript and your IDE 
to know they exist in your interface.

### Controller example

Then use it in your controller like this:

```typescript
export interface UserDto {
    id    ?: string;
    email ?: string;
}

export class UserController {
    
    private readonly _userRepository : UserRepository;
    
    constructor (userRepository : UserRepository) {
       this._userRepository = userRepository;
    }
    
    public async createUser (): Promise<UserDto> {
        
        const newUser = new User(/*...*/);
        
        const addedUser = await this._userRepository.save(newUser);
        
        return {id: addedUser.id};
       
    }
    
}
```

### Main runtime example

Finally, put everything together in your main runtime file:

```typescript
const pgPersister    : Persister = new PgPersister(/*...*/);
const userRepository : UserRepository = createCrudRepositoryWithPersister<UserRepository, User, string>(new User(), pgPersister);
```

...or memory-only persister, which does not need runtime libraries, useful for 
development and testing purposes:

```typescript
const pgPersister    : Persister = new MemoryPersister();
const userRepository : UserRepository = createCrudRepositoryWithPersister<UserRepository, User, string>(new User(), pgPersister);
```

## Where we're going on with our Data implementation

We are also planning to implement `HttpPersister`, which would make it possible 
to use the API without a local dependency for these modules. It would 
connect over an HTTP REST interface to a separate microservice with the real 
MySQL or PostgreSQL pool (including the dependency).

### Life cycle annotations

* `@PostLoad()` -- Registers a callback to be executed after loading an entity.
* `@PostPersist()` -- Registers a callback to be executed after persisting an entity.
* `@PostRemove()` -- Registers a callback to be executed after removing an entity.
* `@PostUpdate()` -- Registers a callback to be executed after updating an entity.
* `@PrePersist()` -- Registers a callback to be executed before persisting an entity.
* `@PreRemove()` -- Registers a callback to be executed before removing an entity.
* `@PreUpdate()` -- Registers a callback to be executed before updating an entity.
