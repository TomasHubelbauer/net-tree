# Net Tree

This package provides an algorithm for walking a set of items with a few IDs specified on them and returning them in order to enable the following functionalities:

- List root level items (no super ID)
- List subitems of an item (a given super ID)
- Have one item reside in multiple superitems (multiple super IDs)
- Collapse an item only for one superitem of its all superitems (items is expanded for just one parent and collapses there when expanded for another)
- Handle items which contain themselves through any path
- Handle items having an order number within their superitem

I've started this project on GitLab previously: https://gitlab.com/TomasHubelbauer/net-tree/blob/master/src/index.ts

But I am starting again in plain JavaScript.
