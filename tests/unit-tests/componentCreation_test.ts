import { Test, DenoAsserts, Orange } from "../mod.ts";
import { MainCoreDecoratorProxy } from "../../main-core/proxys/mainCoreDecorator.ts";
import { Mandarine } from "../../main-core/Mandarine.ns.ts";
import { Reflect } from "../../main-core/reflectMetadata.ts";
import { MandarineConstants } from "../../main-core/mandarineConstants.ts";
import { ComponentComponent } from "../../main-core/components/component-component/componentComponent.ts";
import { ServiceComponent } from "../../main-core/components/service-component/serviceComponent.ts";
import { MiddlewareComponent } from "../../main-core/components/middleware-component/middlewareComponent.ts";
import { ConfigurationComponent } from "../../main-core/components/configuration-component/configurationComponent.ts";
import { MVCDecoratorsProxy } from "../../mvc-framework/core/proxys/mvcCoreDecorators.ts";
import { ControllerComponent } from "../../mvc-framework/core/internal/components/routing/controllerContext.ts";
import { ApplicationContext } from "../../main-core/application-context/mandarineApplicationContext.ts";

export class ComponentCreationTests {

    constructor() {
        Orange.setOptions(this, {
            hooks: {
                beforeEach: () => ApplicationContext.getInstance().getComponentsRegistry().clearComponentRegistry()
            }
        })
    }

    @Test({
        name: "Create Controller",
        description: "Executes the creation of a regular Controller without a base route"
    })
    public createController() {

        class MyController {

        }
        
        MVCDecoratorsProxy.registerControllerComponent(MyController, undefined);
        const originalMetadataKey = `${MandarineConstants.REFLECTION_MANDARINE_COMPONENT}:controller:MyController`;
        const reflectMetadataKeys = Reflect.getMetadataKeys(MyController);
        const componentMetadata = Reflect.getMetadata(originalMetadataKey, MyController);
        DenoAsserts.assertArrayContains(reflectMetadataKeys, [originalMetadataKey]);
        DenoAsserts.assert(componentMetadata != (undefined || null));
        DenoAsserts.assertEquals(componentMetadata, {
            componentName: "MyController",
            componentConfiguration: {
                pathRoute: undefined
            },
            componentType: Mandarine.MandarineCore.ComponentTypes.CONTROLLER,
            componentInstance: MyController,
            classParentName: "MyController"
        });
        DenoAsserts.assert(Mandarine.Global.getComponentsRegistry().get("MyController").componentInstance instanceof ControllerComponent);
    }

    @Test({
        name: "Create Controller",
        description: "Executes the creation of a regular Controller with a base route"
    })
    public createControllerWithBaseRoute() {

        class MyController2 {

        }
        
        MVCDecoratorsProxy.registerControllerComponent(MyController2, "/api");
        const originalMetadataKey = `${MandarineConstants.REFLECTION_MANDARINE_COMPONENT}:controller:MyController2`;
        const reflectMetadataKeys = Reflect.getMetadataKeys(MyController2);
        const componentMetadata = Reflect.getMetadata(originalMetadataKey, MyController2);
        DenoAsserts.assertArrayContains(reflectMetadataKeys, [originalMetadataKey]);
        DenoAsserts.assert(componentMetadata != (undefined || null));
        DenoAsserts.assertEquals(componentMetadata, {
            componentName: "MyController2",
            componentConfiguration: {
                pathRoute: "/api"
            },
            componentType: Mandarine.MandarineCore.ComponentTypes.CONTROLLER,
            componentInstance: MyController2,
            classParentName: "MyController2"
        });
        DenoAsserts.assert(Mandarine.Global.getComponentsRegistry().get("MyController2").componentInstance instanceof ControllerComponent);
    }

    @Test({
        name: "Create component",
        description: "Executes the creation of a Regular component"
    })
    public createRegularComponent() {

        class MyComponent {

        }

        MainCoreDecoratorProxy.registerMandarinePoweredComponent(MyComponent, Mandarine.MandarineCore.ComponentTypes.COMPONENT, {}, null);
        const originalMetadataKey = `${MandarineConstants.REFLECTION_MANDARINE_COMPONENT}:component:MyComponent`;
        const reflectMetadataKeys = Reflect.getMetadataKeys(MyComponent);
        const componentMetadata = Reflect.getMetadata(originalMetadataKey, MyComponent);
        DenoAsserts.assertArrayContains(reflectMetadataKeys, [originalMetadataKey]);
        DenoAsserts.assert(componentMetadata != (undefined || null));
        DenoAsserts.assertEquals(componentMetadata, {
            componentName: "MyComponent",
            componentConfiguration: {},
            componentType: Mandarine.MandarineCore.ComponentTypes.COMPONENT,
            componentInstance: MyComponent,
            classParentName: "MyComponent"
        });
        DenoAsserts.assert(Mandarine.Global.getComponentsRegistry().get("MyComponent").componentInstance instanceof ComponentComponent);
    }

