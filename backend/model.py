from pydantic import BaseModel

class User(BaseModel):
    id: str
    firstName: str
    lastName: str
    phoneNumber: str
    age: str
    address: str