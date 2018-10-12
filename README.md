# Monitoring Angular applications using Application Insights

---

In this Lab you will learn to:

* Azure Application Insights
    * Create an instance of Application Insights
    * Use SDK to track events in your Angular application 
    
## Azure Applications Insights

1. In the browser, navigate to the Azure portal, https://portal.azure.com, and create a new Application Insights account 
![Create Azure Insights Account](https://tacofancy.blob.core.windows.net/tutorial/AppInsights.gif)
    
1. In your Angular project install *applicationinsights-js* npm package

```
npm i applicationinsights-js
```

2. In *app.component.ts* import and configure AppInsights. Retrieve instrumentation key from the Azure portal, the App Insights instance you created earlier, Overview page. Call downloadAndSetup method in the ngOnInit method

```javascript
/* import AppInsights */
import {AppInsights} from "applicationinsights-js"

/* Call downloadAndSetup to download full ApplicationInsights script from CDN and initialize it with instrumentation key */
AppInsights.downloadAndSetup({ instrumentationKey: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx" });
```

3. In *app.component.ts* configure AppInsights to track page views on route changed: 

```javascript
this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          AppInsights.trackPageView('home');
        } else {
          AppInsights.trackPageView(event.url.substring(1));
        }
      }
    });
  }
```
4. Commit and push changes to github. Run app and navigate to different routes a couple of times. Then go back to the AppInsights overview page and navigate to *Application Map* to monitor details about page views
![Page Views](https://tacofancy.blob.core.windows.net/tutorial/PageViews.png)


