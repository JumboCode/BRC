# BRC Bi Spot
JumboCode 2018-2019 project for Bisexual Resource Center, led by Steph Xu.
Web app link: https://jumbocode-bi-spot.herokuapp.com/

## Project Description
Bisexual Resource Center is an educational organization headquartered in Boston, MA, and has information on bi-related organizations around the nation and relevant events. The objective of this project is to further the support for the bisexual community with available resources from BRC and similar organizations, enhance "bi+" visibility by helping people discover social activities around us, and raise public awareness about non-monosexual identities. 

To visitors of the website, we provide a web application that displays a comprehensive map view of Bi+ organizations and events based on geographical locations, along with basic contact/sign-up guides. The app will enhance the experience of exploring local groups and events for anyone in need. An interactive search tool connected to the map view will provide easy access of the information.

## Team Members
Project Manager:<br />
Steph Xu<br />
<br />
Developers:<br />
Claire Boals<br />
Sam Chung<br />
Erica DeBarge<br />
James Garijo-Garde<br />
Naoki Okada<br />
Sabrina Wen<br />
Jingqi Yang<br />
Zimo Lin<br />
Zhitong Zhang<br />
<br />
Designer:<br />
Camile Calabrese <br />
Eragon Ma<br />

## Technology Stack 
Client-Side: React <br />
Server-Side: Next.js <br />
Back-end REST API: Express + MongoDB <br />

## Pre-installation Guide
Set up Git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git <br />
Download Node.js: https://nodejs.org/en/download/

## Installation Guide
$ git clone https://github.com/JumboCode/BRC.git

$ cd BRC

$ npm install

$ npm run build

$ npm run dev

Navigate to http://localhost:3000 for entry page

## Architecture Flowchart
        
        Client
      _______________________________________________________________________________________________
      |                                                                                             |
      |      Web UI                                                                                 |
      |    _____________________________                                                            |
      |    |      (1)                  |                                                            |
      |    |      Map-view Module      |        _________________________                           |                         
      |    |      ---------------      |        |                       |      ___________________  |
      |    |      | Event Label |      |        |  (2)                  |      |   (3)           |  |
      |    |      ---------------      |  <---  |  Search/Control Tools | ---> |   Alternative   |  |       
      |    |   ----------------------  |        | (Org tab + Events tab)|      |   data display  |  |
      |    |   | Organization Label |  |        |_______________________|      |_________________|  |
      |    |   ----------------------  |                                                            |
      |    |___________________________|                                                            |
      |                                                                                             |
      |_____________________________________________________________________________________________|

        ^               ^                              
        |               |                              ___________________
        | Initial Props | Routing                     (                   )
        |               |                         ==> ( Express + MongoDB )
        |               |                         |   (     REST API      )
      ____________________________                |   (___________________)              
      |                          |   Data Fetch   |                 
      |                          |  --------------|     Trending topics/posts Stream
      |                          |                |    __________________________
      |     Next.js Framework    |                ==>  | |                    | | 
      |                          |                     | | Social Media API's | |   (Optional)
      |__________________________|                     |_|____________________|_|
      
        Server

