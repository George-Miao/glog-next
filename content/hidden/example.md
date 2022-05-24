---
title: Some example Markdown
created: 2022-01-22 02:47:53
updated: 2022-05-25 00:06:39
categories: [ChitChat]
tags: [en-US]
---

This is an example of a Markdown file.

<!-- more -->

# An h1 header

Paragraphs are separated by a blank line.

2nd paragraph. _Italic_, **bold**, and `monospace`. Itemized lists look like:

- this one
- that one
- the other one

1. this one
2. that one
3. the other one

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

| Header1    |     Header2 |   Header3   |
| :--------- | ----------: | :---------: |
| Align left | Align right | center text |
| cell data1 |  cell data2 | cell data3  |

Note that --- not considering the asterisk --- the actual text content starts at 4-columns in.

> Block quotes are written like so.
>
> They can span multiple paragraphs, if you like.

::: tip
Here's some tips for you
:::

::: warn
Oh you really don't want to do this
:::

Use 3 dashes for an em-dash ( --- ). Use 2 dashes for ranges (ex., "it's all in chapters 12--14"). Three dots ... will be converted to an ellipsis. Unicode is supported. ☺

## An h2 header

Here's a numbered list:

1. first item
2. second item
3. third item

Note again how the actual text starts at 4 columns in (4 characters from the left side). Here's a code sample:

```python
# Let me re-iterate ...
for i in 1 .. 10 { do-something(i) }
```

As you probably guessed, indented 4 spaces. By the way, instead of indenting the block, you can use delimited blocks, if you like:

    define foobar() {
        print "Welcome to flavor country!";
    }

(which makes copying & pasting easier). You can optionally mark the delimited block for Pandoc to syntax highlight it:

```python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print(i)
```

### An h3 header

Now a nested list:

1.  First, get these ingredients:

    - carrots
    - celery
    - lentils

2.  Boil some water.

3.  Dump everything in the pot and follow this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [localdoc](local-doc.html), and to a [section heading in the currentdoc](#an-h2-header). Here's a footnote [^1]. Here's another footnote [^2].

[^1]: Some footnote text.
[^2]: Other footnote text.

A horizontal rule follows.

---

![example image](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/91ad4cfe-6120-4e76-1123-6c223514bb00/public 'An exemplary image') _Example Image_

Inline math equation: $\omega = d\phi / dt$. Display math should get its own line like so:

$$I = \int \rho R^2 dV$$

And some matrix:

$$
A = \begin{bmatrix}
    a_{11} & a_{12} & \dots \\
    \vdots & \ddots & \\
    a_{K1} &        & a_{KK}
    \end{bmatrix}
$$

$$
\ket{1} = \begin{pmatrix}
0 \\
1 \\
\end{pmatrix}
$$

And note that you can backslash-escape any punctuation characters which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.
