## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the backend server with<br>
Use [http://localhost:8080](http://localhost:8080) as the address and port.

**Note: The google-cloud/vision package needs the JSON Credential which is ignored by .gitigore!**

### API Resources

  - [POST /api/search/image/](#post-apisearchimage)
  - [GET /api/nutrient/](#get-apinutrient)

### POST /api/search/image/
- description: analyze an uploaded image
- request: `POST /api/search/image/`
    - content-type: `application/json`
    - file: uploaded image
- response: 200
    - content-type: `application/json`
    - body: map
      - nutrient: (list of map)the basic coordinates of detected nutrient


### GET /api/nutrient/
- description: retrieve the details of the given nutrient
- request: `GET /api/image/:nutrient/`   
- response: 200
    - content-type: `application/json`
    - body: object
      - name: (string) the nutrient id
      - details: (string) the details of the given nutrient


