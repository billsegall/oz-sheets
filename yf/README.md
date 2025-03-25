# yfd

This daemon exposes some useful bits of the Yahoo Finance data via a
HTTP/JSON API.  The data is acquired at the time of the request by
scraping the Yahoo Finance web pages using the `yfinance` Python
module.

# Install

1. Unpack the source distribution in a convenient temporary directory.
1. Run `install.sh` with a single parameter: the target parent
   directory.
1. Clean up the unpacked source.

# Run

1. `systemctl enable yfd.service`
1. `systemctl start yfd.service`
