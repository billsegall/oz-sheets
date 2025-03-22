# Install

1. pick a directory
1. `python3.12 -m venv venv`
1. `. venv/bin/activate`
1. `pip install --upgrade pip`
1. `pip install "fastapi[standard]"`
1. `pip install yfinance`
1. `tar xf yfs.tgz`

# Run

1. cd to the chosen directory
1. If the virtual environment isn't already activated (check shell
   prompt): `. venv/bin/activate`
1. `fastapi dev yfs/api.py`
