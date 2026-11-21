---
project: P2PXHR
stars: 111
description: |-
    An API that seamlessly empowers your xhr request through an on-the-fly peer-to-peer network created from your site's visitors
url: https://github.com/Peer5/P2PXHR
---

P2PXHR
======

P2PXHR is a framework that seamlessly power-ups your xhr (AJAX) requests through an on-the-fly peer-to-peer network created from your site's visitors. <br>
It seamlessly chooses between your servers and other peers to get the response. <br>
It is intended to make your content delivery better by making your content deliver when your servers are loaded.  
Built on top of [WebRTC][1] DataChannels.

How
===

The client side gets a URL indicating the resource that needs to be fetch.
It then connects to a nodejs service (coordinator) that awares of all users that have/need this resource.
The coordinator creates a mesh network by connecting peers that most likely can help each other.
The client in the meantime fetches HTTP chunks using HTTP range requests for some blocks.
Once connected to other peers the client requests needed blocks from them.

Illustration:
The client can be connected to 3 peers at the same time, requesting blocks #12, #15, #54 from peer1, #123 from peer2, #58, #59 from peer3 and at the same time serving blocks #2, #3, #4.
At the same time this client requests blocks #6-#9 from the HTTP server.


Demos
===============
[File download demo - live](https://peer5.com/P2PXHR/demos/files.html)

[Simple img demo - live](https://peer5.com/P2PXHR/demos/images/cat.html)

[Lazy load img demo - live](https://peer5.com/P2PXHR/demos/images/argentina.html)

[HLS stream - live](http://demo.peer5.com/examples/video/clappr.html)

The [image request](https://github.com/Peer5/P2PXHR/blob/master/demos/images/cat.html)
sends an xhr request for receiving an image from the network.
The [file downloader](https://github.com/Peer5/P2PXHR/blob/master/demos/files.html)
sends an xhr request for receiving a larger file. It indicates the amount of data transferred from peers and regular HTTP. In case no additional peers are downloading the file at the moment, open another tab in incognito mode to see the peer-to-peer magic in action. 


Getting started
===============
Basic example of creating a new assisted xhr request using p2pxhr:

    var request = new peer5.Request();
    request.open('GET', 'http://path/to/a/big/file.json');
    request.onload = function(e) {
      console.log(this.response);
      ...
    };
    request.send();

This means you can simply search and replace XMLHttpRequest with peer5.Request() in your code, and you are all set with peer-assisted requests.


Uploading a.k.a seeding
=======================
TBD


Supported Browsers
==================

Desktop
* Chrome 26+
* Firefox 23+
* Opera 18

Android:
* Chrome 29+
* Firefox 24+
* Opera 12


Derived from the [WebRTC][1] supported browsers
[1]: http://en.wikipedia.org/wiki/WebRTC



