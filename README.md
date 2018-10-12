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

## Azure Devops

1. In VS Code, go to the root of your project, create a file named *azure-pipelines.yml* and paste in the configuration bellow. ***Commit & push changes***
```yml
name: Tacos CICD

pool:
  vmImage: 'Ubuntu 16.04'

trigger:
  - master

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '8.x'
    displayName: 'Installing Node.js'

  - script: |
      npm install
      npm run build -- --prod
    displayName: 'Running npm install and build for prod'

  - task: CopyFiles@2
    inputs:
      sourceFolder: '$(System.DefaultWorkingDirectory)/dist/tacos-ui'
      contents: |
        **/*
      targetFolder: '$(Build.ArtifactStagingDirectory)'
      overWrite: true
    displayName: 'Copying built static files'

  - task: PublishBuildArtifacts@1
```

1. In the browser, go to http://dev.azure.com and click Sign in to Azure DevOps, use your Microsoft account to sign in. On the landing page click *New project*, fill in the project name with tacos-ui and click *Create*

1. In the new project, got to *Pipelines* -> *Builds* and click *New Pipeline*. Select Github as source, Authorize Gitub and choose the project you forked earlier, branch *00-start*. Continue and configure the build to use *Configuration as code* and select the yml file you created earlier. 

1. Save and queue. Click on the build link to view the in progress project
![Build Pipeline](https://tacofancy.blob.core.windows.net/tutorial/Build_Pipeline.png)
