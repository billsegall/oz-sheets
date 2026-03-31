#! /usr/bin/env python

import json
import sys

from fastapi import FastAPI
from fastapi.responses import JSONResponse
import yfinance


__version__ = "1.0a1"


api = FastAPI()

@api.get("/yf/{symbol}")
async def ticker(symbol: str):
    ticker = yfinance.Ticker(symbol)
    response = JSONResponse(content=ticker.info)
    return response
