#!/bin/bash

while read line; do
    var1=${line/\'}
    var2=${var1/\'}
    export ${var2}
done < $1

echo "ENV Vars Loaded"