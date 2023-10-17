### File Structure


- **src**: The main source directory.
  - **assests**: Stores static assets (images, fonts, etc.).
  - **components**: 
  - **pages**:
      - `Login.jsx`: Login Page.
       - `API Endpoints`: 
          - `/api/auth/login/admin -[POST]`: Endpoint for to log in.

      - `Home.jsx`: Home Page.
       - `API Endpoints`: 
             - `/[GET]`: Endpoint for to home page.
     - `booking/`
       - `Booking.jsx`: Page for  viewing and updating a booking. 
         - `API Endpoints`: 
             - `/api/booking/:id -[GET]`: Endpoint to get details of a booking with a specified id.
            - `/api/booking/:id -[PUT]`: Endpoint to update a booking with a specified id.
        - `BookingList.jsx`: Page for listing and displaying all available bookings. 
          - `API Endpoints`: 
             - `/api/booking/ -[GET]`: Endpoint to get the list of all bookings in the database.
            
    - `faq/`
       - `AddFaq.jsx`: Page for adding and editing faq.
         - `API Endpoints`: 
              - `/api/faq -[POST]`: Endpoint to add faq.
             - `/api/faq/:id -[PUT]`: Endpoint to update faq with a specified id.
             - `/api/faq/:id -[GET]`: Endpoint to get details of  faq with a specified id.   
         - `Faqs.jsx`: Page for displaying list of faqs in the database and deleting faq  with a specified id.
            - `API Endpoints`: 
               - `/api/faq -[GET]`: Endpoint to get list of faqs in the database. 
               - `/api/faq/:id -[DELETE]`: Endpoint to delete faq with a specified id.

    - `userList/`
       - `UserList.jsx`: Page for displaying list of properties in the database and deleting a property with a specified id.
         - `API Endpoints`: 
              - `/api/users -[GET]`: Endpoint to get list of properties in the database. 
              - `/api/users/:id -[DELETE]`: Endpoint to delete a property with a specified id.


    - `newUser/`
       - `NewUser.jsx`: Page for viewing, adding and editing user.
         - `API Endpoints`: 
              - `/api/auth/register -[POST]`: Endpoint to add new user.
             - `/api/products/:id -[PUT]`: Endpoint to update a property with a specified id.
             - `/api/products/:id -[GET]`: Endpoint to get details of  a property with a specified id. 

    - `timelineList/`
       - `TimelineList.jsx`: Page for displaying list of properties in the database and deleting a property with a specified id.
         - `API Endpoints`: 
              - `/api/timeline -[GET]`: Endpoint to get list of properties in the database. 
              - `/api/timeline/:id -[DELETE]`: Endpoint to delete a property with a specified id.

    - `newTimeline/`
       - `NewTimeline.jsx`: Page for adding and editing timeline.
         - `API Endpoints`: 
              - `/api/timeline -[POST]`: Endpoint to add new timeline.
             - `/api/timeline/:id -[PUT]`: Endpoint to update a timeline with a specified id.
             - `/api/timeline/:id -[GET]`: Endpoint to get details of an individual timeline with a specified id.

    - `productList/`
       - `ProductList.jsx`: Page for displaying list of properties in the database and deleting a property with a specified id.
         - `API Endpoints`: 
              - `/api/products -[GET]`: Endpoint to get list of properties in the database. 
              - `/api/products/:id -[DELETE]`: Endpoint to delete a property with a specified id.

    - `newProduct/`
       - `NewProduct.jsx`: Page for adding and editing property.
         - `API Endpoints`: 
              - `/api/products -[POST]`: Endpoint to add new property.
             - `/api/products/:id -[PUT]`: Endpoint to update a property with a specified id.
             - `/api/products/:id -[GET]`: Endpoint to get details of  a property with a specified id.

    - `productList/`
       - `ProductList.jsx`: Page for displaying list of properties in the database and deleting a property with a specified id.
         - `API Endpoints`: 
              - `/api/products -[GET]`: Endpoint to get list of properties in the database. 
              - `/api/products/:id -[DELETE]`: Endpoint to delete a property with a specified id.

     - `newEstate/`
       - `NewEstate.jsx`: Page for adding and editing estate.
         - `API Endpoints`: 
              - `/api/estate -[POST]`: Endpoint to add new estate.
             - `/api/estate/:id -[PUT]`: Endpoint to update a estate with a specified id.
             - `/api/estate/:id -[GET]`: Endpoint to get details of  a estate with a specified id.

    - `estateList/`
       - `EstateList.jsx`: Page for displaying list of properties in the database and deleting a estate with a specified id.
         - `API Endpoints`: 
              - `/api/estate -[GET]`: Endpoint to get list of estates in the database. 
              - `/api/estate/:id -[DELETE]`: Endpoint to delete a estate with a specified id.

    - **redux**: 
      - `apiCalls.js/` : Service for dispatching redux action.
      - `store.js`: root file for redux state management.
      - `productRedux.js`: file containing actions related to properties.
      
  - **requestMethod** :Service for making API requests to the backend
  - **App.js**: The main entry point for the application.
  - **theme.js**:  Material UI theme setup. 
  - **index.js**: The application's root file.                 