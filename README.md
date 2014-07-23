recolytic samples
=================

## Introduction

This project gathers some sample applications interacting with recolytic recommendation engine. It will helps you to to quickly bootstrap your integration of the recommendation engine into your project.

These samples don't do much, just show how to wire your application with recolytic.

## Getting Started

To get you started you need an valid recolytic account. 

## Static Web Site

Create a <a href="http://www.recolytic.com">recolytic<a> subscription. Leave all the default setting. Get the api key, and update the value the **subscription_api_key** in the file **statis/js/configuration.js**.

This sample is a static web site with a home page and some product pages. 

* the interaction is based on <a href="">recolytic plugin</a> the **www** plug-in.
* The resource are declared automaticly, the resource id, title, image are based on <a href="http://ogp.me">open graph protocol</a>.
* On the landing page, the recommendation strategy used is **recenlty visited** 
* On the product page, the recommendation strategy used is **item to item**
* **updates** are captured automaticly: Every link with **recolytic-uptake** in the query string is considered as an uptake.


## Movie recommender 

Create a <a href="http://www.recolytic.com">recolytic<a> subscription. change the subscription mode to manual, upload the datafeed **movies\DataFeed\moviesDataFeed.csv**. You can follow this <a href="https://github.com/recolytic/recolytic-tutorial">tutorial</a> for changing and upload your datafeed.

* Single page application, no use of recolytic plugin
* In **static/app/service.js** update the apikey with your.

<a href="http://movies.recolytic.com">live demo</a>


## Ecommerce web site

Create a <a href="http://www.recolytic.com">recolytic<a> subscription. change the subscription mode to manual, upload the datafeed **ecomm\DataFeed\moviesDataFeed.csv**. You can follow this <a href="https://github.com/recolytic/recolytic-tutorial">tutorial</a> for changing and upload your datafeed.


* Single page application
* Use of <a href="https://github.com/recolytic/recolytic-plugin">recolytic plugin</a> for COLLECT / UPTAKES
* Use of most popular / user to user / item to item recommendation strategies
* In **static/app/controller.js** update the apikey with your.
* In **static/index.html** update the apikey with your.

<a href="http://shop.recolytic.com">live demo</a>

