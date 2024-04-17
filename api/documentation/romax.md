
## File Structure

- config/
- models/
- routes/
- utils/
- index.js

## Schemas
### Product Schema
* Schema Name: Product
* Fields: 
  * `title (string)`: Product Title
  * `desc (string)`: Product Description
  * `img (array)`: Product Images
  * `category (string)`: Product Category
  * `propertyType (string)`: Product Type
  * `size (string)` : Product Size
  * `address (string)`: Product Address
  * `location (string)`: Product Location
  * `car (number)`: Number of Car Parking
  * `bed (number)`: Number of Bedroom
  * `bath (number)`: Number of Bathroom
  * `price (number)` : Product Price
  * `features (array)`: Product Features
  * `inStock (boolean)`: Availabilty of Product
  * `isFeatured (boolean)`: Identify Featured Product

## Schemas
### Timeline Schema
* Schema Name: Estate
* Fields: 
  * `title (string)`: Estate Title
  * `desc (string)`: Estate Description
  * `img (array)`: Estate Images
  * `categories (array)`: Estate Category
  * `location (string)`: Estate Location
  * `house (number)`: Number of Houses in the Estate
  * `features (array)`: Estate Features

## Schemas
### User Schema
* Schema Name: User
* Fields: 
  * `firstName (string)`: User FirstName
  * `lastName (string)`: User LastName
  * `username (string)`: User Username
  * `email (string)`: User E-mail
  * `password (string)` : User Password
  * `isAdmin (boolean)`: User Admin

### Address Schema
* Schema Name: Address
* Fields: 
  * `fullname (string)`: User's Fullname
  * `address (string)`: User's Address
  * `state (string)`: State of the Address
  * `phone (string)` : User's Phone Number
  
### Booking Schema
* Schema Name: Booking
* Fields: 
  * `bookingId (string)`: Booking ID
  * `product (ObjectId)`: Booked Property
  * `bookDate (date)`: Date of Booking
  * `viewDate (date)` : Date of Inspection
  * `phone (string)` : User's Phone Number
  * `email (string)` : User's Email Address
  * `message (string)` : User's Message

### FAQ Schema
* Schema Name: FAQ
* Fields: 
  * `question (string)`: FAQ Question
  * `answer (string)`: FAQ Answer

## Schemas
### TImeline Schema
* Schema Name: TImeline
* Fields: 
  * `title (string)`: TImeline Title
  * `subtitle (string)`: Sub-Title Sub-Title
  * `paragraph (string)`: TImeline Paragraph
  * `paragraph2 (string)`: TImeline 2nd Paragraph
  * `dateText (string)` : TImeline Date
  * `color (string)`: TImeline Color
  * `background (string)`: TImeline Background Color

## Routes
### Product Route
1. Create Product (/api/products)
   * HTTP Method: POST
   * Access: Admin Only
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
     * Content-type: multipart/form
   * Request Body:  
     * title(string,required):  The title of the product.
     *  title(string,required):  The description of the product.
     * image(array of file,optional): The product images.
     * category(string, optional) : The category of the product.
     * propertyType(string, required): The type of product.
     * size(string, required): The size of the product.
     * address(string,required): The address of the product.
     * location(string, required): The location of the product.
     * car(number, required):  Number of car parking
     * bed(number, required): Number of bedroom
     *  bath(number, required): Number of bathroom
      *  price(number, required): Price of the product
     *  features(array of string, required): Features of the product
     *  inStock(boolean,reqiured): Availability of the  product.
     *  isFeatured: Identify featured product.

    * Responses Body:  
  On a sucessful request, the API will return a 201  response code with a JSON object that contains the details of the new property.

2. Get All Product (/api/products)
   * HTTP Method: GET
   * Description: This endpoint retrieves a comprehensive list of all products stored within the database, considering query parameters if provided.
   * Access: Public
   * Responses Body:  
     The API will respond with a 200 OK status code and return a JSON array that includes all products in the database, also considering query parameters if provided.                              

3. Get A Product (/api/products/:id)
   * HTTP Method: GET
   * Description: This endpoint returns  a product with the specified id in the database..
   * Access: Public
   * Responses Body:  
     The API will respond with a 200 OK status code and return a JSON object representing the product with the specified ID in the database.   

