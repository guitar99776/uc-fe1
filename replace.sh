#!/bin/bash

echo $TEST_SELECT $BUILDING_IMMEDIATELY $TEST_INPUT

sed -i '.bak' "s/@TEST_SELECT/$TEST_SELECT/"   test.json
sed -i '.bak' "s/@BUILDING_IMMEDIATELY/$BUILDING_IMMEDIATELY/"  test.json
sed -i '.bak' "s/@TEST_INPUT/$TEST_INPUT/"  test.json

cat test.json
