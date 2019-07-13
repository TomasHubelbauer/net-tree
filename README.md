# Net Tree

[**LIVE**](https://tomashubelbauer.github.io/net-tree)

This package provides an algorithm for walking a set of items with a few IDs specified on them and returning them in order to enable the following functionalities:

- Streams items with a tree hierarchy where `level` gives the item level
- Expands an item with multiple superitems underneath the first or a given superitem
- Providers information about the expansion status (expanded / collapsed) and its source (explicit - hyper ID map, implicitly - first super ID)

## To-Do

Allow an item to be explicitly collapsed by using `undefined` or `null` hyper ID.

Think about how to handle self-containing items reporting their status - want to be
able to flash the first one in chain upon expanding a further one.

This is important because expanding the repeated instance will actually collapse the
first instance and we want to be able to select that afterwards.

Handle items having an order number within their superitem.
Either do this by an `order` property or using a `priorId` property.
In any case this will have to differ across super IDs for shared items
(shared moved last in first super, first in second super).

Set up a GitHub and an NPM release pipeline through YAML:
https://stackoverflow.com/a/52323336/2715716
https://devblogs.microsoft.com/devops/whats-new-with-azure-pipelines/

[I've started this project on GitLab previously](https://gitlab.com/TomasHubelbauer/net-tree/),
but I am starting again in plain JavaScript and will provide it as an ES module for
use in my other project, [**Agendum**](https://agendum.today)
