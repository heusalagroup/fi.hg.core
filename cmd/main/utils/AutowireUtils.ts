// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../functions/map";
import { keys } from "../../../functions/keys";
import { forEach } from "../../../functions/forEach";
import { LogLevel } from "../../../types/LogLevel";
import { AutowireService } from "../services/AutowireService";
import { AutowireMetadata } from "../types/AutowireMetadata";
import { LogService } from "../../../LogService";
import { AutowireServiceImpl } from "../services/AutowireServiceImpl";
import { AutowireMetadataUtils } from "./AutowireMetadataUtils";

const LOG = LogService.createLogger( 'AutowireUtils' );

/**
 * Can be used to autowire parameters to a function call automatically using
 * an AutowireManager instance.
 */
export class AutowireUtils {

    public static setLogLevel (level: LogLevel) : void {
        LOG.setLogLevel(level);
    }

    /**
     * Populates the arguments based on autowired parameter names.
     *
     * @param autowireService
     * @param paramNames
     */
    public static autowireValues (
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

    public static autowireApply (
        target       : any,
        propertyName : string | symbol,
        method       : Function,
        values      ?: {readonly [name: string]: any}
    ) : any {
        const metadata : AutowireMetadata = AutowireMetadataUtils.getMethodMetadata(target, propertyName);
        LOG.debug(`autowired metadata = `, metadata);
        const autowireService : AutowireService = AutowireServiceImpl.getAutowireService();
        const initializedValues = values ?? {};
        LOG.debug(`autowired initializedValues = `, initializedValues);
        const valueKeys = keys(initializedValues);
        LOG.debug(`autowired valueKeys = `, valueKeys);
        try {
            forEach(
                valueKeys,
                (key: string) => {
                    autowireService.setName(key, initializedValues[key]);
                }
            );
            autowireService.setName("autowireService", autowireService);
            LOG.debug(`autowired param names = `, metadata?.paramNames ?? []);
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
