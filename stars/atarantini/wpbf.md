---
project: wpbf
stars: 107
description: |-
    Remotely test password strength of WordPress bloging software
url: https://github.com/atarantini/wpbf
---

-----
wpbf!
-----

wpbf is a bruteforce tool to remotely test password strength, username enumeration and plugin detection on a WordPress site.

Description
^^^^^^^^^^^

The script will try to login into the WordPress dashboard through the login form using a mixture of
enumerated usernames, a wordlist and relevant keywords from the blog's content. If a single username is
given, the script will not search for additional usernames.

When a correct username/passwords matchs, it will be logged and show on the standard output.

For faster results you can spawn threads but BE CAREFULL not to flood/DoS the site. Default
settings can be changed in "config.py" and "logging.conf" files.

The wordlist must have one entry per line, a small wordlist (wordlist.txt) and plugin list (plugins.txt) are provided for testing purposes.

Disclamer
^^^^^^^^^

This software is provided for educational purposes and testing only: use it in your own sites or
with permission of the owner. I'm not responsible of what actions people decide to take using this
software. I'm not not responsible if someone do something against the law using this sofware. Please
be good and don't do anything harmful.

Features
^^^^^^^^

* Username enumeration and detection (TALSOFT-2011-0526, Author's archive page and content parsing)
* Threads
* Use keywords from blog's content in the wordlist
* HTTP Proxy Support
* Basic WordPress fingerprint (version and full path)
* Advance plugins fingerprint (bruteforce, discovery and version/documentation)
* Detection of Login LockDown plugin (this plugin makes the bruteforce useless)
* Advanced logging using Python's logging library and logging configuration file

Requirements
^^^^^^^^^^^^

* Python 2.6+ (maybe it runs in older versions, if you want to test please notify me)

Known issues
^^^^^^^^^^^^
* False positives (in all passwords) with some uncommon WordPress versions or configurations

Usage
^^^^^

wpbf.py [-h] [-w WORDLIST] [-u USERNAME] [-s SCRIPTPATH] [-t THREADS] [-p PROXY] [-nk] [-eu] url

	positional arguments:
	  url                   base URL where WordPress is installed (ex: http://www.myblog.com/)

	optional arguments:
	  -w WORDLIST, --wordlist WORDLIST		        Worldlist file (default: wordlist.txt)
	  -u USERNAME, --username USERNAME		        Username (default: enumerate users)
	  -s SCRIPTPATH, --scriptpath SCRIPTPATH	        Relative path to the login form (default: wp-login.php)
	  -t THREADS, --threads THREADS		        How many threads the script will spawn (default: 5)
	  -p PROXY, --proxy PROXY			        HTTP proxy (ex: http://localhost:8008/)

	  -eu, --enumerateusers			        Only enumerate users
	  -eut, --enumeratetolerance ENUMERATETOLERANCE		User ID gap tolerance to use in username enumeration

	  -nk, --nokeywords                                 Skip search for keywords in content for the wordlist
	  -nf, --nofingerprint                              Skip WordPress fingerprint (version/full path)
	  -nps, --nopluginscan                              Skip plugins bruteforce, discovery and fingerprint
	  -ds, --dontstop                                   Don't stop when password is found, continue with all pending tasks

	  --test                                            Run python doctests (you can use a dummy URL here)

For extended help, run "./wpbf.py -h".

Examples
^^^^^^^^

Basic
+++++

It will use the default settings (you can change the default settings in config.py file)::

$ ./wpbf.py http://www.mysite.com/blog/

Custom
++++++

Using username 'john', not using keywords in the wordlist and trough a local proxy::

$ ./wpbf.py --nokeywords -u john -p http://localhost:8008/ http://www.mysite.com/blog/

Aggresive
+++++++++

It will use default settings and spawn 23 threads::

$ ./wpbf.py -t 23 http://www.mysite.com/blog/

Username enumeration
++++++++++++++++++++
Only perform a user enumeration::

$ ./wpbf.py -eu http://www.mysite.com/blog/

Output sample
+++++++++++++
Or how the script will behave in a normal run::

	$ ./wpbf.py http://localhost/wordpress/
	2011-06-18 19:11:41,461 - wpbf - INFO - Target URL: http://localhost/wordpress/wp-login.php
	2011-06-18 19:11:41,463 - wpbf - INFO - Checking URL & username...
	2011-06-18 19:11:45,073 - wpbf - INFO - Bruteforcing...
	3 words left
	2011-06-18 19:11:55,147 - wpbf - INFO - Done.
	2011-06-18 19:11:56,641 - wpbf - INFO - Password 'qawsed' found for username 'admin' on http://localhost/wordpress/wp-login.php

Author
^^^^^^

* Andres Tarantini (atarantini@gmail.com)

