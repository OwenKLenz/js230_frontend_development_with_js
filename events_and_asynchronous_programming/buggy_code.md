# Buggy Code

The `img` is a child of the `a` element so by default, clicking on them image will open the link. The person added `event.stopPropogation()` to the `click` event listener, but stop propagation only prevents the event object from bubbling up past the `img`, it does not prevent the default behavior for `a` tags of opening the `href`ed link. To stop link from opening, `event.preventDefautlt()` should be added.
