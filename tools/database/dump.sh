#!/bin/sh
mongodump
zip academy dump/academy/*
#cp academy.zip build/.
unzip -l academy.zip
#mv academy.zip /var/www/devportal.yakutia.science/web/

