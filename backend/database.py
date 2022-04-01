from model import User

#mongodb driver
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
database = client.UserList
collection = database.user

async def fetchOneUser(id):
    document = await collection.find_one({"id":id})
    return document
 
async def fetchAllUsers():
    users = []
    cursor = collection.find({})
    async for document in cursor:
         users.append(User(**document))
    return users

async def createUser(user):
    document = user
    result = await collection.insert_one(document)
    return document

async def updateUser(id, firstName, lastName, phoneNumber, age, address):
    await collection.update_one({"id":id},{"$set":{
        "firstName":firstName,
        "lastName":lastName,
        "phoneNumber":phoneNumber,
        "age":age,
        "address":address
    }})
    
    document = await collection.find_one({"id":id})
    return document

async def removeUser(id):
    await collection.delete_one({"id":id})
    return True






