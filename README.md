# scrollytelling-wine
---
---

**W202 data visualization:**  
  
  _contributors:_ April Kim, Harry Xu, Jae Lee, Jesse Calvillo  
  _users:_ anyone interested in wine  
  _data:_  wine review and wine export data  
  _tasks:_ explore the relationship between *quantity* and *quality* of wine around the world  
  _insights:_ e.g. "italy exports more wines than spain but on average they are rated lower quality"  


---
---

### general idea / description
The general idea is to take a set of wine review data and do exploratory data analysis.
Based on these insights, create a visualization that can demonstrate these insights interactively to the user.

1. scrollytelling
2. tree-map
3. weighted scatterplot



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

---
---


# log

**[7 June 2018]**    
  We can keep track of updates + tasks on this README.  
  Basic web structure (html, css, js) created.  
  Readme created.  
  
  Let's discuss this weekend when we get together:  
  - Ideas for this // should we do it as-proposed or are there other things everyone is interested in?  
  - Shall we devide the work (one team working on scrollytelling+map, tree-map, scatterplot)?  
  - Basic timeline for project  
  - What days work for people in general to meet?  
  - Set out initial tasks  

**[10 June 2018]**    
  Nothing was over 100MB; added the data/ folder -jlc  
  idea: if this goes well, we can use probably use `github pages` and jekyll (python) to host the site for free.  
  
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
  
