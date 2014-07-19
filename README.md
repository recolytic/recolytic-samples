recolytic samples
=================

## Introduction


## Static Web Site

Create a <a href="http://www.recolytic.com">recolytic<a> subscription. Leave all the default setting. Get the api key, and update the value the **subscription_api_key** in the file **statis/js/configuration.js**.

This sample is a static web site with a home page and some product pages. 

* the interaction is based on <a href="">recolytic plugin</> the **www** plug-in.
* The resource are declared automaticly, the resource id, title, image are based on <a href="http://ogp.me">open graph protocol</a>.
* On the landing page, the recommendation strategy used is **recenlty visited** 
* On the product page, the recommendation strategy used is **item to item**
* **updates** are captured automaticly: Every link with **recolytic-uptake** in the query string is considered as an uptake.


