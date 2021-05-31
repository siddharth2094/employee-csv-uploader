# Employee Csv uploader backend

**Take application code from GitHub (https://github.com/siddharth2094/employee-csv-uploader), Branch is master**

## Steps to setup backend

1. Make sure to have node setup (version 12 or above) on your system.
2. run -> npm install
3. Create your free account on MongoDb Atlas by visiting on (https://account.mongodb.com/account/login?n=%2Fv2%2F5ef330078b199d2fed83eba1&nextHash=%23clusters)

4. Once account is setup, create new cluster , then click on connect.

5. Select **Connect using mongodb compass**, and then copy the connection string, for eg **mongodb+srv://<username>:<password>@cluster0.e8fl4.mongodb.net/test**.

6. Open mongodb compass and copy paste the given string and replace your username and password that you created while creating cluster, and connect.

7. after that go to index.js file in root folder of project and replace the string url of mongo cluster with yours in mongoose.connect function, also add your username and password (recommended to create .env file in root folder and give PORT in this file).

8. then run nodemon index.js to start server.

## Steps for setting up frontend (react)

1. Go to client folder, and then go to utils and replace host url with url on which your backend local server is running.
2. Now make sure to change your root directory path to client in your command prompt and then run npm install.
3. Then run npm start to start frontend.

## application functionality brief

1. This application is used to add employee data using csv file, user can download sample file by clicking on sample link above employee table with upload csv button.

2. User can file required data as per the reference from sample file and upload csv by clicking on upload csv button. Once it is uploaded and clicked on yes, user can see given table filled with same data as from csv.

3. User can use pagination, search, page size change as per his/her convinience to find required data.

4. All columns given in table except actions are sortable, user need to click on any header name field, for eg: Name to sort table as per name in ascending as well as descending order.

5. User can also view individual employee detail by clicking on eye icon, and can also delete any individual employee data by clicking on delete icon and confirming for same.

6. User can rreplace whole employee data by again uploading employee data csv file which will replace whole data with the new one.

7. All data is managed from backend, so even on closing the tab, if user again come back he/she will see the same data as before.

**Given application is also deployed on Heroku cloud service, so if you want to see the working application, please visit (http://employee-csv-uploader.herokuapp.com/)**
