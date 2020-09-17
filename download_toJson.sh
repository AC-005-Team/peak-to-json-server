#!/bin/bash
url=$1
fnamepre=`echo $1 | cut -d / -f 8` 
fname=`echo ${fnamepre} | cut -c 1-36`
file_path='s3_property'

cd ${file_path}
wget -O ${fname} ${url}