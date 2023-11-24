# To start the project, the following steps are required:

1. Clone the project repository from the link https://github.com/Vasyl-Pavlenko/employees to your computer.
```
git clone https://github.com/Vasyl-Pavlenko/employees.git
```

2. open a terminal (or command line) and navigate to the root directory of the project.
```
cd employees
```

3. Install dependencies for the server part of the project. Enter the following command in the terminal:
```
npm install
```

4. Rename the .env.local file (remove the .local)
```
.env
```

5. Generate types
```
npx prisma generate
```

6. Create a database and do the migration
```
npx prisma migrate dev
```

7. Go to the client directory and install dependencies for the client part of the project.
```
cd client
npm install
```

8. Return to the root directory of the project.
```
cd ...
```

9. Start the project. Type the following command in the terminal:
```
npm run dev
```

10. Open a browser and go to http://localhost:3000 to see the running project.

Successfully running the project should show the list of employees in the browser. If there are any problems while installing or running the project, verify that all of the above steps were performed correctly and according to the instructions.
