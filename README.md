# FreelancePortfolio

## TODO:
    Minimize doesnt stack elements next to each other (some setup has been done)
    Resize handler (Probably needs logic to not move a window that has been moved unless its position would be off screen)


## BUGS:
    Some actions only update after the mouse moves

    Focus lays out weirdly after unfocusing due to auto zIndex taking over and using the elements dom order as index. \n
    May require more complex zIndex logic similar to the incrementing index idea but with a max index of the number of windows
