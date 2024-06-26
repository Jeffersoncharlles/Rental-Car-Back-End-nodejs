#!/bin/bash
# @Author: Jefferson Charlles
# @Date:   2021-12-01 22:43:40
# @Last Modified by:   Jefferson Charlles
# @Last Modified time: 2021-12-02 23:35:52
# ubuntu 20.04 lts

sudo adduser app --disabled-password --y

sudo usermod -aG sudo app

sudo su - app 

sudo passwd app


mkdir .ssh 
chmod 700 .ssh/
cd .ssh 
touch authorized_keys
chmod 600 authorized_keys

sudo apt-get update -y
sudo apt-get upgrade -y

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get remove docker docker-engine docker.io containerd runc

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg


echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

 sudo apt-get update

 sudo apt-get install docker-ce docker-ce-cli containerd.io -y

 docker -v

 sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

 sudo chmod +x /usr/local/bin/docker-compose

 docker-compose --version

  sudo npm install --global yarn
  yarn -v


### configuar ssh

##ssh-keygen


##cat ~/.ssh/id_rsa.pub

sudo groupadd docker
 sudo usermod -aG docker $USER


sudo apt-get install nginx -y

sudo npm install pm2@latest -g
sudo yarn global add pm2