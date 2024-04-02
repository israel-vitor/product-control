## Running application locally

#### You need to have Docker installed to run the application with the required DB

* After cloning the repository, rename the `.env.sample` file to `.env`
* Put the correct credentials for your postgresql database at `POSTGRES_USER` and `POSTGRES_PASSWORD` in `.env`
* Run `docker-compose up --build -d` (if using a linux dist add a `sudo` before the command)
* After the containers are up, access `localhost:3000/dashboard`

## Summary

This application is a simple product control with versioning. 

After running the application locally access `localhost:3000/` or `localhost:3000/dashboard` to see all the published products.

Access `localhost:3000/dashboard/modification-requests` to see all the change requests waiting for approval; 
You may click on the "Approve" button from each line to publish the change. Doing so, the modification will be available 
in the product listing;

Access `localhost:3000/dashboard/published-modifications` to see all the change once applied (publication history);

You can add a new Product accessing `localhost:3000/dashboard` and clicking at "Create Product"; Fill the form and then confirm;
Products initially created do not need approvals, only modifications;

You can create a new Product Modification Request accessing `localhost:3000/dashboard` and clicking at "Edit" button
from each product row; Udpate the form and then confirm; This modification request will now appear at 
`localhost:3000/dashboard/modification-requests`


____

We can perform the same actions by using the API.



`GET` - `http://localhost:3000/api/product`

List all the products available


`POST` - `http://localhost:3000/api/product`

Create a new product

`GET` - `http://localhost:3000/api/product-modification`

List all the pendent products modifications

#### Query Params 

* *productId* (Optional) - If provided, it fetches only the modification requests for the defined product 

`POST` - `http://localhost:3000/api/product-modification`

Create a new product modifications

#### Body Params (Form Data) 

* *product_id*
* *name*
* *price* 

`POST` - `http://localhost:3000/api/product-modification/approve`

Approves a defined product modifications

#### Body Params (Form Data) 

* *modification_id*


