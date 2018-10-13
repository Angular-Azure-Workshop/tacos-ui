# tacos-ui

A demo Angular application for Simona and Brian's Angular and Azure Workshop

## Setup to run completed app

- `git clone git@github.com:Angular-Azure-Workshop/tacos-ui.git`
- `npm i`
- Update `src/environments/environment.ts` with the proper URL's
- `ng serve --ssl`
- Open your browser to [https://127.0.0.1:4200](https://127.0.0.1:4200)

## Workshop Modules

- [Module 0: Setup](https://github.com/Angular-Azure-Workshop/workshop-modules/blob/master/00-setup.md)
- [Module 1: Azure Storage and DevOps](https://github.com/Angular-Azure-Workshop/workshop-modules/blob/master/01-storage-and-devops.md)
- [Module 2: Application Insights in Angular](https://github.com/Angular-Azure-Workshop/workshop-modules/blob/master/02-ui-monitoring.md)
- [Module 3: Azure Functions (Serverless)](https://github.com/Angular-Azure-Workshop/workshop-modules/blob/master/03-azure-functions.md)
- [Module 4: Azure CosmosDB](https://github.com/Angular-Azure-Workshop/workshop-modules/blob/master/04-azure-cosmosdb.md)
- [Module 5: Application Insights in Azure Functions](https://github.com/Angular-Azure-Workshop/workshop-modules/blob/master/05-api-monitoring.md)
- [Module 6: Authentication in Azure](https://github.com/Angular-Azure-Workshop/workshop-modules/blob/master/06-authentication-in-azure.md)
- [Module 7: Azure Security](https://github.com/Angular-Azure-Workshop/workshop-modules/blob/master/07-azure-security.md)

In this lab you will learn to:

* [Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/?WT.mc_id=workshop-github-js-team)
    * Create a App Service using the Azure portal
    * Setup a web hook for continuous deployment in Container Registry

* [Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/?WT.mc_id=workshop-github-js-team)
    * Create a new Container Registry 
    * Build Docker image and deploy manually to container registry
    
## Azure Container Registry

1. In the browser, navigate to the Azure portal, https://portal.azure.com, and create a new Container Registry account. 

1. In Visual Studio Code, go to the extensions panel and install the Docker extension. Alternatively, you can install it from the [marketplace](https://marketplace.visualstudio.com/items/?WT.mc_id=workshop-github-js-team&itemName=PeterJausovec.vscode-docker)

1. **Fork** our app from https://github.com/Angular-Azure-Workshop/tacos-ui and switch to the *00-start* branch. Build for production by running `ng build --prod`

2. Once you have the extension installed and the tacos project forked create a file names *Dockerfile* and paste in the following:

```
FROM nginx:stable-alpine
LABEL author="Simona Cotin"
COPY ./dist/tacos-ui /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
ENTRYPOINT ["nginx","-g","daemon off;"]
```
3. Next, create a *nginx.conf* file and paste in the contents from [here](https://github.com/simonaco/tacos-ui-/blob/master/nginx.conf) 

4. From your IDE, run  
```
docker build -t <your_cr>/tacos:1.0 .
docker login --username $DOCKER_USER --password $DOCKER_PASS <your_cr>
docker push <your_cr>/tacos:1.0
```

5. In the Azure Portal, go to your newly create container registry, *Repositories* -> *tacos* -> *tags*. Click on the three dots next to *1.0* and choose Deploy to Web App. From there create a new App Service account. This enables continuous deployment by creating a webhook.

6. Navigate to the new AppService and visit page to check deployment.

7. Now automate the process by adding Azure DevOps

## Azure Devops

1. In VS Code, go to the root of your project, create a file named *azure-pipelines.yml* and paste in the configuration bellow. ***Commit & push changes***
```yml
name: tacos

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
    displayName: 'Running npm install and build'
  - script: docker build -t $(dockerId)/$(imageName)  .
  - script: docker login -u $(user) -p $(pswd) sicotin.azurecr.io
  - script: docker push $(dockerId)/$(imageName)
```
### Build Pipeline

1. In the browser, go to http://dev.azure.com and click Sign in to Azure DevOps, use your Microsoft account to sign in. On the landing page click *New project*, fill in the project name with tacos-ui and click *Create*

1. In the new project, got to *Pipelines* -> *Builds* and click *New Pipeline*. Select Github as source, Authorize Gitub and choose the project you forked earlier, branch *00-start*. Continue and configure the build to use *Configuration as code* and select the yml file you created earlier. 

2. Go to the variables tab and create new ones for dockerId, user, imageName and password. 

3. Save and queue. Click on the build link to view the in progress project

