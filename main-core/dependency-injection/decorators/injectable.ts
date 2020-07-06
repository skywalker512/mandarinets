import { DependencyInjectionDecoratorsProxy } from "../../proxys/dependencyInjectionDecorator.ts";

/**
 * **Decorator**
 * 
 * Defines a manual injection for non-mandarine components.
 * https://github.com/mandarineorg/mandarinets/wiki/Manual-Components
 *
 * `@Injectable()
 *  Target: method`
 */
export const Injectable = () => {
    return (target: any, methodName: string) => {
        DependencyInjectionDecoratorsProxy.registerInjectableDecorator(target, methodName);
    }
}