# Employees

A small api backend project

## Import DB

For DB import run the command `mysql -u [user] -p < database/db.sql`

## Test

With an API consumer, you can run the next endpoints:

- **GET** `/ping` 

   For connection test. Returns "Pong" as result messasge

- **GET** `/api/employees` 
   
   Returns all employees data in JSON list as result. 
   If something fails return a 500 server status with an error message.

- **GET** `/api/employees/[employee_id]` 
   
   Returns specific employee data in JSON as result. 
   If employee doesn't exists, return 404 "not found" message.
   If something fails, return a 500 server status with an error message.

- **POST** `/api/employees` 
   
   Creates a new employee and returns it in JSON as result. 
   `name` string **AND** `salary` number fields **required in request body** to employee creation.
   If something fails return a 500 server status with an error message.

- **PATCH** `/api/employees/[employee_id]` 
   
   Updates an existing employee. 
   `name` string **OR** `salary` number fields **required in request body** to employee updating.
   If employee doesn't exists, return 404 "not found" message.
   If something fails, return a 500 server status with an error message.
   
- **DELETE** `/api/employees/[employee_id]` 
   
   Deletes an specific employee and returns a 204 server state. 
   If employee doesn't exists, return 404 "not found" message.
   If something fails, return a 500 server status with an error message.
   
