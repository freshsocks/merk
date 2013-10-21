merk
====

A markdown viewer for mah notes.

_New! Version 0.0.2!_

Now you can **Actually look at markdown!**

Also, I made my first markdown filter using insanely calculated regex. It literally took me 12 hours to write 3 different regex functions, but boy did I learn a lot!

..And it was all so I could have definitions lists rendered in html. How lame is that shit.

On the bright side, I successfully made a fricken markdown rule with fricken regex. I think I'll make more if I find something else worthy of adding.

Look at this shit i wrote from scratch:

```
var definitionList = {
	dt : /(^(?!:|#)(?:<p>|<[\w+\s?"?=?]+>)*([\w%$$]+.*)$)(?=[\r|\n]:\s\S)/gm,
	dd : /(?:(^:\s)(.*(?=<\/p>)|.*$)(<\/p>)?)/gm,
	dl : /((?:^(<dt).*>[\n|\r]+|(?:<dd>.*<\/dd>)[\n\r]+)+(?![\r\n\S]*<dt>|[\r\n\S]+<dd>))/gm
};
```
# LOOK AT IT
## And now
### My brain
#### Is fried, ladies and genleman.
###### Now go do something cool, markdown is only for the nerdiest of the nerds, go ride your rollerscooterboards or something. I'm not giving you my lunch money.

Oh, heres how you write a definition list:

## Markdown Definition Lists

```
Term
: Defintion

Turms
: Derfablerfa
: [You](suck://.com)
```

I was looking at a markdown cheatsheet somewhere on the webs and somebody was like "HEY MAN YOU CAN DO DEF LISTS LIKE THIS! PYEEEWW!!!" and I was like "OH SHIT DAT SWEET" and started taking all my notes like that and then realized I have no idea who supports it. Since theres no one with as mightyfine of a md library as marked for node.js, I thought I'd just write it in myself.

## TODO:
* File browser for your puter
* Possibly a mongo service for uploading .md notes
* Add soem goddamn CSS up in here (I think I'm gonna try Pure CSS this time around)
* I'm thinking about making another filter that creates a set of links for your reference-style links that actually appear on the page. I mean, why the hell not? Seriously, why the hell don't reference links show up? It's annoying. It would be nice when you are writing a document with superior knowledges for the refs to all be in one place. Like an appendix in a real book! Gwarsh, what a thought.
