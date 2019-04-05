# nuXpert REST API Documentation

## User API

### Sign up
- description: user sign up
- request: `POST /signup/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username
      - password: (string) the password
- response: 200
  - body: user signed up
- response: 409
  - body: username already exists
- response: 500
  - body: error message



``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"username":"c","password":"me"}
       http://localhsot:8080/signup/'
```
### Sign in
- description: user sign in
- request: `POST /signin/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username
      - password: (string) the password
- response: 200
  - body: user signed up
- response: 401
  - body: access denied
- response: 500
  - body: error message

``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"username":"c","password":"me"}
       http://localhsot:8080/signin/'
```
### Sign out
- description: user sign out
- request: `GET /signout/`
- response: 200
    - body: homepage

``` 
$ curl http://localhsot:8080/signout/'
```
### Reset
- description: user reset password
- request: `POST /reset/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username
- response: 200
    - body: user password has been reset

``` 
$ curl http://localhsot:8080/reset/'
```


## Main API

### Create
#### 1.
- description: upload image and detect all the nutrients
- request: `POST /api/search/image/`
    - content-type: `application/json`
    - file: uploaded image
- response: 200
    - content-type: `application/json`
    - body: object of object
      - nutrient: (string) the nutrient name
          - yMax: (int) the y max coordinate
          - yMin: (int) the y min coordinate
          - xMax: (int) the x max coordinate
          - xMin: (int) the x min coordinate
      - width: (int) the image width
      - height: (int) the image height
      - id: (string) the image id
- response: 401
  - body: access denied
- response: 500
  - body: error message


``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -F ‘image=@/home/user/1.jpg’
       http://localhsot:8080/api/search/image/'
```

### Read
#### 1.
- description: get report based on imageid
- request: `GET /api/report/make/:imageid/`   
- response: 200
    - content-type: `application/json`
    - body: PDF report url
- response: 401
  - body: access denied
- response: 500
  - body: error message


 
``` 
$ curl http://localhsot:8080/api/report/make/hhxNGAzQoBwNCZBt/
``` 
#### 2.
- description: save the pdf file corresponding to the image given by the id
- request: `GET /api/report/save/:imageid/`   
- response: 200
    - content-type: `application/json`
    - body: The file has already been saved
- response: 401
  - body: access denied
- response: 500
  - body: error message

 
``` 
$ curl http://localhsot:8080/api/report/save/hhxNGAzQoBwNCZBt/
``` 

#### 3.
- description: unsave the pdf file corresponding to the image given by the id
- request: `GET /api/report/unsave/:imageid/`   
- response: 200
    - content-type: `application/json`
    - body: The file has already been remove
- response: 401
  - body: access denied

 
``` 
$ curl http://localhsot:8080/api/report/unsave/hhxNGAzQoBwNCZBt/
``` 
#### 4.
- description: get the pdf file corresponding to the image given by the id
- request: `GET /api/report/:imageid/`
- response: 200
    - content-type: `application/json`
    - body: object
      - url: (string) the pdf url
- response: 401
  - body: access denied
- response: 500
  - body: error message

``` 
$ curl http://localhsot:8080/api/report/hhxNGAzQoBwNCZBt/'
```
  
### Delete
#### 1.
- description: delete the pdf file corresponding to the image given by the id
- request: `DELETE /api/report/:imageid/`
- response: 200
    - content-type: `application/json`
    - body: The image with given id and its corresponding pdf have already been removed
- response: 401
  - body: access denied
- response: 500
  - body: error message

``` 
$ curl -X DELETE
       http://localhsot:8080/api/report/hhxNGAzQoBwNCZBt/
``` 
