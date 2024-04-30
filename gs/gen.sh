#! /usr/bin/env bash

attrs="annual_dividend_yield average_daily_volume bid_price change_in_percent change_price code day_high_price day_low_price deprecated_market_cap deprecated_number_of_shares desc_full eps isin_code last_price last_trade_date market_cap number_of_shares offer_price open_price pe previous_close_price previous_day_percentage_change suspended volume year_change_in_percentage year_change_price year_high_date year_high_price year_low_date year_low_price year_open_date year_open_price"

for attr in $attrs; do
    echo
    echo "// Returns $attr for the instrument"
    echo "function ASX_$attr(instrument) {"
    echo "  return ASX(instrument, \"$attr\")"
    echo "}"
done
