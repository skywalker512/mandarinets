# Adding Oak Middleware
Since version 1.2.3, Mandarine allows you to add a custom Oak middleware to your application, this is possible because Mandarine runs on top of Oak.

----

## API
Before running your application through `new MandarineCore().MVC().run()`, you can use the method `addMiddleware` part of MandarineMVC to add an [Oak Middleware](https://github.com/oakserver/oak#application-middleware-and-context)

```typescript
import { MandarineCore } from "https://x.nest.land/MandarineTS@1.2.2/mod.ts";

... 

let MVC = new MandarineCore().MVC();

MVC.addMiddleware(async (context, next) => {

});
```

&nbsp;

> Note that this is not recommended as it may affect internal functionalities of Mandarine MVC. 




