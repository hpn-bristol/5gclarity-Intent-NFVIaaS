"""
Web server for the intent matcher as part of the 5G-CLARITY Intent Engine.
"""

from typing import List, Optional
from fastapi import FastAPI, Body
from pydantic import BaseModel
from intentmatcher import IntentMatcher


class Item(BaseModel):
    """
    Container class for the intent that is to be matched against multiple descriptions.
    """
    intent: str
    descriptions: List[str]
    top_n: Optional[int]


matcher = IntentMatcher()
app = FastAPI()


@app.get("/")
def read_root():
    """
    Root path, contains welcome message.
    """
    return {"Welcome": ("This is the fast intent matching service, using fasttext similarity and "
                        "fastAPI for serving")}


@app.post("/match")
async def match(
        item: Item = Body(
            None,
            title="Match intent",
            description=("Match an intent with the list of descriptions and return an ordered list"
                         " of best matches.")
        )
    ):
    """
    Match endpoint, taking in a JSON item that contains the intent and descriptions.
    """
    return matcher.match(item.intent, item.descriptions, item.top_n)
