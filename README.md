# CodeGPT Interface

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Dependency Versions
----
**Node.js**: v16.20.2 or later\
**npm**: 8.19.4 or later
> [!CAUTION]\
> Before running the server, make sure your OpenAI key is set in the .env file. The .env file is **not** included in the root directory, so you must create it. You should also create an environment variable called OPENAI_API_KEY and set it to your key.\
> Make sure port 3000 is available as the server defaults to it on a local machine. **You can also set your own port in the .env file by creating an environment variable called PORT. (Manual install only)**\
> If you set your own port, please see [here](###configuring-custom-ports) for additional steps.

Git Preliminaries
------
> [!TIP]
> Make sure to `fetch` latest updates and be on the correct `react` branch prior to running script(s).
> ```bash
> git fetch
> git checkout deploy
> ```

### To terminate servers, in CLI:
```bash
CTRL + C
```
Manual Install
-----
You do not need to do anything in the client directory to run the app unless you wish to modify the files inside it. In order to just run the app, run 
```
npm install
npm start
```
inside the root directory.

### Updating the frontend
The frontend is located in the **client** directory. There are build files already present in the **build** directory within **client**. However, every time any of the files in the other directories inside **client** are modified, the build needs to be redone.
You must run 
```bash
npm install
```
inside the **client** directory before attempting to build again. Then, when all the files are present, run
```bash
npm run build
```
Once the build is complete, you can run
```bash
cd ..
npm start
```
to see your changes (assuming you have already run **npm install** within the root directory). This approach unfortunately means that unlike in a traditional React project, changes made to the project's frontend will not be seen instantly; you must run **npm run build** every time changes are made.

### Configuring custom ports and building
In the root directory, run:
```bash
cd client
cd src
```
There will be a file called **interface.js** inside the **src** directory. If you scroll to the **fetchChatGPTResponse** function, you will find two variables called **local** and **ec2** that can be used in the URL that will be used to make a fetch request to the ChatGPT API. 
If you are running the app on your local machine, use **local** in the URL. If you are running it on its designated AWS EC2 instance, replace it with **ec2**. You may also create your own variables to use in the URL. **If you set your own port in the root directory's .env file, you MUST either change the content of the variable being used in the full URL or create your own and use it.** 
After you are done updating the **interface.js** file, run
```bash
npm run build
```
in the **client** directory, and then you can return to the root directory and restart the app.

Deployment
------
An AWS EC2 instance has been used to deploy the app. Its IP address is **18.226.98.245**.

### Logging into the instance
Please run:
```bash
ssh -i abc.pem ec2-user@18.226.98.245
```
in the folder where **abc.pem** is located. This is a key-value pair that is required to SSH into the instance. If you are helping with development, this will be provided.\
There may be an error stating that the permissions of **abc.pem** are too permissive. If this occurs, please run:
```bash
chmod 600 abc.pem
```
Please then clone the repository and switch to the **deploy** branch as discussed above.\
You may have to log in to GitHub to clone this repository. For your password, you can use a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).\
You should have a **GPT_interface** directory wherever you have cloned the repository. Please make sure you [install node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm); however, the instance should already have these installed if you work in superuser mode.\

It is recommended to test the application on a local environment, update the repository with your code, and then clone it to run it on the instance. You will need to run
```bash
sudo su
```
to enter superuser mode and be able to delete certain directories.

### Using PM2
PM2 is used here to keep the application online on the IP address given above. It is best to only keep one application online at a time for now as not every port has been set as valid on the AWS website. **It is heavily recommended to set PORT to 80 inside the .env file and then update the interface.js file within the frontend code to use the *env* string.**\

In order to use PM2, please run
```bash
cd ChatGPT_interface
```
in the instance's root directory. Ensure that all steps have been taken to set up the server.\

To install PM2, run:
```bash
npm install -g pm2
```
Please ensure that the server is not running on the EC2 instance before launching the app in a production setting. Once you have made sure of this, please run
```bash
pm2 start --name 'deployment-name' server.js
```
inside the **ChatGPT_interface** directory. You may give the deployment any name.\
To view all your deployments, run:
```bash
pm2 list
```
To stop a deployment, run:
```bash
pm2 stop deployment_name
```
To restart a deployment, run:
```bash
pm2 restart deployment_name
```
To reload a deployment, run:
```bash
pm2 reload deployment_name
```
To delete a deployment, run:
```bash
pm2 delete deployment_name
```
This may be helpful when you need to clone this repository inside the instance many times. For more information about PM2, please see [here](https://pm2.keymetrics.io/docs/usage/quick-start/) and [here](https://betterstack.com/community/guides/scaling-nodejs/pm2-guide/).

Debugging
-----
You may see any lint errors in the console.