    @Test({
        name: "Create service",
        description: "Executes the creation of a Service component"
    })
    public createServiceComponent() {

        class MyService {

        }

        MainCoreDecoratorProxy.registerMandarinePoweredComponent(MyService, Mandarine.MandarineCore.ComponentTypes.SERVICE, {}, null);
        const originalMetadataKey = `${MandarineConstants.REFLECTION_MANDARINE_COMPONENT}:service:MyService`;
        const reflectMetadataKeys = Reflect.getMetadataKeys(MyService);
        const componentMetadata = Reflect.getMetadata(originalMetadataKey, MyService);
        DenoAsserts.assertArrayContains(reflectMetadataKeys, [originalMetadataKey]);
        DenoAsserts.assert(componentMetadata != (undefined || null));
        DenoAsserts.assertEquals(componentMetadata, {
            componentName: "MyService",
            componentConfiguration: {},
            componentType: Mandarine.MandarineCore.ComponentTypes.SERVICE,
            componentInstance: MyService,
            classParentName: "MyService"
        });
        DenoAsserts.assert(Mandarine.Global.getComponentsRegistry().get("MyService").componentInstance instanceof ServiceComponent);
    }

    @Test({
        name: "Create Middleware",
        description: "Executes the creation of a Middleware component"
    })
    public createMiddlewareComponent() {

        class MyMiddleware {

        }
        let regex = new RegExp('/api/*');
        MainCoreDecoratorProxy.registerMandarinePoweredComponent(MyMiddleware, Mandarine.MandarineCore.ComponentTypes.MIDDLEWARE, {
            regexRoute: regex
        }, null);
        const originalMetadataKey = `${MandarineConstants.REFLECTION_MANDARINE_COMPONENT}:middleware:MyMiddleware`;
        const reflectMetadataKeys = Reflect.getMetadataKeys(MyMiddleware);
        const componentMetadata = Reflect.getMetadata(originalMetadataKey, MyMiddleware);
        DenoAsserts.assertArrayContains(reflectMetadataKeys, [originalMetadataKey]);
        DenoAsserts.assert(componentMetadata != (undefined || null));
        DenoAsserts.assertEquals(componentMetadata, {
            componentName: "MyMiddleware",
            componentConfiguration: {
                regexRoute: regex
            },
            componentType: Mandarine.MandarineCore.ComponentTypes.MIDDLEWARE,
            componentInstance: MyMiddleware,
            classParentName: "MyMiddleware"
        });
        let componentInsideDIFactory = Mandarine.Global.getComponentsRegistry().get("MyMiddleware").componentInstance;
        DenoAsserts.assert(componentInsideDIFactory instanceof MiddlewareComponent);
        DenoAsserts.assert(((<any>componentInsideDIFactory).regexRoute) == regex);
    }

    @Test({
        name: "Create configuration",
        description: "Executes the creation of a Configuration component"
    })
    public createConfigurationComponent() {

        class MyConfiguration {

        }

        MainCoreDecoratorProxy.registerMandarinePoweredComponent(MyConfiguration, Mandarine.MandarineCore.ComponentTypes.CONFIGURATION, {}, null);
        const originalMetadataKey = `${MandarineConstants.REFLECTION_MANDARINE_COMPONENT}:configuration:MyConfiguration`;
        const reflectMetadataKeys = Reflect.getMetadataKeys(MyConfiguration);
        const componentMetadata = Reflect.getMetadata(originalMetadataKey, MyConfiguration);
        DenoAsserts.assertArrayContains(reflectMetadataKeys, [originalMetadataKey]);
        DenoAsserts.assert(componentMetadata != (undefined || null));
        DenoAsserts.assertEquals(componentMetadata, {
            componentName: "MyConfiguration",
            componentConfiguration: {},
            componentType: Mandarine.MandarineCore.ComponentTypes.CONFIGURATION,
            componentInstance: MyConfiguration,
            classParentName: "MyConfiguration"
        });
        DenoAsserts.assert(Mandarine.Global.getComponentsRegistry().get("MyConfiguration").componentInstance instanceof ConfigurationComponent);
    }


}