4. Delete A Product (/api/products/:id)
   * HTTP Method: DELETE
   * Description: This endpoint deletes a product with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
   * Responses Body:  
      If the request is successful, the API will return a 204 code with a JSON object that contains information about the product that was deleted.

5. Update A Product (/api/products/:id)
   * HTTP Method: PUT
   * Description: This endpoint update a product with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
     * Content-type: multipart/form
   * Request Body:  
     * title(string,required):  The title of the product.
     *  title(string,required):  The description of the product.
     * image(array of file,optional): The property’s image.
     * category(string, optional) : The category of the product.
     * propertyType(string, required): The type of product.
     * size(string, required): The size of the product.
     * address(string,required): The address of the product.
     * location(string, required): The location of the product.
     * car(number, required):  Number of car parking
     * bed(number, required): Number of bedroom
     *  bath(number, required): Number of bathroom
      *  price(number, required): Price of the product
     *  features(array of string, required): Features of the product
     *  inStock(boolean,reqiured): Availability of the  product.
     *  isFeatured: Identify featured product.

   * Responses Body:  
      If the request is successful, the API will return a 204 code with a JSON object that contains information about the product that was updated.


6. Get All Product Locations (/api/products/get-locations)
   * HTTP Method: GET
   * Description: This endpoint returns  all product locations  in the database.
   * Access: Public
   * Responses Body:  
     The API will  return array of product locations  in the database. 

7. Get All Product Locations (/api/products/get-property-type)
   * HTTP Method: GET
   * Description: This endpoint returns  all product types  in the database.
   * Access: Public
   * Responses Body:  
     The API will  return array of product types  in the database. 

     
### Estate Route
1. Create Estate (/api/estate)
   * HTTP Method: POST
   * Access: Admin Only
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
     * Content-type: multipart/form
   * Request Body:  
     * title(string,required):  The title of the estate.
     * desc(string,required):  The description of the estate.
     * image(array of file,require): The estate images.
     * category(array, optional) : The category of the estate.
     * house(number, optional): Number of houses in the estate.
     * location(string, required): The location of the estate.
     * features(array of string, required): Features of the estate.

    * Responses Body:  
  On a sucessful request, the API will return a 201  response code with a JSON object that contains the details of the new property.

2. Get All Estate (/api/estate)
   * HTTP Method: GET
   * Description: This endpoint retrieves a comprehensive list of all products stored within the database, considering query parameters if provided.
   * Access: Public
   * Responses Body:  
     The API will respond with a 200 OK status code and return a JSON array that includes all products in the database, also considering query parameters if provided.                              

3. Get A Estate (/api/estate/:id)
   * HTTP Method: GET
   * Description: This endpoint returns  a product with the specified id in the database..
   * Access: Public
   * Responses Body:  
     The API will respond with a 200 OK status code and return a JSON object representing the product with the specified ID in the database.   

4. Delete A Estate (/api/estate/:id)
   * HTTP Method: DELETE
   * Description: This endpoint deletes a product with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
   * Responses Body:  
      If the request is successful, the API will return a 204 code with a JSON object that contains information about the product that was deleted.

5. Update A Estate (/api/estate/:id)
   * HTTP Method: PUT
   * Description: This endpoint update a product with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
     * Content-type: multipart/form
   * Request Body:  
     * title(string,required):  The title of the estate.
     * desc(string,required):  The description of the estate.
     * image(array of file,require): The estate images.
     * category(array, optional) : The category of the estate.
     * house(number, optional): Number of houses in the estate.
     * location(string, required): The location of the estate.
     * features(array of string, required): Features of the estate.
   * Responses Body:  
      If the request is successful, the API will return a 204 code with a JSON object that contains information about the product that was updated.

### Timeline Route
1. Create Timeline (/api/timeline)
   * HTTP Method: POST
   * Access: Admin Only
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
     * Content-type: multipart/form
   * Request Body:  
     * title(string,required):  The title of the timeline.
     * paragraph(string,required):  The description of the timeline.
     * paragraph2(string,optional):  The description of the timeline.
     * dateText(string, optional) : The date of the timeline.
     * color(string, required): Color in the timeline.
     * background(string, required): The background of the timeline.

    * Responses Body:  
  On a sucessful request, the API will return a 201  response code with a JSON object that contains the details of the new property.

