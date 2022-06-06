#!/bin/bash

# A single command to uninstall, rebuild, and reinstall for development
cd "$(dirname "$0")" || exit
./uninstall.sh
rm -rf ../../dist
yarn build
./install_dev.sh
