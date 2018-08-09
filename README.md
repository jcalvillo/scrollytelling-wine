# Learn from 130,000+ wine reviews
---
**W209 Data Visualization:**  
  
  _contributors:_ Jesse Calvillo, April Kim, Jae Lee, Harry Xu    
 
---

![alt text](http://people.ischool.berkeley.edu/~aprilkim/img/hp.png)

We have made a kaggle data set of Wine Ethusiast Magazine reviews available for the public and industry folk.
Our wine guide walks through background information and we've built some dashbaords so you can explore the reviews yourself.

Wine Overview |  Explore Varietals | What's on the shelf? | Learn about pinot |
:------------:|:------------------:|:--------------------:|------------------:|
![](http://people.ischool.berkeley.edu/~aprilkim/img/scrolly1.gif)  |  ![](http://people.ischool.berkeley.edu/~aprilkim/img/varietals.gif) | ![](http://people.ischool.berkeley.edu/~aprilkim/img/parallelcoord.gif) | ![](http://people.ischool.berkeley.edu/~aprilkim/img/pinot.gif)


### general idea / description
The general idea is to take a set of wine review data and do exploratory data analysis.
Based on these insights, create a visualization that can demonstrate these insights interactively to the user in different ways.

### 1. scrollytelling
- geographical map
- explanatory text (insights)

### 2. tree-map [to be decided] 
- size of rectangle is scaled with proportion of reviews,
- each rectangle would have an “average overall score”, and
- a callout would list “average scores by varietal” .. or something like that.

### 3. weighted scatterplot
- geographical location (number of wines-reviews in a country)
- average wine score
- filter: wine type

### 4. chloropleth map [to be decided]
- threshold quantized, or linear color scale for each country
- hover details

---
---


# log

**[7 June 2018]** -jlc    
  We can keep track of updates + tasks on this README.  
  Basic web structure (html, css, js) created.  
  Readme created.  
  
  Let's discuss this weekend when we get together:  
  - Ideas for this // should we do it as-proposed or are there other things everyone is interested in?  
  - Shall we devide the work (one team working on scrollytelling+map, tree-map, scatterplot)?  
  - Basic timeline for project  
  - What days work for people in general to meet?  
  - Set out initial tasks  

**[10 June 2018]** -jlc    
  Nothing was over 100MB; added the data/ folder   
  idea: if this goes well, we can use probably use `github pages` and jekyll (python) to host the site for free.  
  - added a chloropleth with dummy data and hover function as a stand-in  
  
---
---

# sources

## wine data // 2017  
wine enthusiast scrape by zackthoutt: https://github.com/zackthoutt/wine-deep-learning  
kaggle dataset used: https://www.kaggle.com/zynicide/wine-reviews/data  
wine enthusiast magazine: https://www.winemag.com/   
  
## trade data // 2014  
Observatory of Economic Complexity (https://atlas.media.mit.edu/en/)  
Product Trade by Year and Country (4 digit depth): https://atlas.media.mit.edu/static/db/raw/year_origin_hs07_4.tsv.bz2  
HS 2007 Product Names: https://atlas.media.mit.edu/static/db/raw/products_hs_07.tsv.bz2  
Country Names: https://atlas.media.mit.edu/static/db/raw/country_names.tsv.bz2  
  
## tree-map  
inspiration:  
- https://atlas.media.mit.edu/en/profile/hs92/2204  
  
tutorials:  
- https://www.youtube.com/watch?v=GzjTMSMtr70  
  
## scrollytelling  
inspiration:  
- https://pudding.cool/2017/04/beer/  
  
tutorials:  
- https://www.youtube.com/watch?v=w4N_Rf0WwUI  
- https://pudding.cool/process/how-to-implement-scrollytelling/  
- https://pudding.cool/process/responsive-scrollytelling/  
- https://pudding.cool/process/how-to-implement-scrollytelling/demo/scrollstory/  
- https://pudding.cool/process/introducing-scrollama/  
- http://vallandingham.me/scroller.html  
  
## weighted scatterplot  
inspiration:   
- https://pudding.cool/2017/04/beer/  
  
tutorials:  
- https://pudding.cool/process/weighted-pivot-scatter-plot/  
  
