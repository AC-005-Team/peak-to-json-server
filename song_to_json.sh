#!/bin/bash

cd 's3_property'
fname=`echo $1 | cut -d . -f1`
file_path='/var/www/html/api/v1/song_peaks'
#echo "${fname}"

audiowaveform -i $1 -o ${file_path}/${fname}.json --pixels-per-second 20 --bits 8

cd ..
python scale.py ${file_path}/${fname}.json
