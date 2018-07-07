# Markdown example

Draw a square:

```scratch
when greenflag clicked
set [teller] to {4}
go to x: {0} y: {0}
pen down
repeat (counter)
move {100} steps
turn cw {({360}/{(counter)})} degrees
end
pen up
bounce on edge
```