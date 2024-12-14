
<a href = "#">
<img src = "https://github.com/SadarulkOfficial/INFINITY-DATABASE/blob/main/Bot%20Logos/infinitylogo.png?raw=true">
</img>

<p align="center">
  <a href="#"><img src="http://readme-typing-svg.herokuapp.com?color=fffff&center=true&vCenter=true&multiline=false&lines=INFINITY+WHATSAPP+BOT" alt="">
</p>


<img src="https://profile-counter.glitch.me/{Sadarulk}/count.svg" alt="Sadarulk :: Visitor's Count" />

If you want to deploy this bot, contact the owner to get session id and movies download access

<h3>Owner Contact :</h3>

[![NIMAYT](https://img.shields.io/badge/Sadaru-green?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/+94701814946)

<p align="center">WORKFLOW CODE</p>

```
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start
```
