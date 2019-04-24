# EVM-Lite Dashboard

Note: this is a WIP and is lacking functionality

A graphical dashboard to display the status of a network of evm-lite nodes

Note: It is currently hard coded to query the nodes on the testnet

## Installation

To run the dashboard clone the repo and run a python HTTP server:

```console
git clone https://github.com/mosaicnetworks/evm-lite-dashboard.git
cd evm-lite-dashboard
python -m SimpleHTTPServer
```


Alternatively, you can run a node server to the same ends - this assumes that you have node and npm installed. 

```bash
git clone https://github.com/mosaicnetworks/evm-lite-dashboard.git
cd evm-lite-dashboard

# install node version manager if not already installed
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
# use nvm to install stable version of node
$ nvm install --lts=dubnium
$ nvm use lts/dubnium
$ nvm alias default lts/dubnium

# Global install of http-server
npm install http-server -g

# Start server
http-server .
```
