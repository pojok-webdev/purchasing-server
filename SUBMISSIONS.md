## getsubmissionpage

  - get all submissions
  - accept none
  - method: GET
  - return a list of getsubmissionpages

### syntax : 

```sh
getsubmissionpage/:pageIndex/:pageSize
```
### example

####  in browser
```sh
http://servername:port/getsubmissionpage/0/10
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissionpage/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```


## getsubmissioncount

  - get amount of submissions
  - accept none 
  - method: GET
  - return the amount of submissions

### syntax : 

```sh
getsubmissioncount
```
### example

####  in browser
```sh
http://servername:port/getsubmissioncount
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissioncount')
obj.subscribe(
data=>{},
err=>{}
)
```




## searchsubmission

  - get certain submission by given searchData
  - accept searchData of the submission
  - method: GET
  - return a list of submissions

### syntax : 

```sh
http://servername:port/searchsubmission/:searchData/:pageIndex/:pageDetail
```
### example

####  in browser
```sh
http://servername:port/searchsubmission/abc/0/10
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/searchsubmission/abc/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```




## searchsubmissioncount

  - get amount of submission  detail by submission's id
  - accept id of the submission
  - method: GET
  - return the amount of submission_details

### syntax : 

```sh
http://servername:port/searchsubmissioncount/:searchData
```
### example

####  in browser
```sh
http://servername:port/searchsubmissioncount/abc
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/searchsubmissioncount/abc')
obj.subscribe(
data=>{},
err=>{}
)
```


























## getsubmissiondetailpage

  - get detail of submission by submission's id
  - accept id of the submission
  - method: GET
  - return an object of submission_details

### syntax : 

```sh
getsubmissiondetailpage/:submission_id/:pageIndex/:pageSize
```
### example

####  in browser
```sh
http://servername:port/getsubmissiondetailpage/1/0/10
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissiondetailpage/1/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```


## getsubmissiondetailcount

  - get amount of submission  detail by submission's id
  - accept id of the submission
  - method: GET
  - return the amount of submission_details

### syntax : 

```sh
getsubmissiondetailcount/:submission_id
```
### example

####  in browser
```sh
http://servername:port/getsubmissiondetailcount/1
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissiondetailcount/1')
obj.subscribe(
data=>{},
err=>{}
)
```




## searchsubmissiondetail

  - get amount of submission  detail by submission's id
  - accept id of the submission
  - method: GET
  - return the amount of submission_details

### syntax : 

```sh
http://servername:port/searchsubmissiondetail/:searchData/:subimssion_id/pageIndex/pageDetail
```
### example

####  in browser
```sh
http://servername:port/searchsubmissiondetail/abc/1/0/10
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/searchsubmissiondetail/abc/1/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```




## searchSubmissiondetailcount

  - get amount of submission  detail by submission's id
  - accept id of the submission
  - method: GET
  - return the amount of submission_details

### syntax : 

```sh
http://servername:port/searchSubmissiondetailcount/:searchData/:subimssion_id
```
### example

####  in browser
```sh
http://servername:port/searchSubmissiondetailcount/abc/1
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/searchSubmissiondetailcount/abc/1')
obj.subscribe(
data=>{},
err=>{}
)
```

