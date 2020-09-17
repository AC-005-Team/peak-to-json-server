#!/bin/bash
url=$1
ftype=$2
fnamepre=`echo $1 | cut -d / -f 8` 
fname_mp3=`echo ${fnamepre} | cut -c 1-36`
fname_json=`echo ${fnamepre} | cut -c 1-32`
filepath_download='private/song_temp'

cd ${filepath_download}
wget -O ${fname_mp3} ${url}

filepath_json=${ftype}

audiowaveform -i ${fname_mp3} -o ../${filepath_json}/${fname_json}.json --pixels-per-second 20 --bits 8

cd ../..
python scale.py ${filepath_json}/${fname_json}.json