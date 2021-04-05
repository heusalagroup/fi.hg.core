import EntityMetadata, {EntityField} from "./types/EntityMetadata";
import {forEach, has} from "../modules/lodash";
import CrudRepository from "./types/CrudRepository";
import Entity, {EntityIdTypes} from "./Entity";
import Persister from "./types/Persister";

export class RepositoryUtils {

    /**
     * Generates default properties using the entity metadata.
     *
     * This will create methods like:
     *
     *   `UserRepository.findByEmail(email: string) : Promise<User[]>` ...if the entity has `email` property
     *
     */
    public static generateDefaultMethods<T extends Entity, IdType extends EntityIdTypes> (
        proto          : any,
        entityMetadata : EntityMetadata
    ) {

        forEach(entityMetadata.fields, (item: EntityField) => {

            const propertyName = item.propertyName;

            const methodName = `findAllBy${propertyName.substr(0, 1).toUpperCase()}${propertyName.substr(1)}`;

            if (!has(proto, methodName)) {
                proto[methodName] = function (propertyValue: any) : Promise<T[]> {
                    const self = this;
                    const persister = self.getPersister();
                    return RepositoryUtils.getPropertyBy<T, IdType>(
                        self,
                        persister,
                        propertyName,
                        propertyValue,
                        entityMetadata
                    );
                };
            }

        });

    }

    public static async getPropertyBy<T extends Entity, IdType extends EntityIdTypes> (
        self           : CrudRepository<T, IdType>,
        persister      : Persister,
        propertyName   : string,
        propertyValue  : any,
        entityMetadata : EntityMetadata
    ) : Promise<T[]> {

        return await persister.findByProperty<T, IdType>(propertyName, propertyValue, entityMetadata);

    }

}

export default RepositoryUtils;
