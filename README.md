# FreelancePortfolio

Windows now work across screens but present a weird user experience. This might need to be removed to keep a clean user experience

## TODO:
    Proper grid layout of windows (Needs work)
    Resize handler (Probably needs logic to not move a window that has been moved unless its position would be off screen)

## BUGS:
    Focus lays out weirdly after unfocusing due to auto zIndex taking over and using the elements dom order as index. \n
    May require more complex zIndex logic similar to the incrementing index idea but with a max index of the number of windows

    FIXED: CSS for header/nav needs some work
    FIXED: Minimize doesnt stack elements next to each other (some setup has been done)
    FIXED: Some actions only update after the mouse moves (resize, minimize)