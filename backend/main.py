from urllib import response
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from model import User

#app object
app = FastAPI()

from database import (
    fetchAllUsers,
    fetchOneUser,
    updateUser,
    createUser,
    removeUser
)

origins = ["http://localhost:3000","localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
def read_root():
    return{"Ping":"Pong"}

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000)

@app.get("/api/user")
async def get_user():
    response = await fetchAllUsers()
    return response

@app.get("/api/user/{id}", response_model=User)
async def get_user_by_id(id):
    response = await fetchOneUser(id)
    if response:
        return response
    raise HTTPException(404, f"there is no user with this id: {id}")

@app.post("/api/user", response_model=User)
async def get_user(user:User):
    response = await createUser(user.dict())
    if response:
        return "User added successfully"
    raise HTTPException(400, f"Something went wrong / Bad request")


@app.put("/api/user/{id}", response_model=User)
async def put_user(id:str, firstName: str, lastName: str, phoneNumber: str, age: str, address: str):
    response = await updateUser(id, firstName, lastName,  phoneNumber, age, address)
    if response:
        return response
    raise HTTPException(404, f"There is no User with this id {id}")

# @app.put("/api/user/{id}")
# async def create_item(id:str, firstName: str, lastName: str, phoneNumber: str, age: str, address: str):
#     result = {"id": id, firstName: str, lastName: str, phoneNumber: str, age: str, address: str}
#     return result


# @app.put("/api/user/{id}", tags=["users"])
# async def put_user(id: str, details: dict)->dict:
#     for user in User:
#         if str(user["id"]) == id:
#             user["firstName"] == details["firstName"]
#             user["lastName"] == details["lastName"]
#             user["phoneNumber"] == details["phoneNumber"]
#             user["age"] == details["age"]
#             user["address"] == details["address"]
#             return {
#                 "data": f"User with id {id} has been updated."
#             }
#     return{
#         "data": f"User with id {id} not found."
#     }



@app.delete("/api/user/{id}/")
async def delete_user(id):
    response = await removeUser(id)
    if response:
        return "Successfully deleted a user!"
    raise HTTPException(404, f"there is no user with this id: {id}")