2. Get All Timeline (/api/timeline)
   * HTTP Method: GET
   * Description: This endpoint retrieves a comprehensive list of all products stored within the database, considering query parameters if provided.
   * Access: Public
   * Responses Body:  
     The API will respond with a 200 OK status code and return a JSON array that includes all products in the database, also considering query parameters if provided.                              

3. Get A Timeline (/api/timeline/:id)
   * HTTP Method: GET
   * Description: This endpoint returns  a product with the specified id in the database..
   * Access: Public
   * Responses Body:  
     The API will respond with a 200 OK status code and return a JSON object representing the product with the specified ID in the database.   

4. Delete A Timeline (/api/timeline/:id)
   * HTTP Method: DELETE
   * Description: This endpoint deletes a product with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Admin
   * Request Header:
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
   * Responses Body:  
      If the request is successful, the API will return a 204 code with a JSON object that contains information about the product that was deleted.

5. Update A Timeline (/api/timeline/:id)
   * HTTP Method: PUT
   * Description: This endpoint update a product with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
     * Content-type: multipart/form
   * Request Body:  
     * title(string,required):  The title of the timeline.
     * paragraph(string,required):  The description of the timeline.
     * paragraph2(string,optional):  The description of the timeline.
     * dateText(string, optional) : The date of the timeline.
     * color(string, required): Color in the timeline.
     * background(string, required): The background of the timeline.

   * Responses Body:  
      If the request is successful, the API will return a 204 code with a JSON object that contains information about the product that was updated.

### User Route
1. Create User (/api/users)
   * HTTP Method: POST
   * Access: Admin Only
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
     * Content-type: multipart/form
   * Request Body:  
     * firstName(string,required):  The firstName of the user.
     * lastName(string,required):  The lastName of the user.
     * username(string,required):  The username of the user.
     * password(string, required) : The password of the user.
     * isAdmin(boolean, default false): Color in the user.

    * Responses Body:  
  On a sucessful request, the API will return a 201  response code with a JSON object that contains the details of the new property.

2. Get All User (/api/user)
   * HTTP Method: GET
   * Description: This endpoint retrieves a comprehensive list of all products stored within the database, considering query parameters if provided.
   * Access: Public
   * Responses Body:  
     The API will respond with a 200 OK status code and return a JSON array that includes all products in the database, also considering query parameters if provided.                              

3. Get A User (/api/user/:id)
   * HTTP Method: GET
   * Description: This endpoint returns  a product with the specified id in the database..
   * Access: Public
   * Responses Body:  
     The API will respond with a 200 OK status code and return a JSON object representing the product with the specified ID in the database.   

4. Delete A User (/api/user/:id)
   * HTTP Method: DELETE
   * Description: This endpoint deletes a product with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Admin
   * Request Header:
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
   * Responses Body:  
      If the request is successful, the API will return a 204 code with a JSON object that contains information about the product that was deleted.

5. Update A User (/api/user/:id)
   * HTTP Method: PUT
   * Description: This endpoint update a product with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
     * Content-type: multipart/form
   * Request Body:  
    * firstName(string,required):  The firstName of the user.
     * lastName(string,required):  The lastName of the user.
     * username(string,required):  The username of the user.
     * password(string, required) : The password of the user.
     * isAdmin(boolean, default false): Color in the user.
     
   * Responses Body:  
      If the request is successful, the API will return a 204 code with a JSON object that contains information about the product that was updated.


### Address Route
1. Create Address (/api/address) 
   * HTTP Method: POST
   * Access: Private/Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to 'Bearer `token`'.
   * Request Body:  
     * fullname(string,required): The User's Fullname .
     *  address(string,required):  The Users addresss.
     * state(string,required): The state of the address provided.
     * phone (string, required): The User's Phone Number.
   * Responses Body:  
  On a sucessful request, the API will return a 201  response code with a JSON object that contains the details of the new address been created.

2. Update Address (/api/address) 
   * HTTP Method: PUT
   * Access: Private/Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to 'Bearer `token`'.
   * Request Body:  
     * fullname(string,required): The User's Fullname .
     *  address(string,required):  The Users addresss.
     * state(string,required): The state of the address provided.
     * phone (string, required): The User's Phone Number.
   * Responses Body:  
  If the request is successful, the API will return a 204 code with a JSON object that contains information about the address that was updated.

