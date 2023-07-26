// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { AutowireService } from "../types/AutowireService";
import { map } from "../../../functions/map";
import { AutowireMetadata } from "../types/AutowireMetadata";
import { AutowireMetadataUtils } from "./AutowireMetadataUtils";
import { LogService } from "../../../LogService";
import { keys } from "../../../functions/keys";
import { forEach } from "../../../functions/forEach";
import { AutowireServiceImpl } from "../types/AutowireServiceImpl";

const LOG = LogService.createLogger( 'AutowireUtils' );

/**
 * Can be used to autowire parameters to a function call automatically using
 * an AutowireManager instance.
 */
export class AutowireUtils {

    /**
     * Populates the arguments based on autowired parameter names.
     *
     * @param autowireService
     * @param paramNames
     */
    public static autowireValues<T> (
        autowireService: AutowireService,
        paramNames: readonly (string|undefined)[],
    ): any[] {
        return map(
            paramNames,
            (name: string | undefined) => {
                return name && autowireService.hasName(name) ? autowireService.getName<any>(name) : undefined;
            }
        );
    }

    public static autowireApply<T> (
        target       : any,
        propertyName : string | symbol,
        method       : Function,
        values      ?: {readonly [name: string]: any}
    ) : any {
        const metadata : AutowireMetadata = AutowireMetadataUtils.getMethodMetadata(target, propertyName);
        LOG.debug(`autowired metadata = `, metadata);
        const autowireService : AutowireService = AutowireServiceImpl.getAutowireService();
        const initializedValues = values ?? {};
        const valueKeys = keys(initializedValues);
        try {
            forEach(
                valueKeys,
                (key: string) => {
                    autowireService.setName(key, initializedValues[key]);
                }
            );
            autowireService.setName("autowireService", autowireService);
            const autowiredArgs = AutowireUtils.autowireValues(
                autowireService,
                metadata?.paramNames ?? []
            );
            LOG.debug(`autowired args = `, autowiredArgs);
            return method.apply( target, autowiredArgs );
        } finally {
            forEach(
                valueKeys,
                (key: string) => {
                    autowireService.deleteName(key);
                }
            );
            autowireService.deleteName("autowireService");
        }
    }

}
