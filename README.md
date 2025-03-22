# oz-sheets

Fetch stock market data for Australian stock markets into Google Sheeets.

It exists as the ```googlefinance()``` functions support only two decimal places for Australian
equities and I needed more granularity/accuracy.

This provides ASX and NSX functions in Apps Script for Google Sheets,
the original idea of which came from
[a reddit post](https://www.reddit.com/r/ASX_Bets/comments/mbbdvf/how_to_get_3_decimal_places_for_stock_prices_in/)


## [NSX](https://www.nsx.com.au/)

NSX data is obtained from the NSX website

```NSX_last_price(instrument)``` will fetch the current (but 30m delayed) price from the NSX website

## [ASX](https://www.asx.com.au/) 

ASX data is obtained from [Yahoo! finance](https://finance.yahoo.com/) using [yfinance](https://pypi.org/project/yfinance/)

```ASX(instrument, attribute)``` will return the value of an attribute (e.g., "industry") for a given instrument (e.g., ```BHP.AX```)

```ASX_last_price(instrument)``` will return the current (20m delayed) price.

```ASX_all(instrument)``` will insert an array of all keys/attributes. You can transpose() that to make it horizontal or extract what you need directly, e.g., ```index(ASX_all("BHP"), 12, 2)```.


As of March 22 2025 the known attributes are:
```
52WeekChange
SandP52WeekChange
address1
address2
ask
averageDailyVolume10Day
averageDailyVolume3Month
averageVolume
averageVolume10days
beta
bid
bookValue
city
companyOfficers.0.exercisedValue
companyOfficers.0.fiscalYear
companyOfficers.0.maxAge
companyOfficers.0.name
companyOfficers.0.title
companyOfficers.0.totalPay
companyOfficers.0.unexercisedValue
companyOfficers.1.age
companyOfficers.1.exercisedValue
companyOfficers.1.fiscalYear
companyOfficers.1.maxAge
companyOfficers.1.name
companyOfficers.1.title
companyOfficers.1.unexercisedValue
companyOfficers.1.yearBorn
compensationAsOfEpochDate
country
cryptoTradeable
currency
currentPrice
currentRatio
customPriceAlertConfidence
dayHigh
dayLow
debtToEquity
earningsTimestampEnd
earningsTimestampStart
ebitda
ebitdaMargins
enterpriseToEbitda
enterpriseValue
epsTrailingTwelveMonths
esgPopulated
exchange
exchangeDataDelayedBy
exchangeTimezoneName
exchangeTimezoneShortName
fiftyDayAverage
fiftyDayAverageChange
fiftyDayAverageChangePercent
fiftyTwoWeekChangePercent
fiftyTwoWeekHigh
fiftyTwoWeekHighChange
fiftyTwoWeekHighChangePercent
fiftyTwoWeekLow
fiftyTwoWeekLowChange
fiftyTwoWeekLowChangePercent
fiftyTwoWeekRange
financialCurrency
firstTradeDateMilliseconds
floatShares
freeCashflow
fullExchangeName
gmtOffSetMilliseconds
grossMargins
hasPrePostMarketData
heldPercentInsiders
heldPercentInstitutions
impliedSharesOutstanding
industry
industryDisp
industryKey
language
lastFiscalYearEnd
lastSplitDate
lastSplitFactor
longBusinessSummary
longName
market
marketCap
marketState
maxAge
messageBoardId
mostRecentQuarter
netIncomeToCommon
nextFiscalYearEnd
open
operatingCashflow
operatingMargins
payoutRatio
phone
previousClose
priceHint
priceToBook
profitMargins
quickRatio
quoteSourceName
quoteType
recommendationKey
region
regularMarketChange
regularMarketChangePercent
regularMarketDayHigh
regularMarketDayLow
regularMarketDayRange
regularMarketOpen
regularMarketPreviousClose
regularMarketPrice
regularMarketTime
regularMarketVolume
returnOnAssets
returnOnEquity
revenuePerShare
sector
sectorDisp
sectorKey
sharesOutstanding
shortName
sourceInterval
state
symbol
totalCash
totalCashPerShare
totalDebt
tradeable
trailingAnnualDividendRate
trailingAnnualDividendYield
trailingEps
trailingPegRatio
triggerable
twoHundredDayAverage
twoHundredDayAverageChange
twoHundredDayAverageChangePercent
typeDisp
volume
website
zip
```
