# Hosting an Angular application on Azure Blob Storage

---

In this lab you will learn to:

* Azure Storage
    * Create a Storage Account using the Azure portal
    * Enable Static website hosting 
    * Deploy assets using the Storage extension in VS Code

* Azure Devops
    * Create a new Devops project
    * Configure a new Build Pipeline for an Angular project
    * Configure a new Release Pipeline to deploy files to Azure Storage
    
## Azure Storage

1. In the browser, navigate to the Azure portal, https://portal.azure.com, and create a new Storage account. 
![Create Storage Account](https://tacofancy.blob.core.windows.net/tutorial/CreateStorageAccount.gif)

1. From the newly create Storage account Overview page, using the left hand side menu navigate to *Settings* -> *Static website* . Here, enable static website and add index.html in the *Index document name* input. 
![Enable Static Website](https://tacofancy.blob.core.windows.net/tutorial/EnableStaticWebsite.png)

1. In Visual Studio Code, go to the extensions panel and install the Azure Storage extension. Alternatively, you can install it from the [marketplace](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestorage)

1. **Fork** our app from https://github.com/Angular-Azure-Workshop/tacos-ui and switch to the *00-start* branch. Build for production by running `ng build --prod`

1. Once you have the extension installed and the tacos project forked and, go to Azure Panel, select storage and click on *Deploy to Static Website*. 
![Deploy to Static Website](https://tacofancy.blob.core.windows.net/tutorial/DeployStaticWebsite.gif)
