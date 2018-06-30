# CNPR_PoC
# OPENALPR

1. in terminal :
  sudo apt-get update && sudo apt-get install -y openalpr openalpr-daemon openalpr-utils libopenalpr-dev
1.a. test:
    wget http://plates.openalpr.com/h786poj.jpg
    alpr -c eu h786poj.jpg
  expected output:
    plate0: 10 results
    - EA7THE     confidence: 92.4795
    - EA7TBE     confidence: 84.0421
    - EA7TRE     confidence: 83.1932
    - EA7TE      confidence: 82.0527
    - EA7T8E     confidence: 81.7845
    - EA7TME     confidence: 80.8062
    - EA7THB     confidence: 76.6468
    - EA7TH6     confidence: 76.6153
    - EA7TH      confidence: 75.2232
    - EA7TBB     confidence: 68.2095