3. Get Addresses (/api/address) 
   * HTTP Method: GET 
   * Access: Private/Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to 'Bearer `token`'.
   * Responses Body:
       The API will respond with a 200 OK status code and return a JSON array that includes all addresses created by the logged user.                         

4. Get Address (/api/address/:id)
   * HTTP Method: GET
   * Access: Private/Admin
   * Description: This endpoint returns  address with the specified id in the database.
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to 'Bearer `token`'.
   * Responses Body:  
     The API will respond with a 200 OK status code and return a JSON object representing the address with the specified ID in the database. 

5. Delete Address (/api/address/:id)
   * HTTP Method: DELETE
   * Description: This endpoint deletes address with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Private/Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
   * Responses Body:  
      If the request is successful, the API will return a 204 code with a JSON object that contains information about the address that was deleted.

### Booking Route
1. Add Booking (/api/booking)
      * HTTP Method: POST
      * Description: This endpoint is used by all user to book a property for inspection or get more details about a property.
   * Access: Public
   * Request Body:  
     * product(string,required): The Product to be booked.
     *  message(string,required):  The User's message/note .
     * email(string,required): The User's email address.
     * phone (string, required): The User's Phone Number.
   * Responses Body:  
  If the request is successful, the API will return a 204 code with a message indicate your booking was successful and user will be contacted soon.

2. Get User Bookings (/api/booking/user-bookings)
      * HTTP Method: GET
      * Description: This endpoint returns the list of bookings a logged user has made.
     * Access: Private/Admin
     * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to 'Bearer `token`'.
     * Responses Body:  
  If the request is successful, the API will return a 204 code with a message indicate your booking was successful and user will be contacted soon.

3. Get Bookings (/api/booking)
      * HTTP Method: GET
      * Description: This endpoint returns the list of bookings stored in the database.
     * Access: Admin
     * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to 'Bearer `token`'.
     * Responses Body:  
  It returns a JSON array that includes all bookings that is stored in the database.

4. Get Booking (/api/booking/:id)
   * HTTP Method: GET
   * Description: This endpoint returns  a booking with the specified id in the database.
   * Access: Private/Admin
   * Authorization(string): The JWT access token obtained after a successful login. Must be set to 'Bearer `token`'. 
   * Responses Body:  
     It returns a JSON object representing the booking with the specified ID in the database.  

 
5. Update Booking (/api/booking/:id)
   * HTTP Method: PUT
   * Description: This endpoint returns is used by admin to update the view date of a booking.
   * Access: Admin
   * Authorization(string): The JWT access token obtained after a successful login. Must be set to 'Bearer `token`'. 
   * Request Body:  
     * viewDate(Date,optional): The Date for inspecting a product.
   * Responses Body:  
  
      It returns a JSON object that contains information about the booking that was updated.



### FAQ Route
1. Create FAQ (/api/faq)
   * HTTP Method: POST
   * Access: Admin Only
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer <token>.
   * Request Body:  
     * question(string,required): FAQ Question.
     * answer(string,required):  The answer to a specfied FAQ Question.
    * Responses Body:  
  It returns with a JSON object that contains the details of the new FAQ created.

2. Get All FAQ (/api/faq)
   * HTTP Method: GET
   * Description: This endpoint retrieves a  list of all faq stored in the database, .
   * Access: Public
   * Responses Body:  
     It return a JSON array that includes all faqs in the database.                              

3. Get FAQ (/api/faq/:id)
   * HTTP Method: GET
   * Description: This endpoint returns  a faq with the specified id in the database.
   * Access: Public
   * Responses Body:  
     It return a JSON object representing the product with the specified ID in the database. 

4. Delete FAQ(/api/faq/:id)
   * HTTP Method: DELETE
   * Description: This endpoint deletes a faq with the specified id. Only users with the role of admin can access this endpoint.
   * Access: Admin
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to Bearer `token`.
   * Responses Body:  
      It returns a JSON object that contains information about the faq that was deleted.

5. Update FAQ (/api/faq)
   * HTTP Method: PUT
   * Access: Admin Only
   * Request Header: 
     * Authorization(string): The JWT access token obtained after a successful login. Must be set to 'Bearer `token`'.
   * Request Body:  
     * question(string,required): FAQ Question.
     * answer(string,required):  The answer to a specfied FAQ Question.
    * Responses Body:  
  It returns a JSON object that contains information about the faq that was updated.