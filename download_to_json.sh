#!/bin/bash
url=$1
ftype=$2
fnamepre=`echo $1 | cut -d / -f 8` 
fname=`echo ${fnamepre} | cut -c 1-36`
filepath_download='private/song_temp'

cd ${filepath_download}
wget -O ${fname} ${url}

filepath_json=${ftype}

audiowaveform -i ${fname} -o ../${filepath_json}/${fname}.json --pixels-per-second 20 --bits 8

cd ..
python scale.py ${filepath_json}/${fname}.json