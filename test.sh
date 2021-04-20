#!/bin/bash
sudo docker build --force-rm -t patinfosystesting -f Test_Dockerfile .
sudo docker run patinfosystesting
sudo docker image rm -f patinfosystesting
sudo docker build --force-rm -t vsarin92/patinfosys -f Prod_Dockerfile .
sudo docker login --username vsarin92 --password CraponCrabs92
sudo docker run -d -p 5000:5000 vsarin92/patinfosys:$BUILD_ID
sudo docker run owasp/zap2docker-stable zap-cli quick-scan -sc -r -l Informational --spider --start-options '-config api.disablekey=true' http://localhost:5000

