const items = [
    // An item with no superitem (a root item)
    { id: 0, title: 'Root #1' },
    { id: 1, title: 'Root #2' },
    { id: 2, title: 'Root #3' },
    // An item with a superitem (a subitem)
    { id: 3, superId: 0, title: 'Subitem 1' },
    { id: 4, superId: 1, title: 'Subitem 1' },
    { id: 5, superId: 1, title: 'Subitem 2' },
    { id: 6, superId: 2, title: 'Subitem 1' },
    { id: 7, superId: 2, title: 'Subitem 2' },
    { id: 8, superId: 2, title: 'Subitem 3' },
    // An item with multiple superitems (a shared item)
    { id: 9, superIds: [ 0, 1, 2 ], title: 'Shared item' },
    // An item which directly contains itself
    // TODO: Think about what to do with this flipping hyper between 2 and 10
    { id: 10, superIds: [ 2, 10 ], title: 'Directly self-containing item' },
    // An item with user ordering withit its superitem
    { id: 11, superId: 5, order: 3, title: 'Subitem 3' },
    { id: 12, superId: 5, order: 2, title: 'Subitem 2' },
    { id: 13, superId: 5, order: 1, title: 'Subitem 1' },
    // A subitem of a shared item which will expand for a sole of its superitem's superitems
    { id: 14, superId: 9, title: 'Subitem of shared' },
    // An item which indirectly contains itself
    { id: 15, superIds: [ 2, 16 ], title: 'Indirectly self-containing item' },
    { id: 16, superId: 15, title: 'The indirection path… (can be a longer chain)' },
    // TODO: Consider the difference between `priorId` and `order` for ordering
];

function* walk(items, hyperIds, superId, level = 0) {
    const subitems = items.filter(item => {
        if (item.superIds !== undefined) {
            return item.superIds.includes(superId);
        }

        if (item.superId !== undefined) {
            return item.superId === superId;
        }

        if (superId === undefined) {
            return true;
        }

        return false;
    });

    for (let item of subitems) {
        let hyperId = undefined;
        let source;

        if (hyperIds !== undefined) {
            if (hyperIds[item.id] !== undefined) {
                source = 'explicitly';
                hyperId = hyperIds[item.id];
            } else {
                source = 'implicitly';
                if (item.superIds !== undefined) {
                    hyperId = item.superIds[0];
                } else {
                    hyperId = item.superId;
                }
            }
        } else {
            source = 'implicitly';
            if (item.superIds !== undefined) {
                hyperId = item.superIds[0];
            } else {
                hyperId = item.superId;
            }
        }

        let state = hyperId === superId ? 'expanded' : 'collapsed';

        yield { item, level, source, state };
        if (hyperId === superId) {
            yield* walk(items, hyperIds, item.id, level + 1);
        }
    }
}

function render(hyperIds) {
    for (let { item, level, source, state } of walk(items, hyperIds)) {
        console.log(`${'\t'.repeat(level)} ${item.title} (${item.id}) ${source} ${state}`);
    }
}

window.addEventListener('load', async _ => {
    // Hold up the render by being async until loaded so the *Navigated to* developer tools message doesn't interfere with the tree
    render();
});
