#!/bin/bash

if [ -z "$1" ]
  then
    echo "No argument supplied, please pass 1 or 2 or ... for image tag"
    exit
fi

npm run build
find ./build -type d -print0 | xargs -0 chmod 0755
find ./build -type f -print0 | xargs -0 chmod 0644
export IMAGE_NAME=nebula/file-storage-pwa:$1
docker build . --no-cache -t $IMAGE_NAME
docker tag $IMAGE_NAME repository.nebulanet.ir/$IMAGE_NAME
docker push repository.nebulanet.ir/$IMAGE_NAME
