#!/bin/bash

echo $TEST_SELECT $BUILDING_IMMEDIATELY $TEST_INPUT

sed -i 's#'''TEST_SELECT'''#'''$TEST_SELECT'''#g' test.json
sed -i 's/BUILDING_IMMEDIATELY/$BUILDING_IMMEDIATELY/' test.json
sed -i 's/TEST_INPUT/$TEST_INPUT/' test.json

cat test.json
