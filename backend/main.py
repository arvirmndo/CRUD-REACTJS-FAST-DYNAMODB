from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from model import User

#app object
app = FastAPI()

from database import (
    fetchAllUsers,
    fetchOneUser,
    createUser,
    updateUser,
    removeUser
)

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000)

@app.get("/")
def read_root():
    return{"Ping":"Pong"}

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
async def post_user(user:User):
    response = await createUser(user.dict())
    if response:
        return response
    raise HTTPException(400, f"Something went wrong / Bad request")


@app.put("/api/user/{id}")
async def put_user(id:str, user:User):
    response = await updateUser(id, user.firstName, user.lastName,  user.phoneNumber, user.age, user.address)
    if response:
        return response
    raise HTTPException(404, f"There is no User with this id {id}")

@app.delete("/api/user/{id}")
async def delete_user(id):
    response = await removeUser(id)
    if response:
        return response
    raise HTTPException(404, f"there is no user with this id: {id}")




