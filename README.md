merk
====

A markdown viewer for mah notes.

_New! Version 0.0.3!_

Now you can **Actually look at markdown**, even though I still need to change the path and upload some actual markdown files as test dummies.

Also, I made my first markdown filter using insanely calculated regex. It literally took me 12 hours to write 3 different regex functions, but boy did I learn a lot!

..And it was all so I could have definitions lists rendered in html. How lame is that shit.

On the bright side, I successfully made a fricken markdown rule with fricken regex. I think I'll make more if I find something else worthy of adding.

Look at this shit i wrote from scratch:

```js
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

## Markdown Definition Lists Filter

>```
> Term
> : Defintion
>
> Turms
> : Derfablerfa
> : [You](suck://.com)
>```

I was looking at a markdown cheatsheet somewhere on the webs and somebody was like "HEY MAN YOU CAN DO DEF LISTS LIKE THIS! PYEEEWW!!!" and I was like "OH SHIT DAT SWEET" and started taking all my notes like that and then realized I have no idea who supports it. Since theres no one with as mightyfine of a md library as marked for node.js, I thought I'd just write it in myself.

## Markdown Reference Links Filter

Now reference links actually appear at the bottom of your page! This filter is always on at this point in time. Gimme a break I just made this 5 seconds ago.

Same syntax for ref links as always:
>```
>Here's an [in-text reference] that is defined elsewhere
>------
># References
>[in-text reference]: some://link.derp "optional titleybob"
>[now its going to]: show.up.inalist.too "WOOOO!!!"
>```

## TODO
* File browser for your puter
* Possibly a mongo service for uploading .md notes
* ~~Add soem goddamn CSS up in here (I think I'm gonna try Pure CSS this time around)~~
* ~~I'm thinking about making another filter that creates a set of links for your reference-style links that actually appear on the page. I mean, why the hell not? Seriously, why the hell don't reference links show up? It's annoying. It would be nice when you are writing a document with superior knowledges for the refs to all be in one place. Like an appendix in a real book! Gwarsh, what a thought.~~
* Make parsing clientside

## Upcoming Features
* Improvements for References:
	* Automatically format references with bullets, classed as "reference"
	* Create references on the references (Whuuuuuuut) that link to each time the reference is used in the document
	* Allow a description to appear after the link, which could be defined by the "optional title"
* Table of contents
	* Like a book, in the beginning of the document, a table of contents could be created automatically. 
	* It would be based on your headings (h1, h2...), and could include an internal link that would jump you the the corresponding heading. This would require that an id with a slugged version of the heding text be applied to an id attribute on the heading.
	* The other way to do it would be to use javascript to target the nth-element. This is fine, but I'd like to avoid javascript on the client side so that we can have it function on purely html markup.
* Extended definitions
	* If you have a definition list somewhere in your document, it would be really sweet if every time you mentioned a term that is defined in the <dl> somewhere else in the document, it would become internally hyperlinked to that definition term in the ```<dl>```.
	* this might be annoying because the page would jump to a totally different spot and you would lose the spot you were just reading. Another implementation of contextual definitions would be for each def. term to have a toolip with the definition appear on hover. During the parsing phase, this would require each contextual def. term to:
		1. be declared by some sort of custom markdown syntax
		2. be matched against each definition in the ```<dl>```
		3. get the matching term's definition rendered in some sort of html attribute.
	* One effective way to render this would be as an ```<a>``` tag which doesn't link to anything, but has a title attribute with the definition, and a custom class appended to it called something like "term".
* Contextual heading references
	* The same implementation of contextual references that is native to markdown could be used for headings as well. If a word is defined as a contextual reference, the parsing engine can search all of the headings for a match and convert the reference into an internal hyperlink.
	* The way this is processed would be very similar to the table of contents, and would also require that each heading gets a slugged id attached to it.
